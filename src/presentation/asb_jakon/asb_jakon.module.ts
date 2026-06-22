import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbJakonController } from './asb_jakon.controller';
import { AsbJakonOrmEntity } from '../../infrastructure/asb_jakon/orm/asb_jakon.orm_entity';
import { AsbJakonServiceImpl } from '../../application/asb_jakon/asb_jakon.service.impl';
import { AsbJakonRepositoryImpl } from '../../infrastructure/asb_jakon/repositories/asb_jakon.repository.impl';
import { ValidatePriceRangeUseCase } from '../../application/asb_jakon/use_cases/validate_price_range.use_case';
import { ValidateExcelFileUseCase } from '../../application/asb_jakon/use_cases/validate_excel_file.use_case';
import { ValidateExcelHeadersUseCase } from '../../application/asb_jakon/use_cases/validate_excel_headers.use_case';
import { ParseExcelDataUseCase } from '../../application/asb_jakon/use_cases/parse_excel_data.use_case';
import { HandleJakonFileUseCase } from '../../application/asb_jakon/use_cases/handle_jakon_file.use_case';
import { GenerateExcelTemplateUseCase } from '../../application/asb_jakon/use_cases/generate_excel_template.use_case';
import { AsbKlasifikasiModule } from '../asb_klasifikasi/asb_klasifikasi.module';
import { AsbJenisModule } from '../asb_jenis/asb_jenis.module';
import { AsbTipeBangunanModule } from '../asb_tipe_bangunan/asb_tipe_bangunan.module';
import { AsbJakonService } from 'src/domain/asb_jakon/asb_jakon.service';
import { AsbJakonRepository } from 'src/domain/asb_jakon/asb_jakon.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbJakonOrmEntity]),
        AsbKlasifikasiModule,
        AsbJenisModule,
        AsbTipeBangunanModule,
    ],
    controllers: [AsbJakonController],
    providers: [
        {
            provide: AsbJakonService,
            useClass: AsbJakonServiceImpl,
        },
        {
            provide: AsbJakonRepository,
            useClass: AsbJakonRepositoryImpl,
        },
        ValidatePriceRangeUseCase,
        ValidateExcelFileUseCase,
        ValidateExcelHeadersUseCase,
        ParseExcelDataUseCase,
        HandleJakonFileUseCase,
        GenerateExcelTemplateUseCase,
    ],
    exports: [AsbJakonService, AsbJakonRepository, ValidatePriceRangeUseCase],
})
export class AsbJakonModule { }
