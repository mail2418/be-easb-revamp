import { Module } from "@nestjs/common";
import { JalanRuangLingkupPerkerasanKakuController } from "./jalan_ruang_lingkup_perkerasan_kaku.controller";
import { JalanRuangLingkupPerkerasanKakuService } from "../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.service";
import { JalanRuangLingkupPerkerasanKakuRepository } from "../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.repository";
import { JalanRuangLingkupPerkerasanKakuRepositoryImpl } from "../../infrastructure/jalan_ruang_lingkup_perkerasan_kaku/repositories/jalan_ruang_lingkup_perkerasan_kaku.repository.impl";
import { JalanRuangLingkupPerkerasanKakuServiceImpl } from "../../application/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanRuangLingkupPerkerasanKakuOrmEntity } from "../../infrastructure/jalan_ruang_lingkup_perkerasan_kaku/orm/jalan_ruang_lingkup_perkerasan_kaku";

@Module({
    imports: [TypeOrmModule.forFeature([JalanRuangLingkupPerkerasanKakuOrmEntity])],
    controllers: [JalanRuangLingkupPerkerasanKakuController],
    providers: [
        {
            provide: JalanRuangLingkupPerkerasanKakuService,
            useClass: JalanRuangLingkupPerkerasanKakuServiceImpl,
        },
        {
            provide: JalanRuangLingkupPerkerasanKakuRepository,
            useClass: JalanRuangLingkupPerkerasanKakuRepositoryImpl,
        },
    ],
    exports: [JalanRuangLingkupPerkerasanKakuService],
})
export class JalanRuangLingkupPerkerasanKakuModule {}

