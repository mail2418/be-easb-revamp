import { CreateAsbJakonDto } from "src/presentation/asb_jakon/dto/create_asb_jakon.dto";
import { AsbJakon } from "./asb_jakon.entity";
import { AsbJakonType } from "./asb_jakon_type.enum";
import { GetJakonByPriceRangeDto } from "src/application/asb_jakon/dto/get_jakon_by_price_range.dto";

export abstract class AsbJakonRepository {
    abstract create(dto: CreateAsbJakonDto): Promise<AsbJakon>;
    abstract update(id: number, dto: Partial<AsbJakon>): Promise<AsbJakon>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbJakon | null>;
    abstract findAll(pagination: { page: number; amount: number }): Promise<{ data: AsbJakon[]; total: number }>;
    abstract findByAsbJenisId(id: number): Promise<AsbJakon[]>;
    abstract findByAsbTipeBangunanId(id: number): Promise<AsbJakon[]>;
    abstract findByAsbKlasifikasiId(id: number): Promise<AsbJakon[]>;
    abstract findByTahun(tahun: number): Promise<AsbJakon[]>;
    abstract findByType(type: AsbJakonType): Promise<AsbJakon[]>;
    abstract findByPriceRange(dto: GetJakonByPriceRangeDto): Promise<AsbJakon | null>;
}
