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
import { CalculationMethod } from 'src/domain/asb_bipek_standard/calculation_method.enum';

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
        const ormEntity = this.repository.create(dto);

        const saved = await this.repository.save(ormEntity);
        return plainToInstance(AsbBipekNonStdReview, saved);
    }

    async update(
        dto: UpdateAsbBipekNonStdReviewDto,
    ): Promise<AsbBipekNonStdReview> {
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
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.softDelete(id);
        if (result.affected === 0) {
            throw new Error(
                `AsbBipekNonStdReview with id ${id} not found`,
            );
        }
    }

    async findById(id: number): Promise<AsbBipekNonStdReview | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity
            ? plainToInstance(AsbBipekNonStdReview, entity)
            : null;
    }

    async findByAsb(idAsb: number, page?: number, amount?: number): Promise<[AsbBipekNonStdReview[], number]> {
        const queryOptions: any = {
            where: { idAsb },
            order: { id: 'DESC' }
        };

        if (page !== undefined && amount !== undefined) {
            queryOptions.skip = (page - 1) * amount;
            queryOptions.take = amount;
        }

        const [entities, total] = await this.repository.findAndCount(queryOptions);
        const domainEntities = entities.map((e) => plainToInstance(AsbBipekNonStdReview, e));
        return [domainEntities, total];
    }

    async getBpnsWithRelationByAsb(dto: GetAsbBipekNonStdReviewByAsbDto): Promise<[BpnsReviewWithRelationsDto[], number]> {
        const queryBuilder = this.repository
            .createQueryBuilder('asb_bipek_non_std_review')
            .select([
                'asb_bipek_non_std_review.id',
                'asb_bipek_non_std_review.idAsbBipekNonStd',
                'asb_bipek_non_std_review.idAsbKomponenBangunanNonstd',
                'asb_bipek_non_std_review.files',
                'asb_bipek_non_std_review.bobotInput',
                'asb_bipek_non_std_review.calculationMethod',
                'asb_bipek_non_std_review.jumlahBobot',
                'asb_bipek_non_std_review.rincianHarga'
            ])
            .leftJoinAndSelect('asb_bipek_non_std_review.asbKomponenBangunanNonstd', 'asb_komponen_bangunan_nonstd')
            .where('asb_bipek_non_std_review.idAsb = :idAsb', { idAsb: dto.idAsb })
            .orderBy('asb_bipek_non_std_review.id', 'DESC');

        if (dto.page !== undefined && dto.amount !== undefined) {
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        const domainEntities = entities.map((e) => {
            const dto = new BpnsReviewWithRelationsDto();
            dto.id = e.id;
            dto.idAsbBipekNonStd = e.idAsbBipekNonStd ?? 0;
            dto.idAsbKomponenBangunanNonstd = e.idAsbKomponenBangunanNonstd ?? 0;
            dto.files = e.files;
            dto.bobotInput = e.bobotInput || 0;
            dto.calculationMethod = e.calculationMethod as CalculationMethod;
            dto.jumlahBobot = e.jumlahBobot || 0;
            dto.rincianHarga = e.rincianHarga || 0;
            if (e.asbKomponenBangunanNonstd) {
                dto.asbKomponenBangunanNonstd = {
                    id: e.asbKomponenBangunanNonstd.id,
                    komponen: e.asbKomponenBangunanNonstd.komponen
                };
            }
            return dto;
        });
        return [domainEntities, total];
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.softDelete({ idAsb });
    }
}
