import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditEventOrmEntity } from '../../infrastructure/audit_event/orm/audit_event.orm_entity';
import { AuditEventRepository } from '../../domain/audit_event/audit_event.repository';
import { AuditEventRepositoryImpl } from '../../infrastructure/audit_event/repositories/audit_event.repository.impl';
import { AuditEventService } from '../../domain/audit_event/audit_event.service';
import { AuditEventServiceImpl } from '../../application/audit_event/audit_event.service.impl';
import { AuditEventController } from './audit_event.controller';
import { ConsentController } from './consent.controller';

/**
 * Global so the AuditEventService can be injected into the app-wide
 * AuditInterceptor (registered in AppModule) and into AuthService.
 */
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([AuditEventOrmEntity])],
    controllers: [AuditEventController, ConsentController],
    providers: [
        {
            provide: AuditEventRepository,
            useClass: AuditEventRepositoryImpl,
        },
        {
            provide: AuditEventService,
            useClass: AuditEventServiceImpl,
        },
    ],
    exports: [AuditEventService],
})
export class AuditEventModule {}
