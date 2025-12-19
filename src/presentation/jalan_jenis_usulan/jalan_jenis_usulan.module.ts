import { Module } from "@nestjs/common";
import { JalanJenisUsulanController } from "./jalan_jenis_usulan.controller";
import { JalanJenisUsulanService } from "../../domain/jalan_jenis_usulan/jalan_jenis_usulan.service";
import { JalanJenisUsulanRepository } from "../../domain/jalan_jenis_usulan/jalan_jenis_usulan.repository";
import { JalanJenisUsulanRepositoryImpl } from "../../infrastructure/jalan_jenis_usulan/repositories/jalan_jenis_usulan.repository.impl";
import { JalanJenisUsulanServiceImpl } from "../../application/jalan_jenis_usulan/jalan_jenis_usulan.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanJenisUsulanOrmEntity } from "../../infrastructure/jalan_jenis_usulan/orm/jalan_jenis_usulan.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanJenisUsulanOrmEntity])],
    controllers: [JalanJenisUsulanController],
    providers: [
        {
            provide: JalanJenisUsulanService,
            useClass: JalanJenisUsulanServiceImpl,
        },
        {
            provide: JalanJenisUsulanRepository,
            useClass: JalanJenisUsulanRepositoryImpl,
        },
    ],
    exports: [JalanJenisUsulanService],
})
export class JalanJenisUsulanModule { }
