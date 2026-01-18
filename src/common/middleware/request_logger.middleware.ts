import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

/**
 * Sanitize response body to remove sensitive data before logging
 * @param body - Response body to sanitize
 * @returns Sanitized response body
 */
function sanitizeResponseBody(body: any): any {
    if (!body || typeof body !== 'object') {
        return body;
    }

    // List of sensitive keys that should be redacted
    const sensitiveKeys = [
        'password',
        'passwordHash',
        'accessToken',
        'refreshToken',
        'token',
        'secret',
        'apiKey',
        'apiSecret',
        'creditCard',
        'ssn',
        'socialSecurityNumber',
        'pin',
        'cvv',
        'authorization',
    ];

    // Create a copy to avoid mutating original
    const sanitized = Array.isArray(body) ? [...body] : { ...body };

    // Recursively sanitize objects
    for (const [key, value] of Object.entries(sanitized)) {
        const lowerKey = key.toLowerCase();

        // Check if key matches any sensitive pattern
        const isSensitive = sensitiveKeys.some((sensitiveKey) =>
            lowerKey.includes(sensitiveKey.toLowerCase()),
        );

        if (isSensitive) {
            sanitized[key] = '[REDACTED]';
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Recursively sanitize nested objects
            sanitized[key] = sanitizeResponseBody(value);
        } else if (Array.isArray(value)) {
            // Sanitize array elements
            sanitized[key] = value.map((item) =>
                typeof item === 'object' ? sanitizeResponseBody(item) : item,
            );
        }
    }

    return sanitized;
}

export function LoggerMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();
        
        // Capture response body by intercepting res.json()
        const originalJson = res.json.bind(res);
        res.json = function(body: any) {
            // Simpan response body ke res.locals jika belum ada
            if (!(res.locals as any).responseDto) {
                (res.locals as any).responseDto = body;
            }

            // Jika response body memiliki status 'error' dan responseCode,
            // set HTTP status code sesuai dengan responseCode di body
            // Ini untuk memastikan HTTP status code sesuai dengan response body
            // ketika controller mengembalikan error response dengan return (bukan throw)
            if (body && typeof body === 'object' && 'status' in body && 'responseCode' in body) {
                if (body.status === 'error' && typeof body.responseCode === 'number') {
                    if (res.statusCode === 200) {
                        res.status(body.responseCode);
                    }
                }
            }
            
            return originalJson(body);
        };

        res.on('finish', () => {
            const duration = Date.now() - start;
            const responseDTO = (res.locals as any).responseDto;
            
            logger.info({
                ts: new Date().toISOString(),
                method: req.method,
                path: req.originalUrl,
                correlationId: req['correlationId'],
                appStatusCode: res.statusCode,
                appStatusMessage: res.statusMessage,
                responseBody: responseDTO ? sanitizeResponseBody(responseDTO) : "DTO not captured",
                duration,
            });
        });
        next();
    };
}
