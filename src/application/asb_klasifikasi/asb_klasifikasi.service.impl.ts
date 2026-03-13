import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AsbKlasifikasiService } from '../../domain/asb_klasifikasi/asb_klasifikasi.service';
import { AsbKlasifikasiRepository } from '../../domain/asb_klasifikasi/asb_klasifikasi.repository';
import { AsbKlasifikasi } from '../../domain/asb_klasifikasi/asb_klasifikasi.entity';
import { CreateAsbKlasifikasiDto } from '../../presentation/asb_klasifikasi/dto/create_asb_klasifikasi.dto';
import { GetAsbKlasifikasisDto } from '../../presentation/asb_klasifikasi/dto/get_asb_klasifikasis.dto';
import { UpdateAsbKlasifikasiDto } from '../../presentation/asb_klasifikasi/dto/update_asb_klasifikasi.dto';
import { AsbTipeBangunanRepository } from 'src/domain/asb_tipe_bangunan/asb_tipe_bangunan.repository';

@Injectable()
export class AsbKlasifikasiServiceImpl implements AsbKlasifikasiService {
    constructor(
        private readonly asbKlasifikasiRepository: AsbKlasifikasiRepository,
        private readonly asbTipeBangunanRepository: AsbTipeBangunanRepository
    ) {}

    async create(asbKlasifikasi: CreateAsbKlasifikasiDto): Promise<AsbKlasifikasi> {
        try {
            // Check if asb_klasifikasi with the same klasifikasi already exists
            const existingAsbKlasifikasi = await this.asbKlasifikasiRepository.findByKlasifikasi(asbKlasifikasi.klasifikasi);
            if (existingAsbKlasifikasi) {
                throw new ConflictException(`AsbKlasifikasi with klasifikasi ${asbKlasifikasi.klasifikasi} already exists`);
            }

            // Check if id_asb_tipe_bangunan exists
            if (!this.asbTipeBangunanRepository.findById) {
                throw new NotFoundException(`TipeBangunan with id ${asbKlasifikasi.id_asb_tipe_bangunan} not found`);
            }
            
            const newAsbKlasifikasi = await this.asbKlasifikasiRepository.create(asbKlasifikasi);
            return newAsbKlasifikasi;
        } catch (error) {
            throw error;
        }
    }

    async update(asbKlasifikasi: UpdateAsbKlasifikasiDto): Promise<AsbKlasifikasi> {
        try {
            // Check if asb_klasifikasi exists
            const existingAsbKlasifikasi = await this.asbKlasifikasiRepository.findById(asbKlasifikasi.id);
            if (!existingAsbKlasifikasi) {
                throw new NotFoundException(`AsbKlasifikasi with id ${asbKlasifikasi.id} not found`);
            }

            // If id_asb_tipe_bangunan is being updated, check for duplicates
            if (asbKlasifikasi.klasifikasi && asbKlasifikasi.klasifikasi !== existingAsbKlasifikasi.klasifikasi) {
                const duplicateAsbKlasifikasi = await this.asbKlasifikasiRepository.findByKlasifikasi(asbKlasifikasi.klasifikasi);
                if (duplicateAsbKlasifikasi) {
                    throw new ConflictException(`AsbKlasifikasi with klasifikasi ${asbKlasifikasi.klasifikasi} already exists`);
                }
            }

            const updatedAsbKlasifikasi = await this.asbKlasifikasiRepository.update(asbKlasifikasi.id, asbKlasifikasi);
            return updatedAsbKlasifikasi;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            // Check if asb_klasifikasi exists
            const existingAsbKlasifikasi = await this.asbKlasifikasiRepository.findById(id);
            if (!existingAsbKlasifikasi) {
                throw new NotFoundException(`AsbKlasifikasi with id ${id} not found`);
            }

            return await this.asbKlasifikasiRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbKlasifikasi | null> {
        try {
            return await this.asbKlasifikasiRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findByAsbTipeBangunan(id_asb_tipe_bangunan: number): Promise<AsbKlasifikasi | null> {
        try {
            return await this.asbKlasifikasiRepository.findByAsbTipeBangunan(id_asb_tipe_bangunan);
        } catch (error) {
            throw error;
        }
    }

    async findByKlasifikasi(klasifikasi: string): Promise<AsbKlasifikasi | null> {
        try {
            return await this.asbKlasifikasiRepository.findByKlasifikasi(klasifikasi) || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKlasifikasisDto): Promise<{ data: AsbKlasifikasi[]; total: number }> {
        try {
            return await this.asbKlasifikasiRepository.findAll(pagination);
        } catch (error) {
            throw error;
        }
    }
}
