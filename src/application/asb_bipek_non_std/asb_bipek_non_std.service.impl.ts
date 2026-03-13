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
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbBipekNonStdDto): Promise<AsbBipekNonStd> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBipekNonStd with id ${dto.id} not found`,
                );
            }

            return await this.repository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const existing = await this.repository.findById(id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBipekNonStd with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbBipekNonStd> {
        try {
            const bipekNonStd = await this.repository.findById(id);
            if (!bipekNonStd) {
                throw new NotFoundException(
                    `AsbBipekNonStd with id ${id} not found`,
                );
            }
            return bipekNonStd;
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbBipekNonStdByAsbDto): Promise<{ data: AsbBipekNonStd[], total: number, page: number, amount: number, totalPages: number }> {
        try {
            const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount);
            return {
                data,
                total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }
}
