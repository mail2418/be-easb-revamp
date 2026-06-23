import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaluranSpesifikasiDesainService } from '../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.service';
import { SaluranSpesifikasiDesainServiceImpl } from '../../application/saluran_spesifikasi_desain/saluran_spesifikasi_desain.service.impl';
import { SaluranSpesifikasiDesainRepository } from '../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.repository';
import { SaluranSpesifikasiDesainRepositoryImpl } from '../../infrastructure/saluran_spesifikasi_desain/repositories/saluran_spesifikasi_desain.repository.impl';
import { SaluranSpesifikasiDesainOrmEntity } from '../../infrastructure/saluran_spesifikasi_desain/orm/saluran_spesifikasi_desain.orm_entity';
import { CalculateVolumeSaluranSpesifikasiDesainUseCase } from '../../application/saluran_spesifikasi_desain/use_cases/calculate_volume_saluran_spesifikasi_desain.use_case';
import { HspkModule } from '../hspk/hspk.module';
import { UsulanSaluranModule } from '../usulan_saluran/usulan_saluran.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SaluranSpesifikasiDesainOrmEntity]),
        HspkModule,
        forwardRef(() => UsulanSaluranModule),
    ],
    providers: [
        { provide: SaluranSpesifikasiDesainService, useClass: SaluranSpesifikasiDesainServiceImpl },
        {
            provide: SaluranSpesifikasiDesainRepository,
            useClass: SaluranSpesifikasiDesainRepositoryImpl,
        },
        CalculateVolumeSaluranSpesifikasiDesainUseCase,
    ],
    exports: [SaluranSpesifikasiDesainService],
})
export class SaluranSpesifikasiDesainModule {}
