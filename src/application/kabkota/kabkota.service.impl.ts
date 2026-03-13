import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { KabKotaService } from '../../domain/kabkota/kabkota.service';
import { KabKotaRepository } from '../../domain/kabkota/kabkota.repository';
import { KabKota } from '../../domain/kabkota/kabkota.entity';

import { ProvinceService } from 'src/domain/provinces/province.service';
import { CreateKabKotaDto } from '../../presentation/kabkota/dto/create_kabkota.dto';
import { UpdateKabKotaDto } from '../../presentation/kabkota/dto/update_kabkota.dto';
import { DeleteKabKotaDto } from '../../presentation/kabkota/dto/delete_kabkota.dto';
import { GetKabKotasDto } from '../../presentation/kabkota/dto/get_kabkotas.dto';
import { GetKabKotaDetailDto } from '../../presentation/kabkota/dto/get_kabkota_detail.dto';
import { KabKotasPaginationResult } from '../../presentation/kabkota/dto/kabkotas_pagination_result.dto';

@Injectable()
export class KabKotaServiceImpl implements KabKotaService {
    constructor(
        private readonly kabKotaRepository: KabKotaRepository,
        private readonly provinceService: ProvinceService
    ) {}

    async create(kabkota: CreateKabKotaDto): Promise<KabKota> {
        try {
            // Check if kode already exists
            const existingKabKota = await this.kabKotaRepository.findByKode(kabkota.kode);
            if (existingKabKota) {
                throw new ConflictException(`KabKota with kode ${kabkota.kode} already exists`);
            }

            // Check if province exists
            const existingProvince = await this.provinceService.findById(kabkota.provinceId);
            if (!existingProvince) {
                throw new NotFoundException(`Province with id ${kabkota.provinceId} not found`);
            }
            // For now, we'll skip this check as ProvinceModule integration comes later

            const newKabKota = await this.kabKotaRepository.create(kabkota);
            return newKabKota;
        } catch (error) {
            console.error('Error creating kabkota:', error);
            throw error;
        }
    }

    async updateKabKota(kabkota: UpdateKabKotaDto): Promise<KabKota> {
        try {
            // Check if kabkota exists
            const existingKabKota = await this.kabKotaRepository.findById(kabkota.id);
            if (!existingKabKota) {
                throw new NotFoundException(`KabKota with id ${kabkota.id} not found`);
            }

            // Check if kode is being changed and already exists
            if (kabkota.kode && kabkota.kode !== existingKabKota.kode) {
                const kodeExists = await this.kabKotaRepository.findByKode(kabkota.kode);
                if (kodeExists) {
                    throw new ConflictException(`KabKota with kode ${kabkota.kode} already exists`);
                }
            }

            // If provinceId is being updated, check if the new province exists
            if (kabkota.provinceId && kabkota.provinceId !== existingKabKota.provinceId) {
                const existingProvince = await this.provinceService.findById(kabkota.provinceId);
                if (!existingProvince) {
                    throw new NotFoundException(`Province with id ${kabkota.provinceId} not found`);
                }
            }

            const updateData: Partial<KabKota> = {
                kode: kabkota.kode,
                nama: kabkota.nama,
                provinceId: kabkota.provinceId,
                isActive: kabkota.isActive,
            };

            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key as keyof typeof updateData] === undefined) {
                    delete updateData[key as keyof typeof updateData];
                }
            });

            const updatedKabKota = await this.kabKotaRepository.update(kabkota.id, updateData);
            return updatedKabKota;
        } catch (error) {
            console.error('Error updating kabkota:', error);
            throw error;
        }
    }

    async deleteKabKota(kabkota: DeleteKabKotaDto): Promise<boolean> {
        try {
            // Check if kabkota exists
            const existingKabKota = await this.kabKotaRepository.findById(kabkota.id);
            if (!existingKabKota) {
                throw new NotFoundException(`KabKota with id ${kabkota.id} not found`);
            }

            const deleted = await this.kabKotaRepository.delete(kabkota.id);
            return deleted;
        } catch (error) {
            console.error('Error deleting kabkota:', error);
            throw error;
        }
    }

    async getKabKotas(pagination: GetKabKotasDto): Promise<KabKotasPaginationResult> {
        try {
            const result = await this.kabKotaRepository.findAll(pagination);
            return {
                kabkotas: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            console.error('Error fetching kabkotas:', error);
            throw error;
        }
    }

    async getKabKotaDetail(kabkota: GetKabKotaDetailDto): Promise<KabKota> {
        try {
            const existingKabKota = await this.kabKotaRepository.findById(kabkota.id);
            if (!existingKabKota) {
                throw new NotFoundException(`KabKota with id ${kabkota.id} not found`);
            }
            return existingKabKota;
        } catch (error) {
            console.error('Error fetching kabkota detail:', error);
            throw error;
        }
    }

    async findByKode(kode: string): Promise<KabKota | null> {
        try {
            return await this.kabKotaRepository.findByKode(kode);
        } catch (error) {
            console.error('Error finding kabkota by kode:', error);
            throw error;
        }
    }

    async findById(id: number): Promise<KabKota | null> {
        try {
            return await this.kabKotaRepository.findById(id);
        } catch (error) {
            console.error('Error finding kabkota by id:', error);
            throw error;
        }
    }

    async findByProvinceId(provinceId: number): Promise<KabKota[]> {
        try {
            return await this.kabKotaRepository.findByProvinceId(provinceId);
        } catch (error) {
            console.error('Error finding kabkotas by province:', error);
            throw error;
        }
    }

    async getKabKotasByProvince(provinceId: number, pagination?: GetKabKotasDto): Promise<KabKotasPaginationResult> {
        try {
            // Get all kabkotas for the province
            const kabkotas = await this.kabKotaRepository.findByProvinceId(provinceId);
            
            if (!pagination) {
                return {
                    kabkotas,
                    total: kabkotas.length,
                    page: 1,
                    amount: kabkotas.length,
                    totalPages: 1
                };
            }

            // Apply pagination
            const startIndex = (pagination.page - 1) * pagination.amount;
            const endIndex = startIndex + pagination.amount;
            const paginatedKabKotas = kabkotas.slice(startIndex, endIndex);

            return {
                kabkotas: paginatedKabKotas,
                total: kabkotas.length,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(kabkotas.length / pagination.amount)
            };
        } catch (error) {
            console.error('Error fetching kabkotas by province with pagination:', error);
            throw error;
        }
    }
}
