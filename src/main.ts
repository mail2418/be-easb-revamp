import { startOtel } from './observability/otel';
startOtel();

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, ClassSerializerInterceptor, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/request_logger.middleware';
import { CorrelationIdMiddleware } from './common/middleware/correlation_id.middleware';
import { MetricsMiddleware } from './observability/metrics.middleware';
import { HttpExceptionFilter } from './common/filters/http_exception.filter';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { timingSafeEqual } from 'crypto';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { Request, Response, NextFunction } from 'express';

/**
 * Guards the Swagger UI/JSON behind HTTP Basic Auth. Government handover: API
 * docs must not be world-readable. Enabled only when SWAGGER_ENABLED=true and
 * SWAGGER_USER/SWAGGER_PASSWORD are set.
 */
function swaggerBasicAuth(user: string, pass: string) {
    const expected = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
    return (req: Request, res: Response, next: NextFunction) => {
        const provided = req.headers.authorization ?? '';
        const a = Buffer.from(provided);
        const b = Buffer.from(expected);
        const ok = a.length === b.length && timingSafeEqual(a, b);
        if (!ok) {
            res.setHeader('WWW-Authenticate', 'Basic realm="API Docs"');
            res.status(401).send('Authentication required');
            return;
        }
        next();
    };
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn'],
    });

    const config = app.get(ConfigService);
    const isProduction = config.get('NODE_ENV') === 'production';

    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (needed for some frameworks)
                    imgSrc: ["'self'", 'data:', 'https:'], // Allow data URIs and HTTPS images
                    fontSrc: ["'self'", 'data:'],
                    connectSrc: ["'self'"], // API calls
                    frameSrc: ["'none'"], // No iframes allowed
                    frameAncestors: ["'none'"], // Prevent embedding in iframes
                    objectSrc: ["'none'"], // No <object>, <embed>, <applet>
                    baseUri: ["'self'"],
                    formAction: ["'self'"],
                    upgradeInsecureRequests: isProduction ? [] : null, // Upgrade HTTP to HTTPS in production
                },
            },
            crossOriginEmbedderPolicy: false,
            crossOriginOpenerPolicy: { policy: 'same-origin' },
            crossOriginResourcePolicy: { policy: 'same-origin' },
            dnsPrefetchControl: true,
            frameguard: { action: 'deny' },
            hidePoweredBy: true,
            hsts: isProduction
                ? {
                      maxAge: 31536000, // 1 year
                      includeSubDomains: true,
                      preload: true,
                  }
                : false,
            ieNoOpen: true,
            noSniff: true,
            originAgentCluster: true,
            referrerPolicy: {
                policy: 'no-referrer',
            },
            xssFilter: true,
        }),
    );

    app.use(cookieParser());

    // Global validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const corsConfig = config.get('cors');
    const allowedOrigins = corsConfig.origins
        .split(',')
        .map((origin: string) => origin.trim())
        .filter((origin: string) => origin.length > 0);

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                Logger.warn(`CORS: Blocked request from origin: ${origin}`);
                callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
            }
        },
        credentials: corsConfig.credentials,
        methods: corsConfig.methods,
        allowedHeaders: corsConfig.allowedHeaders,
        exposedHeaders: corsConfig.exposedHeaders,
        maxAge: corsConfig.maxAge,
    });

    Logger.log(
        `CORS configured with ${allowedOrigins.length} allowed origin(s): ${allowedOrigins.join(', ')}`,
    );

    // Global serialization (untuk @Exclude, @Expose)
    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    // Global exception filter -> konsistenkan bentuk error payload
    app.useGlobalFilters(new HttpExceptionFilter());

    // Middleware (order matters)
    app.use(CorrelationIdMiddleware());
    app.use(MetricsMiddleware());
    app.use(LoggerMiddleware());

    const apiPrefix = process.env.NODE_ENV === 'production' ? 'api/v1' : 'api/dev/v1';
    app.setGlobalPrefix(apiPrefix, {
        exclude: [
            { path: '/', method: RequestMethod.GET },
            { path: 'health', method: RequestMethod.GET },
            { path: 'health/ready', method: RequestMethod.GET },
            { path: 'metrics', method: RequestMethod.GET },
        ],
    });

    // ── OpenAPI / Swagger (env-gated, Basic-Auth protected) ──────────────────
    if (process.env.SWAGGER_ENABLED === 'true') {
        const swaggerUser = process.env.SWAGGER_USER;
        const swaggerPass = process.env.SWAGGER_PASSWORD;
        if (swaggerUser && swaggerPass) {
            app.use('/api/docs', swaggerBasicAuth(swaggerUser, swaggerPass));
            app.use('/api/docs-json', swaggerBasicAuth(swaggerUser, swaggerPass));
        } else {
            Logger.warn(
                'SWAGGER_ENABLED=true but SWAGGER_USER/SWAGGER_PASSWORD unset — docs exposed WITHOUT auth.',
            );
        }

        const swaggerConfig = new DocumentBuilder()
            .setTitle('Samarta ASB Tulungagung API')
            .setDescription(
                'Analisis Standar Belanja (ASB) — backend API. Endpoints are served under the global prefix shown in the server dropdown.',
            )
            .setVersion('1.0')
            .addBearerAuth(
                { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
                'access-token',
            )
            .addServer(`/${apiPrefix}`)
            .build();

        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup('api/docs', app, document, {
            swaggerOptions: { persistAuthorization: true },
        });
        Logger.log('Swagger docs enabled at /api/docs');
    }

    const port = config.get('port', 3000);
    await app.listen(port, '0.0.0.0');
    Logger.log(`App started on port ${port}`);
}
bootstrap();
