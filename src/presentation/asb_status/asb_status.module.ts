import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AsbStatusController } from "./asb_status.controller";
import { AsbStatusServiceImpl } from "../../application/asb_status/asb_status.service.impl";
import { AsbStatusRepositoryImpl } from "../../infrastructure/asb_status/repositories/asb_status.repository.impl";
import { AsbStatusOrmEntity } from "../../infrastructure/asb_status/orm/asb_status.orm_entity";
import { AsbStatusService } from "../../domain/asb_status/asb_status.service";
import { AsbStatusRepository } from "../../domain/asb_status/asb_status.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([AsbStatusOrmEntity]),
  ],
  controllers: [AsbStatusController],
  providers: [
    {
      provide: AsbStatusService,
      useClass: AsbStatusServiceImpl,
    },
    {
      provide: AsbStatusRepository,
      useClass: AsbStatusRepositoryImpl,
    },
  ],
  exports: [
    AsbStatusService,
    AsbStatusRepository,
  ],
})
export class AsbStatusModule {}
