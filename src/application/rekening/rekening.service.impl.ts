import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RekeningService } from '../../domain/rekening/rekening.service';
import { RekeningRepository } from '../../domain/rekening/rekening.repository';
import { Rekening } from '../../domain/rekening/rekening.entity';
import { CreateRekeningDto } from '../../presentation/rekening/dto/create_rekening.dto';
import { GetRekeningsDto } from '../../presentation/rekening/dto/get_rekenings.dto';
import { UpdateRekeningDto } from '../../presentation/rekening/dto/update_rekening.dto';

@Injectable()
export class RekeningServiceImpl implements RekeningService {
    constructor(private readonly rekeningRepository: RekeningRepository) {}

    async create(rekening: CreateRekeningDto): Promise<Rekening> {
        try {
            // Check if rekening with the same kode already exists
            const existingRekening = await this.rekeningRepository.findByKode(rekening.rekening_kode);
            if (existingRekening) {
                throw new ConflictException(`Rekening with kode ${rekening.rekening_kode} already exists`);
            }

            const newRekening = await this.rekeningRepository.create(rekening);
            return newRekening;
        } catch (error) {
            throw error;
        }
    }

    async update(rekening: UpdateRekeningDto): Promise<Rekening> {
        try {
            // Check if rekening exists
            const existingRekening = await this.rekeningRepository.findById(rekening.id);
            if (!existingRekening) {
                throw new NotFoundException(`Rekening with id ${rekening.id} not found`);
            }

            // If rekening_kode is being updated, check for duplicates
            if (rekening.rekening_kode && rekening.rekening_kode !== existingRekening.rekening_kode) {
                const duplicateRekening = await this.rekeningRepository.findByKode(rekening.rekening_kode);
                if (duplicateRekening) {
                    throw new ConflictException(`Rekening with kode ${rekening.rekening_kode} already exists`);
                }
            }

            const updatedRekening = await this.rekeningRepository.update(rekening.id, rekening);
            return updatedRekening;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            // Check if rekening exists
            const existingRekening = await this.rekeningRepository.findById(id);
            if (!existingRekening) {
                throw new NotFoundException(`Rekening with id ${id} not found`);
            }

            return await this.rekeningRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Rekening | null> {
        try {
            return await this.rekeningRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async getRekeningByKode(rekeningKode: string): Promise<Rekening | null> {
        try {
            return await this.rekeningRepository.findByKode(rekeningKode);
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }> {
        try {
            return await this.rekeningRepository.findAll(pagination);
        } catch (error) {
            throw error;
        }
    }
}
