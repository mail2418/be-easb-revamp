import { Injectable, NotFoundException } from "@nestjs/common";
import { JalanSaluranSmkkService } from "../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service";
import { JalanSaluranSmkkRepository } from "../../domain/jalan_saluran_smkk/jalan_saluran_smkk.repository";
import { CreateJalanSaluranSmkkDto } from "../../presentation/jalan_saluran_smkk/dto/create_jalan_saluran_smkk.dto";
import { JalanSaluranSmkk } from "../../domain/jalan_saluran_smkk/jalan_saluran_smkk.entity";
import { UpdateJalanSaluranSmkkDto } from "../../presentation/jalan_saluran_smkk/dto/update_jalan_saluran_smkk.dto";
import { GetJalanSaluranSmkkDto } from "../../presentation/jalan_saluran_smkk/dto/get_jalan_saluran_smkk.dto";
import { JalanSaluranSmkkPaginationResultDto } from "../../presentation/jalan_saluran_smkk/dto/jalan_saluran_smkk_pagination_result.dto";

@Injectable()
export class JalanSaluranSmkkServiceImpl implements JalanSaluranSmkkService {
    constructor(
        private readonly repository: JalanSaluranSmkkRepository
    ) { }

    async create(dto: CreateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk> {
        try {
            return await this.repository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSaluranSmkk with ID ${dto.id} not found`);
            }
            return await this.repository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const exists = await this.repository.findById(id);
            if (!exists) {
                throw new NotFoundException(`JalanSaluranSmkk with ID ${id} not found`);
            }
            return await this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSaluranSmkk | null> {
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSaluranSmkkDto): Promise<JalanSaluranSmkkPaginationResultDto> {
        try {
            const result = await this.repository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page ?? 1,
                limit: dto.amount ?? result.total,
                totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }
}

