import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RencanaTahunAnggaranController } from './rencana_tahun_anggaran.controller';
import { RencanaTahunAnggaranServiceImpl } from '../../application/rencana_tahun_anggaran/rencana_tahun_anggaran.service.impl';
import { RencanaTahunAnggaranRepositoryImpl } from '../../infrastructure/rencana_tahun_anggaran/repositories/rencana_tahun_anggaran.repository.impl';
import { RencanaTahunAnggaranOrmEntity } from '../../infrastructure/rencana_tahun_anggaran/orm/rencana_tahun_anggaran.orm_entity';
import { RencanaTahunAnggaranService } from '../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.service';
import { RencanaTahunAnggaranRepository } from '../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RencanaTahunAnggaranOrmEntity])],
    controllers: [RencanaTahunAnggaranController],
    providers: [
        {
            provide: RencanaTahunAnggaranService,
            useClass: RencanaTahunAnggaranServiceImpl,
        },
        {
            provide: RencanaTahunAnggaranRepository,
            useClass: RencanaTahunAnggaranRepositoryImpl,
        },
    ],
    exports: [RencanaTahunAnggaranService, RencanaTahunAnggaranRepository],
})
export class RencanaTahunAnggaranModule {}
