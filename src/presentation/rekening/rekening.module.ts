import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RekeningController } from './rekening.controller';
import { RekeningServiceImpl } from '../../application/rekening/rekening.service.impl';
import { RekeningRepositoryImpl } from '../../infrastructure/rekening/repositories/rekening.repository.impl';
import { RekeningOrmEntity } from '../../infrastructure/rekening/orm/rekening.orm_entity';
import { RekeningService } from '../../domain/rekening/rekening.service';
import { RekeningRepository } from '../../domain/rekening/rekening.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RekeningOrmEntity]),
  ],
  controllers: [RekeningController],
  providers: [
    {
      provide: RekeningService,
      useClass: RekeningServiceImpl,
    },
    {
      provide: RekeningRepository,
      useClass: RekeningRepositoryImpl,
    },
  ],
  exports: [
    RekeningService,
    RekeningRepository,
  ],
})
export class RekeningModule {}
