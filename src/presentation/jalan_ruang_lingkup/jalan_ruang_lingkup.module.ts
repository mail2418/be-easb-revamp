import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanRuangLingkupController } from "./jalan_ruang_lingkup.controller";
import { JalanRuangLingkupService } from "../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.service";
import { JalanRuangLingkupServiceImpl } from "../../application/jalan_ruang_lingkup/jalan_ruang_lingkup.service.impl";
import { JalanRuangLingkupRepository } from "../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.repository";
import { JalanRuangLingkupRepositoryImpl } from "../../infrastructure/jalan_ruang_lingkup/repositories/jalan_ruang_lingkup.repository.impl";
import { JalanRuangLingkupOrmEntity } from "../../infrastructure/jalan_ruang_lingkup/orm/jalan_ruang_lingkup.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanRuangLingkupOrmEntity])],
    controllers: [JalanRuangLingkupController],
    providers: [
        {
            provide: JalanRuangLingkupService,
            useClass: JalanRuangLingkupServiceImpl
        },
        {
            provide: JalanRuangLingkupRepository,
            useClass: JalanRuangLingkupRepositoryImpl
        }
    ],
    exports: [JalanRuangLingkupService]
})
export class JalanRuangLingkupModule { }
