import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AsbJenisRepository } from "../../../domain/asb_jenis/asb_jenis.repository";
import { AsbJenis } from "../../../domain/asb_jenis/asb_jenis.entity";
import { AsbJenisOrmEntity } from "../orm/asb_jenis.orm_entity";
import { CreateAsbJenisDto } from "../../../presentation/asb_jenis/dto/create_asb_jenis.dto";
import { UpdateAsbJenisDto } from "../../../presentation/asb_jenis/dto/update_asb_jenis.dto";
import { GetAsbJenisDto } from "../../../presentation/asb_jenis/dto/get_asb_jenis.dto";

import { plainToInstance } from "class-transformer";

@Injectable()
export class AsbJenisRepositoryImpl implements AsbJenisRepository {
  constructor(@InjectRepository(AsbJenisOrmEntity) private readonly repo: Repository<AsbJenisOrmEntity>) {}

  async create(dto: CreateAsbJenisDto): Promise<AsbJenis> {
    const ormEntity = plainToInstance(AsbJenisOrmEntity, dto);
    const newEntity = await this.repo.save(ormEntity);
    return newEntity;
  }

  async update(dto: UpdateAsbJenisDto): Promise<AsbJenis> {
    const { id, ...updateData } = dto;
    await this.repo.update(id, updateData);
    const updatedEntity = await this.repo.findOne({ where: { id } });
    return updatedEntity!;
  }

  async delete(id: number): Promise<boolean> {
    return await this.repo.softDelete(id).then(() => true).catch(() => false);
  }

  async findById(id: number): Promise<AsbJenis | null> {
    const entity = await this.repo.findOne({ where: { id } });
    return entity || null;
  }

  async findByJenis(jenis: string): Promise<AsbJenis | null> {
    const entity = await this.repo.findOne({ where: { jenis } });
    return entity || null;
  }

  async findAll(dto: GetAsbJenisDto): Promise<{ data: AsbJenis[], total: number }> {
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
