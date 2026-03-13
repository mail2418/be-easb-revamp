import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbDetailReview } from '../../../domain/asb_detail_review/asb_detail_review.entity';
import { AsbDetailReviewRepository } from '../../../domain/asb_detail_review/asb_detail_review.repository';
import { AsbDetailReviewOrmEntity } from '../orm/asb_detail_review.orm_entity';
import { CreateAsbDetailReviewDto } from '../../../application/asb_detail_review/dto/create_asb_detail_review.dto';
import { UpdateAsbDetailReviewDto } from '../../../application/asb_detail_review/dto/update_asb_detail_review.dto';
import { AsbDetailReviewWithRelationDto } from 'src/application/asb_detail_review/dto/asb_detail_review_with_relation.dto';

@Injectable()
export class AsbDetailReviewRepositoryImpl extends AsbDetailReviewRepository {
    constructor(
        @InjectRepository(AsbDetailReviewOrmEntity)
        private readonly repository: Repository<AsbDetailReviewOrmEntity>,
    ) {
        super();
    }

    async create(dto: CreateAsbDetailReviewDto): Promise<AsbDetailReview> {
        try {
            const ormEntity = this.repository.create(dto);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbDetailReview, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbDetailReviewDto): Promise<AsbDetailReview> {
        try {
            const existing = await this.repository.findOne({
                where: { id: dto.id },
            });
            if (!existing) {
                throw new Error(
                    `AsbDetailReview with id ${dto.id} not found`,
                );
            }

            const updateData: Partial<AsbDetailReviewOrmEntity> = {};

            if (dto.idAsbDetail !== undefined) {
                updateData.idAsbDetail = dto.idAsbDetail;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }
            if (dto.idAsbLantai !== undefined) {
                updateData.idAsbLantai = dto.idAsbLantai;
            }
            if (dto.idAsbFungsiRuang !== undefined) {
                updateData.idAsbFungsiRuang = dto.idAsbFungsiRuang;
            }
            if (dto.asbFungsiRuangKoef !== undefined) {
                updateData.asbFungsiRuangKoef = dto.asbFungsiRuangKoef;
            }
            if (dto.lantaiKoef !== undefined) {
                updateData.lantaiKoef = dto.lantaiKoef;
            }
            if (dto.luas !== undefined) {
                updateData.luas = dto.luas;
            }

            await this.repository.update(dto.id, updateData);

            const updated = await this.repository.findOne({
                where: { id: dto.id },
            });
            return plainToInstance(AsbDetailReview, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbDetailReview with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbDetailReview | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbDetailReview, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbDetailReview[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbDetailReview, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async getAsbDetailReviewWithRelation(idAsb: number): Promise<AsbDetailReviewWithRelationDto[]> {
        try {
            const entities = await this.repository.find({
                where: { idAsb },
                relations: ['asbDetail', 'asbLantai', 'asbFungsiRuang']
            });

            const domainEntities: AsbDetailReviewWithRelationDto[] = entities.map((e) => {
                return {
                    id: e.id,
                    id_asb_detail: e.idAsbDetail,
                    id_asb_lantai: e.idAsbLantai,
                    id_asb_fungsi_ruang: e.idAsbFungsiRuang,
                    asb_fungsi_ruang_koef: e.asbFungsiRuangKoef,
                    lantai_koef: e.lantaiKoef,
                    luas: e.luas,
                    asb_lantai: {
                        id: e.asbLantai.id,
                        lantai: e.asbLantai.lantai,
                        koef: e.asbLantai.koef
                    },
                    asb_fungsi_ruang: {
                        id: e.asbFungsiRuang.id,
                        fungsi_ruang: e.asbFungsiRuang.nama_fungsi_ruang,
                        koef: e.asbFungsiRuang.koef
                    }
                }
            });
            console.log("domainEntities", domainEntities);
            return domainEntities;
        } catch (error) {
            throw error;
        }
    }
}
