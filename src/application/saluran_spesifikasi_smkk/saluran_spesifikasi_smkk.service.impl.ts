import { Injectable } from '@nestjs/common';
import { SaluranSpesifikasiSmkkService } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service';
import { JalanSaluranSpesifikasiSmkkRepository } from '../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.repository';
import { GetSaluranSpesifikasiSmkkByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_smkk/dto/get_saluran_spesifikasi_smkk_by_usulan_saluran.dto';
import { SaluranSpesifikasiSmkk } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.entity';
import { CreateSaluranSpesifikasiSmkkDto } from '../../presentation/saluran_spesifikasi_smkk/dto/create_saluran_spesifikasi_smkk.dto';
import { CreateJalanSaluranSpesifikasiSmkkDto } from '../../presentation/jalan_saluran_spesifikasi_smkk/dto/create_jalan_saluran_spesifikasi_smkk.dto';

@Injectable()
export class SaluranSpesifikasiSmkkServiceImpl implements SaluranSpesifikasiSmkkService {
    constructor(
        private readonly repository: JalanSaluranSpesifikasiSmkkRepository,
    ) { }

    async create(dto: CreateSaluranSpesifikasiSmkkDto): Promise<SaluranSpesifikasiSmkk> {
        const createDto: CreateJalanSaluranSpesifikasiSmkkDto = {
            id_jenis_usulan: dto.id_jenis_usulan,
            id_usulan: dto.id_usulan,
            id_jalan_saluran_smkk: dto.id_jalan_saluran_smkk,
            harga_spec: dto.harga_spec,
            jumlah_barang: dto.jumlah_barang,
            harga_satuan: dto.harga_satuan,
        };
        return await this.repository.create(createDto) as unknown as SaluranSpesifikasiSmkk;
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repository.deleteByUsulanSaluranId(idUsulanSaluran);
    }

    async getByUsulanSaluran(dto: GetSaluranSpesifikasiSmkkByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiSmkk[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.repository.findByUsulanSaluran(dto.idUsulanSaluran, dto.page, dto.amount);
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        return {
            data: data as unknown as SaluranSpesifikasiSmkk[],
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1
        };
    }
}
