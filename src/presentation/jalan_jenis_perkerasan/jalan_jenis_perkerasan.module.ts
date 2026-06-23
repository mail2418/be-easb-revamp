import { Module } from '@nestjs/common';
import { JalanJenisPerkerasanController } from './jalan_jenis_perkerasan.controller';
import { JalanJenisPerkerasanService } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service';
import { JalanJenisPerkerasanRepository } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository';
import { JalanJenisPerkerasanRepositoryImpl } from '../../infrastructure/jalan_jenis_perkerasan/repositories/jalan_jenis_perkerasan.repository.impl';
import { JalanJenisPerkerasanServiceImpl } from '../../application/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanJenisPerkerasanOrmEntity } from '../../infrastructure/jalan_jenis_perkerasan/orm/jalan_jenis_perkerasan.orm_entity';

@Module({
    imports: [TypeOrmModule.forFeature([JalanJenisPerkerasanOrmEntity])],
    controllers: [JalanJenisPerkerasanController],
    providers: [
        {
            provide: JalanJenisPerkerasanService,
            useClass: JalanJenisPerkerasanServiceImpl,
        },
        {
            provide: JalanJenisPerkerasanRepository,
            useClass: JalanJenisPerkerasanRepositoryImpl,
        },
    ],
    exports: [JalanJenisPerkerasanService],
})
export class JalanJenisPerkerasanModule {}
