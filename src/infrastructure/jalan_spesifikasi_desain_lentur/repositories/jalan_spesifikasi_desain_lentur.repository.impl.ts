import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JalanSpesifikasiDesainLenturRepository } from "../../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.repository";
import { JalanSpesifikasiDesainLenturOrmEntity } from "../orm/jalan_spesifikasi_desain_lentur.orm_entity";
import { Repository } from "typeorm";
import { JalanSpesifikasiDesainLentur } from "../../../domain/jalan_spesifikasi_desain_lentur/jalan_spesifikasi_desain_lentur.entity";
import { CreateJalanSpesifikasiDesainLenturDto } from "../../../presentation/jalan_spesifikasi_desain_lentur/dto/create_jalan_spesifikasi_desain_lentur.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSpesifikasiDesainLenturDto } from "../../../presentation/jalan_spesifikasi_desain_lentur/dto/update_jalan_spesifikasi_desain_lentur.dto";
import { GetJalanSpesifikasiDesainLenturDto } from "../../../presentation/jalan_spesifikasi_desain_lentur/dto/get_jalan_spesifikasi_desain_lentur.dto";

@Injectable()
export class JalanSpesifikasiDesainLenturRepositoryImpl implements JalanSpesifikasiDesainLenturRepository {
    constructor(@InjectRepository(JalanSpesifikasiDesainLenturOrmEntity) private readonly repo: Repository<JalanSpesifikasiDesainLenturOrmEntity>) {}

    async create(dto: CreateJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLentur> {
        try {
            const ormEntity = plainToInstance(JalanSpesifikasiDesainLenturOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainLenturDto): Promise<JalanSpesifikasiDesainLentur> {
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

    async findById(id: number): Promise<JalanSpesifikasiDesainLentur | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainLenturDto): Promise<{ data: JalanSpesifikasiDesainLentur[]; total: number; }> {
        try {
            const queryBuilder = this.repo.createQueryBuilder('jalan_spesifikasi_desain_lentur');

            if (dto.page !== undefined && dto.amount !== undefined) {
                queryBuilder.skip((dto.page - 1) * dto.amount).take(dto.amount);
            }

            const [data, total] = await queryBuilder
                .orderBy('jalan_spesifikasi_desain_lentur.id', 'DESC')
                .getManyAndCount();

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findBySpec(spec: string): Promise<JalanSpesifikasiDesainLentur | null> {
        try {
            const entity = await this.repo.findOne({ where: { spec } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}