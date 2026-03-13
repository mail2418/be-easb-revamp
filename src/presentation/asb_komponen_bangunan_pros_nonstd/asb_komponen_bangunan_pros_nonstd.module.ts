import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKomponenBangunanProsNonstdController } from './asb_komponen_bangunan_pros_nonstd.controller';
import { AsbKomponenBangunanProsNonstdServiceImpl } from '../../application/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service.impl';
import { AsbKomponenBangunanProsNonstdRepositoryImpl } from '../../infrastructure/asb_komponen_bangunan_pros_nonstd/repositories/asb_komponen_bangunan_pros_nonstd.repository.impl';
import { AsbKomponenBangunanProsNonstdOrmEntity } from '../../infrastructure/asb_komponen_bangunan_pros_nonstd/orm/asb_komponen_bangunan_pros_nonstd.orm_entity';
import { AsbKomponenBangunanProsNonstdService } from '../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service';
import { AsbKomponenBangunanProsNonstdRepository } from '../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.repository';
import { ValidateStatisticalRangeUseCase } from '../../application/asb_komponen_bangunan_pros_std/use_cases/validate_statistical_range.use_case';
import { AsbKomponenBangunanNonstdModule } from '../asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbKomponenBangunanProsNonstdOrmEntity]),
        AsbKomponenBangunanNonstdModule,
    ],
    controllers: [AsbKomponenBangunanProsNonstdController],
    providers: [
        {
            provide: AsbKomponenBangunanProsNonstdService,
            useClass: AsbKomponenBangunanProsNonstdServiceImpl,
        },
        {
            provide: AsbKomponenBangunanProsNonstdRepository,
            useClass: AsbKomponenBangunanProsNonstdRepositoryImpl,
        },
        ValidateStatisticalRangeUseCase,
    ],
    exports: [
        AsbKomponenBangunanProsNonstdService,
        AsbKomponenBangunanProsNonstdRepository,
    ],
})
export class AsbKomponenBangunanProsNonstdModule { }
