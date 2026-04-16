import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user.entity';
import { UserOrmEntity } from '../orm/user.orm_entity';
import { CreateUserDto } from 'src/presentation/users/dto/create_user.dto';
import { UpdateUserDto } from 'src/presentation/users/dto/update_user.dto';
import { UpdateUserByAdminDto } from 'src/presentation/users/dto/update_user_by_admin.dto';
import { DeleteUserDto } from 'src/presentation/users/dto/delete_user.dto';
import { DeleteUserByAdminDto } from 'src/presentation/users/dto/delete_user_by_admin.dto';
import { GetUsersDto } from 'src/presentation/users/dto/get_users.dto';
import { GetUserDetailDto } from 'src/presentation/users/dto/get_user_detail.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(UserOrmEntity) private readonly repo: Repository<UserOrmEntity>) {}

    async create(user: CreateUserDto): Promise<User> {
        const userOrm = plainToInstance(UserOrmEntity, user);
        userOrm.passwordHash = user.password;
        const newUser = await this.repo.save(userOrm);
        return newUser;
    }

    async findByUsername(username: string): Promise<User | null> {
        const u = await this.repo.findOne({ where: { username } });
        if (!u) {
            return null;
        }

        return u;
    }

    async findById(id: number): Promise<User | null> { 
        const u = await this.repo.findOne({ where: { id } });

        if (!u) {
            return null;
        }

        return u;
    }

    async updateUser(existingUser: UpdateUserDto): Promise<User> {
        const updatedUser = await this.repo.save(existingUser);
        return updatedUser;
    }

    async updateUserByAdmin(existingUser: UpdateUserByAdminDto): Promise<User> {
        const updatedUser = await this.repo.save(existingUser);
        return updatedUser;
    }

    async deleteUser(user: DeleteUserDto): Promise<boolean> {
        return await this.repo.softDelete(user.id).then(() => true).catch(() => false);
    }

    async deleteUserByAdmin(user: DeleteUserByAdminDto): Promise<boolean> {
        return await this.repo.softDelete(user.id).then(() => true).catch(() => false);
    }

    async getUsers(
        pagination: GetUsersDto,
      ): Promise<{ data: User[]; total: number }> {
          const page = Math.max(Number(pagination?.page) || 1, 1);
          const amount = Math.max(Number(pagination?.amount) || 10, 1);
      
          const [users, total] = await this.repo.findAndCount({
            skip: (page - 1) * amount,
            take: amount,
            order: { id: 'DESC' },
          });
      
          return { data: users, total };
      }

    async getUserDetail(user: GetUserDetailDto): Promise<User | null> {
        const existingUser = await this.repo.findOne({ where: { id: user.id } });

        return existingUser ? existingUser : null;
    }

    async updatePasswordHashAndIncrementRefreshTokenVersion(userId: number, passwordHash: string): Promise<void> {
        await this.repo.update({ id: userId }, { passwordHash });
        await this.repo.increment({ id: userId }, 'refreshTokenVersion', 1);
    }
}
