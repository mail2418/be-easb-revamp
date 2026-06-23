import { UsulanJalanStatus } from './usulan_jalan_status.entity';
import { CreateUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/create_usulan_jalan_status.dto';
import { UpdateUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/update_usulan_jalan_status.dto';
import { GetUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/get_usulan_jalan_status.dto';

export abstract class UsulanJalanStatusRepository {
    abstract create(dto: CreateUsulanJalanStatusDto): Promise<UsulanJalanStatus>;
    abstract update(dto: UpdateUsulanJalanStatusDto): Promise<UsulanJalanStatus>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<UsulanJalanStatus | null>;
    abstract findAll(
        dto: GetUsulanJalanStatusDto,
    ): Promise<{ data: UsulanJalanStatus[]; total: number }>;
    abstract findByStatus(status: string): Promise<UsulanJalanStatus | null>;
}
