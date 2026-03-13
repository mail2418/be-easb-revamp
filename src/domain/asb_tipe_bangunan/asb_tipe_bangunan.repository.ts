import { CreateAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/create_asb_tipe_bangunan.dto";
import { UpdateAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/update_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan.dto";
import { AsbTipeBangunan } from "./asb_tipe_bangunan.entity";

export abstract class AsbTipeBangunanRepository {
    abstract create(dto: CreateAsbTipeBangunanDto): Promise<AsbTipeBangunan>;
    abstract update(dto: UpdateAsbTipeBangunanDto): Promise<AsbTipeBangunan>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbTipeBangunan | null>;
    abstract findByTipeBangunan(tipe_bangunan: string): Promise<AsbTipeBangunan | null>;
    abstract findAll(dto: GetAsbTipeBangunanDto): Promise<{ data: AsbTipeBangunan[], total: number }>;
}