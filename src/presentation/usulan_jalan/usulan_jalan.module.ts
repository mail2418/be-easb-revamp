import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsulanJalanOrmEntity } from '../../infrastructure/usulan_jalan/orm/usulan_jalan.orm_entity';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanRepositoryImpl } from '../../infrastructure/usulan_jalan/repositories/usulan_jalan.repository.impl';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { UsulanJalanController } from './usulan_jalan.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UsulanJalanOrmEntity])],
    controllers: [UsulanJalanController],
    providers: [
        UsulanJalanServiceImpl,
        { provide: UsulanJalanRepository, useClass: UsulanJalanRepositoryImpl },
    ],
    exports: [UsulanJalanServiceImpl]
})
export class UsulanJalanModule {}
