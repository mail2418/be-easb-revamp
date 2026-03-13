import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbOrmEntity } from '../../infrastructure/asb/orm/asb.orm_entity';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { AsbRepositoryImpl } from 'src/infrastructure/asb/repositories/asb.repository.impl';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbServiceImpl } from '../../application/asb/asb.service.impl';
import { AsbController } from './asb.controller';
import { KabKotaModule } from '../kabkota/kabkota.module';
import { AsbStatusModule } from '../asb_status/asb_status.module';
import { AsbJenisModule } from '../asb_jenis/asb_jenis.module';
import { OpdModule } from '../opd/opd.module';
import { AsbTipeBangunanModule } from '../asb_tipe_bangunan/asb_tipe_bangunan.module';
import { RekeningModule } from '../rekening/rekening.module';
import { AsbDetailModule } from '../asb_detail/asb_detail.module';
import { AsbDocumentModule } from '../asb_document/asb_document.module';
import { ShstModule } from '../shst/shst.module';
import { AsbBipekStandardModule } from '../asb_bipek_standard/asb_bipek_standard.module';
import { AsbBipekNonStdModule } from '../asb_bipek_non_std/asb_bipek_non_std.module';
import { AsbBipekStandardReviewModule } from '../asb_bipek_standard_review/asb_bipek_standard_review.module';
import { AsbBipekNonStdReviewModule } from '../asb_bipek_non_std_review/asb_bipek_non_std_review.module';
import { CalculateBobotBPSUseCase } from 'src/application/asb_bipek_standard/use_cases/calculate_bobot_bps.use_case';
import { CalculateBobotBPNSUseCase } from 'src/application/asb_bipek_non_std/use_cases/calculate_bobot_bpns.use_case';
import { CalculateBobotBPSReviewUseCase } from 'src/application/asb_bipek_standard_review/use_cases/calculate_bobot_bps_review.use_case';
import { CalculateBobotBPNSReviewUseCase } from 'src/application/asb_bipek_non_std_review/use_cases/calculate_bobot_bpns_review.use_case';
import { AsbDetailReviewModule } from '../asb_detail_review/asb_detail_review.module';
import { AsbKomponenBangunanProsStdModule } from '../asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.module';
import { AsbKomponenBangunanProsNonstdModule } from '../asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.module';
import { AsbJakonModule } from '../asb_jakon/asb_jakon.module';
import { UserModule } from '../users/user.module';
import { VerifikatorModule } from '../verifikator/verifikator.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbOrmEntity]),
        KabKotaModule,
        AsbStatusModule,
        AsbJenisModule,
        OpdModule,
        AsbTipeBangunanModule,
        RekeningModule,
        AsbDetailModule,
        AsbDetailReviewModule,
        AsbDocumentModule,
        ShstModule,
        AsbBipekStandardModule,
        AsbBipekNonStdModule,
        AsbBipekStandardReviewModule,
        AsbBipekNonStdReviewModule,
        AsbKomponenBangunanProsStdModule,
        AsbKomponenBangunanProsNonstdModule,
        AsbJakonModule,
        UserModule,
        VerifikatorModule
    ],
    providers: [
        {
            provide: AsbRepository,
            useClass: AsbRepositoryImpl,
        },
        {
            provide: AsbService,
            useClass: AsbServiceImpl,
        },
        CalculateBobotBPSUseCase,
        CalculateBobotBPNSUseCase,
        CalculateBobotBPSReviewUseCase,
        CalculateBobotBPNSReviewUseCase,
    ],
    controllers: [AsbController],
    exports: [AsbService],
})
export class AsbModule { }
