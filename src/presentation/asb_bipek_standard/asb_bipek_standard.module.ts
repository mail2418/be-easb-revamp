import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekStandardOrmEntity } from '../../infrastructure/asb_bipek_standard/orm/asb_bipek_standard.orm_entity';
import { AsbBipekStandardRepository } from '../../domain/asb_bipek_standard/asb_bipek_standard.repository';
import { AsbBipekStandardRepositoryImpl } from '../../infrastructure/asb_bipek_standard/repositories/asb_bipek_standard.repository.impl';
import { AsbBipekStandardService } from '../../domain/asb_bipek_standard/asb_bipek_standard.service';
import { AsbBipekStandardServiceImpl } from '../../application/asb_bipek_standard/asb_bipek_standard.service.impl';
import { AsbKomponenBangunanStdModule } from '../asb_komponen_bangunan_std/asb_komponen_bangunan_std.module';
import { AsbKomponenBangunanProsStdModule } from '../asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.module';
import { AsbDetailModule } from '../asb_detail/asb_detail.module';
import { CalculateBobotBPSUseCase } from 'src/application/asb_bipek_standard/use_cases/calculate_bobot_bps.use_case';
import { AsbDocumentModule } from '../asb_document/asb_document.module';
import { AsbBipekStandardController } from './asb_bipek_standard.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekStandardOrmEntity]),
        AsbKomponenBangunanStdModule,
        AsbKomponenBangunanProsStdModule,
        AsbDetailModule,
        AsbDocumentModule,
    ],
    controllers: [AsbBipekStandardController],
    providers: [
        {
            provide: AsbBipekStandardRepository,
            useClass: AsbBipekStandardRepositoryImpl,
        },
        {
            provide: AsbBipekStandardService,
            useClass: AsbBipekStandardServiceImpl,
        },
        CalculateBobotBPSUseCase,
    ],
    exports: [AsbBipekStandardService],
})
export class AsbBipekStandardModule { }
