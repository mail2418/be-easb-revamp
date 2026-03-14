import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsulanSaluranStatusRepository } from "../../../domain/usulan_saluran_status/usulan_saluran_status.repository";
import { UsulanSaluranStatus } from "../../../domain/usulan_saluran_status/usulan_saluran_status.entity";
import { UsulanSaluranStatusOrmEntity } from "../orm/usulan_saluran_status.orm_entity";
import { CreateUsulanSaluranStatusDto } from "../../../presentation/usulan_saluran_status/dto/create_usulan_saluran_status.dto";
import { UpdateUsulanSaluranStatusDto } from "../../../presentation/usulan_saluran_status/dto/update_usulan_saluran_status.dto";
import { GetUsulanSaluranStatusDto } from "../../../presentation/usulan_saluran_status/dto/get_usulan_saluran_status.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UsulanSaluranStatusRepositoryImpl implements UsulanSaluranStatusRepository {
    constructor(@InjectRepository(UsulanSaluranStatusOrmEntity) private readonly repo: Repository<UsulanSaluranStatusOrmEntity>) {}

    async create(dto: CreateUsulanSaluranStatusDto): Promise<UsulanSaluranStatus> {
        const ormEntity = plainToInstance(UsulanSaluranStatusOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateUsulanSaluranStatusDto): Promise<UsulanSaluranStatus> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<UsulanSaluranStatus | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByStatus(status: string): Promise<UsulanSaluranStatus | null> {
        const entity = await this.repo
            .createQueryBuilder("usulan_saluran_status")
            .where("usulan_saluran_status.status ILIKE :status", { status: `%${status}%` })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetUsulanSaluranStatusDto): Promise<{ data: UsulanSaluranStatus[]; total: number }> {
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
}
