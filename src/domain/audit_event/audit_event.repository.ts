import { AuditEvent } from './audit_event.entity';

export interface RecordAuditInput {
    idUser?: number | null;
    username?: string | null;
    action: string;
    resource?: string | null;
    resourceId?: string | null;
    method?: string | null;
    path?: string | null;
    statusCode?: number | null;
    ipAddress?: string | null;
    userAgent?: string | null;
}

export interface AuditEventFilter {
    idUser?: number;
    action?: string;
    resource?: string;
}

export abstract class AuditEventRepository {
    abstract record(input: RecordAuditInput): Promise<AuditEvent>;
    abstract findAll(
        page: number,
        amount: number,
        filter?: AuditEventFilter,
    ): Promise<[AuditEvent[], number]>;
}
