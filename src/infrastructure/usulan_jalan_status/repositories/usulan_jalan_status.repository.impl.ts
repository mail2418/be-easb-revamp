import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsulanJalanStatusRepository } from "../../../domain/usulan_jalan_status/usulan_jalan_status.repository";
import { UsulanJalanStatus } from "../../../domain/usulan_jalan_status/usulan_jalan_status.entity";
import { UsulanJalanStatusOrmEntity } from "../orm/usulan_jalan_status.orm_entity";
import { CreateUsulanJalanStatusDto } from "../../../presentation/usulan_jalan_status/dto/create_usulan_jalan_status.dto";
import { UpdateUsulanJalanStatusDto } from "../../../presentation/usulan_jalan_status/dto/update_usulan_jalan_status.dto";
import { GetUsulanJalanStatusDto } from "../../../presentation/usulan_jalan_status/dto/get_usulan_jalan_status.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UsulanJalanStatusRepositoryImpl implements UsulanJalanStatusRepository {
    constructor(@InjectRepository(UsulanJalanStatusOrmEntity) private readonly repo: Repository<UsulanJalanStatusOrmEntity>) {}

    async create(dto: CreateUsulanJalanStatusDto): Promise<UsulanJalanStatus> {
        const ormEntity = plainToInstance(UsulanJalanStatusOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateUsulanJalanStatusDto): Promise<UsulanJalanStatus> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<UsulanJalanStatus | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByStatus(status: string): Promise<UsulanJalanStatus | null> {
        const entity = await this.repo
            .createQueryBuilder("usulan_jalan_status")
            .where("usulan_jalan_status.status ILIKE :status", { status: `%${status}%` })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetUsulanJalanStatusDto): Promise<{ data: UsulanJalanStatus[], total: number }> {
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

