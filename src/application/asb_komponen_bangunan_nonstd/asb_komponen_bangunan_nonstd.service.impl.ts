import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AsbKomponenBangunanNonstdService } from '../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service';
import { AsbKomponenBangunanNonstdRepository } from '../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.repository';
import { AsbKomponenBangunanNonstd } from '../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.entity';
import { CreateAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/create_asb_komponen_bangunan_nonstd.dto';
import { UpdateAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/update_asb_komponen_bangunan_nonstd.dto';
import { DeleteAsbKomponenBangunanNonstdDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/delete_asb_komponen_bangunan_nonstd.dto';
import { GetAsbKomponenBangunanNonstdsDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/get_asb_komponen_bangunan_nonstds.dto';
import { GetAsbKomponenBangunanNonstdDetailDto } from '../../presentation/asb_komponen_bangunan_nonstd/dto/get_asb_komponen_bangunan_nonstd_detail.dto';
import { AsbKomponenBangunanNonstdsPaginationResult } from '../../presentation/asb_komponen_bangunan_nonstd/dto/asb_komponen_bangunan_nonstd_pagination_result.dto';

@Injectable()
export class AsbKomponenBangunanNonstdServiceImpl implements AsbKomponenBangunanNonstdService {
    constructor(private readonly repository: AsbKomponenBangunanNonstdRepository) { }

    async create(dto: CreateAsbKomponenBangunanNonstdDto): Promise<AsbKomponenBangunanNonstd> {
        try {
            const entity = await this.repository.create(dto);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbKomponenBangunanNonstdDto): Promise<AsbKomponenBangunanNonstd> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanNonstd with id ${dto.id} not found`);
            }

            const updateData: Partial<AsbKomponenBangunanNonstd> = {
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

    async delete(dto: DeleteAsbKomponenBangunanNonstdDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanNonstd with id ${dto.id} not found`);
            }
            return await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbKomponenBangunanNonstdsDto): Promise<AsbKomponenBangunanNonstdsPaginationResult> {
        try {
            const result = await this.repository.findAll(pagination);
            return {
                komponenBangunanNonstds: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbKomponenBangunanNonstdDetailDto): Promise<AsbKomponenBangunanNonstd> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbKomponenBangunanNonstd with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunanNonstd | null> {
        try {
            return await this.repository.findByKomponen(komponen);
        } catch (error) {
            throw error;
        }
    }
}
