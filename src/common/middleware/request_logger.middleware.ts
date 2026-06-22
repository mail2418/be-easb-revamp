import { Request, Response, NextFunction } from 'express';
import { trace } from '@opentelemetry/api';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

/**
 * Sanitize response body to remove sensitive data before logging
 * @param body - Response body to sanitize
 * @param visited - Set of visited objects to prevent circular references
 * @param depth - Current recursion depth to prevent stack overflow
 * @param maxDepth - Maximum recursion depth (default: 10)
 * @returns Sanitized response body
 */
function sanitizeResponseBody(
    body: any,
    visited: WeakSet<object> = new WeakSet(),
    depth: number = 0,
    maxDepth: number = 10,
): any {
    // Base cases: null, undefined, primitives
    if (body === null || body === undefined) {
        return body;
    }

    // Skip Buffer and binary data (don't try to sanitize binary content)
    if (Buffer.isBuffer(body)) {
        return '[Buffer]';
    }

    // Skip non-object types
    if (typeof body !== 'object') {
        return body;
    }

    // Prevent infinite recursion: check depth limit
    if (depth >= maxDepth) {
        return '[Max Depth Reached]';
    }

    // Prevent circular references
    if (visited.has(body)) {
        return '[Circular Reference]';
    }

    // Mark current object as visited
    visited.add(body);

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

    try {
        // Handle arrays
        if (Array.isArray(body)) {
            return body.map((item) =>
                sanitizeResponseBody(item, visited, depth + 1, maxDepth),
            );
        }

        // Handle Date objects
        if (body instanceof Date) {
            return body.toISOString();
        }

        // Handle Error objects
        if (body instanceof Error) {
            return {
                name: body.name,
                message: body.message,
                stack: body.stack,
            };
        }

        // Create a copy to avoid mutating original
        const sanitized: any = {};

        // Recursively sanitize objects
        for (const [key, value] of Object.entries(body)) {
            const lowerKey = key.toLowerCase();

            // Check if key matches any sensitive pattern
            const isSensitive = sensitiveKeys.some((sensitiveKey) =>
                lowerKey.includes(sensitiveKey.toLowerCase()),
            );

            if (isSensitive) {
                sanitized[key] = '[REDACTED]';
            } else if (value === null || value === undefined) {
                sanitized[key] = value;
            } else if (Buffer.isBuffer(value)) {
                sanitized[key] = '[Buffer]';
            } else if (value instanceof Date) {
                sanitized[key] = value.toISOString();
            } else if (typeof value === 'object') {
                // Recursively sanitize nested objects
                sanitized[key] = sanitizeResponseBody(value, visited, depth + 1, maxDepth);
            } else {
                sanitized[key] = value;
            }
        }

        return sanitized;
    } catch (error) {
        // If any error occurs during sanitization, return a safe placeholder
        return '[Sanitization Error]';
    }
}

export function LoggerMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();
        const spanContext = trace.getActiveSpan()?.spanContext();
        const traceId = spanContext?.traceId;
        const spanId = spanContext?.spanId;
        
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
                trace_id: traceId,
                span_id: spanId,
                appStatusCode: res.statusCode,
                appStatusMessage: res.statusMessage,
                responseBody: responseDTO ? sanitizeResponseBody(responseDTO) : "DTO not captured",
                duration,
            });
        });
        next();
    };
}
