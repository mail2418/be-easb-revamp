import { CreateUserDto } from 'src/presentation/users/dto/create_user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from 'src/presentation/users/dto/update_user.dto';
import { UpdateUserByAdminDto } from 'src/presentation/users/dto/update_user_by_admin.dto';
import { DeleteUserDto } from 'src/presentation/users/dto/delete_user.dto';
import { DeleteUserByAdminDto } from 'src/presentation/users/dto/delete_user_by_admin.dto';
import { GetUsersDto } from 'src/presentation/users/dto/get_users.dto';
import { GetUserDetailDto } from 'src/presentation/users/dto/get_user_detail.dto';
import { UsersPaginationResult } from 'src/presentation/users/dto/users_pagination.dto';

export abstract class UserRepository {
    abstract findByUsername(username: string): Promise<User | null>;
    abstract findById(id: number): Promise<User | null>;
    abstract create(user: CreateUserDto): Promise<User>;
    abstract updateUser(user: UpdateUserDto): Promise<User>;
    abstract updateUserByAdmin(user: UpdateUserByAdminDto): Promise<User>;
    abstract deleteUser(user: DeleteUserDto): Promise<boolean>;
    abstract deleteUserByAdmin(user: DeleteUserByAdminDto): Promise<boolean>;
    abstract getUsers(pagination: GetUsersDto): Promise<UsersPaginationResult>;
    abstract getUserDetail(user: GetUserDetailDto): Promise<User | null>;
}
