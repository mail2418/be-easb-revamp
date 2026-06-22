import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseCaptureInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const res = ctx.switchToHttp().getResponse<Response>();
    const req = ctx.switchToHttp().getRequest<Request>();
    const start = Date.now();

    return next.handle().pipe(
      map((data) => {
        // simpan body response ke res.locals agar bisa dibaca middleware
        // Gunakan map untuk memastikan data ditangkap dengan benar
        (res.locals as any).responseDto = data;
        (res.locals as any).durationMs = Date.now() - start;
        (res.locals as any).correlationId = (req as any).correlationId;
        
        if (data && typeof data === 'object' && 'status' in data && 'responseCode' in data) {
          if (data.status === 'error' && typeof data.responseCode === 'number') {
            // Set HTTP status code sesuai dengan responseCode di body
            // Hanya set jika status code belum di-set sebelumnya (default 200)
            if (res.statusCode === 200) {
              res.status(data.responseCode);
            }
          }
        }
        
        // Return data agar response tetap dikirim
        return data;
      }),
    );
  }
}