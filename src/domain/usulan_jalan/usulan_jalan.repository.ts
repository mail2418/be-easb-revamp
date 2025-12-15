import { UsulanJalanWithRelationsDto } from 'src/application/usulan_jalan/dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from 'src/application/usulan_jalan/dto/find_all_usulan_jalan.dto';
import { DeepPartial } from 'typeorm';
import { UsulanJalan } from './usulan_jalan.entity';

export abstract class UsulanJalanRepository {
    abstract findById(id: number, idOpd?: number): Promise<UsulanJalanWithRelationsDto | null>;
    abstract findAll(dto: FindAllUsulanJalanDto, idOpd?: number): Promise<{ data: UsulanJalanWithRelationsDto[]; total: number }>;
    abstract create(data: DeepPartial<UsulanJalan>): Promise<UsulanJalanWithRelationsDto>;
    abstract update(id: number, data: DeepPartial<UsulanJalan>): Promise<UsulanJalanWithRelationsDto>;
    abstract delete(id: number): Promise<void>;
}


