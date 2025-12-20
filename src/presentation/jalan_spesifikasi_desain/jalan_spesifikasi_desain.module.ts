import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainController } from "./jalan_spesifikasi_desain.controller";
import { JalanSpesifikasiDesainService } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service";
import { JalanSpesifikasiDesainServiceImpl } from "../../application/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service.impl";
import { JalanSpesifikasiDesainRepository } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.repository";
import { JalanSpesifikasiDesainRepositoryImpl } from "../../infrastructure/jalan_spesifikasi_desain/repositories/jalan_spesifikasi_desain.repository.impl";
import { JalanSpesifikasiDesainOrmEntity } from "../../infrastructure/jalan_spesifikasi_desain/orm/jalan_spesifikasi_desain.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanSpesifikasiDesainOrmEntity])],
    controllers: [JalanSpesifikasiDesainController],
    providers: [
        {
            provide: JalanSpesifikasiDesainService,
            useClass: JalanSpesifikasiDesainServiceImpl
        },
        {
            provide: JalanSpesifikasiDesainRepository,
            useClass: JalanSpesifikasiDesainRepositoryImpl
        }
    ],
    exports: [JalanSpesifikasiDesainService]
})
export class JalanSpesifikasiDesainModule { }
