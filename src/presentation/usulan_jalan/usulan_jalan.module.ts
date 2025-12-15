import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanJalanOrmEntity } from '../../infrastructure/usulan_jalan/orm/usulan_jalan.orm_entity';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanRepositoryImpl } from '../../infrastructure/usulan_jalan/repositories/usulan_jalan.repository.impl';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { UsulanJalanController } from './usulan_jalan.controller';
import { VerifikatorModule } from '../verifikator/verifikator.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsulanJalanOrmEntity]),
        VerifikatorModule,
    ],
    providers: [
        {
            provide: UsulanJalanRepository,
            useClass: UsulanJalanRepositoryImpl,
        },
        {
            provide: UsulanJalanService,
            useClass: UsulanJalanServiceImpl,
        },
    ],
    controllers: [UsulanJalanController],
    exports: [UsulanJalanService],
})
export class UsulanJalanModule { }


