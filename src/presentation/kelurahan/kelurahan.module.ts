import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KelurahanController } from './kelurahan.controller';
import { KelurahanService } from '../../domain/kelurahan/kelurahan.service';
import { KelurahanServiceImpl } from '../../application/kelurahan/kelurahan.service.impl';
import { KelurahanRepository } from '../../domain/kelurahan/kelurahan.repository';
import { KelurahanRepositoryImpl } from '../../infrastructure/kelurahan/repositories/kelurahan.repository.impl';
import { KelurahanOrmEntity } from '../../infrastructure/kelurahan/orm/kelurahan.orm_entity';
import { KecamatanModule } from '../kecamatan/kecamatan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([KelurahanOrmEntity]),
        KecamatanModule,
    ],
    controllers: [KelurahanController],
    providers: [
        {
            provide: KelurahanService,
            useClass: KelurahanServiceImpl,
        },
        {
            provide: KelurahanRepository,
            useClass: KelurahanRepositoryImpl,
        },
    ],
    exports: [KelurahanService, KelurahanRepository],
})
export class KelurahanModule { }
