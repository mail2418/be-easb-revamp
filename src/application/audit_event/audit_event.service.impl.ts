import { Injectable, Logger } from '@nestjs/common';
import { AuditEvent } from '../../domain/audit_event/audit_event.entity';
import { AuditEventService } from '../../domain/audit_event/audit_event.service';
import {
    AuditEventFilter,
    AuditEventRepository,
    RecordAuditInput,
} from '../../domain/audit_event/audit_event.repository';

@Injectable()
export class AuditEventServiceImpl extends AuditEventService {
    private readonly logger = new Logger(AuditEventServiceImpl.name);

    constructor(private readonly repository: AuditEventRepository) {
        super();
    }

    async record(input: RecordAuditInput): Promise<void> {
        try {
            await this.repository.record(input);
        } catch (error) {
            // Audit persistence must never break the originating request.
            this.logger.error(
                `Failed to record audit event "${input.action}": ${
                    error instanceof Error ? error.message : String(error)
                }`,
            );
        }
    }

    async list(
        page: number,
        amount: number,
        filter?: AuditEventFilter,
    ): Promise<{ data: AuditEvent[]; total: number }> {
        const [data, total] = await this.repository.findAll(page, amount, filter);
        return { data, total };
    }
}
