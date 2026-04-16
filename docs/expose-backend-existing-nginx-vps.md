# Expose the EASB backend through an existing nginx on the VPS

This walkthrough assumes:

- **Nginx is already running** on the VPS in Docker (or you manage its config) and it already proxies to other containers.
- You want to add **`easb-backend`** (this repo’s `docker-compose.backend.easb.yml`, listening on **port 3000** inside the container) so you can call it from **Postman** on your PC via the **same public IP or domain** nginx already uses.

You should **not** start a **second** nginx that also binds host ports `80` / `443` unless you use different ports. Extend the **existing** nginx config instead.

In **production**, this app uses the global prefix **`api/v1`** on HTTP routes (see `src/main.ts`). Example base URL:

`https://your-domain.com/api/v1/...`

### Who must be on the same Docker network?

| Traffic | Who talks to whom | Same network required? |
|--------|-------------------|-------------------------|
| Browser / Postman → API | **nginx → easb-backend** (HTTP) | **Yes** — nginx and backend must see each other by container name (or another reachable address). |
| App → database | **easb-backend → easb-mysql** (MySQL protocol) | **Yes** — backend and MySQL must share a network (e.g. `easb-net`). |
| Public → database | **nginx → MySQL** | **No** — nginx does **not** connect to MySQL. Only the backend does. |

So you do **not** need to attach **`easb-mysql`** to the **nginx** network for a normal setup. MySQL can stay only on `easb-net` with the backend.

What you **do** need is for **`easb-backend`** to participate in **both** relationships:

1. **Backend ↔ MySQL** — already satisfied if both are on `easb-net` (your `DB_URL` host is `easb-mysql`).
2. **Nginx ↔ Backend** — if nginx’s network is **not** `easb-net`, connect the backend to nginx’s network as well. A container can be on **multiple networks**:

   ```bash
   docker network connect <nginx-container-network> easb-backend
   ```

   Alternatively, attach **nginx** to `easb-net` instead (`docker network connect easb-net <nginx-container>`), so all three share one network — still **no** requirement to move MySQL to a “special” nginx-only network.

**Summary:** Do not move MySQL just for nginx. Ensure **backend** can reach **MySQL** (`easb-net`) and **nginx** can reach **backend** (shared network or multi-network backend).

---

## 1. Inventory: find the nginx container and its config

