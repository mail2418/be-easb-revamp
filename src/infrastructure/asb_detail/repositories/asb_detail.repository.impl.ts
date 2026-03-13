import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbDetail } from '../../../domain/asb_detail/asb_detail.entity';
import { AsbDetailRepository } from '../../../domain/asb_detail/asb_detail.repository';
import { AsbDetailOrmEntity } from '../orm/asb_detail.orm_entity';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CreateAsbDetailDto } from '../../../application/asb_detail/dto/create_asb_detail.dto';
import { UpdateAsbDetailDto } from '../../../application/asb_detail/dto/update_asb_detail.dto';
import { AsbDetailWithRelationDto } from 'src/application/asb_detail/dto/asb_detail_with_relation.dto';

@Injectable()
export class AsbDetailRepositoryImpl extends AsbDetailRepository {
    constructor(
        @InjectRepository(AsbDetailOrmEntity)
        private readonly repository: Repository<AsbDetailOrmEntity>,
    ) {
        super();
    }

    async create(dto: CreateAsbDetailDto): Promise<AsbDetail> {
        try {
            const ormEntity = this.repository.create(dto);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbDetail, saved);
        } catch (error) {
            console.log("Error ASB Detail: ", error);
            throw error;
        }
    }

    async update(dto: UpdateAsbDetailDto): Promise<AsbDetail> {
        try {
            const existing = await this.repository.findOne({ where: { id: dto.id } });
            if (!existing) {
                throw new Error(`AsbDetail with id ${dto.id} not found`);
            }

            const updateData: Partial<AsbDetailOrmEntity> = {};

            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }

            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
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

            const updated = await this.repository.findOne({ where: { id: dto.id } });
            return plainToInstance(AsbDetail, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbDetail with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbDetail | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbDetail, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findByFileType(files: Files): Promise<AsbDetail[]> {
        try {
            const entities = await this.repository.find({
                where: { files },
            });
            return entities.map((e) => plainToInstance(AsbDetail, e));
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbDetail[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbDetail, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async getAsbDetailWithRelation(idAsb: number): Promise<AsbDetailWithRelationDto[]> {
        try {
            const entities = await this.repository.find({
                where: { idAsb },
                relations: ['asbFungsiRuang', 'asbLantai'],
            });
            return entities.map((e) => plainToInstance(AsbDetailWithRelationDto, e));
        } catch (error) {
            throw error;
        }
    }

    async deleteByIds(ids: number[]): Promise<void> {
        try {
            if (ids.length > 0) {
                await this.repository.softDelete(ids);
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        try {
            await this.repository.softDelete({ idAsb });
        } catch (error) {
            throw error;
        }
    }
}
