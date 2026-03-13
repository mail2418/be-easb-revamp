import { CreateAsbJakonDto } from 'src/presentation/asb_jakon/dto/create_asb_jakon.dto';
import { AsbJakon } from './asb_jakon.entity';
import { AsbJakonType } from './asb_jakon_type.enum';
import { UpdateAsbJakonDto } from 'src/presentation/asb_jakon/dto/update_asb_jakon.dto';
import { DeleteAsbJakonDto } from 'src/presentation/asb_jakon/dto/delete_asb_jakon.dto';
import { GetAsbJakonListDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_list.dto';
import { GetAsbJakonDetailDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_detail.dto';
import { GetAsbJakonListFilterDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_list_filter.dto';
import { GetJakonByPriceRangeDto } from 'src/application/asb_jakon/dto/get_jakon_by_price_range.dto';

export abstract class AsbJakonService {
    abstract create(dto: CreateAsbJakonDto): Promise<AsbJakon>;
    abstract update(dto: UpdateAsbJakonDto): Promise<AsbJakon>;
    abstract delete(dto: DeleteAsbJakonDto): Promise<boolean>;
    abstract getAll(pagination: GetAsbJakonListDto): Promise<{ data: AsbJakon[]; total: number }>;
    abstract getDetail(dto: GetAsbJakonDetailDto): Promise<AsbJakon>;
    abstract findByAsbJenisId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]>;
    abstract findByAsbTipeBangunanId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]>;
    abstract findByAsbKlasifikasiId(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]>;
    abstract findByTahun(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]>;
    abstract findByType(dto: GetAsbJakonListFilterDto): Promise<AsbJakon[]>;
    abstract getJakonByPriceRange(dto: GetJakonByPriceRangeDto): Promise<AsbJakon | null>;
}
