import { Opd } from './opd.entity';
import { CreateOpdDto } from '../../presentation/opd/dto/create_opd.dto';
import { UpdateOpdDto } from '../../presentation/opd/dto/update_opd.dto';
import { DeleteOpdDto } from '../../presentation/opd/dto/delete_opd.dto';
import { GetOpdDetailDto } from '../../presentation/opd/dto/get_opd_detail.dto';
import { GetOpdsDto } from '../../presentation/opd/dto/get_opds.dto';
import { OpdsPaginationResultDto } from '../../presentation/opd/dto/opds_pagination_result.dto';

export abstract class OpdService {
  abstract createOpd(dto: CreateOpdDto): Promise<Opd>;
  abstract updateOpd(dto: UpdateOpdDto): Promise<Opd>;
  abstract deleteOpd(dto: DeleteOpdDto): Promise<boolean>;
  abstract getOpdById(dto: GetOpdDetailDto): Promise<Opd | null>;
  abstract getOpds(dto: GetOpdsDto): Promise<OpdsPaginationResultDto>;
  abstract getOpdByUser(id_user: number): Promise<Opd | null>;
}
