import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JalanJenisPerkerasan } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity';
import { JalanJenisPerkerasanRepository } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository';
import { JalanJenisPerkerasanService } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service';
import { CreateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto';
import { GetJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/get_jalan_jenis_perkerasan.dto';
import { JalanJenisPerkerasanPaginationResultDto } from '../../presentation/jalan_jenis_perkerasan/dto/jalan_jenis_perkerasan_pagination_result.dto';
import { UpdateJalanJenisPerkerasanDto } from '../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto';

@Injectable()
export class JalanJenisPerkerasanServiceImpl implements JalanJenisPerkerasanService {
    constructor(private readonly repository: JalanJenisPerkerasanRepository) {}

    async create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        const existing = await this.repository.findByJenisPerkerasan(dto.jenis_perkerasan);
        if (existing) {
            throw new ConflictException(
                `JalanJenisPerkerasan with jenis_perkerasan ${dto.jenis_perkerasan} already exists`,
            );
        }

        const newEntity = await this.repository.create(dto);
        return newEntity;
    }

    async update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`JalanJenisPerkerasan with id ${dto.id} not found`);
        }

        if (dto.jenis_perkerasan && dto.jenis_perkerasan !== existing.jenis_perkerasan) {
            const duplicate = await this.repository.findByJenisPerkerasan(dto.jenis_perkerasan);
            if (duplicate) {
                throw new ConflictException(
                    `JalanJenisPerkerasan with jenis_perkerasan ${dto.jenis_perkerasan} already exists`,
                );
            }
        }

        const updatedEntity = await this.repository.update(dto);
        return updatedEntity;
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(`JalanJenisPerkerasan with id ${id} not found`);
        }

        return await this.repository.delete(id);
    }

    async findById(id: number): Promise<JalanJenisPerkerasan | null> {
        return await this.repository.findById(id);
    }

    async findAll(
        dto: GetJalanJenisPerkerasanDto,
    ): Promise<JalanJenisPerkerasanPaginationResultDto> {
        const result = await this.repository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1,
        };
    }

    async findByJenisPerkerasan(jenis_perkerasan: string): Promise<JalanJenisPerkerasan | null> {
        return await this.repository.findByJenisPerkerasan(jenis_perkerasan);
    }
}
