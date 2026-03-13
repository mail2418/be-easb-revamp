import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekNonStdReviewOrmEntity } from '../../infrastructure/asb_bipek_non_std_review/orm/asb_bipek_non_std_review.orm_entity';
import { AsbBipekNonStdReviewRepository } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.repository';
import { AsbBipekNonStdReviewRepositoryImpl } from '../../infrastructure/asb_bipek_non_std_review/repositories/asb_bipek_non_std_review.repository.impl';
import { AsbBipekNonStdReviewService } from '../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.service';
import { AsbBipekNonStdReviewServiceImpl } from '../../application/asb_bipek_non_std_review/asb_bipek_non_std_review.service.impl';
import { AsbKomponenBangunanNonstdModule } from '../asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.module';
import { AsbBipekNonStdReviewController } from './asb_bipek_non_std_review.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekNonStdReviewOrmEntity]),
        AsbKomponenBangunanNonstdModule,
    ],
    controllers: [AsbBipekNonStdReviewController],
    providers: [
        {
            provide: AsbBipekNonStdReviewRepository,
            useClass: AsbBipekNonStdReviewRepositoryImpl,
        },
        {
            provide: AsbBipekNonStdReviewService,
            useClass: AsbBipekNonStdReviewServiceImpl,
        },
    ],
    exports: [AsbBipekNonStdReviewService],
})
export class AsbBipekNonStdReviewModule { }
