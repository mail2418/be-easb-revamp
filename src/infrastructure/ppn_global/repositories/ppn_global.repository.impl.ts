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
        try {
            const ormEntity = plainToInstance(PpnGlobalOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdatePpnGlobalDto): Promise<PpnGlobal> {
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

    async findById(id: number): Promise<PpnGlobal | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<PpnGlobal | null> {
        try {
            const entity = await this.repo.findOne({ where: { bulan, tahun } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetPpnGlobalDto): Promise<{ data: PpnGlobal[]; total: number; }> {
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
