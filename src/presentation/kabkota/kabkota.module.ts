import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KabKotaController } from './kabkota.controller';
import { KabKotaServiceImpl } from '../../application/kabkota/kabkota.service.impl';
import { KabKotaRepositoryImpl } from '../../infrastructure/kabkota/repositories/kabkota.repository.impl';
import { KabKotaOrmEntity } from '../../infrastructure/kabkota/orm/kabkota.orm_entity';
import { KabKotaService } from '../../domain/kabkota/kabkota.service';
import { KabKotaRepository } from '../../domain/kabkota/kabkota.repository';
import { ProvinceModule } from '../provinces/province.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KabKotaOrmEntity]),
    ProvinceModule, // Import ProvinceModule for potential FK validation
  ],
  controllers: [KabKotaController],
  providers: [
    {
      provide: KabKotaService,
      useClass: KabKotaServiceImpl,
    },
    {
      provide: KabKotaRepository,
      useClass: KabKotaRepositoryImpl,
    },
  ],
  exports: [
    KabKotaService,
    KabKotaRepository,
  ],
})
export class KabKotaModule {}
