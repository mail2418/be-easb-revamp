import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanJalanOrmEntity } from '../../infrastructure/usulan_jalan/orm/usulan_jalan.orm_entity';
import { JalanSaluranSpesifikasiSmkkOrmEntity } from '../../infrastructure/jalan_saluran_spesifikasi_smkk/orm/jalan_saluran_spesifikasi_smkk.orm_entity';
import { JalanSaluranSpesifikasiSmkkReviewOrmEntity } from '../../infrastructure/jalan_saluran_spesifikasi_smkk_review/orm/jalan_saluran_spesifikasi_smkk_review.orm_entity';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanRepositoryImpl } from '../../infrastructure/usulan_jalan/repositories/usulan_jalan.repository.impl';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { UsulanJalanController } from './usulan_jalan.controller';
import { VerifikatorModule } from '../verifikator/verifikator.module';
import { JalanSpesifikasiDesainModule } from '../jalan_spesifikasi_desain/jalan_spesifikasi_desain.module';
import { JalanSpesifikasiDesainReviewModule } from '../jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.module';
import { PpnGlobalModule } from '../ppn_global/ppn_global.module';
import { SmkkGlobalModule } from '../smkk_global/smkk_global.module';
import { JalanSaluranRuangLingkupModule } from '../jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.module';
import { JalanSaluranSmkkModule } from '../jalan_saluran_smkk/jalan_saluran_smkk.module';
import { JalanSaluranSpesifikasiSmkkModule } from '../jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.module';
import { JalanSaluranSpesifikasiSmkkReviewModule } from '../jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.module';
import { GenerateUraianUsulanJalanUseCase } from '../../application/usulan_jalan/use_cases/generate_uraian_usulan_jalan.use_case';
import { GenerateSpesifikasiUsulanJalanUseCase } from '../../application/usulan_jalan/use_cases/generate_spesifikasi_usulan_jalan.use_case';
import { CalculateBiayaSmkkUseCase } from '../../application/usulan_jalan/use_cases/calculate_biaya_smkk.use_case';
import { MainDashboardModule } from '../main_dashboard/main_dashboard.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UsulanJalanOrmEntity,
            JalanSaluranSpesifikasiSmkkOrmEntity,
            JalanSaluranSpesifikasiSmkkReviewOrmEntity,
        ]),
        VerifikatorModule,
        MainDashboardModule,
        JalanSpesifikasiDesainModule,
        JalanSpesifikasiDesainReviewModule,
        PpnGlobalModule,
        SmkkGlobalModule,
        JalanSaluranSmkkModule,
        JalanSaluranSpesifikasiSmkkModule,
        JalanSaluranSpesifikasiSmkkReviewModule,
    ],
    providers: [
        {
            provide: UsulanJalanRepository,
            useClass: UsulanJalanRepositoryImpl,
        },
        {
            provide: UsulanJalanService,
            useClass: UsulanJalanServiceImpl,
        },
        GenerateUraianUsulanJalanUseCase,
        GenerateSpesifikasiUsulanJalanUseCase,
        CalculateBiayaSmkkUseCase,
    ],
    controllers: [UsulanJalanController],
    exports: [UsulanJalanService, UsulanJalanRepository],
})
export class UsulanJalanModule {}
