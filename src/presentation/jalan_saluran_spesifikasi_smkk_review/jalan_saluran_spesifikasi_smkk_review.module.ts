import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSaluranSpesifikasiSmkkReviewOrmEntity } from "../../infrastructure/jalan_saluran_spesifikasi_smkk_review/orm/jalan_saluran_spesifikasi_smkk_review.orm_entity";
import { JalanSaluranSpesifikasiSmkkReviewController } from "./jalan_saluran_spesifikasi_smkk_review.controller";
import { JalanSaluranSpesifikasiSmkkReviewService } from "../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.service";
import { JalanSaluranSpesifikasiSmkkReviewServiceImpl } from "../../application/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.service.impl";
import { JalanSaluranSpesifikasiSmkkReviewRepository } from "../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.repository";
import { JalanSaluranSpesifikasiSmkkReviewRepositoryImpl } from "../../infrastructure/jalan_saluran_spesifikasi_smkk_review/repositories/jalan_saluran_spesifikasi_smkk_review.repository.impl";
import { UsulanJalanModule } from "../usulan_jalan/usulan_jalan.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            JalanSaluranSpesifikasiSmkkReviewOrmEntity
        ]),
        forwardRef(() => UsulanJalanModule),
    ],
    controllers: [JalanSaluranSpesifikasiSmkkReviewController],
    providers: [
        {
            provide: JalanSaluranSpesifikasiSmkkReviewService,
            useClass: JalanSaluranSpesifikasiSmkkReviewServiceImpl
        },
        {
            provide: JalanSaluranSpesifikasiSmkkReviewRepository,
            useClass: JalanSaluranSpesifikasiSmkkReviewRepositoryImpl
        },
    ],
    exports: [JalanSaluranSpesifikasiSmkkReviewService]
})
export class JalanSaluranSpesifikasiSmkkReviewModule { }

