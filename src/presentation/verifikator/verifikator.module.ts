import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifikatorController } from './verifikator.controller';
import { VerifikatorServiceImpl } from '../../application/verifikator/verifikator.service.impl';
import { VerifikatorRepositoryImpl } from '../../infrastructure/verifikator/repositories/verifikator.repository.impl';
import { VerifikatorOrmEntity } from '../../infrastructure/verifikator/orm/verifikator.orm_entity';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { VerifikatorRepository } from '../../domain/verifikator/verifikator.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([VerifikatorOrmEntity]),
    ],
    controllers: [VerifikatorController],
    providers: [
        {
            provide: VerifikatorService,
            useClass: VerifikatorServiceImpl,
        },
        {
            provide: VerifikatorRepository,
            useClass: VerifikatorRepositoryImpl,
        },
    ],
    exports: [
        VerifikatorService,
        VerifikatorRepository,
    ],
})
export class VerifikatorModule { }
