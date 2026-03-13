import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JenisStandarService } from "../../domain/jenis_standar/jenis_standar.service";
import { JenisStandarRepository } from "../../domain/jenis_standar/jenis_standar.repository";
import { JenisStandar } from "../../domain/jenis_standar/jenis_standar.entity";
import { CreateJenisStandarDto } from "../../presentation/jenis_standar/dto/create_jenis_standar.dto";
import { UpdateJenisStandarDto } from "../../presentation/jenis_standar/dto/update_jenis_standar.dto";
import { GetJenisStandarDto } from "../../presentation/jenis_standar/dto/get_jenis_standar.dto";
import { JenisStandarPaginationResult } from "../../presentation/jenis_standar/dto/jenis_standar_pagination_result.dto";

@Injectable()
export class JenisStandarServiceImpl implements JenisStandarService {
  constructor(private readonly jenisStandarRepository: JenisStandarRepository) {}

  async create(dto: CreateJenisStandarDto): Promise<JenisStandar> {
    try {
      const existingJenisStandar = await this.jenisStandarRepository.findByJenis(dto.jenis);
      if (existingJenisStandar) {
        throw new ConflictException(`JenisStandar with jenis ${dto.jenis} already exists`);
      }

      const newJenisStandar = await this.jenisStandarRepository.create(dto);
      return newJenisStandar;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateJenisStandarDto): Promise<JenisStandar> {
    try {
      const existingJenisStandar = await this.jenisStandarRepository.findById(dto.id);
      if (!existingJenisStandar) {
        throw new NotFoundException(`JenisStandar with id ${dto.id} not found`);
      }

      if (dto.jenis && dto.jenis !== existingJenisStandar.jenis) {
        const duplicateJenisStandar = await this.jenisStandarRepository.findByJenis(dto.jenis);
        if (duplicateJenisStandar) {
          throw new ConflictException(`JenisStandar with jenis ${dto.jenis} already exists`);
        }
      }

      const updatedJenisStandar = await this.jenisStandarRepository.update(dto);
      return updatedJenisStandar;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const existingJenisStandar = await this.jenisStandarRepository.findById(id);
      if (!existingJenisStandar) {
        throw new NotFoundException(`JenisStandar with id ${id} not found`);
      }

      return await this.jenisStandarRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<JenisStandar | null> {
    try {
      return await this.jenisStandarRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByJenis(jenis: string): Promise<JenisStandar | null> {
    try {
      return await this.jenisStandarRepository.findByJenis(jenis);
    } catch (error) {
      throw error;
    }
  }

  async findAll(pagination: GetJenisStandarDto): Promise<JenisStandarPaginationResult> {
    try {
      const result = await this.jenisStandarRepository.findAll(pagination);
      return {
        jenis_standars: result.data,
        total: result.total,
        page: pagination.page,
        amount: pagination.amount,
        totalPages: Math.ceil(result.total / pagination.amount)
      };
    } catch (error) {
      throw error;
    }
  }
}
