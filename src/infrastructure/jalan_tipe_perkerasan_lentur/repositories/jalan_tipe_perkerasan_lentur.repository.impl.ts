import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanTipePerkerasanLenturRepository } from "../../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.repository";
import { JalanTipePerkerasanLenturOrmEntity } from "../orm/jalan_tipe_perkerasan_lentur.orm_entity";
import { JalanTipePerkerasanLentur } from "../../../domain/jalan_tipe_perkerasan_lentur/jalan_tipe_perkerasan_lentur.entity";
import { CreateJalanTipePerkerasanLenturDto } from "../../../presentation/jalan_tipe_perkerasan_lentur/dto/create_jalan_tipe_perkerasan_lentur.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanTipePerkerasanLenturDto } from "../../../presentation/jalan_tipe_perkerasan_lentur/dto/update_jalan_tipe_perkerasan_lentur.dto";
import { GetJalanTipePerkerasanLenturDto } from "../../../presentation/jalan_tipe_perkerasan_lentur/dto/get_jalan_tipe_perkerasan_lentur.dto";

@Injectable()
export class JalanTipePerkerasanLenturRepositoryImpl implements JalanTipePerkerasanLenturRepository {
    constructor(@InjectRepository(JalanTipePerkerasanLenturOrmEntity) private readonly repo: Repository<JalanTipePerkerasanLenturOrmEntity>) { }

    async create(dto: CreateJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLentur> {
        try {
            const ormEntity = plainToInstance(JalanTipePerkerasanLenturOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanTipePerkerasanLenturDto): Promise<JalanTipePerkerasanLentur> {
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

    async findById(id: number): Promise<JalanTipePerkerasanLentur | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanTipePerkerasanLenturDto): Promise<{ data: JalanTipePerkerasanLentur[]; total: number; }> {
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

    async findByTipe(tipe: string): Promise<JalanTipePerkerasanLentur | null> {
        try {
            const entity = await this.repo.findOne({ where: { tipe } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
