import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShstController } from "./shst.controller";
import { ShstServiceImpl } from "../../application/shst/shst.service.impl";
import { ShstRepositoryImpl } from "../../infrastructure/shst/repositories/shst.repository.impl";
import { ShstOrmEntity } from "../../infrastructure/shst/orm/shst.orm_entity";
import { ShstService } from "../../domain/shst/shst.service";
import { ShstRepository } from "../../domain/shst/shst.repository";
import { ValidateShstForeignKeysUseCase } from "../../application/shst/use_cases/validate_shst_foreign_keys.use_case";
import { HandleShstFileUseCase } from "../../application/shst/use_cases/handle_shst_file.use_case";
import { AsbTipeBangunanModule } from "../asb_tipe_bangunan/asb_tipe_bangunan.module";
import { AsbKlasifikasiModule } from "../asb_klasifikasi/asb_klasifikasi.module";
import { KabKotaModule } from "../kabkota/kabkota.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ShstOrmEntity]),
    AsbTipeBangunanModule,
    AsbKlasifikasiModule,
    KabKotaModule
  ],
  controllers: [ShstController],
  providers: [
    {
      provide: ShstService,
      useClass: ShstServiceImpl,
    },
    {
      provide: ShstRepository,
      useClass: ShstRepositoryImpl,
    },
    // Use cases providers
    ValidateShstForeignKeysUseCase,
    HandleShstFileUseCase,
  ],
  exports: [
    ShstService,
    ShstRepository,
  ],
})
export class ShstModule {}
