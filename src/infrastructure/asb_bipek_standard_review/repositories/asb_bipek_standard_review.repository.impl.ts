import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBipekStandardReview } from '../../../domain/asb_bipek_standard_review/asb_bipek_standard_review.entity';
import { AsbBipekStandardReviewRepository } from '../../../domain/asb_bipek_standard_review/asb_bipek_standard_review.repository';
import { AsbBipekStandardReviewOrmEntity } from '../orm/asb_bipek_standard_review.orm_entity';
import { CreateAsbBipekStandardReviewDto } from '../../../application/asb_bipek_standard_review/dto/create_asb_bipek_standard_review.dto';
import { UpdateAsbBipekStandardReviewDto } from '../../../application/asb_bipek_standard_review/dto/update_asb_bipek_standard_review.dto';
import { BpsReviewWithRelationsDto } from 'src/application/asb_bipek_standard_review/dto/bps_review_with_relations.dto';
import { GetAsbBipekStandardReviewByAsbDto } from 'src/presentation/asb_bipek_standard_review/dto/get_asb_bipek_standard_review_by_asb.dto';

@Injectable()
export class AsbBipekStandardReviewRepositoryImpl extends AsbBipekStandardReviewRepository {
    constructor(
        @InjectRepository(AsbBipekStandardReviewOrmEntity)
        private readonly repository: Repository<AsbBipekStandardReviewOrmEntity>,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBipekStandardReviewDto,
    ): Promise<AsbBipekStandardReview> {
        try {
            const ormEntity = this.repository.create(dto);
            console.log("ORM Entity:", ormEntity);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBipekStandardReview, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(
        dto: UpdateAsbBipekStandardReviewDto,
    ): Promise<AsbBipekStandardReview> {
        try {
            const existing = await this.repository.findOne({
                where: { id: dto.id },
            });
            if (!existing) {
                throw new Error(
                    `AsbBipekStandardReview with id ${dto.id} not found`,
                );
            }

            const updateData: Partial<AsbBipekStandardReviewOrmEntity> = {};

            if (dto.idAsbBipekStandard !== undefined) {
                updateData.idAsbBipekStandard = dto.idAsbBipekStandard;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (dto.idAsbKomponenBangunanStd !== undefined) {
                updateData.idAsbKomponenBangunanStd = dto.idAsbKomponenBangunanStd;
            }
            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }
            if (dto.bobotInput !== undefined) {
                updateData.bobotInput = dto.bobotInput;
            }
            if (dto.calculationMethod !== undefined) {
                updateData.calculationMethod = dto.calculationMethod;
            }
            if (dto.jumlahBobot !== undefined) {
                updateData.jumlahBobot = dto.jumlahBobot;
            }
            if (dto.rincianHarga !== undefined) {
                updateData.rincianHarga = dto.rincianHarga;
            }

            await this.repository.update(dto.id, updateData);

            const updated = await this.repository.findOne({
                where: { id: dto.id },
            });
            return plainToInstance(AsbBipekStandardReview, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(
                    `AsbBipekStandardReview with id ${id} not found`,
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBipekStandardReview | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity
                ? plainToInstance(AsbBipekStandardReview, entity)
                : null;
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekStandardReview[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbBipekStandardReview, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async getBpsWithRelationByAsb(dto: GetAsbBipekStandardReviewByAsbDto): Promise<[BpsReviewWithRelationsDto[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb: dto.idAsb },
                skip: (dto.page - 1) * dto.amount,
                take: dto.amount,
                order: { id: 'DESC' },
                relations: ['asbKomponenBangunanStd']
            });
            const domainEntities = entities.map((e) => plainToInstance(BpsReviewWithRelationsDto, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }
}
