# DBeaver: Connect to MySQL (Docker) on your VPS

This guide is for **DBeaver on your own computer** (Windows / macOS / Linux) talking to **MySQL inside Docker on a remote VPS**. You do **not** install or run DBeaver on the server—only the MySQL container (and SSH) live on the VPS.

### What runs where

| Location | What runs there |
|----------|------------------|
| **Your PC (local)** | DBeaver desktop app. Optionally: an `ssh -L` terminal (Method B). |
| **VPS (remote)** | SSH server (`sshd`), Docker, `easb-mysql`, your app. **No DBeaver.** |

Traffic path: **your PC → SSH to VPS → (from the VPS) → `127.0.0.1:3306` → Docker-published MySQL**. The guide’s “`127.0.0.1`” in the MySQL connection is **the VPS loopback** as seen **after** the SSH tunnel is up—not “your laptop’s localhost” unless you use Method B (then DBeaver points at **local** `127.0.0.1` and the tunnel forwards to the VPS).

You should **not** expose MySQL port `3306` to the public internet. Use an **SSH tunnel** so only SSH (usually port `22`) is reachable from outside; database traffic travels inside that encrypted session.

For the same networking model with phpMyAdmin, see [mysql-phpmyadmin-vps.md](./mysql-phpmyadmin-vps.md).

---

## Prerequisites

- SSH access to the VPS (user with shell; SSH key recommended).
- On the VPS: Docker network `easb-net` exists, `easb-mysql` is running, and the compose file maps MySQL to the host (see `ports` in `docker-compose.mysql.easb.yml`, typically `${MYSQL_PORT:-3306}:3306`).
- Credentials from the VPS `.env` (or your deployment secrets):
  - `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`
  - Optional: `MYSQL_ROOT_PASSWORD` if you connect as `root`.
