import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseCaptureInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const res = ctx.switchToHttp().getResponse<Response>();
    const req = ctx.switchToHttp().getRequest<Request>();
    const start = Date.now();

    return next.handle().pipe(
      tap((data) => {
        // simpan body response ke res.locals agar bisa dibaca middleware
        (res.locals as any).responseDto = data;
        (res.locals as any).durationMs = Date.now() - start;
        (res.locals as any).correlationId = (req as any).correlationId;
      }),
    );
  }
}