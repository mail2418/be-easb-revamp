# HTTP API conventions

## Base path

Set in [`main.ts`](../src/main.ts):

- Development / non-production: **`/api/dev/v1`**
- Production: **`/api/v1`**

Controllers use relative paths (e.g. `@Controller('asb')` → `/api/dev/v1/asb` in development).

## Success response shape

Controllers typically return a [`ResponseDto`](../src/common/dto/response.dto.ts)-compatible object:

```json
{
  "status": "success",
  "responseCode": 200,
  "message": "…",
  "data": {}
}
```

[`ResponseCaptureInterceptor`](../src/common/interceptors/response_capture.interceptors.ts) records the payload for logging/middleware; it may align HTTP status with `responseCode` when `status` is `error`.

## Error response shape

[`HttpExceptionFilter`](../src/common/filters/http_exception.filter.ts) returns:

```json
{
  "status": "error",
  "responseCode": 400,
  "message": "…",
  "data": null
}
```

## Validation

Global `ValidationPipe` in [`main.ts`](../src/main.ts): `whitelist`, `forbidNonWhitelisted`, `transform`. DTOs use `class-validator` decorators.

## CORS

Configured from `cors` section in [`configuration.ts`](../src/config/configuration.ts) (`CORS_ORIGINS`, credentials, methods, headers). Allowed origins are comma-separated.

## Postman

Collections live under [`postman/`](../postman/). File names map to feature areas (ASB, Jalan, Saluran SMKK, etc.).

## Correlation ID

`X-Correlation-Id` is supported for tracing (see CORS `allowedHeaders` / `exposedHeaders` in config).