On the VPS:

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}' | grep -i nginx
```

Note:

- **Container name** (e.g. `nginx`, `reverse-proxy`, `easb-nginx`).
- How **port 80/443** are published (e.g. `0.0.0.0:80->80/tcp`).

See how nginx config is mounted:

```bash
docker inspect <nginx-container-name> --format '{{json .Mounts}}' | jq
```

(or inspect in Portainer). Typical patterns:

- Bind mount: `-v /opt/nginx/conf.d:/etc/nginx/conf.d:ro`
- Single file: `-v /path/nginx.conf:/etc/nginx/nginx.conf:ro`

You will **edit the config that this container actually loads** (often under `conf.d/*.conf` or the main `nginx.conf`).

---

## 2. Put the backend on the same Docker network as nginx

Docker DNS resolves **container names** only on a **shared network**. `easb-backend` must be reachable from the nginx container as `http://easb-backend:3000`.

### 2.1 See which networks nginx uses

```bash
docker inspect <nginx-container-name> --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```

### 2.2 See which network `easb-backend` uses

```bash
docker inspect easb-backend --format '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```

### 2.3 If they differ: attach the backend to nginx’s network

Example: nginx is on `webproxy` and backend is only on `easb-net`:

```bash
docker network connect webproxy easb-backend
```

Pick the network that **nginx** uses for upstreams (often a user-defined bridge like `proxy` or `web`).

**Alternative:** define both services in one Compose project on the same `networks:` block so they always share a network (recommended for new deployments).

### 2.4 Verify from inside nginx (no nginx config edit required yet)

This step checks **only** Docker networking and that the backend listens on **3000**. You do **not** need to add `upstream` / `location` blocks first—those come in [section 4](#4-add-nginx-upstream--server--location). Nginx is not involved in this hop; you are calling the backend **directly** by container name from inside the nginx container.

**1) DNS — can nginx resolve `easb-backend`?**

```bash
docker exec <nginx-container-name> getent hosts easb-backend
```

If this fails, the containers do not share a network—finish [2.3](#23-if-they-differ-attach-the-backend-to-nginxs-network) first.

**2) HTTP — does the backend answer?** (do **not** hide stderr until it works)

```bash
docker exec <nginx-container-name> wget -S -O- http://easb-backend:3000/api/v1/ 2>&1 | head -40
```

`-S` prints response headers (you should see `HTTP/1.1 200` or `404`, etc.). If `wget` is missing, try:

```bash
docker exec <nginx-container-name> curl -sS -D- -o /dev/null http://easb-backend:3000/api/v1/
```

`curl` prints response headers including status line; `-o /dev/null` discards body so an empty JSON/HTML body does not look like “nothing happened.”

**Why a one-liner like `wget -qO- ... 2>/dev/null | head` can show no output**

| Cause | What to do |
|--------|------------|
| **`2>/dev/null` hides errors** | Remove it; you may see `wget: not found` or `Connection refused`. |
| **Empty response body** | Normal for some routes; rely on **headers** (`wget -S` or `curl -D-`) or HTTP code. |
| **Backend not on shared network** | Fix [2.3](#23-if-they-differ-attach-the-backend-to-nginxs-network); confirm with `getent hosts`. |

If you get **connection refused** or **could not resolve host**, fix the network or container name before editing nginx.

---

## 3. Choose a URL shape (two common patterns)

| Pattern | When to use | Postman base URL example |
|--------|-------------|---------------------------|
| **A. Subdomain** | Clean separation from other sites | `https://api.example.com` → paths `/api/v1/...` |
| **B. Path on same host** | Single domain, many apps | `https://example.com` with `location /api/` or dedicated prefix |

This Nest app already prefixes routes with **`/api/v1`** in production, so you usually **do not** need to strip paths in nginx unless you mount the app under an **extra** prefix (e.g. `/easb/api/`).

---

## 4. Add nginx: `upstream` + `server` / `location`

Edit the config file your **existing** nginx loads. Below is a **minimal** pattern; adjust names and TLS to match your server.

### 4.1 Subdomain (recommended if you have DNS)

```nginx
upstream easb_backend {
    server easb-backend:3000;
    keepalive 32;
}

server {
    listen 80;
    # listen 443 ssl;  # if you terminate TLS here — add ssl_certificate, etc.
    server_name api.example.com;

    client_max_body_size 50M;

    location / {
        proxy_pass http://easb_backend;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade    $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_connect_timeout 60s;
        proxy_send_timeout    60s;
        proxy_read_timeout    60s;
    }
}
```

Postman: `GET http://api.example.com/api/v1/<your-route>` (add HTTPS when TLS is configured).

### 4.2 Same domain, path already used by other apps

If `example.com` is served by this nginx and other `location` blocks exist, add **one** block that forwards to the API (order matters: more specific paths first):

```nginx
upstream easb_backend {
    server easb-backend:3000;
    keepalive 32;
}

# inside the existing server { ... } for example.com
location /api/ {
    proxy_pass http://easb_backend;
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 50M;
    proxy_connect_timeout 60s;
    proxy_send_timeout    60s;
    proxy_read_timeout    60s;
}
```

Because the app serves **`/api/v1/...`**, requests like `https://example.com/api/v1/auth/...` are forwarded unchanged to the backend.

---

## 5. Test and reload nginx

```bash
docker exec <nginx-container-name> nginx -t
```

If `syntax is ok`:

```bash
docker exec <nginx-container-name> nginx -s reload
```

---

## 6. Postman on your PC

1. **Base URL** (production):  
   `https://<your-domain-or-ip>/api/v1`  
   (use `http://` if you only have port 80 without TLS yet.)

2. **Examples**
   - Health-style check: whatever route you expose under controllers (see project `api.md` / OpenAPI).
   - Send **Authorization** header if the route is protected (Bearer JWT).

3. If you use **HTTPS** with a real certificate, set Postman to **SSL certificate verification** on unless you use self-signed (then disable or add CA).

4. **Firewall:** ensure **80** and **443** are allowed to the VPS (same as for your existing sites).

---

## 7. Relation to this repo’s `nginx/` folder

This repository includes:

- `docker-compose.nginx.easb.yml` — standalone **easb-nginx** that proxies **everything** to `easb-backend` (see `nginx/nginx.conf` `upstream backend` → `easb-backend:3000`).

That is useful when **this** nginx is the only reverse proxy. On a VPS where **another** nginx already owns `80`/`443`, you typically **do not** run `easb-nginx` on the same ports; instead you copy the **`upstream`** and **`proxy_pass`** ideas into the **existing** nginx config as in this guide.

---

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| **502 Bad Gateway** | `docker exec nginx wget http://easb-backend:3000/...` — network and container name; backend logs `docker logs easb-backend`. |
| **Connection refused** | See [DNS OK but “Connection refused” on port 3000](#dns-ok-but-connection-refused-on-port-3000) below. |
| **Could not resolve easb-backend** | Backend not on the same Docker network as nginx — `docker network connect ...`. |
| **404 on valid route** | Wrong global prefix: production uses **`/api/v1`**, not `/api/dev/v1`. |
| **413** on upload | Raise `client_max_body_size` in the **location** or **server** nginx uses for this app (repo example uses `50M`). |
| **Odoo (or other) HTML 404 on `/api/v1/...`** | See [below](#odoo-or-other-app-404-on-apiv1-but-nginxprodconf-is-correct). |

### Odoo (or other app) 404 on `/api/v1/...` but `nginx.prod.conf` is “correct”

If the **response looks like Odoo’s** (theme, layout, “Page not found”), nginx sent the request to **Odoo’s** `proxy_pass` (usually `location /`), **not** to `easb_backend`. The API block is missing, not active, or not in the **`server`** that actually handles your request.

**1. Confirm the live config contains the API route**

```bash
docker exec <nginx-container-name> nginx -T 2>&1 | grep -E 'easb_backend|/api/v1'
```

You should see **`upstream easb_backend`** and **`location /api/v1/`** (or equivalent). If grep finds nothing, the running nginx was **not** reloaded after your edit, or you edited a different file than the one bind-mounted to `/etc/nginx/nginx.conf`.

**2. HTTP vs HTTPS — two different `server { }` blocks**

Many setups define:

- `listen 80;` — HTTP  
- `listen 443 ssl;` — HTTPS  

If you added **`location /api/v1/`** only under **port 80**, but Postman or the browser uses **`https://`**, the request hits the **443** `server` block. If that block only has `location /` → Odoo, you get an **Odoo 404**.

**Fix:** Add the same **`upstream easb_backend`** (once, in `http { }`) and the same **`location /api/v1/ { ... }`** inside **every** `server` that should serve the API (at least the one for `listen 443 ssl` if you use HTTPS). Then `nginx -t` and `nginx -s reload`.

**3. Use `POST` for login**

`POST /api/v1/auth/login` is the real route. Opening the URL in a browser sends **GET**, which Nest may not expose; Odoo may still answer with **its** 404 page for an unknown path.

**4. `server_name` and default server**

If multiple `server { }` blocks exist, ensure your domain (or `server_name _`) is the one that includes **`location /api/v1/`**. A catch‑all vhost without the API block can still send traffic to Odoo.

**5. Quick isolation**

From the VPS host (or any machine that reaches nginx as clients do):

```bash
curl -sv -X POST "http://127.0.0.1/api/v1/auth/login" -H "Content-Type: application/json" -d '{}' 2>&1 | head -40
```

(Use `-k https://...` and the right host/SNI if you test HTTPS.) Compare **response body**: JSON / Nest error vs Odoo HTML.

**6. `grep` on `nginx -T` is empty, but the file on disk has `/api/v1` — invalid `upstream`**

Nginx requires a **name** on every `upstream` block. This is **invalid** and will make **`nginx -t` fail**, so **`nginx -s reload` never applies** and the running process keeps an **old** config (hence **`grep` finds no `easb_backend`**):

```nginx
# INVALID — missing upstream name
upstream {
    server easb-backend:3000;
}
```

**Fix:**

```nginx
upstream easb_backend {
    server easb-backend:3000;   # use your real PORT (e.g. 3005)
    keepalive 32;
}
```

Then **`proxy_pass http://easb_backend;`** matches. Run **`nginx -t`**, then **`nginx -s reload`**, and re-check:

```bash
docker exec <nginx-container-name> nginx -T 2>&1 | grep -E 'easb_backend|/api/v1'
```

**7. `curl` to `127.0.0.1` returns `301` to `https://127.0.0.1/...` — wrong `Host`**

If `server_name` is **`erp.example.com`** but you run:

```bash
curl http://127.0.0.1/api/v1/...
```

the request has **`Host: 127.0.0.1`**, which **does not match** `erp.example.com`. Nginx may route the request to a **different** `server` (the **default** for port 80), often one that only has **`location / { return 301 https://... }`**, so you get a **redirect** and never hit your **`location /api/v1`**.

**Fix — send the same Host clients use:**

```bash
curl -sv -X POST "http://127.0.0.1/api/v1/auth/login" \
  -H "Host: erp.example.com" \
  -H "Content-Type: application/json" \
  -d '{}'
```

Or test exactly like Postman: **`https://erp.example.com/api/v1/auth/login`** (POST). For HTTPS from localhost, add **`-k`** if the cert is not valid for `127.0.0.1`, or use **`--resolve erp.example.com:443:127.0.0.1`** so SNI and certificate match.

**8. Optional — avoid `location /` beating `/api/v1` on port 80**

Put **`location /api/v1/`** (or **`location ^~ /api/v1`**) **above** **`location /`** in the file for clarity, and keep **`location /`** as the catch‑all redirect to HTTPS. Nginx normally prefers the **longest prefix**, but an invalid block can prevent the API `location` from loading at all—fix **`upstream`** first.

---

### DNS OK but “Connection refused” on port 3000

If `getent hosts easb-backend` works but `wget`/`curl` from nginx shows `Connection refused` to `easb-backend:3000`, Docker networking is fine; **nothing is accepting TCP on 3000** inside the backend container (or the app never reached `listen`).

Work through this on the **VPS**:

1. **Is the container running and healthy?**

   ```bash
   docker ps -a --filter name=easb-backend
   ```

   If it **restarts** or is **Exited**, the process crashed—fix that first (`docker logs easb-backend`).

2. **Read backend logs** (DB errors, migrations, missing `JWT_*`, etc. often stop the app before it listens):

   ```bash
   docker logs easb-backend --tail 150
   ```

3. **From inside the backend container**, test loopback (bypasses Docker DNS):

   ```bash
   docker exec easb-backend wget -S -O- http://127.0.0.1:3000/api/v1/ 2>&1 | head -25
   ```

   - If this also **refuses**, Nest never bound to the port—still crashed, wrong `PORT` in env, or stuck before bootstrap finished.
   - If **this works** but nginx still cannot connect, double-check both are on the same network and that you are using the correct container name and port.

4. **Confirm `PORT` in the container** matches what you expect (default **3000**):

   ```bash
   docker exec easb-backend printenv PORT
   ```

5. **Rebuild/redeploy** after pulling changes: this repo listens on **`0.0.0.0`** so the app is reachable from other containers on the bridge network (see `src/main.ts`).

Most production cases: **database URL wrong**, **MySQL not ready**, or **migration failure** so the process exits and nothing listens on 3000.

---

## Related files in this repo

- `docker-compose.backend.easb.yml` — `easb-backend` on `easb-net`
- `nginx/nginx.conf` — reference `upstream` / `proxy_pass` for `easb-backend:3000`
- `src/main.ts` — global prefix `api/v1` in production

---

*EASB backend (`be-easb-revamp`).*
