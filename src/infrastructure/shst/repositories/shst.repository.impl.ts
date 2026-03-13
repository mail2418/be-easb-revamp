import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShstRepository } from "../../../domain/shst/shst.repository";
import { Shst } from "../../../domain/shst/shst.entity";
import { ShstOrmEntity } from "../orm/shst.orm_entity";
import { CreateShstDto } from "../../../presentation/shst/dto/create_shst.dto";
import { UpdateNominalShstDto } from "../../../presentation/shst/dto/update_nominal_shst.dto";
import { DeleteShstDto } from "../../../presentation/shst/dto/delete_shst.dto";
import { GetShstDto } from "../../../presentation/shst/dto/get_shst.dto";
import { GetShstNominalDto } from '../../../application/shst/dto/get_shst_nominal.dto';

import { plainToInstance } from "class-transformer";

@Injectable()
export class ShstRepositoryImpl extends ShstRepository {
    constructor(@InjectRepository(ShstOrmEntity) private readonly repo: Repository<ShstOrmEntity>) {
        super();
    }

    async create(dto: CreateShstDto): Promise<Shst> {
        try {
            const ormEntity = plainToInstance(ShstOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteShstDto): Promise<boolean> {
        try {
            return await this.repo.delete(dto.id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async updateNominal(dto: UpdateNominalShstDto): Promise<Shst> {
        try {
            const { id, nominal } = dto;
            await this.repo.update(id, { nominal });
            const updatedEntity = await this.repo.findOne({ where: { id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetShstDto): Promise<{ data: Shst[]; total: number }> {
        try {
            const queryBuilder = this.repo.createQueryBuilder("shst");

            // Apply filters
            if (dto.tahun) {
                queryBuilder.andWhere("shst.tahun = :tahun", { tahun: dto.tahun });
            }
            if (dto.id_asb_tipe_bangunan) {
                queryBuilder.andWhere("shst.id_asb_tipe_bangunan = :id_asb_tipe_bangunan", {
                    id_asb_tipe_bangunan: dto.id_asb_tipe_bangunan
                });
            }
            if (dto.id_asb_klasifikasi) {
                queryBuilder.andWhere("shst.id_asb_klasifikasi = :id_asb_klasifikasi", {
                    id_asb_klasifikasi: dto.id_asb_klasifikasi
                });
            }
            if (dto.id_kabkota) {
                queryBuilder.andWhere("shst.id_kabkota = :id_kabkota", { id_kabkota: dto.id_kabkota });
            }

            // Pagination
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);

            // Order
            queryBuilder.orderBy("shst.id", "DESC");
            console.log("queryBuilder:", queryBuilder.getSql());

            const [data, total] = await queryBuilder.getManyAndCount();
            console.log("data:", data, total);

            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Shst | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findFileById(id: number): Promise<string | null> {
        try {
            const entity = await this.repo.findOne({ where: { id }, select: ["file"] });
            return entity?.file || null;
        } catch (error) {
            throw error;
        }
    }

    async getNominal(dto: GetShstNominalDto): Promise<number> {
        try {
            const entity = await this.repo.findOne({
                where: {
                    id_asb_tipe_bangunan: dto.id_asb_tipe_bangunan,
                    id_asb_klasifikasi: dto.id_asb_klasifikasi,
                    id_kabkota: dto.id_kabkota
                },
                order: { id: 'DESC' }
            });

            if (!entity) {
                throw new NotFoundException(`SHST record not found`);
            }

            return entity.nominal;
        } catch (error) {
            throw error;
        }
    }
}
