import { Module } from "@nestjs/common";
import { JalanTipePerkerasanLenturController } from "./jalan_tipe_perkerasan_lentur.controller";
import { JalanTipePerkerasanLenturService } from "../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.service";
import { JalanTipePerkerasanLenturRepository } from "../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.repository";
import { JalanTipePerkerasanLenturRepositoryImpl } from "../../infrastructure/jalan_tipe_perkerasan_lentur/repositories/jalan_tipe_perkerasan_lentur.repository.impl";
import { JalanTipePerkerasanLenturServiceImpl } from "../../application/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanTipePerkerasanLenturOrmEntity } from "../../infrastructure/jalan_tipe_perkerasan_lentur/orm/jalan_tipe_perkerasan_lentur.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanTipePerkerasanLenturOrmEntity])],
    controllers: [JalanTipePerkerasanLenturController],
    providers: [
        {
            provide: JalanTipePerkerasanLenturService,
            useClass: JalanTipePerkerasanLenturServiceImpl,
        },
        {
            provide: JalanTipePerkerasanLenturRepository,
            useClass: JalanTipePerkerasanLenturRepositoryImpl,
        },
    ],
    exports: [JalanTipePerkerasanLenturService],
})
export class JalanTipePerkerasanLenturModule { }
