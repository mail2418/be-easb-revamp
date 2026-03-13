import { CreateAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/create_asb_tipe_bangunan.dto";
import { UpdateAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/update_asb_tipe_bangunan.dto";
import { DeleteAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/delete_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDetailDto } from "../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan_detail.dto";
import { AsbTipeBangunan } from "./asb_tipe_bangunan.entity";
import { AsbTipeBangunanPaginationResultDto } from "src/presentation/asb_tipe_bangunan/dto/asb_tipe_bangunan_pagination_result.dto";

export abstract class AsbTipeBangunanService {
    abstract create(dto: CreateAsbTipeBangunanDto): Promise<AsbTipeBangunan>;
    abstract update(dto: UpdateAsbTipeBangunanDto): Promise<AsbTipeBangunan>;
    abstract delete(dto: DeleteAsbTipeBangunanDto): Promise<boolean>;
    abstract findAll(dto: GetAsbTipeBangunanDto): Promise<AsbTipeBangunanPaginationResultDto>;
    abstract findById(dto: GetAsbTipeBangunanDetailDto): Promise<AsbTipeBangunan>;
}
