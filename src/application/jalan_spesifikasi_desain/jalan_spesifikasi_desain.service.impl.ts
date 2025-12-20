import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanSpesifikasiDesainService } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service";
import { JalanSpesifikasiDesainRepository } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.repository";
import { CreateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto";
import { UpdateJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/update_jalan_spesifikasi_desain.dto";
import { GetJalanSpesifikasiDesainDto } from "../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto";
import { JalanSpesifikasiDesain } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.entity";
import { JalanSpesifikasiDesainPaginationResultDto } from "../../presentation/jalan_spesifikasi_desain/dto/jalan_spesifikasi_desain_pagination_result.dto";

@Injectable()
export class JalanSpesifikasiDesainServiceImpl implements JalanSpesifikasiDesainService {
    constructor(
        private readonly jalanSpesifikasiDesainRepository: JalanSpesifikasiDesainRepository
    ) { }

    async create(dto: CreateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
        try {
            const existing = await this.jalanSpesifikasiDesainRepository.findByKode(dto.kode);
            if (existing) {
                throw new ConflictException(`JalanSpesifikasiDesain with kode ${dto.kode} already exists`);
            }
            return await this.jalanSpesifikasiDesainRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
        try {
            const existing = await this.jalanSpesifikasiDesainRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanSpesifikasiDesain with id ${dto.id} not found`);
            }

            if (dto.kode && dto.kode !== existing.kode) {
                const duplicate = await this.jalanSpesifikasiDesainRepository.findByKode(dto.kode);
                if (duplicate) {
                    throw new ConflictException(`JalanSpesifikasiDesain with kode ${dto.kode} already exists`);
                }
            }
            return await this.jalanSpesifikasiDesainRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.jalanSpesifikasiDesainRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanSpesifikasiDesain with id ${id} not found`);
            }
            return await this.jalanSpesifikasiDesainRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSpesifikasiDesain | null> {
        try {
            return await this.jalanSpesifikasiDesainRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesainPaginationResultDto> {
        try {
            const result = await this.jalanSpesifikasiDesainRepository.findAll(dto);
            return {
                data: result.data,
                total: result.total,
                page: dto.page ?? 1,
                limit: dto.amount ?? result.total,
                totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
            };
        } catch (error) {
            throw error;
        }
    }

    async findByKode(kode: string): Promise<JalanSpesifikasiDesain | null> {
        try {
            return await this.jalanSpesifikasiDesainRepository.findByKode(kode);
        } catch (error) {
            throw error;
        }
    }
}
