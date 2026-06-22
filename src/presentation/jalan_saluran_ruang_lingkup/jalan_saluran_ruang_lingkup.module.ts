import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSaluranRuangLingkupOrmEntity } from "../../infrastructure/jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity";
import { JalanSaluranRuangLingkupRepository } from "../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository";
import { JalanSaluranRuangLingkupRepositoryImpl } from "../../infrastructure/jalan_saluran_ruang_lingkup/repositories/jalan_saluran_ruang_lingkup.repository.impl";
import { JalanSaluranRuangLingkupService } from "../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service";
import { JalanSaluranRuangLingkupServiceImpl } from "../../application/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service.impl";
import { JalanSaluranRuangLingkupController } from "./jalan_saluran_ruang_lingkup.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([JalanSaluranRuangLingkupOrmEntity])
    ],
    controllers: [JalanSaluranRuangLingkupController],
    providers: [
        {
            provide: JalanSaluranRuangLingkupRepository,
            useClass: JalanSaluranRuangLingkupRepositoryImpl
        },
        {
            provide: JalanSaluranRuangLingkupService,
            useClass: JalanSaluranRuangLingkupServiceImpl
        }
    ],
    exports: [JalanSaluranRuangLingkupService, JalanSaluranRuangLingkupRepository]
})
export class JalanSaluranRuangLingkupModule { }
