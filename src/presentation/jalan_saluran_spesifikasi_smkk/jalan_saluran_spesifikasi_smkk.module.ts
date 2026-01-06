import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JalanSaluranSpesifikasiSmkkController } from "./jalan_saluran_spesifikasi_smkk.controller";
import { JalanSaluranSpesifikasiSmkkService } from "../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.service";
import { JalanSaluranSpesifikasiSmkkServiceImpl } from "../../application/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.service.impl";
import { JalanSaluranSpesifikasiSmkkRepository } from "../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.repository";
import { JalanSaluranSpesifikasiSmkkRepositoryImpl } from "../../infrastructure/jalan_saluran_spesifikasi_smkk/repositories/jalan_saluran_spesifikasi_smkk.repository.impl";
import { JalanSaluranSpesifikasiSmkkOrmEntity } from "../../infrastructure/jalan_saluran_spesifikasi_smkk/orm/jalan_saluran_spesifikasi_smkk.orm_entity";
import { UsulanJalanModule } from "../usulan_jalan/usulan_jalan.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([JalanSaluranSpesifikasiSmkkOrmEntity]),
        forwardRef(() => UsulanJalanModule),
    ],
    controllers: [JalanSaluranSpesifikasiSmkkController],
    providers: [
        {
            provide: JalanSaluranSpesifikasiSmkkService,
            useClass: JalanSaluranSpesifikasiSmkkServiceImpl
        },
        {
            provide: JalanSaluranSpesifikasiSmkkRepository,
            useClass: JalanSaluranSpesifikasiSmkkRepositoryImpl
        },
    ],
    exports: [JalanSaluranSpesifikasiSmkkService]
})
export class JalanSaluranSpesifikasiSmkkModule { }

