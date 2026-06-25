import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import type { Request, Response } from 'express';
import { AuditEventService } from '../../domain/audit_event/audit_event.service';

/** Methods that mutate state and are worth auditing. */
const AUDITED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * Path fragments we never audit (handled elsewhere or pure noise).
 * Auth events are recorded explicitly in AuthController so we can capture
 * failures and the attempted username even when no JWT is present.
 */
const SKIP_FRAGMENTS = ['/auth/', '/health', '/metrics', '/consent'];

function clientIp(req: Request): string | null {
    const fwd = req.headers['x-forwarded-for'];
    if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
    return req.ip ?? req.socket?.remoteAddress ?? null;
}

/**
 * Build a coarse action slug and resource from the request path, stripping the
 * API version prefix and numeric ids. e.g.
 *   POST /api/v1/usulan-jalan/verify-bpkad → resource "usulan-jalan",
 *   action "usulan-jalan_verify-bpkad", resourceId from a numeric segment.
 */
function describe(path: string): {
    resource: string | null;
    action: string;
    resourceId: string | null;
} {
    const segments = path
        .split('?')[0]
        .split('/')
        .filter((s) => s.length > 0)
        // drop the api/v1 (or api/dev/v1) prefix
        .filter((s) => !['api', 'v1', 'dev'].includes(s));

    let resourceId: string | null = null;
    const meaningful = segments.filter((s) => {
        if (/^\d+$/.test(s)) {
            resourceId = s;
            return false;
        }
        return true;
    });

    const resource = meaningful[0] ?? null;
    const action = meaningful.join('_') || 'request';
    return { resource, action, resourceId };
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(private readonly auditService: AuditEventService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        if (context.getType() !== 'http') return next.handle();

        const req = context.switchToHttp().getRequest<Request>();
        const method = req.method?.toUpperCase();

        const path = req.originalUrl || req.url || '';
        if (!AUDITED_METHODS.has(method) || SKIP_FRAGMENTS.some((f) => path.includes(f))) {
            return next.handle();
        }

        const user = req.user as { sub?: string | number; username?: string } | undefined;
        const idUser = user?.sub != null ? Number(user.sub) : null;
        const username = user?.username ?? null;
        const { resource, action, resourceId } = describe(path);
        const bodyId =
            resourceId ??
            ((req.body && (req.body.id ?? req.body.idUser)) != null
                ? String(req.body.id ?? req.body.idUser)
                : null);
        const ipAddress = clientIp(req);
        const userAgent = (req.headers['user-agent'] as string) ?? null;

        const finalize = (statusCode: number | null) => {
            void this.auditService.record({
                idUser: Number.isNaN(idUser as number) ? null : idUser,
                username,
                action,
                resource,
                resourceId: bodyId,
                method,
                path: path.split('?')[0].slice(0, 512),
                statusCode,
                ipAddress,
                userAgent: userAgent ? userAgent.slice(0, 512) : null,
            });
        };

        return next.handle().pipe(
            tap({
                next: () => {
                    const res = context.switchToHttp().getResponse<Response>();
                    finalize(res?.statusCode ?? null);
                },
                error: (err) => {
                    const status =
                        typeof err?.status === 'number' ? err.status : err?.statusCode ?? 500;
                    finalize(status);
                },
            }),
        );
    }
}
