import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanJenisPemeliharaanServiceImpl } from '../../application/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service.impl';
import { JalanJenisPemeliharaanRepository } from '../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.repository';
import { JalanJenisPemeliharaanService } from '../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service';
import { JalanJenisPemeliharaanOrmEntity } from '../../infrastructure/jalan_jenis_pemeliharaan/orm/jalan_jenis_pemeliharaan.orm_entity';
import { JalanJenisPemeliharaanRepositoryImpl } from '../../infrastructure/jalan_jenis_pemeliharaan/repositories/jalan_jenis_pemeliharaan.repository.impl';
import { JalanJenisPemeliharaanController } from './jalan_jenis_pemeliharaan.controller';

@Module({
    imports: [TypeOrmModule.forFeature([JalanJenisPemeliharaanOrmEntity])],
    controllers: [JalanJenisPemeliharaanController],
    providers: [
        { provide: JalanJenisPemeliharaanService, useClass: JalanJenisPemeliharaanServiceImpl },
        { provide: JalanJenisPemeliharaanRepository, useClass: JalanJenisPemeliharaanRepositoryImpl },
    ],
    exports: [JalanJenisPemeliharaanService, JalanJenisPemeliharaanRepository],
})
export class JalanJenisPemeliharaanModule {}
