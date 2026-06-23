import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanJalanStatusController } from './usulan_jalan_status.controller';
import { UsulanJalanStatusService } from '../../domain/usulan_jalan_status/usulan_jalan_status.service';
import { UsulanJalanStatusRepository } from '../../domain/usulan_jalan_status/usulan_jalan_status.repository';
import { UsulanJalanStatusRepositoryImpl } from '../../infrastructure/usulan_jalan_status/repositories/usulan_jalan_status.repository.impl';
import { UsulanJalanStatusServiceImpl } from '../../application/usulan_jalan_status/usulan_jalan_status.service.impl';
import { UsulanJalanStatusOrmEntity } from '../../infrastructure/usulan_jalan_status/orm/usulan_jalan_status.orm_entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsulanJalanStatusOrmEntity])],
    controllers: [UsulanJalanStatusController],
    providers: [
        {
            provide: UsulanJalanStatusService,
            useClass: UsulanJalanStatusServiceImpl,
        },
        {
            provide: UsulanJalanStatusRepository,
            useClass: UsulanJalanStatusRepositoryImpl,
        },
    ],
    exports: [UsulanJalanStatusService],
})
export class UsulanJalanStatusModule {}
