import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { JalanJenisPerkerasanService } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service';
import { JalanJenisPerkerasanRepository } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository';
import { CreateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto';
import { UpdateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto';
import { DeleteJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/delete_jalan_jenis_perkerasan.dto';
import { JalanJenisPerkerasanPaginationResultDto } from '../../presentation/jalan_jenis_perkerasan/dto/jalan_jenis_perkerasan_pagination_result.dto';

@Injectable()
export class JalanJenisPerkerasanServiceImpl implements JalanJenisPerkerasanService {
    constructor(private readonly repository: JalanJenisPerkerasanRepository) {}

    async create(dto: CreateJalanJenisPerkerasanDto) {
        return this.repository.create(dto);
    }

    async update(dto: UpdateJalanJenisPerkerasanDto) {
        const existing = await this.repository.findById(dto.id);
        if (!existing) throw new NotFoundException(`Jalan jenis perkerasan with id ${dto.id} not found`);
        return this.repository.update(dto);
    }

    async delete(dto: DeleteJalanJenisPerkerasanDto) {
        const existing = await this.repository.findById(dto.id);
        if (!existing) throw new NotFoundException(`Jalan jenis perkerasan with id ${dto.id} not found`);
        return this.repository.delete(dto.id);
    }

    async findAll(dto: PaginationQueryDto): Promise<JalanJenisPerkerasanPaginationResultDto> {
        const result = await this.repository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page,
            amount: dto.amount,
            totalPages: Math.ceil(result.total / dto.amount) || 1,
        };
    }

    async findById(id: number) {
        const item = await this.repository.findById(id);
        if (!item) throw new NotFoundException(`Jalan jenis perkerasan with id ${id} not found`);
        return item;
    }
}
