import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmkkGlobalOrmEntity } from '../../infrastructure/smkk_global/orm/smkk_global.orm_entity';
import { SmkkGlobalRepository } from '../../domain/smkk_global/smkk_global.repository';
import { SmkkGlobalRepositoryImpl } from '../../infrastructure/smkk_global/repositories/smkk_global.repository.impl';
import { SmkkGlobalService } from '../../domain/smkk_global/smkk_global.service';
import { SmkkGlobalServiceImpl } from '../../application/smkk_global/smkk_global.service.impl';
import { SmkkGlobalController } from './smkk_global.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SmkkGlobalOrmEntity])],
    controllers: [SmkkGlobalController],
    providers: [
        {
            provide: SmkkGlobalRepository,
            useClass: SmkkGlobalRepositoryImpl,
        },
        {
            provide: SmkkGlobalService,
            useClass: SmkkGlobalServiceImpl,
        },
    ],
    exports: [SmkkGlobalService, SmkkGlobalRepository],
})
export class SmkkGlobalModule {}
