import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekStandardReviewOrmEntity } from '../../infrastructure/asb_bipek_standard_review/orm/asb_bipek_standard_review.orm_entity';
import { AsbBipekStandardReviewRepository } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.repository';
import { AsbBipekStandardReviewRepositoryImpl } from '../../infrastructure/asb_bipek_standard_review/repositories/asb_bipek_standard_review.repository.impl';
import { AsbBipekStandardReviewService } from '../../domain/asb_bipek_standard_review/asb_bipek_standard_review.service';
import { AsbBipekStandardReviewServiceImpl } from '../../application/asb_bipek_standard_review/asb_bipek_standard_review.service.impl';
import { AsbBipekStandardModule } from '../asb_bipek_standard/asb_bipek_standard.module';
import { AsbBipekStandardReviewController } from './asb_bipek_standard_review.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekStandardReviewOrmEntity]),
        AsbBipekStandardModule,
    ],
    controllers: [AsbBipekStandardReviewController],
    providers: [
        {
            provide: AsbBipekStandardReviewRepository,
            useClass: AsbBipekStandardReviewRepositoryImpl,
        },
        {
            provide: AsbBipekStandardReviewService,
            useClass: AsbBipekStandardReviewServiceImpl,
        },
    ],
    exports: [AsbBipekStandardReviewService],
})
export class AsbBipekStandardReviewModule { }
