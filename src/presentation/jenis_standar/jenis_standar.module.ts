import { Module } from "@nestjs/common";
import { JenisStandarController } from "./jenis_standar.controller";
import { JenisStandarService } from "../../domain/jenis_standar/jenis_standar.service";
import { JenisStandarRepository } from "../../domain/jenis_standar/jenis_standar.repository";
import { JenisStandarRepositoryImpl } from "../../infrastructure/jenis_standar/repositories/jenis_standar.repository.impl";
import { JenisStandarServiceImpl } from "../../application/jenis_standar/jenis_standar.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JenisStandarOrmEntity } from "../../infrastructure/jenis_standar/orm/jenis_standar.orm_entity";

@Module({
  imports: [TypeOrmModule.forFeature([JenisStandarOrmEntity])],
  controllers: [JenisStandarController],
  providers: [
    {
      provide: JenisStandarService,
      useClass: JenisStandarServiceImpl,
    },
    {
      provide: JenisStandarRepository,
      useClass: JenisStandarRepositoryImpl,
    },
  ],
  exports: [JenisStandarService],
})
export class JenisStandarModule {}
