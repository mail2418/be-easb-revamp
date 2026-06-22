import { CreatePpnGlobalDto } from "../../presentation/ppn_global/dto/create_ppn_global.dto";
import { UpdatePpnGlobalDto } from "../../presentation/ppn_global/dto/update_ppn_global.dto";
import { GetPpnGlobalDto } from "../../presentation/ppn_global/dto/get_ppn_global.dto";
import { PpnGlobal } from "./ppn_global.entity";

export abstract class PpnGlobalRepository {
    abstract create(dto: CreatePpnGlobalDto): Promise<PpnGlobal>;
    abstract update(dto: UpdatePpnGlobalDto): Promise<PpnGlobal>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<PpnGlobal | null>;
    abstract findByBulanAndTahun(bulan: number, tahun: number): Promise<PpnGlobal | null>;
    abstract findAll(dto: GetPpnGlobalDto): Promise<{ data: PpnGlobal[]; total: number }>;
    abstract getLatest(): Promise<PpnGlobal | null>;
}
