# Connect local phpMyAdmin to MySQL on the VPS (Docker)

This guide explains how to use **phpMyAdmin running on your computer** to manage the **MySQL 8** instance that runs in Docker on your VPS (`easb-mysql` from `docker-compose.mysql.easb.yml`), without exposing MySQL to the public internet.

## Why use an SSH tunnel?

- MySQL should **not** be open on `0.0.0.0:3306` to the world (brute force, leaks).
- An **SSH tunnel** forwards a port on your PC to `127.0.0.1:3306` on the VPS. Traffic is encrypted by SSH; only SSH (port 22) needs to be reachable from your IP.

## Prerequisites

- SSH access to the VPS (user with shell, key or password).
- On the VPS, MySQL is running and published to the host, e.g. `MYSQL_PORT` → `3306` (see `docker-compose.mysql.easb.yml`).
- Credentials from the VPS `.env`: `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE` (and optionally `MYSQL_ROOT_PASSWORD` for root).
- phpMyAdmin installed locally (XAMPP/WAMP/Laragon, Linux packages, or Docker on your machine).

## Step 1 — Confirm MySQL is listening on the VPS

SSH into the VPS:

```bash
ssh your-user@your-vps-hostname-or-ip
```

Check the container:

```bash
docker ps --filter name=easb-mysql
```

Test MySQL **from the VPS host** (port must match `MYSQL_PORT` in `.env`, default `3306`):

```bash
docker exec -it easb-mysql mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SELECT 1 AS ok;" "$MYSQL_DATABASE"
```

If this works, MySQL is reachable on the server at `127.0.0.1:<MYSQL_PORT>`.

## Step 2 — Open an SSH tunnel from your PC

Pick a **local** port that is free (examples use `3307` so it does not clash with a local MySQL on `3306`).

### Linux / macOS / Windows PowerShell / Windows Terminal

```bash
ssh -N -L 3307:127.0.0.1:3306 your-user@your-vps-hostname-or-ip
```

- **`-N`**: do not run a remote shell; only forward ports (optional; you can omit `-N` and use the same session for other commands).
- **`3307`**: port on **your PC** where the tunnel listens.
- **`3306`**: MySQL port **on the VPS** (change if `MYSQL_PORT` on the VPS is not `3306`).

If MySQL on the VPS is mapped to host port **3307** instead, use:

```bash
ssh -N -L 3307:127.0.0.1:3307 your-user@your-vps-hostname-or-ip
```

Leave this terminal **open** while you use phpMyAdmin.

### Windows (PuTTY)

1. Session → Host Name → your VPS address.  
2. Connection → SSH → Tunnels:
   - Source port: `3307`
   - Destination: `127.0.0.1:3306` (or `127.0.0.1:3307` if that is the host port)
   - Local, Add  
3. Open the session and keep it connected.

## Step 3 — Configure phpMyAdmin to use the tunnel

phpMyAdmin should connect to **MySQL via your loopback address** and the **local** tunnel port.

### A) phpMyAdmin on the host (XAMPP, etc.)

At login (or in `config.inc.php`):

| Field    | Value        |
|----------|--------------|
| Server   | `127.0.0.1`  |
| Port     | `3307`       |
| Username | `MYSQL_USER` from VPS `.env` |
| Password | `MYSQL_PASSWORD` from VPS `.env` |

Database name is usually chosen after login; use `MYSQL_DATABASE` (e.g. `easb`) when browsing.

### B) phpMyAdmin running in Docker **on your PC**

The tunnel is on the **host** (`127.0.0.1:3307`). Inside another container, `127.0.0.1` is not your host. Use:

- **Docker Desktop (Windows/macOS):** set host to `host.docker.internal` and port `3307`.
- **Linux:** you may use `--network host` for the phpMyAdmin container, or add `extra_hosts` so `host.docker.internal` resolves (Docker 20.10+ often provides this).

Example environment for the official image:

```yaml
environment:
  PMA_HOST: host.docker.internal
  PMA_PORT: 3307
  PMA_USER: your_mysql_user
  PMA_PASSWORD: your_mysql_password
```

Adjust names to match your compose file.

## Step 4 — Verify

1. Tunnel running (Step 2).  
2. In phpMyAdmin, log in with VPS app user (not necessarily root).  
3. You should see the `MYSQL_DATABASE` schema and tables.

## Security checklist

- Prefer **SSH keys**; disable password SSH if possible.  
- Do **not** open MySQL (`3306`) on the VPS firewall to `0.0.0.0/0`.  
- Use strong `MYSQL_PASSWORD` and rotate if exposed.  
- Close the tunnel when finished (`Ctrl+C` in the `ssh` terminal or disconnect PuTTY).

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| Connection refused on `127.0.0.1:3307` | Tunnel not running, or wrong local port. |
| Access denied for user | Wrong user/password; user must exist in MySQL (created by Docker from `MYSQL_USER` / `MYSQL_PASSWORD`). |
| Lost connection | SSH session dropped; restart tunnel. |
| Wrong port on VPS | Match tunnel destination to `docker compose` port mapping: `docker port easb-mysql 3306`. |

### MySQL user may only be allowed from certain hosts

The official MySQL image creates `MYSQL_USER` with host `%` by default, which works over the tunnel. If you changed grants, ensure the user can connect from the VPS host’s perspective (the tunnel appears as a local connection from MySQL’s view).

## Related project files

- `docker-compose.mysql.easb.yml` — MySQL service and port mapping  
- `.env.production.example` — `MYSQL_*` and `DB_URL` variable names  

---

*Last updated for EASB backend (`be-easb-revamp`).*
