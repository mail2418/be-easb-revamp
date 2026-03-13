import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKlasifikasiController } from './asb_klasifikasi.controller';
import { AsbKlasifikasiServiceImpl } from '../../application/asb_klasifikasi/asb_klasifikasi.service.impl';
import { AsbKlasifikasiRepositoryImpl } from '../../infrastructure/asb_klasifikasi/repositories/asb_klasifikasi.repository.impl';
import { AsbKlasifikasiOrmEntity } from '../../infrastructure/asb_klasifikasi/orm/asb_klasifikasi.orm_entity';
import { AsbKlasifikasiService } from '../../domain/asb_klasifikasi/asb_klasifikasi.service';
import { AsbKlasifikasiRepository } from '../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { AsbTipeBangunanModule } from '../asb_tipe_bangunan/asb_tipe_bangunan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AsbKlasifikasiOrmEntity]),
    AsbTipeBangunanModule
  ],
  controllers: [AsbKlasifikasiController],
  providers: [
    {
      provide: AsbKlasifikasiService,
      useClass: AsbKlasifikasiServiceImpl,
    },
    {
      provide: AsbKlasifikasiRepository,
      useClass: AsbKlasifikasiRepositoryImpl,
    },
  ],
  exports: [
    AsbKlasifikasiService,
    AsbKlasifikasiRepository,
  ],
})
export class AsbKlasifikasiModule {}
