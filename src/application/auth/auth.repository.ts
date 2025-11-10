import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "src/infrastructure/user/orm/user.orm_entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository {
    constructor(@InjectRepository(UserOrmEntity) private readonly repo: Repository<UserOrmEntity>) {}

    async incrementRefreshTokenVersion(userId: number): Promise<void> {
        await this.repo.increment({ id: userId }, 'refreshTokenVersion', 1);
    }
}