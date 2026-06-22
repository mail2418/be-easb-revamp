import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSaluranSmkkRepository } from "../../../domain/jalan_saluran_smkk/jalan_saluran_smkk.repository";
import { JalanSaluranSmkkOrmEntity } from "../orm/jalan_saluran_smkk.orm_entity";
import { JalanSaluranSmkk } from "../../../domain/jalan_saluran_smkk/jalan_saluran_smkk.entity";
import { CreateJalanSaluranSmkkDto } from "../../../presentation/jalan_saluran_smkk/dto/create_jalan_saluran_smkk.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSaluranSmkkDto } from "../../../presentation/jalan_saluran_smkk/dto/update_jalan_saluran_smkk.dto";
import { GetJalanSaluranSmkkDto } from "../../../presentation/jalan_saluran_smkk/dto/get_jalan_saluran_smkk.dto";

@Injectable()
export class JalanSaluranSmkkRepositoryImpl implements JalanSaluranSmkkRepository {
    constructor(@InjectRepository(JalanSaluranSmkkOrmEntity) private readonly repo: Repository<JalanSaluranSmkkOrmEntity>) { }

    async create(dto: CreateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk> {
        const ormEntity = plainToInstance(JalanSaluranSmkkOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<JalanSaluranSmkk | null> {
        const entity = await this.repo
            .createQueryBuilder('jss')
            .select([
                'jss.id',
                'jss.id_jenis_usulan',
                'jss.no_mata_pembayaran',
                'jss.satuan',
                'jss.uraian',
                'jss.pengali'
            ])
            .where('jss.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetJalanSaluranSmkkDto): Promise<{ data: JalanSaluranSmkk[]; total: number; }> {
        const queryBuilder = this.repo
            .createQueryBuilder('jss')
            .leftJoinAndSelect('jss.jenisUsulan', 'jenis_usulan')
            .addSelect([
                'jenis_usulan.id',
                'jenis_usulan.jenis'
            ])
            .orderBy('jss.id', 'DESC');

        if (dto.search) {
            queryBuilder.andWhere(
                '(jss.no_mata_pembayaran ILIKE :search OR jss.uraian ILIKE :search)',
                { search: `%${dto.search}%` },
            );
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async findByJenisUsulan(idJenisUsulan: number): Promise<JalanSaluranSmkk[]> {
        const entities = await this.repo
            .createQueryBuilder('jss')
            .select([
                'jss.id',
                'jss.id_jenis_usulan',
                'jss.no_mata_pembayaran',
                'jss.satuan',
                'jss.uraian',
                'jss.pengali'
            ])
            .where('jss.id_jenis_usulan = :idJenisUsulan', { idJenisUsulan })
            .orderBy('jss.id', 'ASC')
            .getMany();
        return entities;
    }
}

