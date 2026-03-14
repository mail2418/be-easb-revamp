import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaluranSpesifikasiSmkkReviewService } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service';
import { SaluranSpesifikasiSmkkReviewServiceImpl } from '../../application/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service.impl';
import { SaluranSpesifikasiSmkkReviewRepository } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.repository';
import { SaluranSpesifikasiSmkkReviewRepositoryImpl } from '../../infrastructure/saluran_spesifikasi_smkk_review/repositories/saluran_spesifikasi_smkk_review.repository.impl';
import { SaluranSpesifikasiSmkkReviewOrmEntity } from '../../infrastructure/saluran_spesifikasi_smkk_review/orm/saluran_spesifikasi_smkk_review.orm_entity';
import { UsulanSaluranModule } from '../usulan_saluran/usulan_saluran.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SaluranSpesifikasiSmkkReviewOrmEntity]),
        forwardRef(() => UsulanSaluranModule),
    ],
    providers: [
        { provide: SaluranSpesifikasiSmkkReviewService, useClass: SaluranSpesifikasiSmkkReviewServiceImpl },
        { provide: SaluranSpesifikasiSmkkReviewRepository, useClass: SaluranSpesifikasiSmkkReviewRepositoryImpl },
    ],
    exports: [SaluranSpesifikasiSmkkReviewService],
})
export class SaluranSpesifikasiSmkkReviewModule {}
