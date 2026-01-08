import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JalanSaluranSpesifikasiSmkkRepository } from "../../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.repository";
import { JalanSaluranSpesifikasiSmkkOrmEntity } from "../orm/jalan_saluran_spesifikasi_smkk.orm_entity";
import { JalanSaluranSpesifikasiSmkk } from "../../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.entity";
import { CreateJalanSaluranSpesifikasiSmkkDto } from "../../../presentation/jalan_saluran_spesifikasi_smkk/dto/create_jalan_saluran_spesifikasi_smkk.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class JalanSaluranSpesifikasiSmkkRepositoryImpl implements JalanSaluranSpesifikasiSmkkRepository {
    constructor(@InjectRepository(JalanSaluranSpesifikasiSmkkOrmEntity) private readonly repo: Repository<JalanSaluranSpesifikasiSmkkOrmEntity>) { }

    async create(dto: CreateJalanSaluranSpesifikasiSmkkDto): Promise<JalanSaluranSpesifikasiSmkk> {
        const ormEntity = plainToInstance(JalanSaluranSpesifikasiSmkkOrmEntity, dto);
        const newEntity = await this.repo.save(ormEntity);
        return newEntity;
    }

    async deleteByUsulanJalanId(idUsulanJalan: number): Promise<void> {
        await this.repo.softDelete({ id_usulan_jalan: idUsulanJalan });
    }

    async findByUsulanJalan(idUsulanJalan: number, page?: number, amount?: number): Promise<[JalanSaluranSpesifikasiSmkk[], number]> {
        const queryBuilder = this.repo
            .createQueryBuilder('jsss')
            .select([
                'jsss.id',
                'jsss.id_jenis_usulan',
                'jsss.id_usulan_jalan',
                'jsss.id_jalan_saluran_smkk',
                'jsss.harga_spec',
                'jsss.jumlah_barang'
            ])
            .where('jsss.id_usulan_jalan = :idUsulanJalan', { idUsulanJalan })
            .orderBy('jsss.id', 'DESC');

        if (page !== undefined && amount !== undefined) {
            const skip = (page - 1) * amount;
            queryBuilder.skip(skip).take(amount);
        }

        const [entities, total] = await queryBuilder.getManyAndCount();
        return [entities, total];
    }
}

