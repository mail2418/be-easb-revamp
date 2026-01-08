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
        const ormEntity = this.repository.create(dto);

        const saved = await this.repository.save(ormEntity);
        return plainToInstance(AsbDetail, saved);
    }

    async update(dto: UpdateAsbDetailDto): Promise<AsbDetail> {
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
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.softDelete(id);
        if (result.affected === 0) {
            throw new Error(`AsbDetail with id ${id} not found`);
        }
    }

    async findById(id: number): Promise<AsbDetail | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? plainToInstance(AsbDetail, entity) : null;
    }

    async findByFileType(files: Files): Promise<AsbDetail[]> {
        const entities = await this.repository.find({
            where: { files },
        });
        return entities.map((e) => plainToInstance(AsbDetail, e));
    }

    async findByAsb(idAsb: number, page?: number, amount?: number): Promise<[AsbDetail[], number]> {
        const queryOptions: any = {
            where: { idAsb },
            order: { id: 'DESC' }
        };

        if (page !== undefined && amount !== undefined) {
            queryOptions.skip = (page - 1) * amount;
            queryOptions.take = amount;
        }

        const [entities, total] = await this.repository.findAndCount(queryOptions);
        const domainEntities = entities.map((e) => plainToInstance(AsbDetail, e));
        return [domainEntities, total];
    }

    async getAsbDetailWithRelation(idAsb: number): Promise<AsbDetailWithRelationDto[]> {
        const entities = await this.repository
            .createQueryBuilder('asb_detail')
            .select([
                'asb_detail.id',
                'asb_detail.id_asb_lantai',
                'asb_detail.id_asb_fungsi_ruang',
                'asb_detail.asb_fungsi_ruang_koef',
                'asb_detail.lantai_koef',
                'asb_detail.luas'
            ])
            .leftJoin('asb_detail.asbLantai', 'asb_lantai')
            .addSelect([
                'asb_lantai.id',
                'asb_lantai.lantai',
                'asb_lantai.koef'
            ])
            .leftJoin('asb_detail.asbFungsiRuang', 'asb_fungsi_ruang')
            .addSelect([
                'asb_fungsi_ruang.id',
                'asb_fungsi_ruang.nama_fungsi_ruang',
                'asb_fungsi_ruang.koef'
            ])
            .where('asb_detail.id_asb = :idAsb', { idAsb })
            .getMany();
        return entities.map((e) => plainToInstance(AsbDetailWithRelationDto, e));
    }

    async deleteByIds(ids: number[]): Promise<void> {
        if (ids.length > 0) {
            await this.repository.softDelete(ids);
        }
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        await this.repository.softDelete({ idAsb });
    }
}
