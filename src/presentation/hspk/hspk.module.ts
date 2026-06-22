import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HspkServiceImpl } from '../../application/hspk/hspk.service.impl';
import { HspkRepository } from '../../domain/hspk/hspk.repository';
import { HspkService } from '../../domain/hspk/hspk.service';
import { HspkOrmEntity } from '../../infrastructure/hspk/orm/hspk.orm_entity';
import { HspkRepositoryImpl } from '../../infrastructure/hspk/repositories/hspk.repository.impl';
import { JalanSaluranRuangLingkupOrmEntity } from '../../infrastructure/jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity';
import { HspkController } from './hspk.controller';

@Module({
    imports: [TypeOrmModule.forFeature([HspkOrmEntity, JalanSaluranRuangLingkupOrmEntity])],
    controllers: [HspkController],
    providers: [
        { provide: HspkService, useClass: HspkServiceImpl },
        { provide: HspkRepository, useClass: HspkRepositoryImpl },
    ],
    exports: [HspkService, HspkRepository],
})
export class HspkModule {}
