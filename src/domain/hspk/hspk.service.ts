import type { Express } from 'express';
import { Hspk } from './hspk.entity';
import { CreateHspkDto } from 'src/presentation/hspk/dto/create_hspk.dto';
import { UpdateHspkDto } from 'src/presentation/hspk/dto/update_hspk.dto';
import { GetHspkDto } from 'src/presentation/hspk/dto/get_hspk.dto';
import { HspkPaginationResultDto } from 'src/presentation/hspk/dto/hspk_pagination_result.dto';
import { CreateBulkHspkResultDto } from 'src/presentation/hspk/dto/create_bulk_hspk_result.dto';

export abstract class HspkService {
    abstract create(dto: CreateHspkDto): Promise<Hspk>;
    abstract createBulk(file: Express.Multer.File): Promise<CreateBulkHspkResultDto>;
    abstract downloadTemplate(): Promise<{ buffer: Buffer; filename: string }>;
    abstract update(dto: UpdateHspkDto): Promise<Hspk>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Hspk | null>;
    abstract findAll(dto: GetHspkDto): Promise<HspkPaginationResultDto>;
    abstract findByNoMataPembayaranAndTahun(no_mata_pembayaran: string, tahun_anggaran: number): Promise<Hspk | null>;
    abstract findByRuangLingkup(id_ruang_lingkup: number, tahun_anggaran?: number): Promise<Hspk[]>;
}

