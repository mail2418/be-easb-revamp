import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatuanController } from './satuan.controller';
import { SatuanServiceImpl } from '../../application/satuan/satuan.service.impl';
import { SatuanRepositoryImpl } from '../../infrastructure/satuan/repositories/satuan.repository.impl';
import { SatuanOrmEntity } from '../../infrastructure/satuan/orm/satuan.orm_entity';
import { SatuanService } from '../../domain/satuan/satuan.service';
import { SatuanRepository } from '../../domain/satuan/satuan.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SatuanOrmEntity]),
  ],
  controllers: [SatuanController],
  providers: [
    {
      provide: SatuanService,
      useClass: SatuanServiceImpl,
    },
    {
      provide: SatuanRepository,
      useClass: SatuanRepositoryImpl,
    },
  ],
  exports: [
    SatuanService,
    SatuanRepository,
  ],
})
export class SatuanModule {}
