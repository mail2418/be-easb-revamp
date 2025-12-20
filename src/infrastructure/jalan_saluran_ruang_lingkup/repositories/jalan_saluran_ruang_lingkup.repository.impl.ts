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
            const entity = await this.repo.findOne({ where: { id }, relations: ['jenisUsulan'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByJenisUsulanAndDeskripsi(id_jenis_usulan: number, deskripsi_ruang_lingkup: string): Promise<JalanSaluranRuangLingkup | null> {
        try {
            const entity = await this.repo.findOne({ where: { id_jenis_usulan, deskripsi_ruang_lingkup }, relations: ['jenisUsulan'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSaluranRuangLingkupDto): Promise<{ data: JalanSaluranRuangLingkup[]; total: number; }> {
        try {
            const findOptions: any = {
                order: { id: "DESC" },
                relations: ['jenisUsulan']
            };

            if (dto.page !== undefined && dto.amount !== undefined) {
                findOptions.skip = (dto.page - 1) * dto.amount;
                findOptions.take = dto.amount;
            }

            const [data, total] = await this.repo.findAndCount(findOptions);

            return { data, total };
        } catch (error) {
            throw error;
        }
    }
}
