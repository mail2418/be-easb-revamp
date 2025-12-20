import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanJenisPemeliharaanRepository } from "../../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.repository";
import { JalanJenisPemeliharaanOrmEntity } from "../orm/jalan_jenis_pemeliharaan.orm_entity";
import { JalanJenisPemeliharaan } from "../../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.entity";
import { CreateJalanJenisPemeliharaanDto } from "../../../presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanJenisPemeliharaanDto } from "../../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto";
import { GetJalanJenisPemeliharaanDto } from "../../../presentation/jalan_jenis_pemeliharaan/dto/get_jalan_jenis_pemeliharaan.dto";

@Injectable()
export class JalanJenisPemeliharaanRepositoryImpl implements JalanJenisPemeliharaanRepository {
    constructor(@InjectRepository(JalanJenisPemeliharaanOrmEntity) private readonly repo: Repository<JalanJenisPemeliharaanOrmEntity>) { }

    async create(dto: CreateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan> {
        try {
            const ormEntity = plainToInstance(JalanJenisPemeliharaanOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan> {
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

    async findById(id: number): Promise<JalanJenisPemeliharaan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanJenisPemeliharaanDto): Promise<{ data: JalanJenisPemeliharaan[]; total: number; }> {
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

    async findByTingkatPemeliharaan(tingkat_pemeliharaan: string): Promise<JalanJenisPemeliharaan | null> {
        try {
            const entity = await this.repo.findOne({ where: { tingkat_pemeliharaan } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByJenisPemeliharaan(jenis_pemeliharaan: string): Promise<JalanJenisPemeliharaan[]> {
        try {
            const entities = await this.repo.find({ where: { jenis_pemeliharaan } });
            return entities;
        } catch (error) {
            throw error;
        }
    }
}
