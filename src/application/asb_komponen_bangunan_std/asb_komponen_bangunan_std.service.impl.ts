import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AsbKomponenBangunanStdRepository } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.repository';
import { AsbKomponenBangunanStd } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.entity';
import { UpdateAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan_std/dto/update_asb_komponen_bangunan_std.dto';
import { DeleteAsbKomponenBangunanStdDto } from '../../presentation/asb_komponen_bangunan_std/dto/delete_asb_komponen_bangunan_std.dto';
import { GetAsbKomponenBangunanStdsDto } from '../../presentation/asb_komponen_bangunan_std/dto/get_asb_komponen_bangunan_stds.dto';
import { GetAsbKomponenBangunanStdDetailDto } from '../../presentation/asb_komponen_bangunan_std/dto/get_asb_komponen_bangunan_std_detail.dto';
import { AsbKomponenBangunanStdsPaginationResult } from '../../presentation/asb_komponen_bangunan_std/dto/asb_komponen_bangunan_std_pagination_result.dto';
import { AsbKomponenBangunanStdService } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service';
import { CreateAsbKomponenBangunanStdDto } from 'src/presentation/asb_komponen_bangunan_std/dto/create_asb_komponen_bangunan_std.dto';

@Injectable()
export class AsbKomponenBangunanStdServiceImpl implements AsbKomponenBangunanStdService {
    constructor(private readonly repository: AsbKomponenBangunanStdRepository) { }

    async create(dto: CreateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd> {
        try {
            const entity = await this.repository.create(dto);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbKomponenBangunanStdDto): Promise<AsbKomponenBangunanStd> {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteAsbKomponenBangunanStdDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanStd with id ${dto.id} not found`);
            }
            return await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbKomponenBangunanStdsDto): Promise<AsbKomponenBangunanStdsPaginationResult> {
        try {
            const result = await this.repository.findAll(pagination);
            return {
                komponenBangunans: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbKomponenBangunanStdDetailDto): Promise<AsbKomponenBangunanStd> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbKomponenBangunanStd with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunanStd | null> {
        try {
            return await this.repository.findByKomponen(komponen);
        } catch (error) {
            throw error;
        }
    }
}
