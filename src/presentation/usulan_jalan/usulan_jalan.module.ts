import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsulanJalanOrmEntity } from '../../infrastructure/usulan_jalan/orm/usulan_jalan.orm_entity';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanRepositoryImpl } from '../../infrastructure/usulan_jalan/repositories/usulan_jalan.repository.impl';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { UsulanJalanController } from './usulan_jalan.controller';
import { VerifikatorModule } from '../verifikator/verifikator.module';
import { JalanSpesifikasiDesainModule } from '../jalan_spesifikasi_desain/jalan_spesifikasi_desain.module';
import { JalanSpesifikasiDesainReviewModule } from '../jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.module';
import { GenerateUraianUsulanJalanUseCase } from '../../application/usulan_jalan/use_cases/generate_uraian_usulan_jalan.use_case';
import { GenerateSpesifikasiUsulanJalanUseCase } from '../../application/usulan_jalan/use_cases/generate_spesifikasi_usulan_jalan.use_case';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsulanJalanOrmEntity]),
        VerifikatorModule,
        JalanSpesifikasiDesainModule,
        JalanSpesifikasiDesainReviewModule,
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
    ],
    controllers: [UsulanJalanController],
    exports: [UsulanJalanService, UsulanJalanRepository],
})
export class UsulanJalanModule { }


