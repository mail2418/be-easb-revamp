# Documentation index

Guides for operating and developing the E-ASB backend. Start with the root [README.md](../README.md) for business context and long-form ASB workflow; use this page for **structured developer docs**.

## Getting started

| Document | Description |
|----------|-------------|
| [quick-start.md](./quick-start.md) | Clone, env, migrations, run, first API calls |
| [contributing.md](./contributing.md) | Branches, lint/format, how to add a feature module |

## Cross-cutting

| Document | Description |
|----------|-------------|
| [architecture.md](./architecture.md) | Clean Architecture layers and global middleware |
| [authentication.md](./authentication.md) | JWT, refresh cookie, guards, roles |
| [api.md](./api.md) | Base path, response shape, validation, Postman |
| [database.md](./database.md) | TypeORM, PostgreSQL/MySQL, migrations |
| [documentation-style.md](./documentation-style.md) | Template for domain module pages |

## Business modules (three)

| Module | Document |
|--------|----------|
| **ASB** (building / gedung) | [modules-asb.md](./modules-asb.md) |
| **Jalan** (road proposals) | [modules-jalan.md](./modules-jalan.md) |
| **Saluran** (drainage proposals) | [modules-saluran.md](./modules-saluran.md) |

Jalan and Saluran share SMKK/HSPK infrastructure; each page lists **Shared logic** with cross-links.

## Module catalog

| Document | Description |
|----------|-------------|
| [module-catalog.md](./module-catalog.md) | Every Nest presentation module, HTTP prefixes, `AppModule` registration, business tags |

## Operations (database access)

| Document | Description |
|----------|-------------|
| [mysql-phpmyadmin-vps.md](./mysql-phpmyadmin-vps.md) | phpMyAdmin and SSH tunnel to MySQL on a VPS |
| [dbeaver-mysql-vps.md](./dbeaver-mysql-vps.md) | DBeaver over SSH to MySQL on a VPS |
| [expose-backend-existing-nginx-vps.md](./expose-backend-existing-nginx-vps.md) | Add `easb-backend` behind an existing nginx; Postman (`/api/v1`) |

Also see [database.md](./database.md) for app-side TypeORM configuration.
