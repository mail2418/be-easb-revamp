import type { Express } from 'express';
import { GetHspksDto } from '../../presentation/hspk/dto/get_hspks.dto';
import { CreateHspkDto } from '../../presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from '../../presentation/hspk/dto/update_hspk.dto';
import { DeleteHspkDto } from '../../presentation/hspk/dto/delete_hspk.dto';
import { GetHspkDetailDto } from '../../presentation/hspk/dto/get_hspk_detail.dto';
import { GetHspkByRuangLingkupDto } from '../../presentation/hspk/dto/get_hspk_by_ruang_lingkup.dto';
import { BulkHspkDto } from '../../presentation/hspk/dto/bulk_hspk.dto';
import { Hspk } from './hspk.entity';
import { HspkPaginationResultDto } from '../../presentation/hspk/dto/hspk_pagination_result.dto';

export abstract class HspkService {
    abstract create(dto: CreateHspkDto, tahunAnggaran?: number): Promise<Hspk>;
    abstract update(dto: UpdateHspkDto): Promise<Hspk>;
    abstract delete(dto: DeleteHspkDto): Promise<boolean>;
    abstract findAll(dto: GetHspksDto): Promise<HspkPaginationResultDto>;
    abstract findById(dto: GetHspkDetailDto): Promise<Hspk>;
    abstract findByRuangLingkup(dto: GetHspkByRuangLingkupDto): Promise<Hspk[]>;
    abstract bulkImport(dto: BulkHspkDto, file: Express.Multer.File): Promise<{ imported: number }>;
    abstract generateTemplate(): Promise<Buffer>;
}
