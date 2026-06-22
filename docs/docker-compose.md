# Docker Compose (unified stack)

All infrastructure services live in one base file with **environment overlays** and **profiles**.

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Base services (backend, mysql, postgres, nginx, prometheus, grafana, loki, promtail, tempo, cadvisor) |
| `docker-compose.dev.yml` | Local development — published DB ports, optional backend build |
| `docker-compose.prod.yml` | VPS/production — image from registry, no public DB ports, nginx + observability |
| `docker-compose.test.yml` | CI/test — isolated network, ports `5433` / `3307`, separate volumes |

Legacy split files (`docker-compose.*.easb.yml`) are thin shims — prefer the commands below.

## Profiles

| Profile | Services |
|---------|----------|
| `postgres` | `easb-postgres` |
| `mysql` | `easb-mysql` |
| `backend` | `easb-backend` |
| `nginx` | `easb-nginx` |
| `observability` | `easb-prometheus`, `easb-grafana`, `easb-loki`, `easb-promtail`, `easb-tempo`, `easb-cadvisor` |

Enable one database profile only (`postgres` **or** `mysql`).

## Development

**Postgres only** (run API on host with `npm run start:dev`):

```bash
cp .env.docker.dev.example .env   # adjust if needed
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile postgres up -d
npm run migration:postgres:run
npm run start:dev
```

**Postgres + backend in Docker:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml \
  --profile postgres --profile backend up -d --build
```

**MySQL instead:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile mysql up -d
```

## Production (VPS)

Create `.env.production` from `.env.production.example` (set `BACKEND_IMAGE`, secrets, `DB_URL` with Docker service hostnames).

```bash
# Create shared network once (only if migrating from old external-network setup)
docker network create easb-net 2>/dev/null || true

docker compose -f docker-compose.yml -f docker-compose.prod.yml \
  --env-file .env.production \
  --profile mysql --profile backend --profile nginx --profile observability up -d
```

Postgres-based production: swap `--profile mysql` for `--profile postgres`.

## Test / CI

```bash
cp .env.docker.test.example .env.docker.test
docker compose -f docker-compose.yml -f docker-compose.test.yml \
  --env-file .env.docker.test --profile postgres up -d --build
npm run migration:postgres:run
npm test

# Teardown including volumes
docker compose -f docker-compose.yml -f docker-compose.test.yml --profile postgres down -v
```

## npm scripts

```bash
npm run docker:dev:postgres      # dev DB only
npm run docker:dev:up            # dev DB + backend
npm run docker:prod:up           # full prod stack (needs .env.production)
npm run docker:test:up           # test Postgres
npm run docker:down              # stop dev stack
```

## Migration from old compose files

| Old command | New command |
|-------------|-------------|
| `docker compose -f docker-compose.postgres.easb.yml up -d` | `docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile postgres up -d` |
| `docker compose -f docker-compose.mysql.easb.yml up -d` | `docker compose -f docker-compose.yml -f docker-compose.dev.yml --profile mysql up -d` |
| `docker compose -f docker-compose.backend.easb.yml up -d` | `docker compose -f docker-compose.yml -f docker-compose.prod.yml --profile backend up -d` |
| `docker compose -f docker-compose.nginx.easb.yml up -d` | add `--profile nginx` to prod command |
| `docker compose -f docker-compose.observability.easb.yml up -d` | add `--profile observability` to prod command |

The base compose defines `easb-net` as a managed bridge network. Existing VPS setups that already use an external `easb-net` can keep it — Compose reuses a network with the same name when `external: true` is not set and the name matches.
