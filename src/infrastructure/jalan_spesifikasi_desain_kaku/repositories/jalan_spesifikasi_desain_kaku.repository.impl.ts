import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainKakuRepository } from "../../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.repository";
import { JalanSpesifikasiDesainKakuOrmEntity } from "../orm/jalan_spesifikasi_desain_kaku.orm_entity";
import { Repository } from "typeorm";
import { JalanSpesifikasiDesainKaku } from "../../../domain/jalan_spesifikasi_desain_kaku/jalan_spesifikasi_desain_kaku.entity";
import { CreateJalanSpesifikasiDesainKakuDto } from "../../../presentation/jalan_spesifikasi_desain_kaku/dto/create_jalan_spesifikasi_desain_kaku.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSpesifikasiDesainKakuDto } from "../../../presentation/jalan_spesifikasi_desain_kaku/dto/update_jalan_spesifikasi_desain_kaku.dto";
import { GetJalanSpesifikasiDesainKakuDto } from "../../../presentation/jalan_spesifikasi_desain_kaku/dto/get_jalan_spesifikasi_desain_kaku.dto";

@Injectable()
export class JalanSpesifikasiDesainKakuRepositoryImpl implements JalanSpesifikasiDesainKakuRepository {
    constructor(@InjectRepository(JalanSpesifikasiDesainKakuOrmEntity) private readonly repo: Repository<JalanSpesifikasiDesainKakuOrmEntity>) {}

    async create(dto: CreateJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKaku> {
        try {
            const ormEntity = plainToInstance(JalanSpesifikasiDesainKakuOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainKakuDto): Promise<JalanSpesifikasiDesainKaku> {
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

    async findById(id: number): Promise<JalanSpesifikasiDesainKaku | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainKakuDto): Promise<{ data: JalanSpesifikasiDesainKaku[]; total: number; }> {
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

    async findBySpec(spec: string): Promise<JalanSpesifikasiDesainKaku | null> {
        try {
            const entity = await this.repo.findOne({ where: { spec } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}