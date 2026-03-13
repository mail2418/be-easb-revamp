import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsbKomponenBangunanNonstdController } from './asb_komponen_bangunan_nonstd.controller';
import { AsbKomponenBangunanNonstdServiceImpl } from '../../application/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service.impl';
import { AsbKomponenBangunanNonstdRepositoryImpl } from '../../infrastructure/asb_komponen_bangunan_nonstd/repositories/asb_komponen_bangunan_nonstd.repository.impl';
import { AsbKomponenBangunanNonstdOrmEntity } from '../../infrastructure/asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity';
import { AsbKomponenBangunanNonstdService } from '../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service';
import { AsbKomponenBangunanNonstdRepository } from '../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbKomponenBangunanNonstdOrmEntity]),
    ],
    controllers: [AsbKomponenBangunanNonstdController],
    providers: [
        {
            provide: AsbKomponenBangunanNonstdService,
            useClass: AsbKomponenBangunanNonstdServiceImpl,
        },
        {
            provide: AsbKomponenBangunanNonstdRepository,
            useClass: AsbKomponenBangunanNonstdRepositoryImpl,
        },
    ],
    exports: [
        AsbKomponenBangunanNonstdService,
        AsbKomponenBangunanNonstdRepository,
    ],
})
export class AsbKomponenBangunanNonstdModule { }
