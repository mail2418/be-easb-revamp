import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpdController } from './opd.controller';
import { OpdServiceImpl } from '../../application/opd/opd.service.impl';
import { OpdRepositoryImpl } from '../../infrastructure/opd/repositories/opd.repository.impl';
import { OpdOrmEntity } from '../../infrastructure/opd/orm/opd.orm_entity';
import { OpdService } from '../../domain/opd/opd.service';
import { OpdRepository } from '../../domain/opd/opd.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpdOrmEntity]),
  ],
  controllers: [OpdController],
  providers: [
    {
      provide: OpdService,
      useClass: OpdServiceImpl,
    },
    {
      provide: OpdRepository,
      useClass: OpdRepositoryImpl,
    },
  ],
  exports: [
    OpdService,
    OpdRepository,
  ],
})
export class OpdModule {}
