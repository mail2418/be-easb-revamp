import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? (exception.getResponse() as any)?.message ?? exception.message
                : 'Internal Server Error';

        // Log validation errors for debugging
        if (status === 400 && exception instanceof HttpException) {
            console.log('=== VALIDATION ERROR ===');
            console.log('Path:', req.url);
            console.log('Method:', req.method);
            console.log('Content-Type:', req.headers['content-type']);
            console.log('Request Body:', JSON.stringify(req.body, null, 2));
            console.log('Validation Message:', message);
            console.log('=======================');
        }

        res.status(status).json({
            status: status >= 400 ? 'error' : 'success',
            responseCode: status,
            message: Array.isArray(message) ? message.join(', ') : message,
            data: null,
        });
    }
}
