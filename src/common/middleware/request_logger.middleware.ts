import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

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
                responseBody: responseDTO ? responseDTO : "DTO not captured",
                duration,
            });
        });
        next();
    };
}
