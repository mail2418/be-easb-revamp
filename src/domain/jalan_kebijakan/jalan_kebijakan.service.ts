import { CreateJalanKebijakanDto } from "../../presentation/jalan_kebijakan/dto/create_jalan_kebijakan.dto";
import { UpdateJalanKebijakanDto } from "../../presentation/jalan_kebijakan/dto/update_jalan_kebijakan.dto";
import { GetJalanKebijakanDto } from "../../presentation/jalan_kebijakan/dto/get_jalan_kebijakan.dto";
import { JalanKebijakanPaginationResultDto } from "../../presentation/jalan_kebijakan/dto/jalan_kebijakan_pagination_result.dto";
import { JalanKebijakan } from "./jalan_kebijakan.entity";

export abstract class JalanKebijakanService {
    abstract create(dto: CreateJalanKebijakanDto): Promise<JalanKebijakan>;
    abstract update(dto: UpdateJalanKebijakanDto): Promise<JalanKebijakan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanKebijakan | null>;
    abstract findByKabkotaBulanTahun(idKabkota: number, bulan: number, tahun: number): Promise<JalanKebijakan | null>;
    abstract findAll(dto: GetJalanKebijakanDto): Promise<JalanKebijakanPaginationResultDto>;
}
