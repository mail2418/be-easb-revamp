import { Injectable } from "@nestjs/common";
import { JalanSaluranSpesifikasiSmkkService } from "../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.service";
import { JalanSaluranSpesifikasiSmkkRepository } from "../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.repository";
import { GetJalanSaluranSpesifikasiSmkkByUsulanJalanDto } from "../../presentation/jalan_saluran_spesifikasi_smkk/dto/get_jalan_saluran_spesifikasi_smkk_by_usulan_jalan.dto";
import { JalanSaluranSpesifikasiSmkk } from "../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.entity";
import { CreateJalanSaluranSpesifikasiSmkkDto } from "../../presentation/jalan_saluran_spesifikasi_smkk/dto/create_jalan_saluran_spesifikasi_smkk.dto";

@Injectable()
export class JalanSaluranSpesifikasiSmkkServiceImpl implements JalanSaluranSpesifikasiSmkkService {
    constructor(
        private readonly repository: JalanSaluranSpesifikasiSmkkRepository,
    ) { }

    async create(dto: CreateJalanSaluranSpesifikasiSmkkDto): Promise<JalanSaluranSpesifikasiSmkk> {
        return await this.repository.create(dto);
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.repository.deleteByUsulanJalanId(idUsulanJalan);
    }

    async getByUsulanJalan(dto: GetJalanSaluranSpesifikasiSmkkByUsulanJalanDto): Promise<{ data: JalanSaluranSpesifikasiSmkk[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.repository.findByUsulanJalan(dto.idUsulanJalan, dto.page, dto.amount);
        
        // If pagination is not provided, return all data with page=1, amount=total
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

