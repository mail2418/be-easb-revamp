# Database

## TypeORM

- ORM: **TypeORM** with `synchronize: false` and `migrationsRun: false` ([`app.module.ts`](../src/app.module.ts)).
- Entities are loaded from [`src/infrastructure/**/orm/*.orm_entity.ts`](../src/infrastructure/).
- **Naming**: [`SnakeNamingStrategy`](https://github.com/typeorm/typeorm-naming-strategies) for database column/table naming.

## Supported engines

| `DB_TYPE` | Migrations folder | Notes |
|-----------|-------------------|--------|
| `postgres` (default) | [`src/migrations/postgres/`](../src/migrations/postgres/) | SSL optional for Render (`db.isRender` in config) |
| `mysql` | [`src/migrations/mysql/`](../src/migrations/mysql/) | `timezone: +07:00`, `utf8mb4` |

Connection URL: **`DB_URL`** (required at runtime).

## CLI data sources

Scripts in [`package.json`](../package.json) use dialect-specific TypeORM configs:

- `npm run typeorm:postgres` / `migration:postgres:*`
- `npm run typeorm:mysql` / `migration:mysql:*`

See [`src/data_source.postgres.ts`](../src/data_source.postgres.ts) and [`src/data_source.mysql.ts`](../src/data_source.mysql.ts).

## Operations guides

- [mysql-phpmyadmin-vps.md](./mysql-phpmyadmin-vps.md) — SSH tunnel and phpMyAdmin patterns.
- [dbeaver-mysql-vps.md](./dbeaver-mysql-vps.md) — DBeaver over SSH (file maintained separately).
