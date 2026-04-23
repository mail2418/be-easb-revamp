import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
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
        const ormEntity = plainToInstance(JalanJenisPemeliharaanOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateJalanJenisPemeliharaanDto): Promise<JalanJenisPemeliharaan> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<JalanJenisPemeliharaan | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findAll(dto: GetJalanJenisPemeliharaanDto): Promise<{ data: JalanJenisPemeliharaan[]; total: number; }> {
        const findOptions: any = {
            order: { id: "DESC" }
        };

        if (dto.search) {
            const q = ILike(`%${dto.search}%`);
            findOptions.where = [
                { tingkat_pemeliharaan: q },
                { jenis_pemeliharaan: q },
                { ruang_lingkup: q },
            ];
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            findOptions.skip = (dto.page - 1) * dto.amount;
            findOptions.take = dto.amount;
        }

        const [data, total] = await this.repo.findAndCount(findOptions);

        return { data, total };
    }

    async findByTingkatPemeliharaan(tingkat_pemeliharaan: string): Promise<JalanJenisPemeliharaan | null> {
        const entity = await this.repo.findOne({ where: { tingkat_pemeliharaan } });
        return entity || null;
    }

    async findByJenisPemeliharaan(jenis_pemeliharaan: string): Promise<JalanJenisPemeliharaan[]> {
        const entities = await this.repo.find({ where: { jenis_pemeliharaan } });
        return entities;
    }
}
