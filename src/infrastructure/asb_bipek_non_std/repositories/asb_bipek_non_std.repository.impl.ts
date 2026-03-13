import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBipekNonStd } from '../../../domain/asb_bipek_non_std/asb_bipek_non_std.entity';
import { AsbBipekNonStdRepository } from '../../../domain/asb_bipek_non_std/asb_bipek_non_std.repository';
import { AsbBipekNonStdOrmEntity } from '../orm/asb_bipek_non_std.orm_entity';
import { CreateAsbBipekNonStdDto } from '../../../application/asb_bipek_non_std/dto/create_asb_bipek_non_std.dto';
import { UpdateAsbBipekNonStdDto } from '../../../application/asb_bipek_non_std/dto/update_asb_bipek_non_std.dto';

@Injectable()
export class AsbBipekNonStdRepositoryImpl extends AsbBipekNonStdRepository {
    constructor(
        @InjectRepository(AsbBipekNonStdOrmEntity)
        private readonly repository: Repository<AsbBipekNonStdOrmEntity>,
    ) {
        super();
    }

    async create(dto: CreateAsbBipekNonStdDto): Promise<AsbBipekNonStd> {
        try {
            const ormEntity = this.repository.create(dto);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBipekNonStd, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbBipekNonStdDto): Promise<AsbBipekNonStd> {
        try {
            const existing = await this.repository.findOne({
                where: { id: dto.id },
            });
            if (!existing) {
                throw new Error(`AsbBipekNonStd with id ${dto.id} not found`);
            }

            const updateData: Partial<AsbBipekNonStdOrmEntity> = {};

            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (dto.idAsbKomponenBangunanNonStd !== undefined) {
                updateData.idAsbKomponenBangunanNonstd = dto.idAsbKomponenBangunanNonStd;
            }
            if (dto.bobotInput !== undefined) {
                updateData.bobotInput = dto.bobotInput;
            }
            if (dto.jumlahBobot !== undefined) {
                updateData.jumlahBobot = dto.jumlahBobot;
            }
            if (dto.rincianHarga !== undefined) {
                updateData.rincianHarga = dto.rincianHarga;
            }

            await this.repository.update(dto.id, updateData);

            const updated = await this.repository.findOne({
                where: { id: dto.id },
            });
            return plainToInstance(AsbBipekNonStd, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbBipekNonStd with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBipekNonStd | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbBipekNonStd, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekNonStd[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbBipekNonStd, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }
}
