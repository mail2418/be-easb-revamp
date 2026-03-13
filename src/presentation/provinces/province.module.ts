import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceService } from '../../domain/provinces/province.service';
import { ProvinceServiceImpl } from '../../application/provinces/province.service.impl';
import { ProvinceOrmEntity } from '../../infrastructure/provinces/orm/province.orm_entity';
import { ProvinceRepositoryImpl } from '../../infrastructure/provinces/repositories/province.repository.impl';
import { ProvinceRepository } from '../../domain/provinces/province.repository';
import { ProvinceController } from './province.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProvinceOrmEntity])],
  controllers: [ProvinceController],
  providers: [
    ProvinceServiceImpl,
    {
      provide: ProvinceService,
      useExisting: ProvinceServiceImpl,
    },
    ProvinceRepositoryImpl,
    {
      provide: ProvinceRepository,
      useExisting: ProvinceRepositoryImpl,
    },
  ],
  exports: [ProvinceService],
})
export class ProvinceModule {}
