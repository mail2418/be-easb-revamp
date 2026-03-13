import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { StandardKlasifikasiService } from "../../domain/standard_klasifikasi/standard_klasifikasi.service";
import { StandardKlasifikasiRepository } from "../../domain/standard_klasifikasi/standard_klasifikasi.repository";
import { StandardKlasifikasi } from "../../domain/standard_klasifikasi/standard_klasifikasi.entity";
import { CreateStandardKlasifikasiDto } from "../../presentation/standard_klasifikasi/dto/create_standard_klasifikasi.dto";
import { UpdateStandardKlasifikasiDto } from "../../presentation/standard_klasifikasi/dto/update_standard_klasifikasi.dto";
import { DeleteStandardKlasifikasiDto } from "../../presentation/standard_klasifikasi/dto/delete_standard_klasifikasi.dto";
import { GetStandardKlasifikasisDto } from "../../presentation/standard_klasifikasi/dto/get_standard_klasifikasis.dto";
import { GetStandardKlasifikasiDetailDto } from "../../presentation/standard_klasifikasi/dto/get_standard_klasifikasi_detail.dto";
import { StandardKlasifikasisPaginationResultDto } from "../../presentation/standard_klasifikasi/dto/standard_klasifikasis_pagination_result.dto";
import { AsbKlasifikasiRepository } from "../../domain/asb_klasifikasi/asb_klasifikasi.repository";
import { KabKotaRepository } from "../../domain/kabkota/kabkota.repository";

@Injectable()
export class StandardKlasifikasiServiceImpl extends StandardKlasifikasiService {
    constructor(
        private readonly standardKlasifikasiRepository: StandardKlasifikasiRepository,
        private readonly asbKlasifikasiRepository: AsbKlasifikasiRepository,
        private readonly kabkotaRepository: KabKotaRepository
    ) {
        super();
    }

    async create(dto: CreateStandardKlasifikasiDto): Promise<StandardKlasifikasi> {
        try {
            // Validate foreign keys
            const asbKlasifikasi = await this.asbKlasifikasiRepository.findById(dto.id_asb_klasifikasi);
            if (!asbKlasifikasi) {
                throw new BadRequestException(`ASB Klasifikasi with id ${dto.id_asb_klasifikasi} not found`);
            }

            const kabkota = await this.kabkotaRepository.findById(dto.id_kabkota);
            if (!kabkota) {
                throw new BadRequestException(`KabKota with id ${dto.id_kabkota} not found`);
            }

            const standardKlasifikasi = await this.standardKlasifikasiRepository.create(dto);
            return standardKlasifikasi;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateStandardKlasifikasiDto): Promise<StandardKlasifikasi> {
        try {
            // Check if standard klasifikasi exists
            const existing = await this.standardKlasifikasiRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`Standard Klasifikasi with id ${dto.id} not found`);
            }

            // Validate foreign keys
            const asbKlasifikasi = await this.asbKlasifikasiRepository.findById(dto.id_asb_klasifikasi);
            if (!asbKlasifikasi) {
                throw new BadRequestException(`ASB Klasifikasi with id ${dto.id_asb_klasifikasi} not found`);
            }

            const kabkota = await this.kabkotaRepository.findById(dto.id_kabkota);
            if (!kabkota) {
                throw new BadRequestException(`KabKota with id ${dto.id_kabkota} not found`);
            }

            const updatedStandardKlasifikasi = await this.standardKlasifikasiRepository.update(dto);
            return updatedStandardKlasifikasi;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteStandardKlasifikasiDto): Promise<boolean> {
        try {
            // Check if standard klasifikasi exists
            const existing = await this.standardKlasifikasiRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`Standard Klasifikasi with id ${dto.id} not found`);
            }

            return await this.standardKlasifikasiRepository.delete(dto);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetStandardKlasifikasisDto): Promise<StandardKlasifikasisPaginationResultDto> {
        try {
            const result = await this.standardKlasifikasiRepository.findAll(dto);
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

    async findById(dto: GetStandardKlasifikasiDetailDto): Promise<StandardKlasifikasi> {
        try {
            const standardKlasifikasi = await this.standardKlasifikasiRepository.findById(dto.id);
            if (!standardKlasifikasi) {
                throw new NotFoundException(`Standard Klasifikasi with id ${dto.id} not found`);
            }
            return standardKlasifikasi;
        } catch (error) {
            throw error;
        }
    }
}
