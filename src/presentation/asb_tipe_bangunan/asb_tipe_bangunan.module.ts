import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AsbTipeBangunanController } from "./asb_tipe_bangunan.controller";
import { AsbTipeBangunanServiceImpl } from "../../application/asb_tipe_bangunan/asb_tipe_bangunan.service.impl";
import { AsbTipeBangunanRepositoryImpl } from "../../infrastructure/asb_tipe_bangunan/repositories/asb_tipe_bangunan.repository.impl";
import { AsbTipeBangunanOrmEntity } from "../../infrastructure/asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity";
import { AsbTipeBangunanService } from "../../domain/asb_tipe_bangunan/asb_tipe_bangunan.service";
import { AsbTipeBangunanRepository } from "../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([AsbTipeBangunanOrmEntity]),
  ],
  controllers: [AsbTipeBangunanController],
  providers: [
    {
      provide: AsbTipeBangunanService,
      useClass: AsbTipeBangunanServiceImpl,
    },
    {
      provide: AsbTipeBangunanRepository,
      useClass: AsbTipeBangunanRepositoryImpl,
    },
  ],
  exports: [
    AsbTipeBangunanService,
    AsbTipeBangunanRepository,
  ],
})
export class AsbTipeBangunanModule {}
