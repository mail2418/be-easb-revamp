import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AsbTipeBangunanRepository } from "../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.repository";
import { AsbTipeBangunan } from "../../../domain/asb_tipe_bangunan/asb_tipe_bangunan.entity";
import { AsbTipeBangunanOrmEntity } from "../orm/asb_tipe_bangunan.orm_entity";
import { CreateAsbTipeBangunanDto } from "../../../presentation/asb_tipe_bangunan/dto/create_asb_tipe_bangunan.dto";
import { UpdateAsbTipeBangunanDto } from "../../../presentation/asb_tipe_bangunan/dto/update_asb_tipe_bangunan.dto";
import { GetAsbTipeBangunanDto } from "../../../presentation/asb_tipe_bangunan/dto/get_asb_tipe_bangunan.dto";

import { plainToInstance } from "class-transformer";

@Injectable()
export class AsbTipeBangunanRepositoryImpl implements AsbTipeBangunanRepository {
    constructor(@InjectRepository(AsbTipeBangunanOrmEntity) private readonly repo: Repository<AsbTipeBangunanOrmEntity>) { }

    async create(dto: CreateAsbTipeBangunanDto): Promise<AsbTipeBangunan> {
        try {
            const ormEntity = plainToInstance(AsbTipeBangunanOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbTipeBangunanDto): Promise<AsbTipeBangunan> {
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

    async findById(id: number): Promise<AsbTipeBangunan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByTipeBangunan(tipe_bangunan: string): Promise<AsbTipeBangunan | null> {
        try {
            const entity = await this.repo.findOne({ where: { tipe_bangunan } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetAsbTipeBangunanDto): Promise<{ data: AsbTipeBangunan[], total: number }> {
        try {
            const [data, total] = await this.repo.findAndCount({
                skip: (dto.page - 1) * dto.amount,
                take: dto.amount,
                order: { id: "DESC" }
            });

            return { data, total };
        } catch (error) {
            throw error;
        }
    }
}
