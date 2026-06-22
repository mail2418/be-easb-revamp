import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanSaluranRuangLingkupServiceImpl } from '../../application/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service.impl';
import { JalanSaluranRuangLingkupRepository } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository';
import { JalanSaluranRuangLingkupService } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service';
import { JalanSaluranRuangLingkupOrmEntity } from '../../infrastructure/jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity';
import { JenisUsulanOrmEntity } from '../../infrastructure/jenis_usulan/orm/jenis_usulan.orm_entity';
import { JalanSaluranRuangLingkupRepositoryImpl } from '../../infrastructure/jalan_saluran_ruang_lingkup/repositories/jalan_saluran_ruang_lingkup.repository.impl';
import { JalanSaluranRuangLingkupController } from './jalan_saluran_ruang_lingkup.controller';

@Module({
    imports: [TypeOrmModule.forFeature([JalanSaluranRuangLingkupOrmEntity, JenisUsulanOrmEntity])],
    controllers: [JalanSaluranRuangLingkupController],
    providers: [
        { provide: JalanSaluranRuangLingkupService, useClass: JalanSaluranRuangLingkupServiceImpl },
        { provide: JalanSaluranRuangLingkupRepository, useClass: JalanSaluranRuangLingkupRepositoryImpl },
    ],
    exports: [JalanSaluranRuangLingkupService, JalanSaluranRuangLingkupRepository],
})
export class JalanSaluranRuangLingkupModule {}
