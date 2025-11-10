import { Request, Response, NextFunction } from 'express';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

export function LoggerMiddleware() {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();
        const responseDTO = (res.locals as any).responseDto;

        res.on('finish', () => {
            const duration = Date.now() - start;
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
