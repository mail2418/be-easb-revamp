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
        try {
            const ormEntity = plainToInstance(UsulanJalanStatusOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateUsulanJalanStatusDto): Promise<UsulanJalanStatus> {
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

    async findById(id: number): Promise<UsulanJalanStatus | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByStatus(status: string): Promise<UsulanJalanStatus | null> {
        try {
            const entity = await this.repo
                .createQueryBuilder("usulan_jalan_status")
                .where("usulan_jalan_status.status ILIKE :status", { status: `%${status}%` })
                .getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: GetUsulanJalanStatusDto): Promise<{ data: UsulanJalanStatus[], total: number }> {
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
}

