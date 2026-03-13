import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AsbLantaiService } from "../../domain/asb_lantai/asb_lantai.service";
import { AsbLantaiRepository } from "../../domain/asb_lantai/asb_lantai.repository";
import { AsbLantai } from "../../domain/asb_lantai/asb_lantai.entity";
import { CreateAsbLantaiDto } from "../../presentation/asb_lantai/dto/create_asb_lantai.dto";
import { UpdateAsbLantaiDto } from "../../presentation/asb_lantai/dto/update_asb_lantai.dto";
import { GetAsbLantaisDto } from "../../presentation/asb_lantai/dto/get_asb_lantais.dto";
import { AsbLantaiPaginationResultDto } from "../../presentation/asb_lantai/dto/asb_lantai_pagination_result.dto";

import { SatuanService } from "src/domain/satuan/satuan.service";

@Injectable()
export class AsbLantaiServiceImpl implements AsbLantaiService {
    constructor(
        private readonly asbLantaiRepository: AsbLantaiRepository,
        private readonly satuanService: SatuanService
    ) {}

  async create(dto: CreateAsbLantaiDto): Promise<AsbLantai> {
    try {
      // Check if asb_lantai with the same lantai already exists
      const existingAsbLantai = await this.asbLantaiRepository.findByLantai(dto.lantai);
      if (existingAsbLantai) {
        throw new ConflictException(`AsbLantai with lantai ${dto.lantai} already exists`);
      }

      // Check if satuan id is exists
      if (!await this.satuanService.findById(dto.id_satuan)) {
        throw new NotFoundException(`Satuan with id ${dto.id_satuan} not found`);
      }

      const newAsbLantai = await this.asbLantaiRepository.create(dto);
      return newAsbLantai;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateAsbLantaiDto): Promise<AsbLantai> {
    try {
      // Check if asb_lantai exists
      const existingAsbLantai = await this.asbLantaiRepository.findById(dto.id);
      if (!existingAsbLantai) {
        throw new NotFoundException(`AsbLantai with id ${dto.id} not found`);
      }

      // Check if satuan id is exists
      if (!await this.satuanService.findById(dto.id_satuan)) {
        throw new NotFoundException(`Satuan with id ${dto.id_satuan} not found`);
      }

      // If lantai is being updated, check for duplicates
      if (dto.lantai && dto.lantai !== existingAsbLantai.lantai) {
        const duplicateAsbLantai = await this.asbLantaiRepository.findByLantai(dto.lantai);
        if (duplicateAsbLantai) {
          throw new ConflictException(`AsbLantai with lantai ${dto.lantai} already exists`);
        }
      }

      const updatedAsbLantai = await this.asbLantaiRepository.update(dto);
      return updatedAsbLantai;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      // Check if asb_lantai exists
      const existingAsbLantai = await this.asbLantaiRepository.findById(id);
      if (!existingAsbLantai) {
        throw new NotFoundException(`AsbLantai with id ${id} not found`);
      }

      return await this.asbLantaiRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<AsbLantai | null> {
    try {
      return await this.asbLantaiRepository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByLantai(lantai: string): Promise<AsbLantai | null> {
    try {
      return await this.asbLantaiRepository.findByLantai(lantai);
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: GetAsbLantaisDto): Promise<AsbLantaiPaginationResultDto> {
    try {
      return await this.asbLantaiRepository.findAll(dto);
    } catch (error) {
      throw error;
    }
  }
}
