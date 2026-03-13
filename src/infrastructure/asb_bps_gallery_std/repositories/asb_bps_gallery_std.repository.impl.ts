import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBpsGalleryStd } from '../../../domain/asb_bps_gallery_std/asb_bps_gallery_std.entity';
import { AsbBpsGalleryStdRepository } from '../../../domain/asb_bps_gallery_std/asb_bps_gallery_std.repository';
import { AsbBpsGalleryStdOrmEntity } from '../orm/asb_bps_gallery_std.orm_entity';
import { CreateAsbBpsGalleryStdDto } from '../../../presentation/asb_bps_gallery_std/dto/create_asb_bps_gallery_std.dto';
import { UpdateAsbBpsGalleryStdDto } from '../../../presentation/asb_bps_gallery_std/dto/update_asb_bps_gallery_std.dto';
import { GetAsbBpsGalleryStdListFilterDto } from '../../../presentation/asb_bps_gallery_std/dto/get_asb_bps_gallery_std_list_filter.dto';

@Injectable()
export class AsbBpsGalleryStdRepositoryImpl extends AsbBpsGalleryStdRepository {
    constructor(
        @InjectRepository(AsbBpsGalleryStdOrmEntity)
        private readonly repository: Repository<AsbBpsGalleryStdOrmEntity>,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBpsGalleryStdDto,
        filename: string,
    ): Promise<AsbBpsGalleryStd> {
        try {
            const ormEntity = this.repository.create({
                idAsbKomponenBangunanStd: dto.idAsbKomponenBangunanStd || null,
                filename: filename,
                jumlahBobot: dto.jumlahBobot || null,
                rincianHarga: dto.rincianHarga || null,
            });

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBpsGalleryStd, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbBpsGalleryStdDto,
        filename?: string,
    ): Promise<AsbBpsGalleryStd> {
        try {
            const existing = await this.repository.findOne({ where: { id } });
            if (!existing) {
                throw new Error(`AsbBpsGalleryStd with id ${id} not found`);
            }

            const updateData: Partial<AsbBpsGalleryStdOrmEntity> = {};

            if (dto.idAsbKomponenBangunanStd !== undefined) {
                updateData.idAsbKomponenBangunanStd = dto.idAsbKomponenBangunanStd;
            }
            if (dto.idAsb !== undefined) {
                updateData.idAsb = dto.idAsb;
            }
            if (dto.jumlahBobot !== undefined) {
                updateData.jumlahBobot = dto.jumlahBobot;
            }
            if (dto.rincianHarga !== undefined) {
                updateData.rincianHarga = dto.rincianHarga;
            }
            if (filename !== undefined) {
                updateData.filename = filename;
            }

            await this.repository.update(id, updateData);

            const updated = await this.repository.findOne({ where: { id } });
            return plainToInstance(AsbBpsGalleryStd, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbBpsGalleryStd with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBpsGalleryStd | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbBpsGalleryStd, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryStdListFilterDto,
    ): Promise<[AsbBpsGalleryStd[], number]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('gallery');

            if (filters?.idAsbKomponenBangunanStd) {
                queryBuilder.andWhere(
                    'gallery.idAsbKomponenBangunanStd = :idAsbKomponenBangunanStd',
                    { idAsbKomponenBangunanStd: filters.idAsbKomponenBangunanStd },
                );
            }

            if (filters?.filename) {
                queryBuilder.andWhere('gallery.filename LIKE :filename', {
                    filename: `%${filters.filename}%`,
                });
            }

            if (filters?.jumlahBobot !== undefined) {
                queryBuilder.andWhere('gallery.jumlahBobot = :jumlahBobot', {
                    jumlahBobot: filters.jumlahBobot,
                });
            }

            if (filters?.rincianHarga !== undefined) {
                queryBuilder.andWhere('gallery.rincianHarga = :rincianHarga', {
                    rincianHarga: filters.rincianHarga,
                });
            }

            const [entities, total] = await queryBuilder
                .skip((page - 1) * amount)
                .take(amount)
                .getManyAndCount();

            const domainEntities = entities.map((e) =>
                plainToInstance(AsbBpsGalleryStd, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanStdId(id: number): Promise<AsbBpsGalleryStd[]> {
        try {
            const entities = await this.repository.find({
                where: { idAsbKomponenBangunanStd: id },
            });
            return entities.map((e) => plainToInstance(AsbBpsGalleryStd, e));
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBpsGalleryStd[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbBpsGalleryStd, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }
}
