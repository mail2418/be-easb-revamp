import { CreateRekeningDto } from '../../presentation/rekening/dto/create_rekening.dto';
import { Rekening } from './rekening.entity';
import { GetRekeningsDto } from '../../presentation/rekening/dto/get_rekenings.dto';
import { UpdateRekeningDto } from '../../presentation/rekening/dto/update_rekening.dto';

export abstract class RekeningService {
    abstract create(rekening: CreateRekeningDto): Promise<Rekening>;
    abstract update(rekening: UpdateRekeningDto): Promise<Rekening>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Rekening | null>;
    abstract getRekeningByKode(rekeningKode: string): Promise<Rekening | null>;
    abstract findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }>;
}
