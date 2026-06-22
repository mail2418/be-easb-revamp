import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanSaluranSmkkServiceImpl } from '../../application/jalan_saluran_smkk/jalan_saluran_smkk.service.impl';
import { JalanSaluranSmkkRepository } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.repository';
import { JalanSaluranSmkkService } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service';
import { JalanSaluranSmkkOrmEntity } from '../../infrastructure/jalan_saluran_smkk/orm/jalan_saluran_smkk.orm_entity';
import { JenisUsulanOrmEntity } from '../../infrastructure/jenis_usulan/orm/jenis_usulan.orm_entity';
import { JalanSaluranSmkkRepositoryImpl } from '../../infrastructure/jalan_saluran_smkk/repositories/jalan_saluran_smkk.repository.impl';
import { JalanSaluranSmkkController } from './jalan_saluran_smkk.controller';

@Module({
    imports: [TypeOrmModule.forFeature([JalanSaluranSmkkOrmEntity, JenisUsulanOrmEntity])],
    controllers: [JalanSaluranSmkkController],
    providers: [
        { provide: JalanSaluranSmkkService, useClass: JalanSaluranSmkkServiceImpl },
        { provide: JalanSaluranSmkkRepository, useClass: JalanSaluranSmkkRepositoryImpl },
    ],
    exports: [JalanSaluranSmkkService, JalanSaluranSmkkRepository],
})
export class JalanSaluranSmkkModule {}
