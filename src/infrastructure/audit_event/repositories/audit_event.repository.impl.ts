import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AuditEvent } from '../../../domain/audit_event/audit_event.entity';
import {
    AuditEventFilter,
    AuditEventRepository,
    RecordAuditInput,
} from '../../../domain/audit_event/audit_event.repository';
import { AuditEventOrmEntity } from '../orm/audit_event.orm_entity';

@Injectable()
export class AuditEventRepositoryImpl extends AuditEventRepository {
    constructor(
        @InjectRepository(AuditEventOrmEntity)
        private readonly repository: Repository<AuditEventOrmEntity>,
    ) {
        super();
    }

    async record(input: RecordAuditInput): Promise<AuditEvent> {
        const ormEntity = this.repository.create({
            idUser: input.idUser ?? null,
            username: input.username ?? null,
            action: input.action,
            resource: input.resource ?? null,
            resourceId: input.resourceId ?? null,
            method: input.method ?? null,
            path: input.path ?? null,
            statusCode: input.statusCode ?? null,
            ipAddress: input.ipAddress ?? null,
            userAgent: input.userAgent ?? null,
        });
        const saved = await this.repository.save(ormEntity);
        return plainToInstance(AuditEvent, saved);
    }

    async findAll(
        page: number,
        amount: number,
        filter?: AuditEventFilter,
    ): Promise<[AuditEvent[], number]> {
        const where: Record<string, unknown> = {};
        if (filter?.idUser != null) where.idUser = filter.idUser;
        if (filter?.action) where.action = filter.action;
        if (filter?.resource) where.resource = filter.resource;

        const [entities, total] = await this.repository.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: (page - 1) * amount,
            take: amount,
        });

        return [entities.map((e) => plainToInstance(AuditEvent, e)), total];
    }
}
