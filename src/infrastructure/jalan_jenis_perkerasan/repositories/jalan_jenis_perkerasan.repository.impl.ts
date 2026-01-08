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
        const ormEntity = plainToInstance(JalanJenisPerkerasanOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateJalanJenisPerkerasanDto): Promise<JalanJenisPerkerasan> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<JalanJenisPerkerasan | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findAll(dto: GetJalanJenisPerkerasanDto): Promise<{ data: JalanJenisPerkerasan[]; total: number; }> {
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

    async findByJenisPerkerasan(jenis_perkerasan: string): Promise<JalanJenisPerkerasan | null> {
        const entity = await this.repo.findOne({ where: { jenis_perkerasan } });
        return entity || null;
    }
}