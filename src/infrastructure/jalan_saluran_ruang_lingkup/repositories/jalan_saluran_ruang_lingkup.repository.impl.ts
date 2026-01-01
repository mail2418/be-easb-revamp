import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSaluranRuangLingkupRepository } from "../../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository";
import { JalanSaluranRuangLingkupOrmEntity } from "../orm/jalan_saluran_ruang_lingkup.orm_entity";
import { JalanSaluranRuangLingkup } from "../../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.entity";
import { CreateJalanSaluranRuangLingkupDto } from "../../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSaluranRuangLingkupDto } from "../../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto";
import { GetJalanSaluranRuangLingkupDto } from "../../../presentation/jalan_saluran_ruang_lingkup/dto/get_jalan_saluran_ruang_lingkup.dto";

@Injectable()
export class JalanSaluranRuangLingkupRepositoryImpl implements JalanSaluranRuangLingkupRepository {
    constructor(@InjectRepository(JalanSaluranRuangLingkupOrmEntity) private readonly repo: Repository<JalanSaluranRuangLingkupOrmEntity>) { }

    async create(dto: CreateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup> {
        try {
            const ormEntity = plainToInstance(JalanSaluranRuangLingkupOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSaluranRuangLingkupDto): Promise<JalanSaluranRuangLingkup> {
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

    async findById(id: number): Promise<JalanSaluranRuangLingkup | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('jsrl')
                .select([
                    'jsrl.id',
                    'jsrl.id_jenis_usulan',
                    'jsrl.deskripsi_ruang_lingkup'
                ])
                .leftJoin('jsrl.jenisUsulan', 'jenis_usulan')
                .addSelect([
                    'jenis_usulan.id',
                    'jenis_usulan.jenis'
                ])
                .where('jsrl.id = :id', { id })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByJenisUsulanAndDeskripsi(id_jenis_usulan: number, deskripsi_ruang_lingkup: string): Promise<JalanSaluranRuangLingkup | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder('jsrl')
                .select([
                    'jsrl.id',
                    'jsrl.id_jenis_usulan',
                    'jsrl.deskripsi_ruang_lingkup'
                ])
                .leftJoin('jsrl.jenisUsulan', 'jenis_usulan')
                .addSelect([
                    'jenis_usulan.id',
                    'jenis_usulan.jenis'
                ])
                .where('jsrl.id_jenis_usulan = :id_jenis_usulan', { id_jenis_usulan })
                .andWhere('jsrl.deskripsi_ruang_lingkup = :deskripsi_ruang_lingkup', { deskripsi_ruang_lingkup })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSaluranRuangLingkupDto): Promise<{ data: JalanSaluranRuangLingkup[]; total: number; }> {
        try {
            const queryBuilder = this.repo
                .createQueryBuilder('jsrl')
                .select([
                    'jsrl.id',
                    'jsrl.id_jenis_usulan',
                    'jsrl.deskripsi_ruang_lingkup'
                ])
                .leftJoin('jsrl.jenisUsulan', 'jenis_usulan')
                .addSelect([
                    'jenis_usulan.id',
                    'jenis_usulan.jenis'
                ])
                .orderBy('jsrl.id', 'DESC');

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
