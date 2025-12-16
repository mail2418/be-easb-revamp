import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JalanJenisPerkerasanRepository } from "../../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.repository";
import { JalanJenisPerkerasanOrmEntity } from "../orm/jalan_jenis_perkerasan.orm_entity";
import { Repository } from "typeorm";
import { JalanJenisPerkerasan } from "../../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.entity";
import { CreateJalanJenisPerkerasanDto } from "../../../presentation/jalan_jenis_perkerasan/dto/create_jalan_jenis_perkerasan.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanJenisPerkerasanDto } from "../../../presentation/jalan_jenis_perkerasan/dto/update_jalan_jenis_perkerasan.dto";
import { GetJalanJenisPerkerasanDto } from "../../../presentation/jalan_jenis_perkerasan/dto/get_jalan_jenis_perkerasan.dto";

@Injectable()
export class JalanJenisPerkerasanRepositoryImpl implements JalanJenisPerkerasanRepository {
    constructor(@InjectRepository(JalanJenisPerkerasanOrmEntity) private readonly repo: Repository<JalanJenisPerkerasanOrmEntity>) {}

    async create(dto: CreateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        try {
            const ormEntity = plainToInstance(JalanJenisPerkerasanOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
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

    async findById(id: number): Promise<JalanJenisPerkerasan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanJenisPerkerasanDto): Promise<{ data: JalanJenisPerkerasan[]; total: number; }> {
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

    async findByJenis(jenis: string): Promise<JalanJenisPerkerasan | null> {
        try {
            const entity = await this.repo.findOne({ where: { jenis } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}