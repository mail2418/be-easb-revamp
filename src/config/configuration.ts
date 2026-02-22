export default () => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    db: {
        url: process.env.DB_URL,
        isRender: process.env.NODE_ENV === 'production' && process.env.DB_URL?.includes('render'),
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessTtl: process.env.JWT_ACCESS_TTL || '8h',
        refreshTtl: process.env.JWT_REFRESH_TTL || '24h',
    },
    throttler: {
        ttl: parseInt(process.env.RATE_TIME_LIMIT ?? '60000', 10),
        limit: parseInt(process.env.RATE_REQ_LIMIT ?? '100', 10),
        auth: {
            ttl: parseInt(process.env.RATE_LIMIT_AUTH_TTL ?? '60000', 10),
            limit: parseInt(process.env.RATE_AUTH_LIMIT ?? '5', 10),
        },
    },
    cors: {
        origins: process.env.CORS_ORIGINS ?? 'http://localhost:3000',        
        credentials: process.env.CORS_CREDENTIALS !== 'false',
        methods: process.env.CORS_METHODS?.split(',') ?? ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: process.env.CORS_ALLOWED_HEADERS?.split(',') ?? [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'X-Correlation-Id',
        ],
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS?.split(',') ?? ['X-Correlation-Id'],
        maxAge: parseInt(process.env.CORS_MAX_AGE ?? '86400', 10),
    },
});
