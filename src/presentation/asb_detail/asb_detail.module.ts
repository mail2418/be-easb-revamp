import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbDetailOrmEntity } from '../../infrastructure/asb_detail/orm/asb_detail.orm_entity';
import { AsbDetailRepository } from '../../domain/asb_detail/asb_detail.repository';
import { AsbDetailRepositoryImpl } from '../../infrastructure/asb_detail/repositories/asb_detail.repository.impl';
import { AsbDetailService } from '../../domain/asb_detail/asb_detail.service';
import { AsbDetailServiceImpl } from '../../application/asb_detail/asb_detail.service.impl';
import { CalculateKoefLantaiUseCase } from '../../application/asb_detail/use_cases/calculate_koef_lantai.use_case';
import { CalculateKoefFungsiBangunanUseCase } from '../../application/asb_detail/use_cases/calculate_koef_fungsi_bangunan.use_case';
import { AsbLantaiModule } from '../asb_lantai/asb_lantai.module';
import { AsbFungsiRuangModule } from '../asb_fungsi_ruang/asb_fungsi_ruang.module';
import { AsbDetailController } from './asb_detail.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbDetailOrmEntity]),
        AsbLantaiModule,
        AsbFungsiRuangModule,
    ],
    controllers: [AsbDetailController],
    providers: [
        {
            provide: AsbDetailRepository,
            useClass: AsbDetailRepositoryImpl,
        },
        {
            provide: AsbDetailService,
            useClass: AsbDetailServiceImpl,
        },
        CalculateKoefLantaiUseCase,
        CalculateKoefFungsiBangunanUseCase,
    ],
    exports: [AsbDetailService],
})
export class AsbDetailModule { }
