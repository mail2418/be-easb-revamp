import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PpnGlobalRepository } from "../../../domain/ppn_global/ppn_global.repository";
import { PpnGlobalOrmEntity } from "../orm/ppn_global.orm_entity";
import { PpnGlobal } from "../../../domain/ppn_global/ppn_global.entity";
import { CreatePpnGlobalDto } from "../../../presentation/ppn_global/dto/create_ppn_global.dto";
import { plainToInstance } from "class-transformer";
import { UpdatePpnGlobalDto } from "../../../presentation/ppn_global/dto/update_ppn_global.dto";
import { GetPpnGlobalDto } from "../../../presentation/ppn_global/dto/get_ppn_global.dto";

@Injectable()
export class PpnGlobalRepositoryImpl implements PpnGlobalRepository {
    constructor(@InjectRepository(PpnGlobalOrmEntity) private readonly repo: Repository<PpnGlobalOrmEntity>) { }

    async create(dto: CreatePpnGlobalDto): Promise<PpnGlobal> {
        const ormEntity = plainToInstance(PpnGlobalOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdatePpnGlobalDto): Promise<PpnGlobal> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<PpnGlobal | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<PpnGlobal | null> {
        const entity = await this.repo.findOne({ where: { bulan, tahun } });
        return entity || null;
    }

    async findAll(dto: GetPpnGlobalDto): Promise<{ data: PpnGlobal[]; total: number; }> {
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

    async getLatest(): Promise<PpnGlobal | null> {
        const entity = await this.repo
            .createQueryBuilder('ppn')
            .where('ppn.deletedAt IS NULL')
            .orderBy('ppn.tahun', 'DESC')
            .addOrderBy('ppn.bulan', 'DESC')
            .getOne();
        return entity || null;
    }
}
