import { Module, forwardRef } from '@nestjs/common';
import { SaluranSpesifikasiSmkkReviewService } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service';
import { SaluranSpesifikasiSmkkReviewServiceImpl } from '../../application/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service.impl';
import { JalanSaluranSpesifikasiSmkkReviewModule } from '../jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.module';
import { UsulanSaluranModule } from '../usulan_saluran/usulan_saluran.module';

@Module({
    imports: [JalanSaluranSpesifikasiSmkkReviewModule, forwardRef(() => UsulanSaluranModule)],
    providers: [
        {
            provide: SaluranSpesifikasiSmkkReviewService,
            useClass: SaluranSpesifikasiSmkkReviewServiceImpl,
        },
    ],
    exports: [SaluranSpesifikasiSmkkReviewService],
})
export class SaluranSpesifikasiSmkkReviewModule {}
