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
        const ormEntity = plainToInstance(SmkkGlobalOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateSmkkGlobalDto): Promise<SmkkGlobal> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<SmkkGlobal | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<SmkkGlobal | null> {
        const entity = await this.repo.findOne({ where: { bulan, tahun } });
        return entity || null;
    }

    async findAll(dto: GetSmkkGlobalDto): Promise<{ data: SmkkGlobal[]; total: number; }> {
        const findOptions: any = {
            order: { id: "DESC" }
        };

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }

    async getLatest(): Promise<SmkkGlobal | null> {
        const entity = await this.repo
            .createQueryBuilder('smkk')
            .where('smkk.deletedAt IS NULL')
            .orderBy('smkk.tahun', 'DESC')
            .addOrderBy('smkk.bulan', 'DESC')
            .getOne();
        return entity || null;
    }
}

