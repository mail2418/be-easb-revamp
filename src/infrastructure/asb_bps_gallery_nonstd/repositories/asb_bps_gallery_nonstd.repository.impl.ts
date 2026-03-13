import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbBpsGalleryNonstd } from '../../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.entity';
import { AsbBpsGalleryNonstdRepository } from '../../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.repository';
import { AsbBpsGalleryNonstdOrmEntity } from '../orm/asb_bps_gallery_nonstd.orm_entity';
import { CreateAsbBpsGalleryNonstdDto } from '../../../presentation/asb_bps_gallery_nonstd/dto/create_asb_bps_gallery_nonstd.dto';
import { UpdateAsbBpsGalleryNonstdDto } from '../../../presentation/asb_bps_gallery_nonstd/dto/update_asb_bps_gallery_nonstd.dto';
import { GetAsbBpsGalleryNonstdListFilterDto } from '../../../presentation/asb_bps_gallery_nonstd/dto/get_asb_bps_gallery_nonstd_list_filter.dto';

@Injectable()
export class AsbBpsGalleryNonstdRepositoryImpl extends AsbBpsGalleryNonstdRepository {
    constructor(
        @InjectRepository(AsbBpsGalleryNonstdOrmEntity)
        private readonly repository: Repository<AsbBpsGalleryNonstdOrmEntity>,
    ) {
        super();
    }

    async create(
        dto: CreateAsbBpsGalleryNonstdDto,
        filename: string,
    ): Promise<AsbBpsGalleryNonstd> {
        try {
            const ormEntity = this.repository.create({
                idAsbKomponenBangunanNonstd: dto.idAsbKomponenBangunanNonstd,
                filename: filename,
                jumlahBobot: dto.jumlahBobot,
                rincianHarga: dto.rincianHarga,
            });

            const saved = await this.repository.save(ormEntity);
            return plainToInstance(AsbBpsGalleryNonstd, saved);
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        dto: UpdateAsbBpsGalleryNonstdDto,
        filename?: string,
    ): Promise<AsbBpsGalleryNonstd> {
        try {
            const existing = await this.repository.findOne({ where: { id } });
            if (!existing) {
                throw new Error(`AsbBpsGalleryNonstd with id ${id} not found`);
            }

            const updateData: Partial<AsbBpsGalleryNonstdOrmEntity> = {};

            if (dto.idAsbKomponenBangunanNonstd !== undefined) {
                updateData.idAsbKomponenBangunanNonstd = dto.idAsbKomponenBangunanNonstd;
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
            return plainToInstance(AsbBpsGalleryNonstd, updated);
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const result = await this.repository.softDelete(id);
            if (result.affected === 0) {
                throw new Error(`AsbBpsGalleryNonstd with id ${id} not found`);
            }
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbBpsGalleryNonstd | null> {
        try {
            const entity = await this.repository.findOne({ where: { id } });
            return entity ? plainToInstance(AsbBpsGalleryNonstd, entity) : null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(
        page: number,
        amount: number,
        filters?: GetAsbBpsGalleryNonstdListFilterDto,
    ): Promise<[AsbBpsGalleryNonstd[], number]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('gallery');

            if (filters?.idAsbKomponenBangunanNonstd) {
                queryBuilder.andWhere(
                    'gallery.idAsbKomponenBangunanNonstd = :idAsbKomponenBangunanNonstd',
                    { idAsbKomponenBangunanNonstd: filters.idAsbKomponenBangunanNonstd },
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
                plainToInstance(AsbBpsGalleryNonstd, e),
            );
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanNonstdId(id: number): Promise<AsbBpsGalleryNonstd[]> {
        try {
            const entities = await this.repository.find({
                where: { idAsbKomponenBangunanNonstd: id },
            });
            return entities.map((e) => plainToInstance(AsbBpsGalleryNonstd, e));
        } catch (error) {
            throw error;
        }
    }

    async findByAsb(idAsb: number, page: number, amount: number): Promise<[AsbBpsGalleryNonstd[], number]> {
        try {
            const [entities, total] = await this.repository.findAndCount({
                where: { idAsb },
                skip: (page - 1) * amount,
                take: amount,
                order: { id: 'DESC' }
            });
            const domainEntities = entities.map((e) => plainToInstance(AsbBpsGalleryNonstd, e));
            return [domainEntities, total];
        } catch (error) {
            throw error;
        }
    }
}
