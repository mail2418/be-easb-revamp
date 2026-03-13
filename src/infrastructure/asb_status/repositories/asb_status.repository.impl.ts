import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AsbStatusRepository } from "../../../domain/asb_status/asb_status.repository";
import { AsbStatus } from "../../../domain/asb_status/asb_status.entity";
import { AsbStatusOrmEntity } from "../orm/asb_status.orm_entity";
import { CreateAsbStatusDto } from "../../../presentation/asb_status/dto/create_asb_status.dto";
import { UpdateAsbStatusDto } from "../../../presentation/asb_status/dto/update_asb_status.dto";
import { GetAsbStatusDto } from "../../../presentation/asb_status/dto/get_asb_status.dto";

import { plainToInstance } from "class-transformer";

@Injectable()
export class AsbStatusRepositoryImpl implements AsbStatusRepository {
  constructor(@InjectRepository(AsbStatusOrmEntity) private readonly repo: Repository<AsbStatusOrmEntity>) {}

  async create(dto: CreateAsbStatusDto): Promise<AsbStatus> {
    try {
      const ormEntity = plainToInstance(AsbStatusOrmEntity, dto);
      const newEntity = await this.repo.save(ormEntity);
      return newEntity;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateAsbStatusDto): Promise<AsbStatus> {
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

  async findById(id: number): Promise<AsbStatus | null> {
    try {
      const entity = await this.repo.findOne({ where: { id } });
      return entity || null;
    } catch (error) {
      throw error;
    }
  }

  async findByStatus(status: string): Promise<AsbStatus | null> {
    try {
      const entity = await this.repo
        .createQueryBuilder("asb_status")
        .where("asb_status.status ILIKE :status", { status: `%${status}%` })
        .getOne();
      return entity || null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: GetAsbStatusDto): Promise<{ data: AsbStatus[], total: number }> {
    try {
      const [data, total] = await this.repo.findAndCount({
        skip: (dto.page - 1) * dto.amount,
        take: dto.amount,
        order: { id: "DESC" }
      });

      return { data, total };
    } catch (error) {
      throw error;
    }
  }
}
