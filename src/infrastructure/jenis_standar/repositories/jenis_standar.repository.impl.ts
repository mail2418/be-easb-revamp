import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JenisStandarRepository } from "../../../domain/jenis_standar/jenis_standar.repository";
import { JenisStandar } from "../../../domain/jenis_standar/jenis_standar.entity";
import { JenisStandarOrmEntity } from "../orm/jenis_standar.orm_entity";
import { CreateJenisStandarDto } from "../../../presentation/jenis_standar/dto/create_jenis_standar.dto";
import { UpdateJenisStandarDto } from "../../../presentation/jenis_standar/dto/update_jenis_standar.dto";
import { GetJenisStandarDto } from "../../../presentation/jenis_standar/dto/get_jenis_standar.dto";

import { plainToInstance } from "class-transformer";

@Injectable()
export class JenisStandarRepositoryImpl implements JenisStandarRepository {
  constructor(@InjectRepository(JenisStandarOrmEntity) private readonly repo: Repository<JenisStandarOrmEntity>) {}

  async create(dto: CreateJenisStandarDto): Promise<JenisStandar> {
    try {
      const ormEntity = plainToInstance(JenisStandarOrmEntity, dto);
      const newEntity = await this.repo.save(ormEntity);
      return newEntity;
    } catch (error) {
      throw error;
    }
  }

  async update(dto: UpdateJenisStandarDto): Promise<JenisStandar> {
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

  async findById(id: number): Promise<JenisStandar | null> {
    try {
      const entity = await this.repo.findOne({ where: { id } });
      return entity || null;
    } catch (error) {
      throw error;
    }
  }

  async findByJenis(jenis: string): Promise<JenisStandar | null> {
    try {
      const entity = await this.repo
        .createQueryBuilder("jenis_standar")
        .where("jenis_standar.jenis ILIKE :jenis", { jenis: `%${jenis}%` })
        .getOne();
      return entity || null;
    } catch (error) {
      throw error;
    }
  }

  async findAll(dto: GetJenisStandarDto): Promise<{ data: JenisStandar[], total: number }> {
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
