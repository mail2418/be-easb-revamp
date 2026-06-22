import { Injectable, NotFoundException } from "@nestjs/common";
import { JalanSpesifikasiDesainService } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service";
import { JalanSpesifikasiDesainRepository } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.repository";
import { CreateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto";
import { UpdateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/update_jalan_spesifikasi_desain.dto";
import { GetJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto";
import { JalanSpesifikasiDesain } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.entity";
import { JalanSpesifikasiDesainPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain/dto/jalan_spesifikasi_desain_pagination_result.dto";
import { CalculateVolumeJalanSpesifikasiDesainUseCase } from "./use_cases/calculate_volume_jalan_spesifikasi_desain.use_case";
import { HspkService } from "../../domain/hspk/hspk.service";
import { UsulanJalanRepository } from "../../domain/usulan_jalan/usulan_jalan.repository";
import { GetJalanSpesifikasiDesainByUsulanJalanDto } from "../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain_by_usulan_jalan.dto";

@Injectable()
export class JalanSpesifikasiDesainServiceImpl implements JalanSpesifikasiDesainService {
    constructor(
        private readonly jalanSpesifikasiDesainRepository: JalanSpesifikasiDesainRepository,
        private readonly calculateVolumeUseCase: CalculateVolumeJalanSpesifikasiDesainUseCase,
        private readonly hspkService: HspkService,
        private readonly usulanJalanRepository: UsulanJalanRepository,
    ) { }

    async create(dto: CreateJalanSpesifikasiDesainDto, lebar?: number): Promise<JalanSpesifikasiDesain> {
        // Get lebar from usulan_jalan if not provided
        let lebarValue = lebar;
        if (lebarValue === undefined) {
            const usulanJalan = await this.usulanJalanRepository.findById(dto.id_usulan_jalan);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.id_usulan_jalan} not found`);
            }
            if (!usulanJalan.lebar) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.id_usulan_jalan} has no lebar`);
            }
            lebarValue = usulanJalan.lebar;
        }

        // Get HSPK to get harga_satuan and satuan
        const hspk = await this.hspkService.findById(dto.id_hspk);
        if (!hspk) {
            throw new NotFoundException(`HSPK with id ${dto.id_hspk} not found`);
        }

        if (!hspk.harga_satuan) {
            throw new NotFoundException(`HSPK with id ${dto.id_hspk} has no harga_satuan`);
        }

        // Calculate volume based on satuan from HSPK
        const volume = await this.calculateVolumeUseCase.execute(
            dto.id_hspk,
            lebarValue,
            dto.tinggi,
            dto.spasi,
        );

        // Calculate harga_spec = harga_satuan * volume
        const harga_spec = hspk.harga_satuan * volume;

        // Add calculated fields to DTO
        const dtoWithCalculations = {
            ...dto,
            volume,
            harga_spec,
        };

        return await this.jalanSpesifikasiDesainRepository.create(dtoWithCalculations);
    }

    async update(dto: UpdateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
        const existing = await this.jalanSpesifikasiDesainRepository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`JalanSpesifikasiDesain with id ${dto.id} not found`);
        }
        return await this.jalanSpesifikasiDesainRepository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.jalanSpesifikasiDesainRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`JalanSpesifikasiDesain with id ${id} not found`);
        }
        return await this.jalanSpesifikasiDesainRepository.delete(id);
    }

    async findById(id: number): Promise<JalanSpesifikasiDesain | null> {
        return await this.jalanSpesifikasiDesainRepository.findById(id);
    }

    async findAll(dto: GetJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesainPaginationResultDto> {
        const result = await this.jalanSpesifikasiDesainRepository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
        };
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.jalanSpesifikasiDesainRepository.deleteByUsulanJalanId(idUsulanJalan);
    }

    async getByUsulanJalan(dto: GetJalanSpesifikasiDesainByUsulanJalanDto): Promise<{ data: JalanSpesifikasiDesain[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.jalanSpesifikasiDesainRepository.findByUsulanJalan(dto.idUsulanJalan, dto.page, dto.amount);
        
        // If pagination is not provided, return all data with page=1, amount=total
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        
        return {
            data,
            total,
            page,
            amount,
            totalPages: amount > 0 ? Math.ceil(total / amount) : 1
        };
    }
}
