import { Module } from "@nestjs/common";
import { JalanSpesifikasiDesainKakuController } from "./jalan_spesifikasi_desain_kaku.controller";
import { JalanSpesifikasiDesainKakuService } from "../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.service";
import { JalanSpesifikasiDesainKakuRepository } from "../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.repository";
import { JalanSpesifikasiDesainKakuRepositoryImpl } from "../../infrastructure/jalan_spesifikasi_desain_kaku/repositories/jalan_spesifikasi_desain_kaku.repository.impl";
import { JalanSpesifikasiDesainKakuServiceImpl } from "../../application/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainKakuOrmEntity } from "../../infrastructure/jalan_spesifikasi_desain_kaku/orm/jalan_spesifikasi_desain_kaku.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanSpesifikasiDesainKakuOrmEntity])],
    controllers: [JalanSpesifikasiDesainKakuController],
    providers: [
        {
            provide: JalanSpesifikasiDesainKakuService,
            useClass: JalanSpesifikasiDesainKakuServiceImpl,
        },
        {
            provide: JalanSpesifikasiDesainKakuRepository,
            useClass: JalanSpesifikasiDesainKakuRepositoryImpl,
        },
    ],
    exports: [JalanSpesifikasiDesainKakuService],
})
export class JalanSpesifikasiDesainKakuModule {}

