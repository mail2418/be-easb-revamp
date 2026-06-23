import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsulanJalanStatusService } from '../../domain/usulan_jalan_status/usulan_jalan_status.service';
import { UsulanJalanStatusRepository } from '../../domain/usulan_jalan_status/usulan_jalan_status.repository';
import { UsulanJalanStatus } from '../../domain/usulan_jalan_status/usulan_jalan_status.entity';
import { CreateUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/create_usulan_jalan_status.dto';
import { UpdateUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/update_usulan_jalan_status.dto';
import { GetUsulanJalanStatusDto } from '../../presentation/usulan_jalan_status/dto/get_usulan_jalan_status.dto';
import { UsulanJalanStatusPaginationResultDto } from '../../presentation/usulan_jalan_status/dto/usulan_jalan_status_pagination_result.dto';

@Injectable()
export class UsulanJalanStatusServiceImpl implements UsulanJalanStatusService {
    constructor(private readonly usulanJalanStatusRepository: UsulanJalanStatusRepository) {}

    async create(dto: CreateUsulanJalanStatusDto): Promise<UsulanJalanStatus> {
        // Check if usulan_jalan_status with the same status already exists
        const existingUsulanJalanStatus = await this.usulanJalanStatusRepository.findByStatus(
            dto.status,
        );
        if (existingUsulanJalanStatus) {
            throw new ConflictException(
                `Usulan Jalan Status with status ${dto.status} already exists`,
            );
        }

        const newUsulanJalanStatus = await this.usulanJalanStatusRepository.create(dto);
        return newUsulanJalanStatus;
    }

    async update(dto: UpdateUsulanJalanStatusDto): Promise<UsulanJalanStatus> {
        // Check if usulan_jalan_status exists
        const existingUsulanJalanStatus = await this.usulanJalanStatusRepository.findById(dto.id);
        if (!existingUsulanJalanStatus) {
            throw new NotFoundException(`Usulan Jalan Status with id ${dto.id} not found`);
        }

        // If status is being updated, check for duplicates
        if (dto.status && dto.status !== existingUsulanJalanStatus.status) {
            const duplicateUsulanJalanStatus = await this.usulanJalanStatusRepository.findByStatus(
                dto.status,
            );
            if (duplicateUsulanJalanStatus) {
                throw new ConflictException(
                    `Usulan Jalan Status with status ${dto.status} already exists`,
                );
            }
        }

        const updatedUsulanJalanStatus = await this.usulanJalanStatusRepository.update(dto);
        return updatedUsulanJalanStatus;
    }

    async delete(id: number): Promise<boolean> {
        // Check if usulan_jalan_status exists
        const existingUsulanJalanStatus = await this.usulanJalanStatusRepository.findById(id);
        if (!existingUsulanJalanStatus) {
            throw new NotFoundException(`Usulan Jalan Status with id ${id} not found`);
        }

        return await this.usulanJalanStatusRepository.delete(id);
    }

    async findById(id: number): Promise<UsulanJalanStatus | null> {
        return await this.usulanJalanStatusRepository.findById(id);
    }

    async findByStatus(status: string): Promise<UsulanJalanStatus | null> {
        return await this.usulanJalanStatusRepository.findByStatus(status);
    }

    async findAll(
        pagination: GetUsulanJalanStatusDto,
    ): Promise<UsulanJalanStatusPaginationResultDto> {
        const result = await this.usulanJalanStatusRepository.findAll(pagination);
        return {
            data: result.data,
            total: result.total,
            page: pagination.page ?? 1,
            limit: pagination.amount ?? result.total,
            totalPages: pagination.amount ? Math.ceil(result.total / pagination.amount) : 1,
        };
    }
}
