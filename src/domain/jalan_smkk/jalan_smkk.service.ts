import { CreateJalanSmkkDto } from "../../presentation/jalan_smkk/dto/create_jalan_smkk.dto";
import { UpdateJalanSmkkDto } from "../../presentation/jalan_smkk/dto/update_jalan_smkk.dto";
import { GetJalanSmkkDto } from "../../presentation/jalan_smkk/dto/get_jalan_smkk.dto";
import { JalanSmkkPaginationResultDto } from "../../presentation/jalan_smkk/dto/jalan_smkk_pagination_result.dto";
import { JalanSmkk } from "./jalan_smkk.entity";

export abstract class JalanSmkkService {
    abstract create(dto: CreateJalanSmkkDto): Promise<JalanSmkk>;
    abstract update(dto: UpdateJalanSmkkDto): Promise<JalanSmkk>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanSmkk | null>;
    abstract findByBulanAndTahun(bulan: number, tahun: number): Promise<JalanSmkk | null>;
    abstract findAll(dto: GetJalanSmkkDto): Promise<JalanSmkkPaginationResultDto>;
}
