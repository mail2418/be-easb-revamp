import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaluranSpesifikasiDesainReviewService } from '../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.service';
import { SaluranSpesifikasiDesainReviewServiceImpl } from '../../application/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.service.impl';
import { SaluranSpesifikasiDesainReviewRepository } from '../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.repository';
import { SaluranSpesifikasiDesainReviewRepositoryImpl } from '../../infrastructure/saluran_spesifikasi_desain_review/repositories/saluran_spesifikasi_desain_review.repository.impl';
import { SaluranSpesifikasiDesainReviewOrmEntity } from '../../infrastructure/saluran_spesifikasi_desain_review/orm/saluran_spesifikasi_desain_review.orm_entity';
import { CalculateVolumeSaluranSpesifikasiDesainReviewUseCase } from '../../application/saluran_spesifikasi_desain_review/use_cases/calculate_volume_saluran_spesifikasi_desain_review.use_case';
import { HspkModule } from '../hspk/hspk.module';
import { UsulanSaluranModule } from '../usulan_saluran/usulan_saluran.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SaluranSpesifikasiDesainReviewOrmEntity]),
        HspkModule,
        forwardRef(() => UsulanSaluranModule),
    ],
    providers: [
        {
            provide: SaluranSpesifikasiDesainReviewService,
            useClass: SaluranSpesifikasiDesainReviewServiceImpl,
        },
        {
            provide: SaluranSpesifikasiDesainReviewRepository,
            useClass: SaluranSpesifikasiDesainReviewRepositoryImpl,
        },
        CalculateVolumeSaluranSpesifikasiDesainReviewUseCase,
    ],
    exports: [SaluranSpesifikasiDesainReviewService],
})
export class SaluranSpesifikasiDesainReviewModule {}
