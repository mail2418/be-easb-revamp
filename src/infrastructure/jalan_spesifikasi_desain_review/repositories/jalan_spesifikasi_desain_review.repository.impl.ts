import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSpesifikasiDesainReviewRepository } from "../../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.repository";
import { JalanSpesifikasiDesainReviewOrmEntity } from "../orm/jalan_spesifikasi_desain_review.orm_entity";
import { JalanSpesifikasiDesainReview } from "../../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.entity";
import { CreateJalanSpesifikasiDesainReviewDto } from "../../../presentation/jalan_spesifikasi_desain_review/dto/create_jalan_spesifikasi_desain_review.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSpesifikasiDesainReviewDto } from "../../../presentation/jalan_spesifikasi_desain_review/dto/update_jalan_spesifikasi_desain_review.dto";
import { GetJalanSpesifikasiDesainReviewDto } from "../../../presentation/jalan_spesifikasi_desain_review/dto/get_jalan_spesifikasi_desain_review.dto";

@Injectable()
export class JalanSpesifikasiDesainReviewRepositoryImpl implements JalanSpesifikasiDesainReviewRepository {
    constructor(@InjectRepository(JalanSpesifikasiDesainReviewOrmEntity) private readonly repo: Repository<JalanSpesifikasiDesainReviewOrmEntity>) { }

    async create(dto: CreateJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReview> {
        try {
            const ormEntity = plainToInstance(JalanSpesifikasiDesainReviewOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateJalanSpesifikasiDesainReviewDto): Promise<JalanSpesifikasiDesainReview> {
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

    async findById(id: number): Promise<JalanSpesifikasiDesainReview | null> {
        try {
            const entity = await this.repo.findOne({ where: { id }, relations: ['spesifikasiDesain', 'usulanJalan', 'ruangLingkup', 'hspk'] });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetJalanSpesifikasiDesainReviewDto): Promise<{ data: JalanSpesifikasiDesainReview[]; total: number; }> {
        try {
            const findOptions: any = {
                order: { id: "DESC" },
                relations: ['spesifikasiDesain', 'usulanJalan', 'ruangLingkup', 'hspk']
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
}
