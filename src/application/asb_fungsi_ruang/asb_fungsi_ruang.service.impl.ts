import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AsbFungsiRuangService } from '../../domain/asb_fungsi_ruang/asb_fungsi_ruang.service';
import { AsbFungsiRuangRepository } from '../../domain/asb_fungsi_ruang/asb_fungsi_ruang.repository';
import { AsbFungsiRuang } from '../../domain/asb_fungsi_ruang/asb_fungsi_ruang.entity';
import { CreateAsbFungsiRuangDto } from '../../presentation/asb_fungsi_ruang/dto/create_asb_fungsi_ruang.dto';
import { GetAsbFungsiRuangsDto } from '../../presentation/asb_fungsi_ruang/dto/get_asb_fungsi_ruangs.dto';
import { UpdateAsbFungsiRuangDto } from 'src/presentation/asb_fungsi_ruang/dto/update_asb_fungsi_ruang.dto';

@Injectable()
export class AsbFungsiRuangServiceImpl implements AsbFungsiRuangService {
    constructor(private readonly asbFungsiRuangRepository: AsbFungsiRuangRepository) {}

    async create(asbFungsiRuang: CreateAsbFungsiRuangDto): Promise<AsbFungsiRuang> {
        try {
            // Check if asb_fungsi_ruang with the same name already exists
            const existingAsbFungsiRuang = await this.asbFungsiRuangRepository.findByNama(asbFungsiRuang.nama_fungsi_ruang);
            if (existingAsbFungsiRuang) {
                throw new ConflictException(`AsbFungsiRuang with name ${asbFungsiRuang.nama_fungsi_ruang} already exists`);
            }

            const newAsbFungsiRuang = await this.asbFungsiRuangRepository.create(asbFungsiRuang);
            return newAsbFungsiRuang;
        } catch (error) {
            throw error;
        }
    }

    async update(asbFungsiRuang: UpdateAsbFungsiRuangDto): Promise<AsbFungsiRuang> {
        try {
            // Check if asb_fungsi_ruang exists
            const existingAsbFungsiRuang = await this.asbFungsiRuangRepository.findById(asbFungsiRuang.id);
            if (!existingAsbFungsiRuang) {
                throw new NotFoundException(`AsbFungsiRuang with id ${asbFungsiRuang.id} not found`);
            }

            // If nama_fungsi_ruang is being updated, check for duplicates
            if (asbFungsiRuang.nama_fungsi_ruang && asbFungsiRuang.nama_fungsi_ruang !== existingAsbFungsiRuang.nama_fungsi_ruang) {
                const duplicateAsbFungsiRuang = await this.asbFungsiRuangRepository.findByNama(asbFungsiRuang.nama_fungsi_ruang);
                if (duplicateAsbFungsiRuang) {
                    throw new ConflictException(`AsbFungsiRuang with name ${asbFungsiRuang.nama_fungsi_ruang} already exists`);
                }
            }

            const updatedAsbFungsiRuang = await this.asbFungsiRuangRepository.update(asbFungsiRuang.id, asbFungsiRuang);
            return updatedAsbFungsiRuang;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            // Check if asb_fungsi_ruang exists
            const existingAsbFungsiRuang = await this.asbFungsiRuangRepository.findById(id);
            if (!existingAsbFungsiRuang) {
                throw new NotFoundException(`AsbFungsiRuang with id ${id} not found`);
            }

            return await this.asbFungsiRuangRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbFungsiRuang | null> {
        try {
            return await this.asbFungsiRuangRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findByNama(nama: string): Promise<AsbFungsiRuang | null> {
        try {
            return await this.asbFungsiRuangRepository.findByNama(nama);
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbFungsiRuangsDto): Promise<{ data: AsbFungsiRuang[]; total: number }> {
        try {
            return await this.asbFungsiRuangRepository.findAll(pagination);
        } catch (error) {
            throw error;
        }
    }
}
