import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest();

        const isDevelopment = process.env.NODE_ENV === 'development';

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        
        let message: string;
        if (exception instanceof HttpException) {
            const response = exception.getResponse();
            if (typeof response === 'string') {
                message = response;
            } else {
                const resObj = response as any;
                message = Array.isArray(resObj.message) 
                    ? resObj.message.join(', ') 
                    : resObj.message ?? exception.message ?? 'An error occurred';
            }
        } else if (exception instanceof Error) {
            // Log full error for debugging, but don't expose to client
            console.error('Unhandled error:', exception);
            
            // Only expose error message in development
            message = isDevelopment ? exception.message : 'Internal Server Error';
        } else {
            message = 'Internal Server Error';
        }

        // Sanitize error message to remove sensitive information
        message = this.sanitizeErrorMessage(message, isDevelopment);

        const responseBody = {
            status: status >= 400 ? 'error' : 'success',
            responseCode: status,
            message,
            data: null,
        };
        (res.locals as any).responseDto = responseBody;
        res.status(status).json(responseBody);
    }

    /**
     * Sanitize error message to remove sensitive information
     * @param msg - Error message to sanitize
     * @param isDevelopment - Whether in development mode
     * @returns Sanitized error message
     */
    private sanitizeErrorMessage(msg: string, isDevelopment: boolean): string {
        if (!msg || typeof msg !== 'string') {
            return 'An error occurred';
        }

        // In production, remove file paths, stack traces, and internal details
        if (!isDevelopment) {
            return msg
                .replace(/\/[^\s]+/g, '[PATH]') // Remove file paths
                .replace(/at\s+.*/g, '') // Remove stack trace lines
                .replace(/Error:\s*/g, '') // Remove "Error:" prefix
                .replace(/TypeError|ReferenceError|SyntaxError/g, 'Error') // Genericize error types
                .replace(/:\d+:\d+/g, '') // Remove line:column numbers
                .replace(/\(.*?\)/g, '') // Remove function calls in parentheses
                .trim();
        }

        // In development, allow more details but still sanitize paths
        return msg.replace(/\/[^\s]+/g, '[PATH]');
    }
}
