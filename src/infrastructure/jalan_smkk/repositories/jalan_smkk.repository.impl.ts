import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSmkkRepository } from "../../../domain/jalan_smkk/jalan_smkk.repository";
import { JalanSmkkOrmEntity } from "../orm/jalan_smkk.orm_entity";
import { JalanSmkk } from "../../../domain/jalan_smkk/jalan_smkk.entity";
import { CreateJalanSmkkDto } from "../../../presentation/jalan_smkk/dto/create_jalan_smkk.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSmkkDto } from "../../../presentation/jalan_smkk/dto/update_jalan_smkk.dto";
import { GetJalanSmkkDto } from "../../../presentation/jalan_smkk/dto/get_jalan_smkk.dto";

@Injectable()
export class JalanSmkkRepositoryImpl implements JalanSmkkRepository {
    constructor(@InjectRepository(JalanSmkkOrmEntity) private readonly repo: Repository<JalanSmkkOrmEntity>) { }

    async create(dto: CreateJalanSmkkDto): Promise<JalanSmkk> {
        try {
            const ormEntity = plainToInstance(JalanSmkkOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSmkkDto): Promise<JalanSmkk> {
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

    async findById(id: number): Promise<JalanSmkk | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByBulanAndTahun(bulan: number, tahun: number): Promise<JalanSmkk | null> {
        try {
            const entity = await this.repo.findOne({ where: { bulan, tahun } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSmkkDto): Promise<{ data: JalanSmkk[]; total: number; }> {
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
