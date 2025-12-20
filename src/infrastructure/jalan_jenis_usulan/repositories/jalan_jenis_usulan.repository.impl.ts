import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanJenisUsulanRepository } from "../../../domain/jalan_jenis_usulan/jalan_jenis_usulan.repository";
import { JalanJenisUsulanOrmEntity } from "../orm/jalan_jenis_usulan.orm_entity";
import { JalanJenisUsulan } from "../../../domain/jalan_jenis_usulan/jalan_jenis_usulan.entity";
import { CreateJalanJenisUsulanDto } from "../../../presentation/jalan_jenis_usulan/dto/create_jalan_jenis_usulan.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanJenisUsulanDto } from "../../../presentation/jalan_jenis_usulan/dto/update_jalan_jenis_usulan.dto";
import { GetJalanJenisUsulanDto } from "../../../presentation/jalan_jenis_usulan/dto/get_jalan_jenis_usulan.dto";

@Injectable()
export class JalanJenisUsulanRepositoryImpl implements JalanJenisUsulanRepository {
    constructor(@InjectRepository(JalanJenisUsulanOrmEntity) private readonly repo: Repository<JalanJenisUsulanOrmEntity>) { }

    async create(dto: CreateJalanJenisUsulanDto): Promise<JalanJenisUsulan> {
        try {
            const ormEntity = plainToInstance(JalanJenisUsulanOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanJenisUsulanDto): Promise<JalanJenisUsulan> {
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

    async findById(id: number): Promise<JalanJenisUsulan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanJenisUsulanDto): Promise<{ data: JalanJenisUsulan[]; total: number; }> {
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

    async findByJenisUsulan(jenisUsulan: string): Promise<JalanJenisUsulan | null> {
        try {
            const entity = await this.repo.findOne({ where: { jenis_usulan: jenisUsulan } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
