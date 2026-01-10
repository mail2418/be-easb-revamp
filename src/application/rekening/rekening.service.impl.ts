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
        // Check if rekening with the same kode already exists
        const existingRekening = await this.rekeningRepository.findByKode(rekening.rekening_kode);
        if (existingRekening) {
            throw new ConflictException(`Rekening with kode ${rekening.rekening_kode} already exists`);
        }

        const newRekening = await this.rekeningRepository.create(rekening);
        return newRekening;
    }

    async update(rekening: UpdateRekeningDto): Promise<Rekening> {
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
    }

    async delete(id: number): Promise<boolean> {
        // Check if rekening exists
        const existingRekening = await this.rekeningRepository.findById(id);
        if (!existingRekening) {
            throw new NotFoundException(`Rekening with id ${id} not found`);
        }

        return await this.rekeningRepository.delete(id);
    }

    async findById(id: number): Promise<Rekening | null> {
        return await this.rekeningRepository.findById(id);
    }

    async getRekeningByKode(rekeningKode: string): Promise<Rekening | null> {
        return await this.rekeningRepository.findByKode(rekeningKode);
    }

    async findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }> {
        return await this.rekeningRepository.findAll(pagination);
    }
}
