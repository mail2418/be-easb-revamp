import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
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
import { UsersPaginationResult } from 'src/presentation/users/dto/users_pagination.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(UserOrmEntity) private readonly repo: Repository<UserOrmEntity>) {}

    async create(user: CreateUserDto): Promise<User> {
        try {
            const userOrm = plainToInstance(UserOrmEntity, user);
            userOrm.passwordHash = user.password;
            console.log("UserORM: ", userOrm);

            const newUser = await this.repo.save(userOrm);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            const u = await this.repo.findOne({ where: { username } });
            if (!u) {
                return null;
            }

            return u;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<User | null> { 
        try {
            const u = await this.repo.findOne({ where: { id } });

            if (!u) {
                return null;
            }

            return u;
        } catch (error) {
            throw error;
        }
    }

    // Database operations only - no business logic
    async updateUser(existingUser: UpdateUserDto): Promise<User> {
        try {
            const updatedUser = await this.repo.save(existingUser);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async updateUserByAdmin(existingUser: UpdateUserByAdminDto): Promise<User> {
        try {
            const updatedUser = await this.repo.save(existingUser);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(user: DeleteUserDto): Promise<boolean> {
        try {
            return await this.repo.softDelete(user.id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async deleteUserByAdmin(user: DeleteUserByAdminDto): Promise<boolean> {
        try {
            return await this.repo.softDelete(user.id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async getUsers(pagination: GetUsersDto): Promise<UsersPaginationResult> {
        try {
            const [users, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            });

            return {
                users,
                total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getUserDetail(user: GetUserDetailDto): Promise<User | null> {
        try {
            const existingUser = await this.repo.findOne({ where: { id: user.id } });

            return existingUser ? existingUser : null;
        } catch (error) {
            throw error;
        }
    }
}
