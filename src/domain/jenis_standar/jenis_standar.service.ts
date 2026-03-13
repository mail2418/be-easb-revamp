import { JenisStandar } from "./jenis_standar.entity";
import { CreateJenisStandarDto } from "../../presentation/jenis_standar/dto/create_jenis_standar.dto";
import { UpdateJenisStandarDto } from "../../presentation/jenis_standar/dto/update_jenis_standar.dto";
import { GetJenisStandarDto } from "../../presentation/jenis_standar/dto/get_jenis_standar.dto";
import { JenisStandarPaginationResult } from "../../presentation/jenis_standar/dto/jenis_standar_pagination_result.dto";

export abstract class JenisStandarService {
    abstract create(dto: CreateJenisStandarDto): Promise<JenisStandar>;
    abstract update(dto: UpdateJenisStandarDto): Promise<JenisStandar>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JenisStandar | null>;
    abstract findAll(dto: GetJenisStandarDto): Promise<JenisStandarPaginationResult>;
    abstract findByJenis(jenis: string): Promise<JenisStandar | null>;
}
