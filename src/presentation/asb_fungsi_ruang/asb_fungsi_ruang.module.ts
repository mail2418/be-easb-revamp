import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbFungsiRuangController } from './asb_fungsi_ruang.controller';
import { AsbFungsiRuangServiceImpl } from '../../application/asb_fungsi_ruang/asb_fungsi_ruang.service.impl';
import { AsbFungsiRuangRepositoryImpl } from '../../infrastructure/asb_fungsi_ruang/repositories/asb_fungsi_ruang.repository.impl';
import { AsbFungsiRuangOrmEntity } from '../../infrastructure/asb_fungsi_ruang/orm/asb_fungsi_ruang.orm_entity';
import { AsbFungsiRuangService } from '../../domain/asb_fungsi_ruang/asb_fungsi_ruang.service';
import { AsbFungsiRuangRepository } from '../../domain/asb_fungsi_ruang/asb_fungsi_ruang.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([AsbFungsiRuangOrmEntity]),
  ],
  controllers: [AsbFungsiRuangController],
  providers: [
    {
      provide: AsbFungsiRuangService,
      useClass: AsbFungsiRuangServiceImpl,
    },
    {
      provide: AsbFungsiRuangRepository,
      useClass: AsbFungsiRuangRepositoryImpl,
    },
  ],
  exports: [
    AsbFungsiRuangService,
    AsbFungsiRuangRepository,
  ],
})
export class AsbFungsiRuangModule {}
