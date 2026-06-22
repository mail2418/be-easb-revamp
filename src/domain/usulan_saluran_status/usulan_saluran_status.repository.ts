import { UsulanSaluranStatus } from "./usulan_saluran_status.entity";
import { CreateUsulanSaluranStatusDto } from "../../presentation/usulan_saluran_status/dto/create_usulan_saluran_status.dto";
import { UpdateUsulanSaluranStatusDto } from "../../presentation/usulan_saluran_status/dto/update_usulan_saluran_status.dto";
import { GetUsulanSaluranStatusDto } from "../../presentation/usulan_saluran_status/dto/get_usulan_saluran_status.dto";

export abstract class UsulanSaluranStatusRepository {
    abstract create(dto: CreateUsulanSaluranStatusDto): Promise<UsulanSaluranStatus>;
    abstract update(dto: UpdateUsulanSaluranStatusDto): Promise<UsulanSaluranStatus>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<UsulanSaluranStatus | null>;
    abstract findAll(dto: GetUsulanSaluranStatusDto): Promise<{ data: UsulanSaluranStatus[]; total: number }>;
    abstract findByStatus(status: string): Promise<UsulanSaluranStatus | null>;
}
