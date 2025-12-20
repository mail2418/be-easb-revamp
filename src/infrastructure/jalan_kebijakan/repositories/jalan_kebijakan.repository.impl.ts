import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanKebijakanRepository } from "../../../domain/jalan_kebijakan/jalan_kebijakan.repository";
import { JalanKebijakanOrmEntity } from "../orm/jalan_kebijakan.orm_entity";
import { JalanKebijakan } from "../../../domain/jalan_kebijakan/jalan_kebijakan.entity";
import { CreateJalanKebijakanDto } from "../../../presentation/jalan_kebijakan/dto/create_jalan_kebijakan.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanKebijakanDto } from "../../../presentation/jalan_kebijakan/dto/update_jalan_kebijakan.dto";
import { GetJalanKebijakanDto } from "../../../presentation/jalan_kebijakan/dto/get_jalan_kebijakan.dto";

@Injectable()
export class JalanKebijakanRepositoryImpl implements JalanKebijakanRepository {
    constructor(@InjectRepository(JalanKebijakanOrmEntity) private readonly repo: Repository<JalanKebijakanOrmEntity>) { }

    async create(dto: CreateJalanKebijakanDto): Promise<JalanKebijakan> {
        try {
            const ormEntity = plainToInstance(JalanKebijakanOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanKebijakanDto): Promise<JalanKebijakan> {
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

    async findById(id: number): Promise<JalanKebijakan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id }, relations: ['kabkota'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKabkotaBulanTahun(idKabkota: number, bulan: number, tahun: number): Promise<JalanKebijakan | null> {
        try {
            const entity = await this.repo.findOne({ where: { idKabkota, bulan, tahun }, relations: ['kabkota'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanKebijakanDto): Promise<{ data: JalanKebijakan[]; total: number; }> {
        try {
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
        } catch (error) {
            throw error;
        }
    }
}
