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
        try {
            const ormEntity = plainToInstance(JalanSaluranSmkkOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSaluranSmkkDto): Promise<JalanSaluranSmkk> {
        try {
            const { id, ...updateData } = dto;
            await this.repo.update(id, updateData);
            const updatedEntity = await this.repo.findOne({ where: { id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<JalanSaluranSmkk | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('jss')
                .select([
                    'jss.id',
                    'jss.id_ruang_lingkup',
                    'jss.no_mata_pembayaran',
                    'jss.satuan',
                    'jss.harga_satuan',
                    'jss.uraian',
                    'jss.pengali'
                ])
                .leftJoin('jss.ruangLingkup', 'ruang_lingkup')
                .addSelect([
                    'ruang_lingkup.id',
                    'ruang_lingkup.id_jenis_usulan',
                    'ruang_lingkup.deskripsi_ruang_lingkup'
                ])
                .where('jss.id = :id', { id })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSaluranSmkkDto): Promise<{ data: JalanSaluranSmkk[]; total: number; }> {
        try {
            const queryBuilder = this.repo
                .createQueryBuilder('jss')
                .select([
                    'jss.id',
                    'jss.id_ruang_lingkup',
                    'jss.no_mata_pembayaran',
                    'jss.satuan',
                    'jss.harga_satuan',
                    'jss.uraian',
                    'jss.pengali'
                ])
                .leftJoin('jss.ruangLingkup', 'ruang_lingkup')
                .addSelect([
                    'ruang_lingkup.id',
                    'ruang_lingkup.id_jenis_usulan',
                    'ruang_lingkup.deskripsi_ruang_lingkup'
                ])
                .orderBy('jss.id', 'DESC');

            if (dto.page !== undefined && dto.amount !== undefined) {
                const skip = (dto.page - 1) * dto.amount;
                queryBuilder.skip(skip).take(dto.amount);
            }

            const [data, total] = await queryBuilder.getManyAndCount();

            return { data, total };
        } catch (error) {
            throw error;
        }
    }
}

