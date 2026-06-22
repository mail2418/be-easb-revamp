import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbKomponenBangunanStdRepository } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.repository';
import { AsbKomponenBangunanStd } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.entity';
import { UpdateAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan_std/dto/update_asb_komponen_bangunan_std.dto';
import { DeleteAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan_std/dto/delete_asb_komponen_bangunan_std.dto';
import { GetAsbKomponenBangunanStdsDto } from '../../presentation/asb_komponen_bangunan_std/dto/get_asb_komponen_bangunan_stds.dto';
import { GetAsbKomponenBangunanStdDetailDto } from '../../presentation/asb_komponen_bangunan_std/dto/get_asb_komponen_bangunan_std_detail.dto';
import { AsbKomponenBangunanStdsPaginationResult } from '../../presentation/asb_komponen_bangunan_std/dto/asb_komponen_bangunan_std_pagination_result.dto';
import { AsbKomponenBangunanStdService } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service';
import { CreateAsbKomponenBangunanStdDto } from 'src/presentation/asb_komponen_bangunan_std/dto/create_asb_komponen_bangunan_std.dto';
import { AsbKomponenBangunanProsStdOrmEntity } from '../../infrastructure/asb_komponen_bangunan_pros_std/orm/asb_komponen_bangunan_pros_std.orm_entity';
import { DEFAULT_KOMPONEN_PROS } from '../asb_komponen_bangunan_pros/default_komponen_pros';

@Injectable()
export class AsbKomponenBangunanStdServiceImpl implements AsbKomponenBangunanStdService {
    constructor(
        private readonly repository: AsbKomponenBangunanStdRepository,
        @InjectRepository(AsbKomponenBangunanProsStdOrmEntity)
        private readonly prosRepository: Repository<AsbKomponenBangunanProsStdOrmEntity>,
    ) { }

    async create(dto: CreateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd> {
        const entity = await this.repository.create(dto);
        const existingPros = await this.prosRepository.findOne({
            where: { idAsbKomponenBangunanStd: entity.id },
        });
        if (!existingPros) {
            await this.prosRepository.save({
                idAsbKomponenBangunanStd: entity.id,
                ...DEFAULT_KOMPONEN_PROS,
            });
        }
        return entity;
    }

    async update(dto: UpdateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`AsbKomponenBangunanStd with id ${dto.id} not found`);
        }

        const updateData: Partial<AsbKomponenBangunanStd> = {
            komponen: dto.komponen,
            files: dto.files,
            idAsbJenis: dto.idAsbJenis,
        };

        // Remove undefined values
        Object.keys(updateData).forEach(key => {
            if (updateData[key as keyof typeof updateData] === undefined) {
                delete updateData[key as keyof typeof updateData];
            }
        });

        const updated = await this.repository.update(dto.id, updateData);
        return updated;
    }

    async delete(dto: DeleteAsbKomponenBangunanStdDto): Promise<boolean> {
        const existing = await this.repository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`AsbKomponenBangunanStd with id ${dto.id} not found`);
        }
        return await this.repository.delete(dto.id);
    }

    async getAll(pagination: GetAsbKomponenBangunanStdsDto): Promise<AsbKomponenBangunanStdsPaginationResult> {
        const result = await this.repository.findAll(pagination);
        return {
            komponenBangunans: result.data,
            total: result.total,
            page: pagination.page ?? 1,
            amount: pagination.amount ?? result.total,
            totalPages: pagination.amount ? Math.ceil(result.total / pagination.amount) : 1
        };
    }

    async getDetail(dto: GetAsbKomponenBangunanStdDetailDto): Promise<AsbKomponenBangunanStd> {
        const entity = await this.repository.findById(dto.id);
        if (!entity) {
            throw new NotFoundException(`AsbKomponenBangunanStd with id ${dto.id} not found`);
        }
        return entity;
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunanStd | null> {
        return await this.repository.findByKomponen(komponen);
    }
}
