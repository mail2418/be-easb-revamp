import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBipekNonStdReview } from '../../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.entity';
import { AsbBipekNonStdReviewRepository } from '../../../domain/asb_bipek_non_std_review/asb_bipek_non_std_review.repository';
import { AsbBipekNonStdReviewOrmEntity } from '../orm/asb_bipek_non_std_review.orm_entity';
import { CreateAsbBipekNonStdReviewDto } from '../../../application/asb_bipek_non_std_review/dto/create_asb_bipek_non_std_review.dto';
import { UpdateAsbBipekNonStdReviewDto } from '../../../application/asb_bipek_non_std_review/dto/update_asb_bipek_non_std_review.dto';
import { GetAsbBipekNonStdReviewByAsbDto } from 'src/presentation/asb_bipek_non_std_review/dto/get_asb_bipek_non_std_review_by_asb.dto';
import { BpnsReviewWithRelationsDto } from 'src/application/asb_bipek_non_std/dto/bpns_review_with_relations.dto';

@Injectable()
export class AsbBipekNonStdReviewRepositoryImpl extends AsbBipekNonStdReviewRepository {
    constructor(
        @InjectRepository(AsbBipekNonStdReviewOrmEntity)
        private readonly repository: Repository<AsbBipekNonStdReviewOrmEntity>,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview> {
        try {
            const ormEntity = this.repository.create(dto);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBipekNonStdReview, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(
        dto: UpdateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview> {
        try {
            const existing = await this.repository.findOne({
                where: { id: dto.id },
            });
            if (!existing) {
                throw new Error(
                    `AsbBipekNonStdReview with id ${dto.id} not found`,
                );
            }

            const updateData: Partial<AsbBipekNonStdReviewOrmEntity> = {};

            if (dto.idAsbBipekNonStd !== undefined) {
                updateData.idAsbBipekNonStd = dto.idAsbBipekNonStd;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (dto.idAsbKomponenBangunanNonstd !== undefined) {
                updateData.idAsbKomponenBangunanNonstd = dto.idAsbKomponenBangunanNonstd;
            }
            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }
            if (dto.bobotInput !== undefined) {
                updateData.bobotInput = dto.bobotInput;
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
            return plainToInstance(AsbBipekNonStdReview, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(
                    `AsbBipekNonStdReview with id ${id} not found`,
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBipekNonStdReview | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity
                ? plainToInstance(AsbBipekNonStdReview, entity)
                : null;
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekNonStdReview[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbBipekNonStdReview, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async getBpnsWithRelationByAsb(dto: GetAsbBipekNonStdReviewByAsbDto): Promise<[BpnsReviewWithRelationsDto[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb: dto.idAsb },
                skip: (dto.page - 1) * dto.amount,
                take: dto.amount,
                order: { id: 'DESC' },
                relations: ['asbKomponenBangunanNonstd']
            });
            const domainEntities = entities.map((e) => plainToInstance(BpnsReviewWithRelationsDto, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }
}
