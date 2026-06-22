import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/domain/user/user.service';
import { UserServiceImpl } from 'src/application/user/user.service.impl';
import { UserOrmEntity } from '../../infrastructure/user/orm/user.orm_entity';
import { UserRepositoryImpl } from '../../infrastructure/user/repositories/user.repository.impl';
import { UserRepository } from '../../domain/user/user.repository';
import { UserController } from './user.controller';
import { UserProfileModule } from '../user_profile/user_profile.module';


@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), forwardRef(() => UserProfileModule)],
  controllers: [UserController],
  providers: [
    UserServiceImpl,
    {
        provide: UserService,
        useExisting: UserServiceImpl,
    },
    UserRepositoryImpl,
    {
      provide: UserRepository,
      useExisting: UserRepositoryImpl,
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
