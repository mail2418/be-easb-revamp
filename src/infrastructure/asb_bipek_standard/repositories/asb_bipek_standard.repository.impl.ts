import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBipekStandard } from '../../../domain/asb_bipek_standard/asb_bipek_standard.entity';
import { AsbBipekStandardRepository } from '../../../domain/asb_bipek_standard/asb_bipek_standard.repository';
import { AsbBipekStandardOrmEntity } from '../orm/asb_bipek_standard.orm_entity';
import { Files } from '../../../domain/asb_detail/files.enum';
import { CreateAsbBipekStandardDto } from '../../../application/asb_bipek_standard/dto/create_asb_bipek_standard.dto';
import { UpdateAsbBipekStandardDto } from '../../../application/asb_bipek_standard/dto/update_asb_bipek_standard.dto';

@Injectable()
export class AsbBipekStandardRepositoryImpl extends AsbBipekStandardRepository {
    constructor(
        @InjectRepository(AsbBipekStandardOrmEntity)
        private readonly repository: Repository<AsbBipekStandardOrmEntity>,
    ) {
        super();
    }

    async create(dto: CreateAsbBipekStandardDto): Promise<AsbBipekStandard> {
        try {
            const ormEntity = this.repository.create(dto);

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBipekStandard, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbBipekStandardDto): Promise<AsbBipekStandard> {
        try {
            const existing = await this.repository.findOne({ where: { id: dto.id } });
            if (!existing) {
                throw new Error(`AsbBipekStandard with id ${dto.id} not found`);
            }

            const updateData: Partial<AsbBipekStandardOrmEntity> = {};

            if (dto.files !== undefined) {
                updateData.files = dto.files;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (dto.idAsbKomponenBangunanStd !== undefined) {
                updateData.idAsbKomponenBangunanStd = dto.idAsbKomponenBangunanStd;
            }
            if (dto.bobotInput !== undefined) {
                updateData.bobotInput = dto.bobotInput;
            }
            if (dto.calculationMethod !== undefined) {
                updateData.calculationMethod = dto.calculationMethod;
            }
            if (dto.jumlahBobot !== undefined) {
                updateData.jumlahBobot = dto.jumlahBobot;
            }
            if (dto.rincianHarga !== undefined) {
                updateData.rincianHarga = dto.rincianHarga;
            }

            await this.repository.update(dto.id, updateData);

            const updated = await this.repository.findOne({ where: { id: dto.id } });
            return plainToInstance(AsbBipekStandard, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbBipekStandard with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBipekStandard | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbBipekStandard, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBipekStandard[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbBipekStandard, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }
}
