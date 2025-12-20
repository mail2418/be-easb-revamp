import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanTipePerkerasanKakuRepository } from "../../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.repository";
import { JalanTipePerkerasanKakuOrmEntity } from "../orm/jalan_tipe_perkerasan_kaku.orm_entity";
import { JalanTipePerkerasanKaku } from "../../../domain/jalan_tipe_perkerasan_kaku/jalan_tipe_perkerasan_kaku.entity";
import { CreateJalanTipePerkerasanKakuDto } from "../../../presentation/jalan_tipe_perkerasan_kaku/dto/create_jalan_tipe_perkerasan_kaku.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanTipePerkerasanKakuDto } from "../../../presentation/jalan_tipe_perkerasan_kaku/dto/update_jalan_tipe_perkerasan_kaku.dto";
import { GetJalanTipePerkerasanKakuDto } from "../../../presentation/jalan_tipe_perkerasan_kaku/dto/get_jalan_tipe_perkerasan_kaku.dto";

@Injectable()
export class JalanTipePerkerasanKakuRepositoryImpl implements JalanTipePerkerasanKakuRepository {
    constructor(@InjectRepository(JalanTipePerkerasanKakuOrmEntity) private readonly repo: Repository<JalanTipePerkerasanKakuOrmEntity>) { }

    async create(dto: CreateJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKaku> {
        try {
            const ormEntity = plainToInstance(JalanTipePerkerasanKakuOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanTipePerkerasanKakuDto): Promise<JalanTipePerkerasanKaku> {
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

    async findById(id: number): Promise<JalanTipePerkerasanKaku | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanTipePerkerasanKakuDto): Promise<{ data: JalanTipePerkerasanKaku[]; total: number; }> {
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

    async findByTipe(tipe: string): Promise<JalanTipePerkerasanKaku | null> {
        try {
            const entity = await this.repo.findOne({ where: { tipe } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
