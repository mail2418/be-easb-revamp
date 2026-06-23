import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbBipekNonStd } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.entity';
import { AsbBipekNonStdService } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.service';
import { AsbBipekNonStdRepository } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.repository';
import { CreateAsbBipekNonStdDto } from './dto/create_asb_bipek_non_std.dto';
import { UpdateAsbBipekNonStdDto } from './dto/update_asb_bipek_non_std.dto';
import { GetAsbBipekNonStdByAsbDto } from '../../presentation/asb_bipek_non_std/dto/get_asb_bipek_non_std_by_asb.dto';

@Injectable()
export class AsbBipekNonStdServiceImpl extends AsbBipekNonStdService {
    constructor(private readonly repository: AsbBipekNonStdRepository) {
        super();
    }

    async create(dto: CreateAsbBipekNonStdDto): Promise<AsbBipekNonStd> {
        return await this.repository.create(dto);
    }

    async update(dto: UpdateAsbBipekNonStdDto): Promise<AsbBipekNonStd> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`AsbBipekNonStd with id ${dto.id} not found`);
        }

        return await this.repository.update(dto);
    }

    async delete(id: number): Promise<void> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new NotFoundException(`AsbBipekNonStd with id ${id} not found`);
        }

        await this.repository.delete(id);
    }

    async getById(id: number): Promise<AsbBipekNonStd> {
        const bipekNonStd = await this.repository.findById(id);
        if (!bipekNonStd) {
            throw new NotFoundException(`AsbBipekNonStd with id ${id} not found`);
        }
        return bipekNonStd;
    }

    async getByAsb(dto: GetAsbBipekNonStdByAsbDto): Promise<{
        data: AsbBipekNonStd[];
        total: number;
        page: number;
        amount: number;
        totalPages: number;
    }> {
        const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);

        // If pagination is not provided, return all data with page=1, amount=total
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;

        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1,
        };
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.deleteByAsbId(idAsb);
    }
}
