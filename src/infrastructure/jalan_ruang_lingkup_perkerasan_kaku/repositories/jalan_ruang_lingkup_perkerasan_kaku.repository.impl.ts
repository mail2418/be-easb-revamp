import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JalanRuangLingkupPerkerasanKakuRepository } from "../../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.repository";
import { JalanRuangLingkupPerkerasanKakuOrmEntity } from "../orm/jalan_ruang_lingkup_perkerasan_kaku.orm_entity";
import { Repository } from "typeorm";
import { JalanRuangLingkupPerkerasanKaku } from "../../../domain/jalan_ruang_lingkup_perkerasan_kaku/jalan_ruang_lingkup_perkerasan_kaku.entity";
import { CreateJalanRuangLingkupPerkerasanKakuDto } from "../../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/create_jalan_ruang_lingkup_perkerasan_kaku.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanRuangLingkupPerkerasanKakuDto } from "../../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/update_jalan_ruang_lingkup_perkerasan_kaku.dto";
import { GetJalanRuangLingkupPerkerasanKakuDto } from "../../../presentation/jalan_ruang_lingkup_perkerasan_kaku/dto/get_jalan_ruang_lingkup_perkerasan_kaku.dto";

@Injectable()
export class JalanRuangLingkupPerkerasanKakuRepositoryImpl implements JalanRuangLingkupPerkerasanKakuRepository {
    constructor(@InjectRepository(JalanRuangLingkupPerkerasanKakuOrmEntity) private readonly repo: Repository<JalanRuangLingkupPerkerasanKakuOrmEntity>) {}

    async create(dto: CreateJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKaku> {
        try {
            const ormEntity = plainToInstance(JalanRuangLingkupPerkerasanKakuOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanRuangLingkupPerkerasanKakuDto): Promise<JalanRuangLingkupPerkerasanKaku> {
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

    async findById(id: number): Promise<JalanRuangLingkupPerkerasanKaku | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanRuangLingkupPerkerasanKakuDto): Promise<{ data: JalanRuangLingkupPerkerasanKaku[]; total: number; }> {
        try {
            const queryBuilder = this.repo.createQueryBuilder('jalan_ruang_lingkup_perkerasan_kaku');

            if (dto.page !== undefined && dto.amount !== undefined) {
                queryBuilder.skip((dto.page - 1) * dto.amount).take(dto.amount);
            }

            const [data, total] = await queryBuilder
                .orderBy('jalan_ruang_lingkup_perkerasan_kaku.id', 'DESC')
                .getManyAndCount();

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findByJenis(jenis: string): Promise<JalanRuangLingkupPerkerasanKaku | null> {
        try {
            const entity = await this.repo.findOne({ where: { jenis } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}