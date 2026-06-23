import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OpdService } from '../../domain/opd/opd.service';
import { OpdRepository } from '../../domain/opd/opd.repository';
import { Opd } from '../../domain/opd/opd.entity';
import { CreateOpdDto } from '../../presentation/opd/dto/create_opd.dto';
import { UpdateOpdDto } from '../../presentation/opd/dto/update_opd.dto';
import { DeleteOpdDto } from '../../presentation/opd/dto/delete_opd.dto';
import { GetOpdDetailDto } from '../../presentation/opd/dto/get_opd_detail.dto';
import { GetOpdsDto } from '../../presentation/opd/dto/get_opds.dto';
import { OpdsPaginationResultDto } from '../../presentation/opd/dto/opds_pagination_result.dto';

@Injectable()
export class OpdServiceImpl implements OpdService {
    constructor(private readonly opdRepository: OpdRepository) {}

    async createOpd(dto: CreateOpdDto): Promise<Opd> {
        // Check if opd with the same name already exists
        const existingOpd = await this.opdRepository.findById(dto.id_user);

        if (existingOpd) {
            throw new ConflictException(`OPD with id_user ${dto.id_user} already exists`);
        }

        const newOpd = await this.opdRepository.create(dto);
        return newOpd;
    }

    async updateOpd(dto: UpdateOpdDto): Promise<Opd> {
        // Check if opd exists
        const existingOpd = await this.opdRepository.findById(dto.id);
        if (!existingOpd) {
            throw new NotFoundException(`OPD with id ${dto.id} not found`);
        }

        if (existingOpd) {
            throw new ConflictException(`OPD with id_user ${dto.id_user} already exists`);
        }

        const updatedOpd = await this.opdRepository.update(dto);
        return updatedOpd;
    }

    async deleteOpd(dto: DeleteOpdDto): Promise<boolean> {
        // Check if opd exists
        const existingOpd = await this.opdRepository.findById(dto.id);
        if (!existingOpd) {
            throw new NotFoundException(`OPD with id ${dto.id} not found`);
        }

        return await this.opdRepository.delete(dto);
    }

    async getOpdById(dto: GetOpdDetailDto): Promise<Opd | null> {
        return await this.opdRepository.findById(dto.id);
    }

    async getOpds(dto: GetOpdsDto): Promise<OpdsPaginationResultDto> {
        const opds = await this.opdRepository.findAll(dto);
        const page = dto.page ?? 1;
        const amount = dto.amount ?? opds.total;

        return {
            data: opds.data,
            total: opds.total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(opds.total / amount) : 0,
        };
    }

    async getOpdByUser(id_user: number): Promise<Opd | null> {
        return await this.opdRepository.getOpdByUser(id_user);
    }
}
