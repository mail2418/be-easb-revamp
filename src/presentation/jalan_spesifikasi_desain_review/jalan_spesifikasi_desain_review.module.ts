import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainReviewOrmEntity } from "../../infrastructure/jalan_spesifikasi_desain_review/orm/jalan_spesifikasi_desain_review.orm_entity";
import { JalanSpesifikasiDesainReviewController } from "./jalan_spesifikasi_desain_review.controller";
import { JalanSpesifikasiDesainReviewService } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service";
import { JalanSpesifikasiDesainReviewServiceImpl } from "../../application/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service.impl";
import { JalanSpesifikasiDesainReviewRepository } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.repository";
import { JalanSpesifikasiDesainReviewRepositoryImpl } from "../../infrastructure/jalan_spesifikasi_desain_review/repositories/jalan_spesifikasi_desain_review.repository.impl";
import { CalculateVolumeJalanSpesifikasiDesainReviewUseCase } from "../../application/jalan_spesifikasi_desain_review/use_cases/calculate_volume_jalan_spesifikasi_desain_review.use_case";
import { HspkModule } from "../hspk/hspk.module";
import { UsulanJalanModule } from "../usulan_jalan/usulan_jalan.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            JalanSpesifikasiDesainReviewOrmEntity
        ]),
        HspkModule,
        forwardRef(() => UsulanJalanModule),
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
        },
        CalculateVolumeJalanSpesifikasiDesainReviewUseCase,
    ],
    exports: [JalanSpesifikasiDesainReviewService]
})
export class JalanSpesifikasiDesainReviewModule { }
