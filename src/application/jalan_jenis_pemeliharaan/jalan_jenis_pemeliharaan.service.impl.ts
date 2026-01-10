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
        // Check if combination of tingkat_pemeliharaan and jenis_pemeliharaan already exists
        const existing = await this.jalanJenisPemeliharaanRepository.findByTingkatPemeliharaan(dto.tingkat_pemeliharaan);
        if (existing && existing.jenis_pemeliharaan === dto.jenis_pemeliharaan) {
            throw new ConflictException(`JalanJenisPemeliharaan with tingkat_pemeliharaan ${dto.tingkat_pemeliharaan} and jenis_pemeliharaan ${dto.jenis_pemeliharaan} already exists`);
        }
        return await this.jalanJenisPemeliharaanRepository.create(dto);
    }

    async update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan> {
        const existing = await this.jalanJenisPemeliharaanRepository.findById(dto.id);
        if (!existing) {
            throw new NotFoundException(`JalanJenisPemeliharaan with id ${dto.id} not found`);
        }

        // Check if combination of tingkat_pemeliharaan and jenis_pemeliharaan already exists
        if (dto.tingkat_pemeliharaan || dto.jenis_pemeliharaan) {
            const checkTingkat = dto.tingkat_pemeliharaan || existing.tingkat_pemeliharaan;
            const checkJenis = dto.jenis_pemeliharaan || existing.jenis_pemeliharaan;
            
            if (checkTingkat !== existing.tingkat_pemeliharaan || checkJenis !== existing.jenis_pemeliharaan) {
                const duplicate = await this.jalanJenisPemeliharaanRepository.findByTingkatPemeliharaan(checkTingkat);
                if (duplicate && duplicate.id !== dto.id && duplicate.jenis_pemeliharaan === checkJenis) {
                    throw new ConflictException(`JalanJenisPemeliharaan with tingkat_pemeliharaan ${checkTingkat} and jenis_pemeliharaan ${checkJenis} already exists`);
                }
            }
        }
        return await this.jalanJenisPemeliharaanRepository.update(dto);
    }

    async delete(id: number): Promise<boolean> {
        const existing = await this.jalanJenisPemeliharaanRepository.findById(id);
        if (!existing) {
            throw new NotFoundException(`JalanJenisPemeliharaan with id ${id} not found`);
        }
        return await this.jalanJenisPemeliharaanRepository.delete(id);
    }

    async findById(id: number): Promise<JalanJenisPemeliharaan | null> {
        return await this.jalanJenisPemeliharaanRepository.findById(id);
    }

    async findAll(dto: GetJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaanPaginationResultDto> {
        const result = await this.jalanJenisPemeliharaanRepository.findAll(dto);
        return {
            data: result.data,
            total: result.total,
            page: dto.page ?? 1,
            limit: dto.amount ?? result.total,
            totalPages: dto.amount ? Math.ceil(result.total / dto.amount) : 1
        };
    }

    async findByTingkatPemeliharaan(tingkat_pemeliharaan: string): Promise<JalanJenisPemeliharaan | null> {
        return await this.jalanJenisPemeliharaanRepository.findByTingkatPemeliharaan(tingkat_pemeliharaan);
    }

    async findByJenisPemeliharaan(jenis_pemeliharaan: string): Promise<JalanJenisPemeliharaan[]> {
        return await this.jalanJenisPemeliharaanRepository.findByJenisPemeliharaan(jenis_pemeliharaan);
    }
}
