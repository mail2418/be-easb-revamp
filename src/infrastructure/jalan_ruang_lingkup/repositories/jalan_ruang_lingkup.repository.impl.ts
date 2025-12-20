import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanRuangLingkupRepository } from "../../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.repository";
import { JalanRuangLingkupOrmEntity } from "../orm/jalan_ruang_lingkup.orm_entity";
import { JalanRuangLingkup } from "../../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.entity";
import { CreateJalanRuangLingkupDto } from "../../../presentation/jalan_ruang_lingkup/dto/create_jalan_ruang_lingkup.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanRuangLingkupDto } from "../../../presentation/jalan_ruang_lingkup/dto/update_jalan_ruang_lingkup.dto";
import { GetJalanRuangLingkupDto } from "../../../presentation/jalan_ruang_lingkup/dto/get_jalan_ruang_lingkup.dto";

@Injectable()
export class JalanRuangLingkupRepositoryImpl implements JalanRuangLingkupRepository {
    constructor(@InjectRepository(JalanRuangLingkupOrmEntity) private readonly repo: Repository<JalanRuangLingkupOrmEntity>) { }

    async create(dto: CreateJalanRuangLingkupDto): Promise<JalanRuangLingkup> {
        try {
            const ormEntity = plainToInstance(JalanRuangLingkupOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanRuangLingkupDto): Promise<JalanRuangLingkup> {
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

    async findById(id: number): Promise<JalanRuangLingkup | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanRuangLingkupDto): Promise<{ data: JalanRuangLingkup[]; total: number; }> {
        try {
            const findOptions: any = {
                order: { id: "DESC" }
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

    async findByRuangLingkup(ruangLingkup: string): Promise<JalanRuangLingkup | null> {
        try {
            const entity = await this.repo.findOne({ where: { ruang_lingkup: ruangLingkup } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
