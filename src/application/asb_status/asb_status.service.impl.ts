import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AsbStatusService } from "../../domain/asb_status/asb_status.service";
import { AsbStatusRepository } from "../../domain/asb_status/asb_status.repository";
import { AsbStatus } from "../../domain/asb_status/asb_status.entity";
import { CreateAsbStatusDto } from "../../presentation/asb_status/dto/create_asb_status.dto";
import { UpdateAsbStatusDto } from "../../presentation/asb_status/dto/update_asb_status.dto";
import { GetAsbStatusDto } from "../../presentation/asb_status/dto/get_asb_status.dto";
import { AsbStatusPaginationResultDto } from "../../presentation/asb_status/dto/asb_status_pagination_result.dto";

@Injectable()
export class AsbStatusServiceImpl implements AsbStatusService {
  constructor(private readonly asbStatusRepository: AsbStatusRepository) {}

  async create(dto: CreateAsbStatusDto): Promise<AsbStatus> {
    try {
      // Check if asb_status with the same status already exists
      const existingAsbStatus = await this.asbStatusRepository.findByStatus(dto.status);
      if (existingAsbStatus) {
        throw new ConflictException(`AsbStatus with status ${dto.status} already exists`);
      }

      const newAsbStatus = await this.asbStatusRepository.create(dto);
      return newAsbStatus;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateAsbStatusDto): Promise<AsbStatus> {
    try {
      // Check if asb_status exists
      const existingAsbStatus = await this.asbStatusRepository.findById(dto.id);
      if (!existingAsbStatus) {
        throw new NotFoundException(`AsbStatus with id ${dto.id} not found`);
      }

      // If status is being updated, check for duplicates
      if (dto.status && dto.status !== existingAsbStatus.status) {
        const duplicateAsbStatus = await this.asbStatusRepository.findByStatus(dto.status);
        if (duplicateAsbStatus) {
          throw new ConflictException(`AsbStatus with status ${dto.status} already exists`);
        }
      }

      const updatedAsbStatus = await this.asbStatusRepository.update(dto);
      return updatedAsbStatus;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      // Check if asb_status exists
      const existingAsbStatus = await this.asbStatusRepository.findById(id);
      if (!existingAsbStatus) {
        throw new NotFoundException(`AsbStatus with id ${id} not found`);
      }

      return await this.asbStatusRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<AsbStatus | null> {
    try {
      return await this.asbStatusRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByStatus(status: string): Promise<AsbStatus | null> {
    try {
      return await this.asbStatusRepository.findByStatus(status);
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: GetAsbStatusDto): Promise<AsbStatusPaginationResultDto> {
    try {
      const result = await this.asbStatusRepository.findAll(pagination);
      return {
                data: result.data,
                total: result.total,
                page: pagination.page,
                limit: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
    } catch (error) {
      throw error;
    }
  }
}
