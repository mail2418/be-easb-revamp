import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KecamatanController } from './kecamatan.controller';
import { KecamatanService } from '../../domain/kecamatan/kecamatan.service';
import { KecamatanServiceImpl } from '../../application/kecamatan/kecamatan.service.impl';
import { KecamatanRepository } from '../../domain/kecamatan/kecamatan.repository';
import { KecamatanRepositoryImpl } from '../../infrastructure/kecamatan/repositories/kecamatan.repository.impl';
import { KecamatanOrmEntity } from '../../infrastructure/kecamatan/orm/kecamatan.orm_entity';
import { KabKotaModule } from '../kabkota/kabkota.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([KecamatanOrmEntity]),
        KabKotaModule, // Import for foreign key validation
    ],
    controllers: [KecamatanController],
    providers: [
        {
            provide: KecamatanService,
            useClass: KecamatanServiceImpl,
        },
        {
            provide: KecamatanRepository,
            useClass: KecamatanRepositoryImpl,
        },
    ],
    exports: [KecamatanService, KecamatanRepository],
})
export class KecamatanModule { }
