import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKomponenBangunanController } from './asb_komponen_bangunan_std.controller';
import { AsbKomponenBangunanStdServiceImpl } from '../../application/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service.impl';
import { AsbKomponenBangunanStdRepositoryImpl } from '../../infrastructure/asb_komponen_bangunan_std/repositories/asb_komponen_bangunan_std.repository.impl';
import { AsbKomponenBangunanStdOrmEntity } from '../../infrastructure/asb_komponen_bangunan_std/orm/asb_komponen_bangunan_std.orm_entity';
import { AsbKomponenBangunanStdService } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service';
import { AsbKomponenBangunanStdRepository } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.repository';
import { AsbJenisModule } from '../asb_jenis/asb_jenis.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbKomponenBangunanStdOrmEntity]),
        AsbJenisModule,
    ],
    controllers: [AsbKomponenBangunanController],
    providers: [
        {
            provide: AsbKomponenBangunanStdService,
            useClass: AsbKomponenBangunanStdServiceImpl,
        },
        {
            provide: AsbKomponenBangunanStdRepository,
            useClass: AsbKomponenBangunanStdRepositoryImpl,
        },
    ],
    exports: [
        AsbKomponenBangunanStdService,
        AsbKomponenBangunanStdRepository,
    ],
})
export class AsbKomponenBangunanStdModule { }
