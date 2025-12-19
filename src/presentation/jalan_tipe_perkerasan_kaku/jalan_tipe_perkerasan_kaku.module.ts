import { Module } from "@nestjs/common";
import { JalanTipePerkerasanKakuController } from "./jalan_tipe_perkerasan_kaku.controller";
import { JalanTipePerkerasanKakuService } from "../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.service";
import { JalanTipePerkerasanKakuRepository } from "../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.repository";
import { JalanTipePerkerasanKakuRepositoryImpl } from "../../infrastructure/jalan_tipe_perkerasan_kaku/repositories/jalan_tipe_perkerasan_kaku.repository.impl";
import { JalanTipePerkerasanKakuServiceImpl } from "../../application/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanTipePerkerasanKakuOrmEntity } from "../../infrastructure/jalan_tipe_perkerasan_kaku/orm/jalan_tipe_perkerasan_kaku.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanTipePerkerasanKakuOrmEntity])],
    controllers: [JalanTipePerkerasanKakuController],
    providers: [
        {
            provide: JalanTipePerkerasanKakuService,
            useClass: JalanTipePerkerasanKakuServiceImpl,
        },
        {
            provide: JalanTipePerkerasanKakuRepository,
            useClass: JalanTipePerkerasanKakuRepositoryImpl,
        },
    ],
    exports: [JalanTipePerkerasanKakuService],
})
export class JalanTipePerkerasanKakuModule { }
