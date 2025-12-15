import { Module } from "@nestjs/common";
import { JalanRuangLingkupPerkerasanLenturController } from "./jalan_ruang_lingkup_perkerasan_lentur.controller";
import { JalanRuangLingkupPerkerasanLenturService } from "../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.service";
import { JalanRuangLingkupPerkerasanLenturRepository } from "../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.repository";
import { JalanRuangLingkupPerkerasanLenturRepositoryImpl } from "../../infrastructure/jalan_ruang_lingkup_perkerasan_lentur/repositories/jalan_ruang_lingkup_perkerasan_lentur.repository.impl";
import { JalanRuangLingkupPerkerasanLenturServiceImpl } from "../../application/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanRuangLingkupPerkerasanLenturOrmEntity } from "../../infrastructure/jalan_ruang_lingkup_perkerasan_lentur/orm/jalan_ruang_lingkup_perkerasan_lentur.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanRuangLingkupPerkerasanLenturOrmEntity])],
    controllers: [JalanRuangLingkupPerkerasanLenturController],
    providers: [
        {
            provide: JalanRuangLingkupPerkerasanLenturService,
            useClass: JalanRuangLingkupPerkerasanLenturServiceImpl,
        },
        {
            provide: JalanRuangLingkupPerkerasanLenturRepository,
            useClass: JalanRuangLingkupPerkerasanLenturRepositoryImpl,
        },
    ],
    exports: [JalanRuangLingkupPerkerasanLenturService],
})
export class JalanRuangLingkupPerkerasanLenturModule {}

