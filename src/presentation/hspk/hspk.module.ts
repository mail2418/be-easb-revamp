import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HspkOrmEntity } from '../../infrastructure/hspk/orm/hspk.orm_entity';
import { HspkRepository } from '../../domain/hspk/hspk.repository';
import { HspkRepositoryImpl } from '../../infrastructure/hspk/repositories/hspk.repository.impl';
import { HspkService } from '../../domain/hspk/hspk.service';
import { HspkServiceImpl } from '../../application/hspk/hspk.service.impl';
import { HspkController } from './hspk.controller';
import { JalanSaluranRuangLingkupModule } from '../jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.module';
import { ValidateExcelFileUseCase } from '../../application/hspk/use_cases/validate_excel_file.use_case';
import { ValidateExcelHeadersUseCase } from '../../application/hspk/use_cases/validate_excel_headers.use_case';
import { ParseExcelDataUseCase } from '../../application/hspk/use_cases/parse_excel_data.use_case';
import { GenerateExcelTemplateUseCase } from '../../application/hspk/use_cases/generate_excel_template.use_case';

@Module({
    imports: [
        TypeOrmModule.forFeature([HspkOrmEntity]),
        JalanSaluranRuangLingkupModule,
    ],
    providers: [
        {
            provide: HspkRepository,
            useClass: HspkRepositoryImpl,
        },
        {
            provide: HspkService,
            useClass: HspkServiceImpl,
        },
        ValidateExcelFileUseCase,
        ValidateExcelHeadersUseCase,
        ParseExcelDataUseCase,
        GenerateExcelTemplateUseCase,
    ],
    controllers: [HspkController],
    exports: [HspkRepository, HspkService],
})
export class HspkModule { }

