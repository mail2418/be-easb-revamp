import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSpesifikasiDesainRepository } from "../../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.repository";
import { JalanSpesifikasiDesainOrmEntity } from "../orm/jalan_spesifikasi_desain.orm_entity";
import { JalanSpesifikasiDesain } from "../../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.entity";
import { CreateJalanSpesifikasiDesainDto } from "../../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSpesifikasiDesainDto } from "../../../presentation/jalan_spesifikasi_desain/dto/update_jalan_spesifikasi_desain.dto";
import { GetJalanSpesifikasiDesainDto } from "../../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto";

@Injectable()
export class JalanSpesifikasiDesainRepositoryImpl implements JalanSpesifikasiDesainRepository {
    constructor(@InjectRepository(JalanSpesifikasiDesainOrmEntity) private readonly repo: Repository<JalanSpesifikasiDesainOrmEntity>) { }

    async create(dto: CreateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
        try {
            const ormEntity = plainToInstance(JalanSpesifikasiDesainOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
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

    async findById(id: number): Promise<JalanSpesifikasiDesain | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainDto): Promise<{ data: JalanSpesifikasiDesain[]; total: number; }> {
        try {
            const findOptions: any = {
                order: { id: "DESC" }
            };

            if (dto.id_usulan_jalan !== undefined) {
                findOptions.where = { id_usulan_jalan: dto.id_usulan_jalan };
            }

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

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        try {
            await this.repo.softDelete({ id_usulan_jalan: idUsulanJalan });
        } catch (error) {
            throw error;
        }
    }
}
