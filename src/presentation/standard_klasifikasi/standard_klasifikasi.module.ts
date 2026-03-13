import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandardKlasifikasiController } from './standard_klasifikasi.controller';
import { StandardKlasifikasiServiceImpl } from '../../application/standard_klasifikasi/standard_klasifikasi.service.impl';
import { StandardKlasifikasiRepositoryImpl } from '../../infrastructure/standard_klasifikasi/repositories/standard_klasifikasi.repository.impl';
import { StandardKlasifikasiOrmEntity } from '../../infrastructure/standard_klasifikasi/orm/standard_klasifikasi.orm_entity';
import { StandardKlasifikasiService } from '../../domain/standard_klasifikasi/standard_klasifikasi.service';
import { StandardKlasifikasiRepository } from '../../domain/standard_klasifikasi/standard_klasifikasi.repository';
import { AsbKlasifikasiModule } from '../asb_klasifikasi/asb_klasifikasi.module';
import { KabKotaModule } from '../kabkota/kabkota.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([StandardKlasifikasiOrmEntity]),
        AsbKlasifikasiModule,
        KabKotaModule,
    ],
    controllers: [StandardKlasifikasiController],
    providers: [
        {
            provide: StandardKlasifikasiService,
            useClass: StandardKlasifikasiServiceImpl,
        },
        {
            provide: StandardKlasifikasiRepository,
            useClass: StandardKlasifikasiRepositoryImpl,
        },
    ],
    exports: [
        StandardKlasifikasiService,
        StandardKlasifikasiRepository,
    ],
})
export class StandardKlasifikasiModule { }
