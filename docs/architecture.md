# Architecture

## Pattern

The backend follows **Clean Architecture** with four layers:

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Presentation | [`src/presentation/`](../src/presentation/) | NestJS modules, controllers, DTOs, HTTP concerns |
| Application | [`src/application/`](../src/application/) | Service implementations, use cases, application DTOs |
| Domain | [`src/domain/`](../src/domain/) | Entities, repository/service interfaces, enums |
| Infrastructure | [`src/infrastructure/`](../src/infrastructure/) | TypeORM entities (`orm/`), repository implementations |

Dependencies point **inward**: outer layers depend on abstractions defined in the domain.

## Cross-cutting

| Area | Location |
|------|----------|
| Global validation | [`main.ts`](../src/main.ts) — `ValidationPipe` (whitelist, transform) |
| Errors | [`HttpExceptionFilter`](../src/common/filters/http_exception.filter.ts) |
| Success / logging capture | [`ResponseCaptureInterceptor`](../src/common/interceptors/response_capture.interceptors.ts) |
| Serialization | [`main.ts`](../src/main.ts) — `ClassSerializerInterceptor` |
| Security headers | [`main.ts`](../src/main.ts) — `helmet` |
| Request ID | [`CorrelationIdMiddleware`](../src/common/middleware/correlation_id.middleware.ts), [`LoggerMiddleware`](../src/common/middleware/request_logger.middleware.ts) |
| Config | [`src/config/`](../src/config/) — `configuration.ts`, Joi `validationSchema` |
| Rate limiting | [`ThrottlerModule`](../src/app.module.ts), global `ThrottlerGuard` |

## Bootstrap

[`main.ts`](../src/main.ts) registers CORS from config, cookie parser, global prefix, and starts listening on `PORT`.

## Further reading

- Business modules: [modules-asb.md](./modules-asb.md), [modules-jalan.md](./modules-jalan.md), [modules-saluran.md](./modules-saluran.md)
- Full module list: [module-catalog.md](./module-catalog.md)
- Root [README.md](../README.md) — extended narrative and ASB workflow
