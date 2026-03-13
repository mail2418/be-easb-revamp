import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbDetailReviewOrmEntity } from '../../infrastructure/asb_detail_review/orm/asb_detail_review.orm_entity';
import { AsbDetailReviewRepository } from '../../domain/asb_detail_review/asb_detail_review.repository';
import { AsbDetailReviewRepositoryImpl } from '../../infrastructure/asb_detail_review/repositories/asb_detail_review.repository.impl';
import { AsbDetailReviewService } from '../../domain/asb_detail_review/asb_detail_review.service';
import { AsbDetailReviewServiceImpl } from '../../application/asb_detail_review/asb_detail_review.service.impl';
import { AsbDetailModule } from '../asb_detail/asb_detail.module';
import { AsbLantaiModule } from '../asb_lantai/asb_lantai.module';
import { AsbFungsiRuangModule } from '../asb_fungsi_ruang/asb_fungsi_ruang.module';
import { CalculateKoefFungsiBangunanUseCase } from 'src/application/asb_detail_review/use_cases/calculate_koef_fungsi_bangunan.use_case';
import { CalculateKoefLantaiUseCase } from 'src/application/asb_detail_review/use_cases/calculate_koef_lantai.use_case';
import { AsbDetailReviewController } from './asb_detail_review.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbDetailReviewOrmEntity]),
        AsbDetailModule,
        AsbLantaiModule,
        AsbFungsiRuangModule,
    ],
    controllers: [AsbDetailReviewController],
    providers: [
        {
            provide: AsbDetailReviewRepository,
            useClass: AsbDetailReviewRepositoryImpl,
        },
        {
            provide: AsbDetailReviewService,
            useClass: AsbDetailReviewServiceImpl,
        },
        CalculateKoefFungsiBangunanUseCase,
        CalculateKoefLantaiUseCase,
    ],
    exports: [AsbDetailReviewService],
})
export class AsbDetailReviewModule { }
