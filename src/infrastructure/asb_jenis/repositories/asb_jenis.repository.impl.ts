import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AsbJenisRepository } from "../../../domain/asb_jenis/asb_jenis.repository";
import { AsbJenis } from "../../../domain/asb_jenis/asb_jenis.entity";
import { AsbJenisOrmEntity } from "../orm/asb_jenis.orm_entity";
import { CreateAsbJenisDto } from "../../../presentation/asb_jenis/dto/create_asb_jenis.dto";
import { UpdateAsbJenisDto } from "../../../presentation/asb_jenis/dto/update_asb_jenis.dto";
import { GetAsbJenisDto } from "../../../presentation/asb_jenis/dto/get_asb_jenis.dto";
import { applyIlikeSearch } from 'src/common/utils/search_query.util';

import { plainToInstance } from "class-transformer";

@Injectable()
export class AsbJenisRepositoryImpl implements AsbJenisRepository {
  constructor(@InjectRepository(AsbJenisOrmEntity) private readonly repo: Repository<AsbJenisOrmEntity>) {}

  async create(dto: CreateAsbJenisDto): Promise<AsbJenis> {
    try {
      const ormEntity = plainToInstance(AsbJenisOrmEntity, dto);
      const newEntity = await this.repo.save(ormEntity);
      return newEntity;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateAsbJenisDto): Promise<AsbJenis> {
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

  async findById(id: number): Promise<AsbJenis | null> {
    try {
      const entity = await this.repo.findOne({ where: { id } });
      return entity || null;
    } catch (error) {
      throw error;
    }
  }

  async findByJenis(jenis: string): Promise<AsbJenis | null> {
    try {
      const entity = await this.repo.findOne({ where: { jenis } });
      return entity || null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: GetAsbJenisDto): Promise<{ data: AsbJenis[], total: number }> {
    try {
      const qb = this.repo.createQueryBuilder('asb_jenis');

      applyIlikeSearch(qb, 'asb_jenis', ['jenis'], dto.search);

      const [data, total] = await qb
        .orderBy('asb_jenis.id', 'DESC')
        .skip((dto.page - 1) * dto.amount)
        .take(dto.amount)
        .getManyAndCount();

      return { data, total };
    } catch (error) {
      throw error;
    }
  }
}
