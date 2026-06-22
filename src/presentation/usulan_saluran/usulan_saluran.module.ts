import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanSaluranServiceImpl } from '../../application/usulan_saluran/usulan_saluran.service.impl';
import { UsulanSaluranRepository } from '../../domain/usulan_saluran/usulan_saluran.repository';
import { UsulanSaluranService } from '../../domain/usulan_saluran/usulan_saluran.service';
import { TipeSaluranOrmEntity } from '../../infrastructure/usulan_saluran/orm/tipe_saluran.orm_entity';
import { UsulanSaluranOrmEntity } from '../../infrastructure/usulan_saluran/orm/usulan_saluran.orm_entity';
import { UsulanSaluranStatusOrmEntity } from '../../infrastructure/usulan_saluran/orm/usulan_saluran_status.orm_entity';
import { UsulanSaluranRepositoryImpl } from '../../infrastructure/usulan_saluran/repositories/usulan_saluran.repository.impl';
import { OpdModule } from '../opd/opd.module';
import { VerifikatorModule } from '../verifikator/verifikator.module';
import { UsulanSaluranController } from './usulan_saluran.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsulanSaluranOrmEntity,
            UsulanSaluranStatusOrmEntity,
            TipeSaluranOrmEntity,
        ]),
        VerifikatorModule,
        OpdModule,
    ],
    controllers: [UsulanSaluranController],
    providers: [
        { provide: UsulanSaluranService, useClass: UsulanSaluranServiceImpl },
        { provide: UsulanSaluranRepository, useClass: UsulanSaluranRepositoryImpl },
    ],
    exports: [UsulanSaluranService, UsulanSaluranRepository],
})
export class UsulanSaluranModule {}
