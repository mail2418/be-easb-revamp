import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JalanSpesifikasiDesainController } from './jalan_spesifikasi_desain.controller';
import { JalanSpesifikasiDesainService } from '../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service';
import { JalanSpesifikasiDesainServiceImpl } from '../../application/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service.impl';
import { JalanSpesifikasiDesainRepository } from '../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.repository';
import { JalanSpesifikasiDesainRepositoryImpl } from '../../infrastructure/jalan_spesifikasi_desain/repositories/jalan_spesifikasi_desain.repository.impl';
import { JalanSpesifikasiDesainOrmEntity } from '../../infrastructure/jalan_spesifikasi_desain/orm/jalan_spesifikasi_desain.orm_entity';
import { CalculateVolumeJalanSpesifikasiDesainUseCase } from '../../application/jalan_spesifikasi_desain/use_cases/calculate_volume_jalan_spesifikasi_desain.use_case';
import { HspkModule } from '../hspk/hspk.module';
import { UsulanJalanModule } from '../usulan_jalan/usulan_jalan.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([JalanSpesifikasiDesainOrmEntity]),
        HspkModule,
        forwardRef(() => UsulanJalanModule),
    ],
    controllers: [JalanSpesifikasiDesainController],
    providers: [
        {
            provide: JalanSpesifikasiDesainService,
            useClass: JalanSpesifikasiDesainServiceImpl,
        },
        {
            provide: JalanSpesifikasiDesainRepository,
            useClass: JalanSpesifikasiDesainRepositoryImpl,
        },
        CalculateVolumeJalanSpesifikasiDesainUseCase,
    ],
    exports: [JalanSpesifikasiDesainService],
})
export class JalanSpesifikasiDesainModule {}
