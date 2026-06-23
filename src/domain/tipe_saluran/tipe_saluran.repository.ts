import { CreateTipeSaluranDto } from 'src/presentation/tipe_saluran/dto/create_tipe_saluran.dto';
import { TipeSaluran } from './tipe_saluran.entity';
import { UpdateTipeSaluranDto } from 'src/presentation/tipe_saluran/dto/update_tipe_saluran.dto';
import { GetTipeSaluranDto } from 'src/presentation/tipe_saluran/dto/get_tipe_saluran.dto';

export abstract class TipeSaluranRepository {
    abstract create(dto: CreateTipeSaluranDto): Promise<TipeSaluran>;
    abstract update(dto: UpdateTipeSaluranDto): Promise<TipeSaluran>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<TipeSaluran | null>;
    abstract findAll(dto: GetTipeSaluranDto): Promise<{ data: TipeSaluran[]; total: number }>;
    abstract findByTipeSaluran(tipe_saluran: string): Promise<TipeSaluran | null>;
}
