import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainReviewOrmEntity } from "../../infrastructure/jalan_spesifikasi_desain_review/orm/jalan_spesifikasi_desain_review.orm_entity";
import { JalanSpesifikasiDesainReviewController } from "./jalan_spesifikasi_desain_review.controller";
import { JalanSpesifikasiDesainReviewService } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service";
import { JalanSpesifikasiDesainReviewServiceImpl } from "../../application/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service.impl";
import { JalanSpesifikasiDesainReviewRepository } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.repository";
import { JalanSpesifikasiDesainReviewRepositoryImpl } from "../../infrastructure/jalan_spesifikasi_desain_review/repositories/jalan_spesifikasi_desain_review.repository.impl";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            JalanSpesifikasiDesainReviewOrmEntity
        ])
    ],
    controllers: [JalanSpesifikasiDesainReviewController],
    providers: [
        {
            provide: JalanSpesifikasiDesainReviewService,
            useClass: JalanSpesifikasiDesainReviewServiceImpl
        },
        {
            provide: JalanSpesifikasiDesainReviewRepository,
            useClass: JalanSpesifikasiDesainReviewRepositoryImpl
        }
    ],
    exports: [JalanSpesifikasiDesainReviewService]
})
export class JalanSpesifikasiDesainReviewModule { }
