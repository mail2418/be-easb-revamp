import { AuditEvent } from './audit_event.entity';
import { AuditEventFilter, RecordAuditInput } from './audit_event.repository';

export abstract class AuditEventService {
    /** Persist an audit event. Implementations must never throw to callers. */
    abstract record(input: RecordAuditInput): Promise<void>;
    abstract list(
        page: number,
        amount: number,
        filter?: AuditEventFilter,
    ): Promise<{ data: AuditEvent[]; total: number }>;
}
