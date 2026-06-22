import { JalanKeteranganTambahan } from "./jalan_keterangan_tambahan.entity";

export abstract class JalanKeteranganTambahanService {
    abstract create(dto): Promise<JalanKeteranganTambahan>;
    abstract update(dto): Promise<JalanKeteranganTambahan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<JalanKeteranganTambahan | null>;
    abstract findAll(dto): Promise<{data: JalanKeteranganTambahan[], total: number}>;
}
