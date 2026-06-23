import { UsulanJalanStatus } from './usulan_jalan_status.entity';
import { CreateUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/create_usulan_jalan_status.dto';
import { UpdateUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/update_usulan_jalan_status.dto';
import { GetUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/get_usulan_jalan_status.dto';
import { UsulanJalanStatusPaginationResultDto } from '../../presentation/usulan_jalan_status/dto/usulan_jalan_status_pagination_result.dto';

export abstract class UsulanJalanStatusService {
    abstract create(dto: CreateUsulanJalanStatusDto): Promise<UsulanJalanStatus>;
    abstract update(dto: UpdateUsulanJalanStatusDto): Promise<UsulanJalanStatus>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<UsulanJalanStatus | null>;
    abstract findAll(dto: GetUsulanJalanStatusDto): Promise<UsulanJalanStatusPaginationResultDto>;
    abstract findByStatus(status: string): Promise<UsulanJalanStatus | null>;
}
