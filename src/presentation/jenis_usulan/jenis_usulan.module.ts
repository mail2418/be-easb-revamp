import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JenisUsulanOrmEntity } from "../../infrastructure/jenis_usulan/orm/jenis_usulan.orm_entity";
import { JenisUsulanRepository } from "../../domain/jenis_usulan/jenis_usulan.repository";
import { JenisUsulanRepositoryImpl } from "../../infrastructure/jenis_usulan/repositories/jenis_usulan.repository.impl";
import { JenisUsulanService } from "../../domain/jenis_usulan/jenis_usulan.service";
import { JenisUsulanServiceImpl } from "../../application/jenis_usulan/jenis_usulan.service.impl";
import { JenisUsulanController } from "./jenis_usulan.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([JenisUsulanOrmEntity])
    ],
    controllers: [JenisUsulanController],
    providers: [
        {
            provide: JenisUsulanRepository,
            useClass: JenisUsulanRepositoryImpl
        },
        {
            provide: JenisUsulanService,
            useClass: JenisUsulanServiceImpl
        }
    ],
    exports: [JenisUsulanService, JenisUsulanRepository]
})
export class JenisUsulanModule { }
