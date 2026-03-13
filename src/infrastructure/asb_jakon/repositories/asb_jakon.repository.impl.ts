import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AsbJakonOrmEntity } from '../../asb_jakon/orm/asb_jakon.orm_entity';
import { AsbJakonRepository } from '../../../domain/asb_jakon/asb_jakon.repository';
import { AsbJakon } from '../../../domain/asb_jakon/asb_jakon.entity';
import { plainToInstance } from 'class-transformer';
import { CreateAsbJakonDto } from 'src/presentation/asb_jakon/dto/create_asb_jakon.dto';
import { UpdateAsbJakonDto } from 'src/presentation/asb_jakon/dto/update_asb_jakon.dto';
import { DeleteAsbJakonDto } from 'src/presentation/asb_jakon/dto/delete_asb_jakon.dto';
import { GetAsbJakonListDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_list.dto';
import { GetAsbJakonDetailDto } from 'src/presentation/asb_jakon/dto/get_asb_jakon_detail.dto';
import { AsbJakonType } from 'src/domain/asb_jakon/asb_jakon_type.enum';
import { Injectable } from '@nestjs/common';
import { GetJakonByPriceRangeDto } from 'src/application/asb_jakon/dto/get_jakon_by_price_range.dto';

@Injectable()
export class AsbJakonRepositoryImpl implements AsbJakonRepository {
    constructor(
        @InjectRepository(AsbJakonOrmEntity)
        private readonly repo: Repository<AsbJakonOrmEntity>,
    ) { }

    async create(dto: CreateAsbJakonDto): Promise<AsbJakon> {
        try {
            const entity = this.repo.create(dto);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, dto: UpdateAsbJakonDto): Promise<AsbJakon> {
        try {
            await this.repo.update(id, dto);
            const updated = await this.repo.findOneBy({ id });
            return updated!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id)
                .then(() => true)
                .catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbJakon | null> {
        try {
            const entity = await this.repo.findOneBy({ id });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbJakonListDto): Promise<{ data: AsbJakon[]; total: number }> {
        try {
            const [data, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
            });
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByAsbJenisId(id: number): Promise<AsbJakon[]> {
        try {
            const data = await this.repo.find({ where: { idAsbJenis: id } });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async findByAsbTipeBangunanId(id: number): Promise<AsbJakon[]> {
        try {
            const data = await this.repo.find({ where: { idAsbTipeBangunan: id } });
            return data || null;
        } catch (error) {
            throw error;
        }
    }

    async findByAsbKlasifikasiId(id: number): Promise<AsbJakon[]> {
        try {
            const data = await this.repo.find({ where: { idAsbKlasifikasi: id } });
            return data || null;
        } catch (error) {
            throw error;
        }
    }

    async findByTahun(tahun: number): Promise<AsbJakon[]> {
        try {
            const data = await this.repo.find({ where: { tahun } });
            return data || null;
        } catch (error) {
            throw error;
        }
    }

    async findByType(type: AsbJakonType): Promise<AsbJakon[]> {
        try {
            const data = await this.repo.find({ where: { type } });
            return data || null;
        } catch (error) {
            throw error;
        }
    }

    async findByPriceRange(dto: GetJakonByPriceRangeDto): Promise<AsbJakon | null> {
        try {
            // Try to find a record where total_biaya falls within the price range
            let entity = await this.repo
                .createQueryBuilder('asb_jakon')
                .where('asb_jakon.id_asb_klasifikasi = :id_asb_klasifikasi', {
                    id_asb_klasifikasi: dto.id_asb_klasifikasi
                })
                .andWhere('asb_jakon.id_asb_tipe_bangunan = :id_asb_tipe_bangunan', {
                    id_asb_tipe_bangunan: dto.id_asb_tipe_bangunan
                })
                .andWhere('asb_jakon.id_asb_jenis = :id_asb_jenis', {
                    id_asb_jenis: dto.id_asb_jenis
                })
                .andWhere('asb_jakon.type = :type', {
                    type: dto.type
                })
                .andWhere('asb_jakon.price_from <= :total_biaya', {
                    total_biaya: dto.total_biaya_pembangunan
                })
                .andWhere('asb_jakon.price_to > :total_biaya', {
                    total_biaya: dto.total_biaya_pembangunan
                })
                .getOne();

            // If no record found in range, check if total_biaya is less than all price_from
            // If so, get the record with the lowest price_from
            if (!entity) {
                entity = await this.repo
                    .createQueryBuilder('asb_jakon')
                    .where('asb_jakon.id_asb_klasifikasi = :id_asb_klasifikasi', {
                        id_asb_klasifikasi: dto.id_asb_klasifikasi
                    })
                    .andWhere('asb_jakon.id_asb_tipe_bangunan = :id_asb_tipe_bangunan', {
                        id_asb_tipe_bangunan: dto.id_asb_tipe_bangunan
                    })
                    .andWhere('asb_jakon.id_asb_jenis = :id_asb_jenis', {
                        id_asb_jenis: dto.id_asb_jenis
                    })
                    .andWhere('asb_jakon.type = :type', {
                        type: dto.type
                    })
                    .orderBy('asb_jakon.price_from', 'ASC')
                    .getOne();
            }

            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
