import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaluranSpesifikasiSmkkRepository } from "../../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.repository";
import { SaluranSpesifikasiSmkkOrmEntity } from "../orm/saluran_spesifikasi_smkk.orm_entity";
import { SaluranSpesifikasiSmkk } from "../../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.entity";
import { CreateSaluranSpesifikasiSmkkDto } from "../../../presentation/saluran_spesifikasi_smkk/dto/create_saluran_spesifikasi_smkk.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SaluranSpesifikasiSmkkRepositoryImpl implements SaluranSpesifikasiSmkkRepository {
    constructor(@InjectRepository(SaluranSpesifikasiSmkkOrmEntity) private readonly repo: Repository<SaluranSpesifikasiSmkkOrmEntity>) { }

    async create(dto: CreateSaluranSpesifikasiSmkkDto): Promise<SaluranSpesifikasiSmkk> {
        const ormEntity = plainToInstance(SaluranSpesifikasiSmkkOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async deleteByUsulanSaluranId(idUsulanSaluran: number): Promise<void> {
        await this.repo.softDelete({ id_usulan_saluran: idUsulanSaluran });
    }

    async findByUsulanSaluran(idUsulanSaluran: number, page?: number, amount?: number): Promise<[SaluranSpesifikasiSmkk[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('sss')
            .select([
                'sss.id',
                'sss.id_jenis_usulan',
                'sss.id_usulan_saluran',
                'sss.id_jalan_saluran_smkk',
                'sss.harga_spec',
                'sss.jumlah_barang',
                'sss.harga_satuan'
            ])
            .where('sss.id_usulan_saluran = :idUsulanSaluran', { idUsulanSaluran })
            .orderBy('sss.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}
