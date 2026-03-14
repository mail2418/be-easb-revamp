import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanSaluranOrmEntity } from '../../infrastructure/usulan_saluran/orm/usulan_saluran.orm_entity';
import { UsulanSaluranRepository } from '../../domain/usulan_saluran/usulan_saluran.repository';
import { UsulanSaluranRepositoryImpl } from '../../infrastructure/usulan_saluran/repositories/usulan_saluran.repository.impl';
import { UsulanSaluranService } from '../../domain/usulan_saluran/usulan_saluran.service';
import { UsulanSaluranServiceImpl } from '../../application/usulan_saluran/usulan_saluran.service.impl';
import { UsulanSaluranController } from './usulan_saluran.controller';
import { VerifikatorModule } from '../verifikator/verifikator.module';
import { MainDashboardModule } from '../main_dashboard/main_dashboard.module';
import { SaluranSpesifikasiDesainModule } from '../saluran_spesifikasi_desain/saluran_spesifikasi_desain.module';
import { SaluranSpesifikasiDesainReviewModule } from '../saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.module';
import { PpnGlobalModule } from '../ppn_global/ppn_global.module';
import { SmkkGlobalModule } from '../smkk_global/smkk_global.module';
import { JalanSaluranSmkkModule } from '../jalan_saluran_smkk/jalan_saluran_smkk.module';
import { SaluranSpesifikasiSmkkModule } from '../saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.module';
import { SaluranSpesifikasiSmkkReviewModule } from '../saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.module';
import { GenerateUraianUsulanSaluranUseCase } from '../../application/usulan_saluran/use_cases/generate_uraian_usulan_saluran.use_case';
import { GenerateSpesifikasiUsulanSaluranUseCase } from '../../application/usulan_saluran/use_cases/generate_spesifikasi_usulan_saluran.use_case';
import { CalculateBiayaSmkkUseCase } from '../../application/usulan_jalan/use_cases/calculate_biaya_smkk.use_case';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsulanSaluranOrmEntity]),
        VerifikatorModule,
        MainDashboardModule,
        forwardRef(() => SaluranSpesifikasiDesainModule),
        forwardRef(() => SaluranSpesifikasiDesainReviewModule),
        PpnGlobalModule,
        SmkkGlobalModule,
        JalanSaluranSmkkModule,
        forwardRef(() => SaluranSpesifikasiSmkkModule),
        forwardRef(() => SaluranSpesifikasiSmkkReviewModule),
    ],
    providers: [
        { provide: UsulanSaluranRepository, useClass: UsulanSaluranRepositoryImpl },
        { provide: UsulanSaluranService, useClass: UsulanSaluranServiceImpl },
        GenerateUraianUsulanSaluranUseCase,
        GenerateSpesifikasiUsulanSaluranUseCase,
        CalculateBiayaSmkkUseCase,
    ],
    controllers: [UsulanSaluranController],
    exports: [UsulanSaluranService, UsulanSaluranRepository],
})
export class UsulanSaluranModule {}
