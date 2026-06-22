import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanOrmEntity } from '../../infrastructure/usulan_jalan/orm/usulan_jalan.orm_entity';
import { UsulanJalanStatusOrmEntity } from '../../infrastructure/usulan_jalan/orm/usulan_jalan_status.orm_entity';
import { UsulanJalanRepositoryImpl } from '../../infrastructure/usulan_jalan/repositories/usulan_jalan.repository.impl';
import { OpdModule } from '../opd/opd.module';
import { VerifikatorModule } from '../verifikator/verifikator.module';
import { UsulanJalanController } from './usulan_jalan.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsulanJalanOrmEntity, UsulanJalanStatusOrmEntity]),
        VerifikatorModule,
        OpdModule,
    ],
    controllers: [UsulanJalanController],
    providers: [
        { provide: UsulanJalanService, useClass: UsulanJalanServiceImpl },
        { provide: UsulanJalanRepository, useClass: UsulanJalanRepositoryImpl },
    ],
    exports: [UsulanJalanService, UsulanJalanRepository],
})
export class UsulanJalanModule {}
