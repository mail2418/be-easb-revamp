import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TipeSaluranRepository } from "../../../domain/tipe_saluran/tipe_saluran.repository";
import { TipeSaluranOrmEntity } from "../orm/tipe_saluran.orm_entity";
import { Repository } from "typeorm";
import { TipeSaluran } from "../../../domain/tipe_saluran/tipe_saluran.entity";
import { CreateTipeSaluranDto } from "../../../presentation/tipe_saluran/dto/create_tipe_saluran.dto";
import { plainToInstance } from "class-transformer";
import { UpdateTipeSaluranDto } from "../../../presentation/tipe_saluran/dto/update_tipe_saluran.dto";
import { GetTipeSaluranDto } from "../../../presentation/tipe_saluran/dto/get_tipe_saluran.dto";

@Injectable()
export class TipeSaluranRepositoryImpl implements TipeSaluranRepository {
    constructor(@InjectRepository(TipeSaluranOrmEntity) private readonly repo: Repository<TipeSaluranOrmEntity>) {}

    async create(dto: CreateTipeSaluranDto): Promise<TipeSaluran> {
        const ormEntity = plainToInstance(TipeSaluranOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateTipeSaluranDto): Promise<TipeSaluran> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<TipeSaluran | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findAll(dto: GetTipeSaluranDto): Promise<{ data: TipeSaluran[]; total: number }> {
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

    async findByTipeSaluran(tipe_saluran: string): Promise<TipeSaluran | null> {
        const entity = await this.repo.findOne({ where: { tipe_saluran } });
        return entity || null;
    }
}
