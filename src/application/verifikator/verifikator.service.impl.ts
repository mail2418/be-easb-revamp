import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { VerifikatorRepository } from '../../domain/verifikator/verifikator.repository';
import { Verifikator } from '../../domain/verifikator/verifikator.entity';
import { CreateVerifikatorDto } from './dto/create_verifikator.dto';
import { UpdateVerifikatorDto } from './dto/update_verifikator.dto';
import { DeleteVerifikatorDto } from './dto/delete_verifikator.dto';
import { GetVerifikatorDetailDto } from './dto/get_verifikator_detail.dto';
import { GetVerifikatorsDto } from './dto/get_verifikators.dto';
import { VerifikatorsPaginationResultDto } from './dto/verifikators_pagination_result.dto';

@Injectable()
export class VerifikatorServiceImpl implements VerifikatorService {
    constructor(private readonly verifikatorRepository: VerifikatorRepository) { }

    async create(dto: CreateVerifikatorDto): Promise<Verifikator> {
        // Check if verifikator with the same user already exists
        const existing = await this.verifikatorRepository.findByUserId(dto.idUser);

        if (existing) {
            throw new ConflictException(`Verifikator with user ID ${dto.idUser} already exists`);
        }

        const verifikator: Verifikator = {
            id: 0, // Will be auto-generated
            idUser: dto.idUser,
            jenisVerifikator: dto.jenisVerifikator,
            verifikator: dto.verifikator
        };

        return await this.verifikatorRepository.create(verifikator);
    }

    async update(id: number, dto: Partial<Verifikator>): Promise<Verifikator> {
        // Check if verifikator exists
        const existing = await this.verifikatorRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`Verifikator with ID ${id} not found`);
        }

        // If updating idUser, check for conflicts
        if (dto.idUser && dto.idUser !== existing.idUser) {
            const conflicting = await this.verifikatorRepository.findByUserId(dto.idUser);
            if (conflicting) {
                throw new ConflictException(`Verifikator with user ID ${dto.idUser} already exists`);
            }
        }

        return await this.verifikatorRepository.update(id, dto);
    }

    async delete(id: number): Promise<boolean> {
        // Check if verifikator exists
        const existing = await this.verifikatorRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`Verifikator with ID ${id} not found`);
        }

        return await this.verifikatorRepository.delete(id);
    }

    async findById(id: number): Promise<Verifikator> {
        const verifikator = await this.verifikatorRepository.findById(id);
        if (!verifikator) {
            throw new NotFoundException(`Verifikator with ID ${id} not found`);
        }
        return verifikator;
    }

    async findByUserId(userId: number): Promise<Verifikator | null> {
        return await this.verifikatorRepository.findByUserId(userId);
    }

    async findAll(page: number, amount: number): Promise<{ data: Verifikator[]; total: number; page: number; amount: number; totalPages: number }> {
        const result = await this.verifikatorRepository.findAll(page, amount);

        return {
            data: result.data,
            total: result.total,
            page,
            amount,
            totalPages: Math.ceil(result.total / amount)
        };
    }

    async checkVerifikatorType(userId: number): Promise<string> {
        const type = await this.verifikatorRepository.checkVerifikatorType(userId);
        if (!type) {
            throw new NotFoundException(`Verifikator with User ID ${userId} not found`);
        }
        return type;
    }
}
