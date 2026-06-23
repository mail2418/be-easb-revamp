import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserProfileRepository } from '../../../domain/user_profile/user_profile.repository';
import { UserProfile } from '../../../domain/user_profile/user_profile.entity';
import { UserProfileOrmEntity } from '../orm/user_profile.orm_entity';

@Injectable()
export class UserProfileRepositoryImpl implements UserProfileRepository {
    constructor(
        @InjectRepository(UserProfileOrmEntity)
        private readonly repo: Repository<UserProfileOrmEntity>,
    ) {}

    async findByUserId(idUser: number): Promise<UserProfile | null> {
        const entity = await this.repo.findOne({ where: { idUser } });
        return entity ? plainToInstance(UserProfile, entity) : null;
    }

    async create(data: {
        idUser: number;
        nama: string;
        nip?: string | null;
    }): Promise<UserProfile> {
        const entity = this.repo.create(data);
        const saved = await this.repo.save(entity);
        return plainToInstance(UserProfile, saved);
    }

    async update(
        idUser: number,
        data: { nama?: string; nip?: string | null; photoPath?: string | null },
    ): Promise<UserProfile> {
        await this.repo.update({ idUser }, data);
        const updated = await this.repo.findOneOrFail({ where: { idUser } });
        return plainToInstance(UserProfile, updated);
    }

    async ensureForUser(idUser: number, defaultNama: string): Promise<UserProfile> {
        const existing = await this.findByUserId(idUser);
        if (existing) {
            return existing;
        }
        return this.create({ idUser, nama: defaultNama, nip: null });
    }
}
