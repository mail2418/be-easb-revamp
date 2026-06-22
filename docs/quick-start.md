# Quick start

Minimal path from clone to an authenticated API call.

## Prerequisites

- Node.js (LTS)
- PostgreSQL or MySQL with a database created and `DB_URL` pointing to it
- Dependencies: `npm install`

## Configure

Copy `.env.example` to `.env` and set at least:

| Variable | Purpose |
|----------|---------|
| `DB_TYPE` | `postgres` or `mysql` |
| `DB_URL` | Connection string used by the app ([`app.module.ts`](../src/app.module.ts)) |
| `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` | Signing keys for tokens |

Optional: `DB_URL_POSTGRES` / `DB_URL_MYSQL` for TypeORM CLI scripts ([`package.json`](../package.json)).

## Database migrations

Run migrations for your dialect (see [database.md](./database.md)):

```bash
npm run migration:mysql:run
# or
npm run migration:postgres:run
```

## Run the API

```bash
npm run start:dev
```

Default port: `3000` (see `PORT` in `.env`).

## Base URL

Global prefix is set in [`main.ts`](../src/main.ts):

| Environment | Prefix |
|-------------|--------|
| Non-production | `/api/dev/v1` |
| Production | `/api/v1` |

Example base: `http://localhost:3000/api/dev/v1`

## First requests

**Login** (public; refresh token is set as `httpOnly` cookie):

```http
POST /api/dev/v1/auth/login
Content-Type: application/json

{"username":"…","password":"…"}
```

**Authenticated call** (use `accessToken` from response body):

```http
GET /api/dev/v1/asb
Authorization: Bearer <accessToken>
```

For JWT behavior and roles, see [authentication.md](./authentication.md). For response shape, see [api.md](./api.md).
