import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaluranSpesifikasiSmkkService } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service';
import { SaluranSpesifikasiSmkkServiceImpl } from '../../application/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service.impl';
import { SaluranSpesifikasiSmkkRepository } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.repository';
import { SaluranSpesifikasiSmkkRepositoryImpl } from '../../infrastructure/saluran_spesifikasi_smkk/repositories/saluran_spesifikasi_smkk.repository.impl';
import { SaluranSpesifikasiSmkkOrmEntity } from '../../infrastructure/saluran_spesifikasi_smkk/orm/saluran_spesifikasi_smkk.orm_entity';
import { UsulanSaluranModule } from '../usulan_saluran/usulan_saluran.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SaluranSpesifikasiSmkkOrmEntity]),
        forwardRef(() => UsulanSaluranModule),
    ],
    providers: [
        { provide: SaluranSpesifikasiSmkkService, useClass: SaluranSpesifikasiSmkkServiceImpl },
        { provide: SaluranSpesifikasiSmkkRepository, useClass: SaluranSpesifikasiSmkkRepositoryImpl },
    ],
    exports: [SaluranSpesifikasiSmkkService],
})
export class SaluranSpesifikasiSmkkModule {}
