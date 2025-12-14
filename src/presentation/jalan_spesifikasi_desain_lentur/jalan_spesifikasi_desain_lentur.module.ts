import { Module } from "@nestjs/common";
import { JalanSpesifikasiDesainLenturController } from "./jalan_spesifikasi_desain_lentur.controller";
import { JalanSpesifikasiDesainLenturService } from "../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.service";
import { JalanSpesifikasiDesainLenturRepository } from "../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.repository";
import { JalanSpesifikasiDesainLenturRepositoryImpl } from "../../infrastructure/jalan_spesifikasi_desain_lentur/repositories/jalan_spesifikasi_desain_lentur.repository.impl";
import { JalanSpesifikasiDesainLenturServiceImpl } from "../../application/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.service.impl";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainLenturOrmEntity } from "../../infrastructure/jalan_spesifikasi_desain_lentur/orm/jalan_spesifikasi_desain_lentur.orm_entity";

@Module({
    imports: [TypeOrmModule.forFeature([JalanSpesifikasiDesainLenturOrmEntity])],
    controllers: [JalanSpesifikasiDesainLenturController],
    providers: [
        {
            provide: JalanSpesifikasiDesainLenturService,
            useClass: JalanSpesifikasiDesainLenturServiceImpl,
        },
        {
            provide: JalanSpesifikasiDesainLenturRepository,
            useClass: JalanSpesifikasiDesainLenturRepositoryImpl,
        },
    ],
    exports: [JalanSpesifikasiDesainLenturService],
})
export class JalanSpesifikasiDesainLenturModule {}

