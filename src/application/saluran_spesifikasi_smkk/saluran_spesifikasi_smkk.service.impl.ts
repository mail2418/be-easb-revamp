import { Injectable } from '@nestjs/common';
import { SaluranSpesifikasiSmkkService } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service';
import { SaluranSpesifikasiSmkkRepository } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.repository';
import { GetSaluranSpesifikasiSmkkByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_smkk/dto/get_saluran_spesifikasi_smkk_by_usulan_saluran.dto';
import { SaluranSpesifikasiSmkk } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.entity';
import { CreateSaluranSpesifikasiSmkkDto } from '../../presentation/saluran_spesifikasi_smkk/dto/create_saluran_spesifikasi_smkk.dto';

@Injectable()
export class SaluranSpesifikasiSmkkServiceImpl implements SaluranSpesifikasiSmkkService {
    constructor(
        private readonly repository: SaluranSpesifikasiSmkkRepository,
    ) { }

    async create(dto: CreateSaluranSpesifikasiSmkkDto): Promise<SaluranSpesifikasiSmkk> {
        return await this.repository.create(dto);
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repository.deleteByUsulanSaluranId(idUsulanSaluran);
    }

    async getByUsulanSaluran(dto: GetSaluranSpesifikasiSmkkByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiSmkk[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.repository.findByUsulanSaluran(dto.idUsulanSaluran, dto.page, dto.amount);
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1
        };
    }
}
