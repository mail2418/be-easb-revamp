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
import { CalculationMethod } from 'src/domain/asb_bipek_standard/calculation_method.enum';

@Injectable()
export class AsbBipekStandardReviewRepositoryImpl extends AsbBipekStandardReviewRepository {
    constructor(
        @InjectRepository(AsbBipekStandardReviewOrmEntity)
        private readonly repository: Repository<AsbBipekStandardReviewOrmEntity>,
    ) {
        super();
    }

    async create(dto: CreateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview> {
        const ormEntity = this.repository.create(dto);
        const saved = await this.repository.save(ormEntity);
        return plainToInstance(AsbBipekStandardReview, saved);
    }

    async update(dto: UpdateAsbBipekStandardReviewDto): Promise<AsbBipekStandardReview> {
        const existing = await this.repository.findOne({
            where: { id: dto.id },
        });
        if (!existing) {
            throw new Error(`AsbBipekStandardReview with id ${dto.id} not found`);
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
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.softDelete(id);
        if (result.affected === 0) {
            throw new Error(`AsbBipekStandardReview with id ${id} not found`);
        }
    }

    async findById(id: number): Promise<AsbBipekStandardReview | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? plainToInstance(AsbBipekStandardReview, entity) : null;
    }

    async findByAsb(
        idAsb: number,
        page?: number,
        amount?: number,
    ): Promise<[AsbBipekStandardReview[], number]> {
        const queryOptions: any = {
            where: { idAsb },
            order: { id: 'DESC' },
        };

        if (page !== undefined && amount !== undefined) {
            queryOptions.skip = (page - 1) * amount;
            queryOptions.take = amount;
        }

        const [entities, total] = await this.repository.findAndCount(queryOptions);
        const domainEntities = entities.map((e) => plainToInstance(AsbBipekStandardReview, e));
        return [domainEntities, total];
    }

    async getBpsWithRelationByAsb(
        dto: GetAsbBipekStandardReviewByAsbDto,
    ): Promise<[BpsReviewWithRelationsDto[], number]> {
        const queryBuilder = this.repository
            .createQueryBuilder('asb_bipek_standard_review')
            .select([
                'asb_bipek_standard_review.id',
                'asb_bipek_standard_review.idAsbBipekStandard',
                'asb_bipek_standard_review.idAsbKomponenBangunanStd',
                'asb_bipek_standard_review.files',
                'asb_bipek_standard_review.bobotInput',
                'asb_bipek_standard_review.calculationMethod',
                'asb_bipek_standard_review.jumlahBobot',
                'asb_bipek_standard_review.rincianHarga',
            ])
            .leftJoinAndSelect(
                'asb_bipek_standard_review.asbKomponenBangunanStd',
                'asb_komponen_bangunan_std',
            )
            .where('asb_bipek_standard_review.idAsb = :idAsb', { idAsb: dto.idAsb })
            .orderBy('asb_bipek_standard_review.id', 'DESC');

        if (dto.page !== undefined && dto.amount !== undefined) {
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        const domainEntities = entities.map((e) => {
            const dto = new BpsReviewWithRelationsDto();
            dto.id = e.id;
            dto.idAsbBipekStandard = e.idAsbBipekStandard ?? 0;
            dto.idAsbKomponenBangunanStd = e.idAsbKomponenBangunanStd ?? 0;
            dto.files = e.files;
            dto.bobotInput = e.bobotInput || 0;
            dto.calculationMethod = e.calculationMethod as CalculationMethod;
            dto.jumlahBobot = e.jumlahBobot || 0;
            dto.rincianHarga = e.rincianHarga || 0;
            if (e.asbKomponenBangunanStd) {
                dto.asbKomponenBangunanStd = {
                    id: e.asbKomponenBangunanStd.id,
                    komponen: e.asbKomponenBangunanStd.komponen,
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
