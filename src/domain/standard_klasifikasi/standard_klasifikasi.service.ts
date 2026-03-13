import { StandardKlasifikasi } from "./standard_klasifikasi.entity";
import { CreateStandardKlasifikasiDto } from "../../presentation/standard_klasifikasi/dto/create_standard_klasifikasi.dto";
import { UpdateStandardKlasifikasiDto } from "../../presentation/standard_klasifikasi/dto/update_standard_klasifikasi.dto";
import { DeleteStandardKlasifikasiDto } from "../../presentation/standard_klasifikasi/dto/delete_standard_klasifikasi.dto";
import { GetStandardKlasifikasisDto } from "../../presentation/standard_klasifikasi/dto/get_standard_klasifikasis.dto";
import { GetStandardKlasifikasiDetailDto } from "../../presentation/standard_klasifikasi/dto/get_standard_klasifikasi_detail.dto";
import { StandardKlasifikasisPaginationResultDto } from "../../presentation/standard_klasifikasi/dto/standard_klasifikasis_pagination_result.dto";

export abstract class StandardKlasifikasiService {
    abstract create(dto: CreateStandardKlasifikasiDto): Promise<StandardKlasifikasi>;
    abstract update(dto: UpdateStandardKlasifikasiDto): Promise<StandardKlasifikasi>;
    abstract delete(dto: DeleteStandardKlasifikasiDto): Promise<boolean>;
    abstract findAll(dto: GetStandardKlasifikasisDto): Promise<StandardKlasifikasisPaginationResultDto>;
    abstract findById(dto: GetStandardKlasifikasiDetailDto): Promise<StandardKlasifikasi>;
}
