import { GetOpdsDto } from 'src/presentation/opd/dto/get_opds.dto';
import { Opd } from './opd.entity';
import { CreateOpdDto } from 'src/presentation/opd/dto/create_opd.dto';
import { UpdateOpdDto } from 'src/presentation/opd/dto/update_opd.dto';
import { DeleteOpdDto } from 'src/presentation/opd/dto/delete_opd.dto';
export abstract class OpdRepository {
    abstract create(dto: CreateOpdDto): Promise<Opd>;
    abstract update(dto: UpdateOpdDto): Promise<Opd>;
    abstract delete(dto: DeleteOpdDto): Promise<boolean>;
    abstract findById(id: number): Promise<Opd | null>;
    abstract findAll(pagination: GetOpdsDto): Promise<{ data: Opd[]; total: number }>;
    abstract getOpdByUser(id_user: number): Promise<Opd | null>;
  }
