import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanJenisPerkerasanServiceImpl } from '../../application/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service.impl';
import { JalanJenisPerkerasanRepository } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository';
import { JalanJenisPerkerasanService } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service';
import { JalanJenisPerkerasanOrmEntity } from '../../infrastructure/jalan_jenis_perkerasan/orm/jalan_jenis_perkerasan.orm_entity';
import { JalanJenisPerkerasanRepositoryImpl } from '../../infrastructure/jalan_jenis_perkerasan/repositories/jalan_jenis_perkerasan.repository.impl';
import { JalanJenisPerkerasanController } from './jalan_jenis_perkerasan.controller';

@Module({
    imports: [TypeOrmModule.forFeature([JalanJenisPerkerasanOrmEntity])],
    controllers: [JalanJenisPerkerasanController],
    providers: [
        { provide: JalanJenisPerkerasanService, useClass: JalanJenisPerkerasanServiceImpl },
        { provide: JalanJenisPerkerasanRepository, useClass: JalanJenisPerkerasanRepositoryImpl },
    ],
    exports: [JalanJenisPerkerasanService, JalanJenisPerkerasanRepository],
})
export class JalanJenisPerkerasanModule {}
