import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JalanRuangLingkupPerkerasanLenturRepository } from "../../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.repository";
import { JalanRuangLingkupPerkerasanLenturOrmEntity } from "../orm/jalan_ruang_lingkup_perkerasan_lentur.orm_entity";
import { Repository } from "typeorm";
import { JalanRuangLingkupPerkerasanLentur } from "../../../domain/jalan_ruang_lingkup_perkerasan_lentur/jalan_ruang_lingkup_perkerasan_lentur.entity";
import { CreateJalanRuangLingkupPerkerasanLenturDto } from "../../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/create_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanRuangLingkupPerkerasanLenturDto } from "../../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/update_jalan_ruang_lingkup_perkerasan_lentur.dto";
import { GetJalanRuangLingkupPerkerasanLenturDto } from "../../../presentation/jalan_ruang_lingkup_perkerasan_lentur/dto/get_jalan_ruang_lingkup_perkerasan_lentur.dto";

@Injectable()
export class JalanRuangLingkupPerkerasanLenturRepositoryImpl implements JalanRuangLingkupPerkerasanLenturRepository {
    constructor(@InjectRepository(JalanRuangLingkupPerkerasanLenturOrmEntity) private readonly repo: Repository<JalanRuangLingkupPerkerasanLenturOrmEntity>) {}

    async create(dto: CreateJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLentur> {
        try {
            const ormEntity = plainToInstance(JalanRuangLingkupPerkerasanLenturOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanRuangLingkupPerkerasanLenturDto): Promise<JalanRuangLingkupPerkerasanLentur> {
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

    async findById(id: number): Promise<JalanRuangLingkupPerkerasanLentur | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanRuangLingkupPerkerasanLenturDto): Promise<{ data: JalanRuangLingkupPerkerasanLentur[]; total: number; }> {
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
    
    async findByJenis(jenis: string): Promise<JalanRuangLingkupPerkerasanLentur | null> {
        try {
            const entity = await this.repo.findOne({ where: { jenis } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}