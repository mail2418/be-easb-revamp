import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/request_logger.middleware';
import { CorrelationIdMiddleware } from './common/middleware/correlation_id.middleware';
import { HttpExceptionFilter } from './common/filters/http_exception.filter';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

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

    Logger.log(`CORS configured with ${allowedOrigins.length} allowed origin(s): ${allowedOrigins.join(', ')}`);

    // Global serialization (untuk @Exclude, @Expose)
    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

    // Global exception filter -> konsistenkan bentuk error payload
    app.useGlobalFilters(new HttpExceptionFilter());


    // Middleware (order matters)
    app.use(CorrelationIdMiddleware());
    app.use(LoggerMiddleware());

    // Prefix API, e.g. /api/v1
    app.setGlobalPrefix(process.env.NODE_ENV === 'production' ? 'api/v1' : 'api/dev/v1');

    const port = config.get('port', 3000);
    await app.listen(port, '0.0.0.0');
    Logger.log(`App started on port ${port}`);
}
bootstrap();
