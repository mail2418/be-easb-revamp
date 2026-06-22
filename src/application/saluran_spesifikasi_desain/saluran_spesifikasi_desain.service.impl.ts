import { Injectable, NotFoundException } from '@nestjs/common';
import { SaluranSpesifikasiDesainService } from '../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.service';
import { SaluranSpesifikasiDesainRepository } from '../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.repository';
import { CreateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/create_saluran_spesifikasi_desain.dto';
import { UpdateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/update_saluran_spesifikasi_desain.dto';
import { GetSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/get_saluran_spesifikasi_desain.dto';
import { SaluranSpesifikasiDesain } from '../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.entity';
import { SaluranSpesifikasiDesainPaginationResultDto } from '../../presentation/saluran_spesifikasi_desain/dto/saluran_spesifikasi_desain_pagination_result.dto';
import { CalculateVolumeSaluranSpesifikasiDesainUseCase } from './use_cases/calculate_volume_saluran_spesifikasi_desain.use_case';
import { HspkService } from '../../domain/hspk/hspk.service';
import { UsulanSaluranRepository } from '../../domain/usulan_saluran/usulan_saluran.repository';
import { GetSaluranSpesifikasiDesainByUsulanSaluranDto } from '../../presentation/saluran_spesifikasi_desain/dto/get_saluran_spesifikasi_desain_by_usulan_saluran.dto';

@Injectable()
export class SaluranSpesifikasiDesainServiceImpl implements SaluranSpesifikasiDesainService {
    constructor(
        private readonly saluranSpesifikasiDesainRepository: SaluranSpesifikasiDesainRepository,
        private readonly calculateVolumeUseCase: CalculateVolumeSaluranSpesifikasiDesainUseCase,
        private readonly hspkService: HspkService,
        private readonly usulanSaluranRepository: UsulanSaluranRepository,
    ) { }

    async create(dto: CreateSaluranSpesifikasiDesainDto, lebar?: number): Promise<SaluranSpesifikasiDesain> {
        let lebarValue = lebar;
        if (lebarValue === undefined) {
            const usulanSaluran = await this.usulanSaluranRepository.findById(dto.id_usulan_saluran);
            if (!usulanSaluran) {
                throw new NotFoundException(`Usulan Saluran with id ${dto.id_usulan_saluran} not found`);
            }
            if (!usulanSaluran.lebar) {
                throw new NotFoundException(`Usulan Saluran with id ${dto.id_usulan_saluran} has no lebar`);
            }
            lebarValue = usulanSaluran.lebar;
        }

        const hspk = await this.hspkService.findById(dto.id_hspk);
        if (!hspk) {
            throw new NotFoundException(`HSPK with id ${dto.id_hspk} not found`);
        }

        if (!hspk.harga_satuan) {
            throw new NotFoundException(`HSPK with id ${dto.id_hspk} has no harga_satuan`);
        }

        const volume = await this.calculateVolumeUseCase.execute(
            dto.id_hspk,
            lebarValue,
            dto.tinggi,
            dto.spasi,
        );

        const harga_spec = hspk.harga_satuan * volume;

        const dtoWithCalculations = {
            ...dto,
            volume,
            harga_spec,
        };

        return await this.saluranSpesifikasiDesainRepository.create(dtoWithCalculations);
    }

    async update(dto: UpdateSaluranSpesifikasiDesainDto): Promise<SaluranSpesifikasiDesain> {
        const existing = await this.saluranSpesifikasiDesainRepository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`SaluranSpesifikasiDesain with id ${dto.id} not found`);
        }
        return await this.saluranSpesifikasiDesainRepository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.saluranSpesifikasiDesainRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`SaluranSpesifikasiDesain with id ${id} not found`);
        }
        return await this.saluranSpesifikasiDesainRepository.delete(id);
    }

    async findById(id: number): Promise<SaluranSpesifikasiDesain | null> {
        return await this.saluranSpesifikasiDesainRepository.findById(id);
    }

    async findAll(dto: GetSaluranSpesifikasiDesainDto): Promise<SaluranSpesifikasiDesainPaginationResultDto> {
        const result = await this.saluranSpesifikasiDesainRepository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
        };
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.saluranSpesifikasiDesainRepository.deleteByUsulanSaluranId(idUsulanSaluran);
    }

    async getByUsulanSaluran(dto: GetSaluranSpesifikasiDesainByUsulanSaluranDto): Promise<{ data: SaluranSpesifikasiDesain[]; total: number; page: number; amount: number; totalPages: number }> {
        const [data, total] = await this.saluranSpesifikasiDesainRepository.findByUsulanSaluran(dto.idUsulanSaluran, dto.page, dto.amount);
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
