import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbBipekNonStdOrmEntity } from '../../infrastructure/asb_bipek_non_std/orm/asb_bipek_non_std.orm_entity';
import { AsbBipekNonStdRepository } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.repository';
import { AsbBipekNonStdRepositoryImpl } from '../../infrastructure/asb_bipek_non_std/repositories/asb_bipek_non_std.repository.impl';
import { AsbBipekNonStdService } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.service';
import { AsbBipekNonStdServiceImpl } from '../../application/asb_bipek_non_std/asb_bipek_non_std.service.impl';
import { AsbKomponenBangunanNonstdModule } from '../asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.module';
import { CalculateBobotBPNSUseCase } from 'src/application/asb_bipek_non_std/use_cases/calculate_bobot_bpns.use_case';
import { AsbKomponenBangunanProsNonstdModule } from '../asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.module';
import { AsbDetailModule } from '../asb_detail/asb_detail.module';
import { AsbDocumentModule } from '../asb_document/asb_document.module';
import { AsbBipekNonStdController } from './asb_bipek_non_std.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBipekNonStdOrmEntity]),
        AsbKomponenBangunanNonstdModule,
        AsbKomponenBangunanProsNonstdModule,
        AsbDetailModule,
        AsbDocumentModule,
    ],
    controllers: [AsbBipekNonStdController],
    providers: [
        {
            provide: AsbBipekNonStdRepository,
            useClass: AsbBipekNonStdRepositoryImpl,
        },
        {
            provide: AsbBipekNonStdService,
            useClass: AsbBipekNonStdServiceImpl,
        },
        CalculateBobotBPNSUseCase
    ],
    exports: [AsbBipekNonStdService],
})
export class AsbBipekNonStdModule { }
