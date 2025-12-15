import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, Raw } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UsulanJalanRepository } from '../../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanOrmEntity } from '../orm/usulan_jalan.orm_entity';
import { UsulanJalanWithRelationsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from 'src/application/usulan_jalan/dto/find_all_usulan_jalan.dto';

@Injectable()
export class UsulanJalanRepositoryImpl implements UsulanJalanRepository {
    constructor(
        @InjectRepository(UsulanJalanOrmEntity)
        private readonly repo: Repository<UsulanJalanOrmEntity>,
    ) { }

    async findById(id: number, idOpd?: number): Promise<UsulanJalanWithRelationsDto | null> {
        try {
            const whereClause: any = { id };

            // Add OPD filter if provided
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            const entity = await this.repo.findOne({
                where: whereClause,
                relations: [
                    'opd',
                    'usulanJalanStatus',
                    'jalanJenisPerkerasan',
                    'jalanJenisPerkerasanReview',
                    'mutuBeton',
                    'mutuBetonReview',
                    'spesifikasiDesainLentur',
                    'spesifikasiDesainLenturReview',
                    'spesifikasiDesainKaku',
                    'spesifikasiDesainKakuReview',
                    'ruangLingkupPerkerasanLentur',
                    'ruangLingkupPerkerasanLenturReview',
                    'ruangLingkupPerkerasanKaku',
                    'ruangLingkupPerkerasanKakuReview',
                    'kabkota',
                    'kecamatan',
                    'kelurahan',
                    'verifikatorAdbang',
                    'verifikatorBpkad',
                    'verifikatorBappeda',
                    'rejectVerifikator',
                ],
            });

            if (!entity) {
                return null;
            }
            return plainToInstance(UsulanJalanWithRelationsDto, entity);
        } catch (error) {
            console.log("Error finding Usulan Jalan by ID:", error);
            throw error;
        }
    }

    async findAll(dto: FindAllUsulanJalanDto, idOpd?: number): Promise<{ data: UsulanJalanWithRelationsDto[]; total: number }> {
        try {
            const whereClause: any = {};

            // OPD filter
            if (idOpd) {
                whereClause.idOpd = idOpd;
            }

            // Optional filters
            if (dto.idUsulanJalanStatus) {
                whereClause.idUsulanJalanStatus = dto.idUsulanJalanStatus;
            }

            if (dto.tahunAnggaran) {
                whereClause.tahunAnggaran = dto.tahunAnggaran;
            }

            if (dto.namaUsulanJalan) {
                whereClause.namaUsulanJalan = Raw(
                    (alias) => `LOWER(${alias}) LIKE :namaUsulanJalan`,
                    { namaUsulanJalan: `%${dto.namaUsulanJalan.toLowerCase()}%` },
                );
            }

            if (dto.idKabkota) {
                whereClause.idKabkota = dto.idKabkota;
            }

            if (dto.idKecamatan) {
                whereClause.idKecamatan = dto.idKecamatan;
            }

            if (dto.idKelurahan) {
                whereClause.idKelurahan = dto.idKelurahan;
            }

            if (dto.idJalanJenisPerkerasan) {
                whereClause.idJalanJenisPerkerasan = dto.idJalanJenisPerkerasan;
            }

            // Query with pagination
            const queryOptions: any = {
                where: whereClause,
                relations: [
                    'opd',
                    'usulanJalanStatus',
                    'jalanJenisPerkerasan',
                    'jalanJenisPerkerasanReview',
                    'mutuBeton',
                    'mutuBetonReview',
                    'spesifikasiDesainLentur',
                    'spesifikasiDesainLenturReview',
                    'spesifikasiDesainKaku',
                    'spesifikasiDesainKakuReview',
                    'ruangLingkupPerkerasanLentur',
                    'ruangLingkupPerkerasanLenturReview',
                    'ruangLingkupPerkerasanKaku',
                    'ruangLingkupPerkerasanKakuReview',
                    'kabkota',
                    'kecamatan',
                    'kelurahan',
                    'verifikatorAdbang',
                    'verifikatorBpkad',
                    'verifikatorBappeda',
                    'rejectVerifikator',
                ],
                order: { id: 'DESC' }
            };

            // Optional pagination
            if (dto.page && dto.amount) {
                queryOptions.skip = (dto.page - 1) * dto.amount;
                queryOptions.take = dto.amount;
            }

            const [data, total] = await this.repo.findAndCount(queryOptions);

            return {
                data: data.map(e => plainToInstance(UsulanJalanWithRelationsDto, e)),
                total
            };
        } catch (error) {
            console.log("Error finding all Usulan Jalan:", error);
            throw error;
        }
    }

    async create(data: DeepPartial<UsulanJalanOrmEntity>): Promise<UsulanJalanWithRelationsDto> {
        try {
            const entity = this.repo.create(data);
            const saved = await this.repo.save(entity);
            return this.findById(saved.id) as Promise<UsulanJalanWithRelationsDto>;
        } catch (error) {
            console.log("Error creating Usulan Jalan:", error);
            throw error;
        }
    }

    async update(id: number, data: DeepPartial<UsulanJalanOrmEntity>): Promise<UsulanJalanWithRelationsDto> {
        try {
            await this.repo.update(id, data);
            return this.findById(id) as Promise<UsulanJalanWithRelationsDto>;
        } catch (error) {
            console.log("Error updating Usulan Jalan:", error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.repo.softDelete(id);
        } catch (error) {
            console.log("Error deleting Usulan Jalan:", error);
            throw error;
        }
    }
}


