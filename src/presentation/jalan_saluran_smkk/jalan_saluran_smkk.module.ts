import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanSaluranSmkkOrmEntity } from '../../infrastructure/jalan_saluran_smkk/orm/jalan_saluran_smkk.orm_entity';
import { JalanSaluranSmkkRepository } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.repository';
import { JalanSaluranSmkkRepositoryImpl } from '../../infrastructure/jalan_saluran_smkk/repositories/jalan_saluran_smkk.repository.impl';
import { JalanSaluranSmkkService } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service';
import { JalanSaluranSmkkServiceImpl } from '../../application/jalan_saluran_smkk/jalan_saluran_smkk.service.impl';
import { JalanSaluranSmkkController } from './jalan_saluran_smkk.controller';

@Module({
    imports: [TypeOrmModule.forFeature([JalanSaluranSmkkOrmEntity])],
    controllers: [JalanSaluranSmkkController],
    providers: [
        {
            provide: JalanSaluranSmkkRepository,
            useClass: JalanSaluranSmkkRepositoryImpl,
        },
        {
            provide: JalanSaluranSmkkService,
            useClass: JalanSaluranSmkkServiceImpl,
        },
    ],
    exports: [JalanSaluranSmkkService, JalanSaluranSmkkRepository],
})
export class JalanSaluranSmkkModule {}
