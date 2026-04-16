import { ConflictException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { ValidateUserUseCase } from './use_cases/validate_user.use_case';
import { UserService } from 'src/domain/user/user.service';
import { LoginDto } from 'src/presentation/auth/dto/login.dto';
import { CreateUserDto } from 'src/presentation/users/dto/create_user.dto';
import { UpdateUserDto } from 'src/presentation/users/dto/update_user.dto';
import { UpdateUserByAdminDto } from 'src/presentation/users/dto/update_user_by_admin.dto';
import { DeleteUserDto } from 'src/presentation/users/dto/delete_user.dto';
import { DeleteUserByAdminDto } from 'src/presentation/users/dto/delete_user_by_admin.dto';
import { GetUsersDto } from 'src/presentation/users/dto/get_users.dto';
import { GetUserDetailDto } from 'src/presentation/users/dto/get_user_detail.dto';
import { UsersPaginationResult } from 'src/presentation/users/dto/users_pagination.dto';
import { ChangeUserPasswordDto } from 'src/presentation/users/dto/change_user_password.dto';
import bcrypt from 'bcryptjs';
import { Role } from 'src/domain/user/user_role.enum';

@Injectable()
export class UserServiceImpl implements UserService {
    private readonly validateUserUseCase: ValidateUserUseCase;
    private readonly SALT_ROUNDS = 12;

    constructor(private readonly userRepo: UserRepository) {
        this.validateUserUseCase = new ValidateUserUseCase(userRepo);
    }

    async create(userDto: CreateUserDto): Promise<User> {
        try {
            // cek username existing
            const exists = await this.userRepo.findByUsername(userDto.username);
            if (exists) {
                throw new ConflictException('Username already exists');
            }

            // hash password
            userDto.password = bcrypt.hashSync(userDto.password, this.SALT_ROUNDS);

            // create user
            const newUser = await this.userRepo.create(userDto);

            const { passwordHash: _, ...safe } = newUser as any;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException("Failed to create user");
        }
    }

    async createUserByAdmin(userDto: CreateUserDto): Promise<User> {
        try {
            // cek role yang ingin di-assign ke user baru
            if (userDto.roles.includes(Role.SUPERADMIN) || userDto.roles.includes(Role.ADMIN)) {
                throw new ForbiddenException("Admin can't add new admin users")
            }

            // cek username existing
            const exists = await this.userRepo.findByUsername(userDto.username);
            if (exists) {
                throw new ConflictException('Username already exists');
            }

            // hash password
            userDto.password = bcrypt.hashSync(userDto.password, this.SALT_ROUNDS);

            // create user
            const newUser = await this.userRepo.create(userDto);

            const { passwordHash: _, ...safe } = newUser as any;
            safe.passwordHash = undefined;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            throw new InternalServerErrorException("Failed to create user");
        }
    }

    async validateUser(dto: LoginDto): Promise<User | null> {
        try {
            return await this.validateUserUseCase.execute(dto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to validate user');
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            return await this.userRepo.findByUsername(username);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to find user by username');
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepo.findById(id);
            return user;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to find userby id')
        }
    }

    async updateUser(userDto: UpdateUserDto): Promise<User> {
        try {
            // cek user yang akan diupdate ada atau tidak
            const existingUser = await this.userRepo.findById(userDto.id);
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }

            // cek username uniqueness jika username mau diupdate
            if (userDto.username && userDto.username !== existingUser.username) {
                const usernameExists = await this.userRepo.findByUsername(userDto.username);
                if (usernameExists) {
                    throw new ConflictException('Username already exists');
                }
            }

            // update user via repository
            const updatedUser = await this.userRepo.updateUser({ ...userDto });

            // return user tanpa passwordHash
            const { passwordHash: _, ...safe } = updatedUser as any;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update user');
        }
    }

    async updateUserByAdmin(userDto: UpdateUserByAdminDto): Promise<User> {
        try {
            // cek user yang akan diupdate ada atau tidak
            const existingUser = await this.userRepo.findById(userDto.id);
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }

            // Admin hanya bisa update user dengan role VERIFIKATOR, OPD, GUEST
            const unAllowedRoles = [Role.SUPERADMIN, Role.ADMIN];
            const userRoles = existingUser.roles;
            const hasUnAllowedRole = userRoles.some(role => unAllowedRoles.includes(role));

            if (hasUnAllowedRole) {
                throw new ForbiddenException('Admin cannot update users with admin or superadmin roles');
            }

            // cek username uniqueness jika username mau diupdate
            if (userDto.username && userDto.username !== existingUser.username) {
                const usernameExists = await this.userRepo.findByUsername(userDto.username);
                if (usernameExists) {
                    throw new ConflictException('Username already exists');
                }
            }

            // update user via repository
            const updatedUser = await this.userRepo.updateUserByAdmin({ ...userDto });

            // return user tanpa passwordHash
            const { passwordHash: _, ...safe } = updatedUser as any;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to update user by admin');
        }
    }

    async deleteUser(userDto: DeleteUserDto): Promise<boolean> {
        try {
            // cek user yang akan dihapus ada atau tidak
            const existingUser = await this.userRepo.findById(userDto.id);
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }

            // delete user via repository
            return await this.userRepo.deleteUser(userDto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete user');
        }
    }

    async deleteUserByAdmin(userDto: DeleteUserByAdminDto): Promise<boolean> {
        try {
            // cek user yang akan dihapus ada atau tidak
            const existingUser = await this.userRepo.findById(userDto.id);
            if (!existingUser) {
                throw new NotFoundException('User not found');
            }

            // Admin hanya bisa delete user dengan role VERIFIKATOR, OPD, GUEST
            const unAllowedRoles = [Role.SUPERADMIN, Role.ADMIN];
            const userRoles = existingUser.roles;
            const hasAllowedRole = userRoles.some(role => unAllowedRoles.includes(role));

            if (hasAllowedRole) {
                throw new ForbiddenException('Admin cannot delete users with admin or superadmin roles');
            }

            // delete user via repository
            return await this.userRepo.deleteUserByAdmin(userDto);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete user by admin');
        }
    }

    async getUsers(pagination: GetUsersDto): Promise<UsersPaginationResult> {
        try {
            const result = await this.userRepo.getUsers(pagination);

            // sanitize users - remove passwordHash from response and superadmin users
            const sanitizedUsers = result.data.map(user => {
                const { passwordHash: _, ...safe } = user as any;
                return safe as User;
            }).filter(user => !user.roles.includes(Role.SUPERADMIN));

            const page = pagination.page || 1;
            const amount = pagination.amount || result.total;
            const totalPages = Math.ceil(result.total / (pagination.amount || result.total))
            return {
                users: sanitizedUsers,
                total: result.total,
                page,
                amount,
                totalPages
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get users');
        }
    }

    async getUserDetail(userDto: GetUserDetailDto): Promise<User> {
        try {
            const user = await this.userRepo.getUserDetail(userDto);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            // if user is superadmin, throw forbidden
            if (user.roles.includes(Role.SUPERADMIN)) {
                throw new ForbiddenException('Access to superadmin user detail is forbidden');
            }

            // sanitize user - remove passwordHash from response
            const { passwordHash: _, ...safe } = user as any;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to get user detail');
        }
    }

    async changeUserPassword(authenticatedUserId: number, dto: ChangeUserPasswordDto): Promise<User> {
        try {
            const authenticatedUser = await this.userRepo.findById(authenticatedUserId);
            if (!authenticatedUser) {
                throw new UnauthorizedException('Invalid credentials');
            }
            if (!authenticatedUser.roles.includes(Role.SUPERADMIN)) {
                throw new ForbiddenException('Forbidden: insufficient permissions');
            }

            const passwordOk = await bcrypt.compare(
                dto.currentPassword,
                authenticatedUser.passwordHash ? authenticatedUser.passwordHash : '',
            );
            if (!passwordOk) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const target = await this.userRepo.findById(dto.userId);
            if (!target) {
                throw new NotFoundException('User not found');
            }
            if (target.roles.includes(Role.SUPERADMIN) || target.roles.includes(Role.ADMIN)) {
                throw new ForbiddenException('Cannot change password for this user');
            }
            const hasOpdOrVerifikator =
                target.roles.includes(Role.OPD) || target.roles.includes(Role.VERIFIKATOR);
            if (!hasOpdOrVerifikator) {
                throw new ForbiddenException('Password can only be changed for OPD or Verifikator users');
            }

            const passwordHash = bcrypt.hashSync(dto.newPassword, this.SALT_ROUNDS);
            await this.userRepo.updatePasswordHashAndIncrementRefreshTokenVersion(dto.userId, passwordHash);

            const updated = await this.userRepo.findById(dto.userId);
            const { passwordHash: _, ...safe } = updated as any;
            return safe as User;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to change user password');
        }
    }
}
