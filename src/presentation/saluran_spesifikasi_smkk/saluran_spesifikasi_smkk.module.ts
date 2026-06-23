import { Module, forwardRef } from '@nestjs/common';
import { SaluranSpesifikasiSmkkService } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service';
import { SaluranSpesifikasiSmkkServiceImpl } from '../../application/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service.impl';
import { JalanSaluranSpesifikasiSmkkModule } from '../jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.module';
import { UsulanSaluranModule } from '../usulan_saluran/usulan_saluran.module';

@Module({
    imports: [JalanSaluranSpesifikasiSmkkModule, forwardRef(() => UsulanSaluranModule)],
    providers: [
        { provide: SaluranSpesifikasiSmkkService, useClass: SaluranSpesifikasiSmkkServiceImpl },
    ],
    exports: [SaluranSpesifikasiSmkkService],
})
export class SaluranSpesifikasiSmkkModule {}
