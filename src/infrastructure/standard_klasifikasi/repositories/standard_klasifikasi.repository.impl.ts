import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StandardKlasifikasiRepository } from "../../../domain/standard_klasifikasi/standard_klasifikasi.repository";
import { StandardKlasifikasi } from "../../../domain/standard_klasifikasi/standard_klasifikasi.entity";
import { StandardKlasifikasiOrmEntity } from "../orm/standard_klasifikasi.orm_entity";
import { CreateStandardKlasifikasiDto } from "../../../presentation/standard_klasifikasi/dto/create_standard_klasifikasi.dto";
import { UpdateStandardKlasifikasiDto } from "../../../presentation/standard_klasifikasi/dto/update_standard_klasifikasi.dto";
import { DeleteStandardKlasifikasiDto } from "../../../presentation/standard_klasifikasi/dto/delete_standard_klasifikasi.dto";
import { GetStandardKlasifikasisDto } from "../../../presentation/standard_klasifikasi/dto/get_standard_klasifikasis.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class StandardKlasifikasiRepositoryImpl extends StandardKlasifikasiRepository {
    constructor(
        @InjectRepository(StandardKlasifikasiOrmEntity)
        private readonly repo: Repository<StandardKlasifikasiOrmEntity>
    ) {
        super();
    }

    async create(dto: CreateStandardKlasifikasiDto): Promise<StandardKlasifikasi> {
        const ormEntity = plainToInstance(StandardKlasifikasiOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateStandardKlasifikasiDto): Promise<StandardKlasifikasi> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(dto: DeleteStandardKlasifikasiDto): Promise<boolean> {
        return await this.repo.softDelete(dto.id)
            .then(() => true)
            .catch(() => false);
    }

    async findAll(dto: GetStandardKlasifikasisDto): Promise<{ data: StandardKlasifikasi[]; total: number }> {
        const queryBuilder = this.repo.createQueryBuilder("standard_klasifikasi");

        if (dto.id_asb_klasifikasi) {
            queryBuilder.andWhere("standard_klasifikasi.id_asb_klasifikasi = :id_asb_klasifikasi", {
                id_asb_klasifikasi: dto.id_asb_klasifikasi
            });
        }
        if (dto.id_kabkota) {
            queryBuilder.andWhere("standard_klasifikasi.id_kabkota = :id_kabkota", {
                id_kabkota: dto.id_kabkota
            });
        }

        const page = dto.page ?? 1;
        const amount = dto.amount ?? 10;
        const skip = (page - 1) * amount;
        queryBuilder.skip(skip).take(amount);

        queryBuilder.orderBy("standard_klasifikasi.id", "DESC");

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async findById(id: number): Promise<StandardKlasifikasi | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }
}
