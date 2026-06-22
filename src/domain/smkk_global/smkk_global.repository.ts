import { CreateSmkkGlobalDto } from "../../presentation/smkk_global/dto/create_smkk_global.dto";
import { UpdateSmkkGlobalDto } from "../../presentation/smkk_global/dto/update_smkk_global.dto";
import { GetSmkkGlobalDto } from "../../presentation/smkk_global/dto/get_smkk_global.dto";
import { SmkkGlobal } from "./smkk_global.entity";

export abstract class SmkkGlobalRepository {
    abstract create(dto: CreateSmkkGlobalDto): Promise<SmkkGlobal>;
    abstract update(dto: UpdateSmkkGlobalDto): Promise<SmkkGlobal>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<SmkkGlobal | null>;
    abstract findByBulanAndTahun(bulan: number, tahun: number): Promise<SmkkGlobal | null>;
    abstract findAll(dto: GetSmkkGlobalDto): Promise<{ data: SmkkGlobal[]; total: number }>;
    abstract getLatest(): Promise<SmkkGlobal | null>;
}

