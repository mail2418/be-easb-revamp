import { CreateSaluranKebijakanDto } from "../../presentation/saluran_kebijakan/dto/create_saluran_kebijakan.dto";
import { UpdateSaluranKebijakanDto } from "../../presentation/saluran_kebijakan/dto/update_saluran_kebijakan.dto";
import { GetSaluranKebijakanDto } from "../../presentation/saluran_kebijakan/dto/get_saluran_kebijakan.dto";
import { SaluranKebijakanPaginationResultDto } from "../../presentation/saluran_kebijakan/dto/saluran_kebijakan_pagination_result.dto";
import { SaluranKebijakan } from "./saluran_kebijakan.entity";

export abstract class SaluranKebijakanService {
    abstract create(dto: CreateSaluranKebijakanDto): Promise<SaluranKebijakan>;
    abstract update(dto: UpdateSaluranKebijakanDto): Promise<SaluranKebijakan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<SaluranKebijakan | null>;
    abstract findByKabkotaBulanTahun(idKabkota: number, bulan: number, tahun: number): Promise<SaluranKebijakan | null>;
    abstract findAll(dto: GetSaluranKebijakanDto): Promise<SaluranKebijakanPaginationResultDto>;
}
