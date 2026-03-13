import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { AsbTipeBangunanService } from "../../domain/asb_tipe_bangunan/asb_tipe_bangunan.service";
import { AsbTipeBangunanRepository } from "../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository";
import { AsbTipeBangunan } from "../../domain/asb_tipe_bangunan/asb_tipe_bangunan.entity";
import { CreateAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/create_asb_tipe_bangunan.dto";
import { UpdateAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/update_asb_tipe_bangunan.dto";
import { DeleteAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/delete_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDto } from "../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDetailDto } from "../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan_detail.dto";
import { AsbTipeBangunanPaginationResultDto } from "../../presentation/asb_tipe_bangunan/dto/asb_tipe_bangunan_pagination_result.dto";

@Injectable()
export class AsbTipeBangunanServiceImpl implements AsbTipeBangunanService {
    constructor(private readonly asbTipeBangunanRepository: AsbTipeBangunanRepository) { }

    async create(dto: CreateAsbTipeBangunanDto): Promise<AsbTipeBangunan> {
        try {
            // Check if asb_tipe_bangunan with the same tipe_bangunan already exists
            const existingAsbTipeBangunan = await this.asbTipeBangunanRepository.findByTipeBangunan(dto.tipe_bangunan);
            if (existingAsbTipeBangunan) {
                throw new ConflictException(`AsbTipeBangunan with tipe_bangunan ${dto.tipe_bangunan} already exists`);
            }

            const newAsbTipeBangunan = await this.asbTipeBangunanRepository.create(dto);
            return newAsbTipeBangunan;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbTipeBangunanDto): Promise<AsbTipeBangunan> {
        try {
            // Check if asb_tipe_bangunan exists
            const existingAsbTipeBangunan = await this.asbTipeBangunanRepository.findById(dto.id);
            if (!existingAsbTipeBangunan) {
                throw new NotFoundException(`AsbTipeBangunan with id ${dto.id} not found`);
            }

            // If tipe_bangunan is being updated, check for duplicates
            if (dto.tipe_bangunan && dto.tipe_bangunan !== existingAsbTipeBangunan.tipe_bangunan) {
                const duplicateAsbTipeBangunan = await this.asbTipeBangunanRepository.findByTipeBangunan(dto.tipe_bangunan);
                if (duplicateAsbTipeBangunan) {
                    throw new ConflictException(`AsbTipeBangunan with tipe_bangunan ${dto.tipe_bangunan} already exists`);
                }
            }

            const updatedAsbTipeBangunan = await this.asbTipeBangunanRepository.update(dto);
            return updatedAsbTipeBangunan;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteAsbTipeBangunanDto): Promise<boolean> {
        try {
            // Check if asb_tipe_bangunan exists
            const existingAsbTipeBangunan = await this.asbTipeBangunanRepository.findById(dto.id);
            if (!existingAsbTipeBangunan) {
                throw new NotFoundException(`AsbTipeBangunan with id ${dto.id} not found`);
            }

            return await this.asbTipeBangunanRepository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetAsbTipeBangunanDto): Promise<AsbTipeBangunanPaginationResultDto> {
        try {
            const result = await this.asbTipeBangunanRepository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(result.total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async findById(dto: GetAsbTipeBangunanDetailDto): Promise<AsbTipeBangunan> {
        try {
            const asbTipeBangunan = await this.asbTipeBangunanRepository.findById(dto.id);
            if (!asbTipeBangunan) {
                throw new NotFoundException(`AsbTipeBangunan with id ${dto.id} not found`);
            }
            return asbTipeBangunan;
        } catch (error) {
            throw error;
        }
    }
}
