import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKomponenBangunanProsStdController } from './asb_komponen_bangunan_pros_std.controller';
import { AsbKomponenBangunanProsStdServiceImpl } from '../../application/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service.impl';
import { AsbKomponenBangunanProsStdRepositoryImpl } from '../../infrastructure/asb_komponen_bangunan_pros_std/repositories/asb_komponen_bangunan_pros_std.repository.impl';
import { AsbKomponenBangunanProsStdOrmEntity } from '../../infrastructure/asb_komponen_bangunan_pros_std/orm/asb_komponen_bangunan_pros_std.orm_entity';
import { AsbKomponenBangunanProsStdService } from '../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service';
import { AsbKomponenBangunanProsStdRepository } from '../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.repository';
import { ValidateStatisticalRangeUseCase } from '../../application/asb_komponen_bangunan_pros_std/use_cases/validate_statistical_range.use_case';
import { AsbKomponenBangunanStdModule } from '../asb_komponen_bangunan_std/asb_komponen_bangunan_std.module';
import { AsbTipeBangunanModule } from '../asb_tipe_bangunan/asb_tipe_bangunan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbKomponenBangunanProsStdOrmEntity]),
        AsbKomponenBangunanStdModule,
        AsbTipeBangunanModule,
    ],
    controllers: [AsbKomponenBangunanProsStdController],
    providers: [
        {
            provide: AsbKomponenBangunanProsStdService,
            useClass: AsbKomponenBangunanProsStdServiceImpl,
        },
        {
            provide: AsbKomponenBangunanProsStdRepository,
            useClass: AsbKomponenBangunanProsStdRepositoryImpl,
        },
        ValidateStatisticalRangeUseCase,
    ],
    exports: [
        AsbKomponenBangunanProsStdService,
        AsbKomponenBangunanProsStdRepository,
    ],
})
export class AsbKomponenBangunanProsStdModule { }