- [DBeaver](https://dbeaver.io/download/) installed locally (Community or higher).

---

## Step 1 — Confirm MySQL on the VPS

1. SSH into the server:

   ```bash
   ssh your-user@your-vps-hostname-or-ip
   ```

2. Check the container:

   ```bash
   docker ps --filter name=easb-mysql
   ```

3. Test MySQL **from the VPS host** (use the same port as on the host; default is `3306`):

   ```bash
   docker exec -it easb-mysql mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1 AS ok;" "$MYSQL_DATABASE"
   ```

4. Confirm which port on the **VPS host** forwards to the container:

   ```bash
   docker port easb-mysql 3306
   ```

   Example output: `0.0.0.0:3306->3306/tcp` means MySQL is reachable on the VPS at `127.0.0.1:3306`. If you use a custom `MYSQL_PORT` (e.g. `3307`), use that port in the tunnel steps below instead of `3306`.

If these checks fail, fix Docker / `.env` on the VPS before configuring DBeaver.

---

## Step 2 — Choose how to tunnel

| Method | When to use |
|--------|-------------|
| **A. DBeaver built-in SSH tunnel** | Easiest: one window, tunnel managed by DBeaver. |
| **B. Manual `ssh -L` + DBeaver to localhost** | You already use a terminal tunnel, or DBeaver’s SSH tab is unavailable. |

Both are secure; do not open MySQL to `0.0.0.0/0` on the firewall.

---

## Method A — DBeaver built-in SSH tunnel (recommended)

### A.1 Create a MySQL connection

1. Open DBeaver → **Database** → **New Database Connection** (or plug icon).
2. Choose **MySQL** → **Next**.

### A.2 Main (“Server”) tab

**DBeaver stays on your PC.** These MySQL fields are **not** “your PC’s localhost” here—they describe where MySQL listens **on the VPS** (`127.0.0.1` = that server only), which DBeaver reaches **through** the SSH tunnel you configure in the next step.

| Field | Value |
|--------|--------|
| **Server Host** | `127.0.0.1` or `localhost` |
| **Port** | Host port mapped to MySQL (usually `3306`; use your `MYSQL_PORT` / `docker port` result if different) |
| **Database** | Optional: your `MYSQL_DATABASE` (e.g. `easb`) |
| **Username** | `MYSQL_USER` from VPS `.env` |
| **Password** | `MYSQL_PASSWORD` (click **Save password** only if you accept local storage risk) |

Do **not** click **Test Connection** yet if SSH is not configured.

### A.3 SSH tab

1. Open the **SSH** section (or **SSH / SSL** depending on version).
2. Enable **Use SSH Tunnel** / **Connect using SSH tunnel**.
3. Set:

   | Field | Value |
   |--------|--------|
   | **Host / SSH Host** | Your VPS hostname or public IP |
   | **Port** | `22` (or your SSH port) |
   | **User Name** | Linux user on the VPS |
   | **Authentication** | Prefer **Public Key**: point to your private key (OpenSSH format). Password auth works but is weaker. |

4. **Local port / bind** — leave default unless you have a port conflict.

### A.4 Test and finish

1. Click **Test Connection**.  
   - First run may prompt to download MySQL drivers; accept.
2. On success, **Finish**. You can browse schemas and run SQL.

**How it works:** DBeaver opens SSH to the VPS, then connects from the server to `127.0.0.1:<mysql-port>`, where Docker publishes `easb-mysql`.

---

## Method B — Manual SSH port forward + DBeaver

Use a **local** port (e.g. `3307`) so it does not clash with MySQL running on your PC (`3306`).

### B.1 Start the tunnel (keep the terminal open)

**Linux / macOS / Windows (PowerShell / Terminal):**

```bash
ssh -N -L 3307:127.0.0.1:3306 your-user@your-vps-hostname-or-ip
```

- **`3307`**: port on **your computer** DBeaver will use.
- **`3306`**: MySQL on the **VPS** (change if your host mapping uses another port, e.g. `3307:3306` → use `3307` as the last number).

If the VPS maps MySQL to host port **3307**:

```bash
ssh -N -L 3307:127.0.0.1:3307 your-user@your-vps-hostname-or-ip
```

**Windows (PuTTY):** Session → SSH → Tunnels → Local port `3307`, destination `127.0.0.1:3306`, Add, then open the session.

### B.2 DBeaver connection (no SSH tab)

| Field | Value |
|--------|--------|
| **Server Host** | `127.0.0.1` |
| **Port** | `3307` (your **local** tunnel port) |
| **Username / Password** | Same `MYSQL_USER` / `MYSQL_PASSWORD` as on the VPS |

**Test Connection** → **Finish**.

---

## Step 3 — Verify in DBeaver

1. Expand the connection → **Databases** → your database (`MYSQL_DATABASE`).
2. Open **SQL Editor** and run:

   ```sql
   SELECT VERSION();
   SHOW TABLES;
   ```

3. Disconnect or close the tunnel when done (stop `ssh` with `Ctrl+C` for Method B).

---

## Security checklist

- Prefer **SSH keys**; avoid password-only SSH on production VPS.
- Do **not** add a firewall rule that exposes **3306** to the whole internet for admin convenience.
- Use strong `MYSQL_PASSWORD`; rotate if leaked.
- Limit SSH to known IPs (`AllowUsers` / firewall) if possible.

---

## Troubleshooting

| Symptom | What to check |
|---------|----------------|
| **Connection refused** (Method A) | SSH works? `docker ps` shows `easb-mysql`? `docker port easb-mysql 3306` matches the port in DBeaver’s **Main** tab? |
| **Connection refused** (Method B) | Tunnel command still running? Local port matches DBeaver (`3307` vs `3306`). |
| **Access denied for user** | User/password match VPS `.env`; database name correct. Try `docker exec` test on VPS (Step 1). |
| **Communications link failure** / timeout | VPS firewall blocking SSH? Wrong IP? VPN? |
| **SSL required** | In DBeaver connection → **Driver properties**, try disabling SSL if your server does not use it (`useSSL=false`), or configure SSL if required. |
| **Public Key Retrieval** (some drivers) | Connection settings → **Driver properties** → `allowPublicKeyRetrieval` = `true` only if you understand the tradeoff (often needed for MySQL 8 auth debugging). |

### MySQL user host (`%` vs `localhost`)

The official MySQL image typically creates `MYSQL_USER` with host `%`. Connections through SSH appear as if they come from the VPS host; if you changed grants, ensure the user can connect from `localhost` / `%` as appropriate.

---

## Related project files

- `docker-compose.mysql.easb.yml` — `easb-mysql` service and port mapping  
- `.env.production.example` — `MYSQL_*` and `DB_URL` variable names  

---

*EASB backend (`be-easb-revamp`).*
