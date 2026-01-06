import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SmkkGlobalRepository } from "../../../domain/smkk_global/smkk_global.repository";
import { SmkkGlobalOrmEntity } from "../orm/smkk_global.orm_entity";
import { SmkkGlobal } from "../../../domain/smkk_global/smkk_global.entity";
import { CreateSmkkGlobalDto } from "../../../presentation/smkk_global/dto/create_smkk_global.dto";
import { plainToInstance } from "class-transformer";
import { UpdateSmkkGlobalDto } from "../../../presentation/smkk_global/dto/update_smkk_global.dto";
import { GetSmkkGlobalDto } from "../../../presentation/smkk_global/dto/get_smkk_global.dto";

@Injectable()
export class SmkkGlobalRepositoryImpl implements SmkkGlobalRepository {
    constructor(@InjectRepository(SmkkGlobalOrmEntity) private readonly repo: Repository<SmkkGlobalOrmEntity>) { }

    async create(dto: CreateSmkkGlobalDto): Promise<SmkkGlobal> {
        try {
            const ormEntity = plainToInstance(SmkkGlobalOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateSmkkGlobalDto): Promise<SmkkGlobal> {
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

    async findById(id: number): Promise<SmkkGlobal | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<SmkkGlobal | null> {
        try {
            const entity = await this.repo.findOne({ where: { bulan, tahun } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetSmkkGlobalDto): Promise<{ data: SmkkGlobal[]; total: number; }> {
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

    async getLatest(): Promise<SmkkGlobal | null> {
        try {
            const entity = await this.repo.findOne({
                order: { tahun: 'DESC', bulan: 'DESC' }
            }).catch(error => {
                console.log("Error getting latest SMKK Global:", error);
                return null;
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}

