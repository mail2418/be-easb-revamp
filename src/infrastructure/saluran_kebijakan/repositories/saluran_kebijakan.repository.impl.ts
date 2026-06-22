import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaluranKebijakanRepository } from "../../../domain/saluran_kebijakan/saluran_kebijakan.repository";
import { SaluranKebijakanOrmEntity } from "../orm/saluran_kebijakan.orm_entity";
import { SaluranKebijakan } from "../../../domain/saluran_kebijakan/saluran_kebijakan.entity";
import { CreateSaluranKebijakanDto } from "../../../presentation/saluran_kebijakan/dto/create_saluran_kebijakan.dto";
import { plainToInstance } from "class-transformer";
import { UpdateSaluranKebijakanDto } from "../../../presentation/saluran_kebijakan/dto/update_saluran_kebijakan.dto";
import { GetSaluranKebijakanDto } from "../../../presentation/saluran_kebijakan/dto/get_saluran_kebijakan.dto";

@Injectable()
export class SaluranKebijakanRepositoryImpl implements SaluranKebijakanRepository {
    constructor(@InjectRepository(SaluranKebijakanOrmEntity) private readonly repo: Repository<SaluranKebijakanOrmEntity>) { }

    async create(dto: CreateSaluranKebijakanDto): Promise<SaluranKebijakan> {
        const ormEntity = plainToInstance(SaluranKebijakanOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateSaluranKebijakanDto): Promise<SaluranKebijakan> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<SaluranKebijakan | null> {
        const entity = await this.repo.findOne({ where: { id }, relations: ['kabkota'] });
        return entity || null;
    }

    async findByKabkotaBulanTahun(idKabkota: number, bulan: number, tahun: number): Promise<SaluranKebijakan | null> {
        const entity = await this.repo.findOne({ where: { idKabkota, bulan, tahun }, relations: ['kabkota'] });
        return entity || null;
    }

    async findAll(dto: GetSaluranKebijakanDto): Promise<{ data: SaluranKebijakan[]; total: number }> {
        const findOptions: any = {
            order: { id: "DESC" },
            relations: ['kabkota']
        };

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }
}
