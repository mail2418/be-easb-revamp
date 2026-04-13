# Contributing

## Workflow

1. Create a branch from your team’s default branch.
2. Keep changes focused; follow existing patterns in [`src/`](../src/).
3. Run format and lint before opening a PR:

```bash
npm run format
npm run lint
```

4. Add or update documentation in [`docs/`](./README.md) when you change public HTTP behavior, migrations, or cross-cutting security.

## Code layout

This repo uses **Clean Architecture**. When adding a feature:

1. Domain entity and repository interface — [`src/domain/`](../src/domain/)
2. ORM entity and repository implementation — [`src/infrastructure/`](../src/infrastructure/)
3. Service implementation and use cases — [`src/application/`](../src/application/)
4. Controller, module, DTOs — [`src/presentation/`](../src/presentation/)
5. Register the module in [`app.module.ts`](../src/app.module.ts)

A longer step-by-step exists in the root [README.md](../README.md) under **Development Guidelines** → **Creating New Module**.

## Documentation conventions

Domain module pages follow [documentation-style.md](./documentation-style.md). Update [module-catalog.md](./module-catalog.md) when adding or renaming Nest modules.

## Tests

```bash
npm run test
npm run test:e2e
```

## Commit messages

Use clear, complete sentences describing what changed and why.
