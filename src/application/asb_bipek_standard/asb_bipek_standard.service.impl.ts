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
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbBipekStandardDto): Promise<AsbBipekStandard> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(
                    `AsbBipekStandard with id ${dto.id} not found`,
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
                    `AsbBipekStandard with id ${id} not found`,
                );
            }

            await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number): Promise<AsbBipekStandard> {
        try {
            const bipekStandard = await this.repository.findById(id);
            if (!bipekStandard) {
                throw new NotFoundException(
                    `AsbBipekStandard with id ${id} not found`,
                );
            }
            return bipekStandard;
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbBipekStandardByAsbDto): Promise<{ data: AsbBipekStandard[], total: number, page: number, amount: number, totalPages: number }> {
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
