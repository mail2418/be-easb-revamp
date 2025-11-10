import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.entity';
import { ValidateUserUseCase } from './use_cases/validate_user.use_case';
import { UserService } from 'src/domain/user/user.service';
import { LoginDto } from 'src/presentation/auth/dto/login.dto';
import { CreateUserDto } from 'src/presentation/users/dto/create_user.dto';

@Injectable()
export class UserServiceImpl implements UserService {
    private readonly validateUserUseCase: ValidateUserUseCase;

    constructor(private readonly userRepo: UserRepository) {
        this.validateUserUseCase = new ValidateUserUseCase(userRepo);
    }

    async create(user: CreateUserDto): Promise<User> { return this.userRepo.create(user); }

    async validateUser(dto: LoginDto): Promise<User | null> {
        return await this.validateUserUseCase.execute(dto);
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userRepo.findByUsername(username);
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepo.findById(id);
        return user;
    }
}
