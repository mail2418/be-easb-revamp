import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbLogOrmEntity } from '../../infrastructure/asb_log/orm/asb_log.orm_entity';
import { AsbLogRepository } from '../../domain/asb_log/asb_log.repository';
import { AsbLogRepositoryImpl } from '../../infrastructure/asb_log/repositories/asb_log.repository.impl';
import { AsbLogService } from '../../domain/asb_log/asb_log.service';
import { AsbLogServiceImpl } from '../../application/asb_log/asb_log.service.impl';

@Module({
    imports: [TypeOrmModule.forFeature([AsbLogOrmEntity])],
    providers: [
        {
            provide: AsbLogRepository,
            useClass: AsbLogRepositoryImpl,
        },
        {
            provide: AsbLogService,
            useClass: AsbLogServiceImpl,
        },
    ],
    exports: [AsbLogService],
})
export class AsbLogModule { }
