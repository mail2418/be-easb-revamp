import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HspkOrmEntity } from '../../infrastructure/hspk/orm/hspk.orm_entity';
import { HspkRepository } from '../../domain/hspk/hspk.repository';
import { HspkRepositoryImpl } from '../../infrastructure/hspk/repositories/hspk.repository.impl';
import { HspkService } from '../../domain/hspk/hspk.service';
import { HspkServiceImpl } from '../../application/hspk/hspk.service.impl';
import { HspkController } from './hspk.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([HspkOrmEntity]),
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
    ],
    controllers: [HspkController],
    exports: [HspkRepository, HspkService],
})
export class HspkModule { }

