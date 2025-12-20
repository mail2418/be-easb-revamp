import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JalanJenisPemeliharaanService } from "../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service";
import { JalanJenisPemeliharaanRepository } from "../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.repository";
import { CreateJalanJenisPemeliharaanDto } from "../../presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto";
import { UpdateJalanJenisPemeliharaanDto } from "../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto";
import { GetJalanJenisPemeliharaanDto } from "../../presentation/jalan_jenis_pemeliharaan/dto/get_jalan_jenis_pemeliharaan.dto";
import { JalanJenisPemeliharaan } from "../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.entity";
import { JalanJenisPemeliharaanPaginationResultDto } from "../../presentation/jalan_jenis_pemeliharaan/dto/jalan_jenis_pemeliharaan_pagination_result.dto";

@Injectable()
export class JalanJenisPemeliharaanServiceImpl implements JalanJenisPemeliharaanService {
    constructor(
        private readonly jalanJenisPemeliharaanRepository: JalanJenisPemeliharaanRepository
    ) { }

    async create(dto: CreateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan> {
        try {
            const existing = await this.jalanJenisPemeliharaanRepository.findByJenis(dto.jenis);
            if (existing) {
                throw new ConflictException(`JalanJenisPemeliharaan with jenis ${dto.jenis} already exists`);
            }
            return await this.jalanJenisPemeliharaanRepository.create(dto);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan> {
        try {
            const existing = await this.jalanJenisPemeliharaanRepository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`JalanJenisPemeliharaan with id ${dto.id} not found`);
            }

            if (dto.jenis && dto.jenis !== existing.jenis) {
                const duplicate = await this.jalanJenisPemeliharaanRepository.findByJenis(dto.jenis);
                if (duplicate) {
                    throw new ConflictException(`JalanJenisPemeliharaan with jenis ${dto.jenis} already exists`);
                }
            }
            return await this.jalanJenisPemeliharaanRepository.update(dto);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const existing = await this.jalanJenisPemeliharaanRepository.findById(id);
            if (!existing) {
                throw new NotFoundException(`JalanJenisPemeliharaan with id ${id} not found`);
            }
            return await this.jalanJenisPemeliharaanRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanJenisPemeliharaan | null> {
        try {
            return await this.jalanJenisPemeliharaanRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaanPaginationResultDto> {
        try {
            const result = await this.jalanJenisPemeliharaanRepository.findAll(dto);
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

    async findByJenis(jenis: string): Promise<JalanJenisPemeliharaan | null> {
        try {
            return await this.jalanJenisPemeliharaanRepository.findByJenis(jenis);
        } catch (error) {
            throw error;
        }
    }
}
