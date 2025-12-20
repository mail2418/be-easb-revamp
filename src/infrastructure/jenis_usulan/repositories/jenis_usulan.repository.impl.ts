import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JenisUsulanRepository } from "../../../domain/jenis_usulan/jenis_usulan.repository";
import { JenisUsulanOrmEntity } from "../orm/jenis_usulan.orm_entity";
import { JenisUsulan } from "../../../domain/jenis_usulan/jenis_usulan.entity";
import { CreateJenisUsulanDto } from "../../../presentation/jenis_usulan/dto/create_jenis_usulan.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJenisUsulanDto } from "../../../presentation/jenis_usulan/dto/update_jenis_usulan.dto";
import { GetJenisUsulanDto } from "../../../presentation/jenis_usulan/dto/get_jenis_usulan.dto";

@Injectable()
export class JenisUsulanRepositoryImpl implements JenisUsulanRepository {
    constructor(@InjectRepository(JenisUsulanOrmEntity) private readonly repo: Repository<JenisUsulanOrmEntity>) { }

    async create(dto: CreateJenisUsulanDto): Promise<JenisUsulan> {
        try {
            const ormEntity = plainToInstance(JenisUsulanOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJenisUsulanDto): Promise<JenisUsulan> {
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

    async findById(id: number): Promise<JenisUsulan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByJenis(jenis: string): Promise<JenisUsulan | null> {
        try {
            const entity = await this.repo.findOne({ where: { jenis } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJenisUsulanDto): Promise<{ data: JenisUsulan[]; total: number; }> {
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
}
