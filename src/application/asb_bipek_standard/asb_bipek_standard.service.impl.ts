import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbBipekStandard } from '../../domain/asb_bipek_standard/asb_bipek_standard.entity';
import { AsbBipekStandardService } from '../../domain/asb_bipek_standard/asb_bipek_standard.service';
import { AsbBipekStandardRepository } from '../../domain/asb_bipek_standard/asb_bipek_standard.repository';
import { CreateAsbBipekStandardDto } from './dto/create_asb_bipek_standard.dto';
import { UpdateAsbBipekStandardDto } from './dto/update_asb_bipek_standard.dto';
import { GetAsbBipekStandardByAsbDto } from '../../presentation/asb_bipek_standard/dto/get_asb_bipek_standard_by_asb.dto';

@Injectable()
export class AsbBipekStandardServiceImpl extends AsbBipekStandardService {
    constructor(
        private readonly repository: AsbBipekStandardRepository,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBipekStandardDto,
    ): Promise<AsbBipekStandard> {
        return await this.repository.create(dto);
    }

    async update(dto: UpdateAsbBipekStandardDto): Promise<AsbBipekStandard> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(
                `AsbBipekStandard with id ${dto.id} not found`,
            );
        }

        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(
                `AsbBipekStandard with id ${id} not found`,
            );
        }

        await this.repository.delete(id);
    }

    async getById(id: number): Promise<AsbBipekStandard> {
        const bipekStandard = await this.repository.findById(id);
        if (!bipekStandard) {
            throw new NotFoundException(
                `AsbBipekStandard with id ${id} not found`,
            );
        }
        return bipekStandard;
    }

    async getByAsb(dto: GetAsbBipekStandardByAsbDto): Promise<{ data: AsbBipekStandard[], total: number, page: number, amount: number, totalPages: number }> {
        const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);
        
        // If pagination is not provided, return all data with page=1, amount=total
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        
        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1
        };
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.deleteByAsbId(idAsb);
    }
}
