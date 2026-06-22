import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSpesifikasiDesainRepository } from "../../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.repository";
import { JalanSpesifikasiDesainOrmEntity } from "../orm/jalan_spesifikasi_desain.orm_entity";
import { JalanSpesifikasiDesain } from "../../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.entity";
import { CreateJalanSpesifikasiDesainDto } from "../../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto";
import { plainToInstance } from "class-transformer";
import { UpdateJalanSpesifikasiDesainDto } from "../../../presentation/jalan_spesifikasi_desain/dto/update_jalan_spesifikasi_desain.dto";
import { GetJalanSpesifikasiDesainDto } from "../../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto";

@Injectable()
export class JalanSpesifikasiDesainRepositoryImpl implements JalanSpesifikasiDesainRepository {
    constructor(@InjectRepository(JalanSpesifikasiDesainOrmEntity) private readonly repo: Repository<JalanSpesifikasiDesainOrmEntity>) { }

    async create(dto: CreateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
        const ormEntity = plainToInstance(JalanSpesifikasiDesainOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async update(dto: UpdateJalanSpesifikasiDesainDto): Promise<JalanSpesifikasiDesain> {
        const { id, ...updateData } = dto;
        await this.repo.update(id, updateData);
        const updatedEntity = await this.repo.findOne({ where: { id } });
        return updatedEntity!;
    }

    async delete(id: number): Promise<boolean> {
        return await this.repo.softDelete(id).then(() => true).catch(() => false);
    }

    async findById(id: number): Promise<JalanSpesifikasiDesain | null> {
        const entity = await this.repo
            .createQueryBuilder('jsd')
            .select([
                'jsd.id',
                'jsd.id_usulan_jalan',
                'jsd.id_ruang_lingkup',
                'jsd.id_hspk',
                'jsd.volume',
                'jsd.spasi',
                'jsd.tinggi',
                'jsd.harga_spec'
            ])
            .where('jsd.id = :id', { id })
            .getOne();
        return entity || null;
    }

    async findAll(dto: GetJalanSpesifikasiDesainDto): Promise<{ data: JalanSpesifikasiDesain[]; total: number; }> {
        const queryBuilder = this.repo
            .createQueryBuilder('jsd')
            .select([
                'jsd.id',
                'jsd.id_usulan_jalan',
                'jsd.id_ruang_lingkup',
                'jsd.id_hspk',
                'jsd.volume',
                'jsd.spasi',
                'jsd.tinggi',
                'jsd.harga_spec'
            ])
            .orderBy('jsd.id', 'DESC');

        if (dto.id_usulan_jalan !== undefined) {
            queryBuilder.where('jsd.id_usulan_jalan = :id_usulan_jalan', { id_usulan_jalan: dto.id_usulan_jalan });
        }

        if (dto.page !== undefined && dto.amount !== undefined) {
            const skip = (dto.page - 1) * dto.amount;
            queryBuilder.skip(skip).take(dto.amount);
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return { data, total };
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.repo.softDelete({ id_usulan_jalan: idUsulanJalan });
    }

    async findByUsulanJalan(idUsulanJalan: number, page?: number, amount?: number): Promise<[JalanSpesifikasiDesain[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('jsd')
            .select([
                'jsd.id',
                'jsd.id_usulan_jalan',
                'jsd.id_ruang_lingkup',
                'jsd.id_hspk',
                'jsd.volume',
                'jsd.spasi',
                'jsd.tinggi',
                'jsd.harga_spec'
            ])
            .where('jsd.id_usulan_jalan = :idUsulanJalan', { idUsulanJalan })
            .orderBy('jsd.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}
