import { Rekening } from './rekening.entity';
import { CreateRekeningDto } from '../../presentation/rekening/dto/create_rekening.dto';
import { UpdateRekeningDto } from '../../presentation/rekening/dto/update_rekening.dto';
import { GetRekeningsDto } from '../../presentation/rekening/dto/get_rekenings.dto';

export abstract class RekeningRepository {
  abstract findByKode(rekeningKode: string): Promise<Rekening | null>;
  abstract findById(id: number): Promise<Rekening | null>;
  abstract create(data: CreateRekeningDto): Promise<Rekening>;
  abstract update(id: number, data: UpdateRekeningDto): Promise<Rekening>;
  abstract delete(id: number): Promise<boolean>;
  abstract findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }>;
}
