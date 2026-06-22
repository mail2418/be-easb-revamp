import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileController } from './user_profile.controller';
import { UserProfileOrmEntity } from '../../infrastructure/user_profile/orm/user_profile.orm_entity';
import { UserProfileRepository } from '../../domain/user_profile/user_profile.repository';
import { UserProfileRepositoryImpl } from '../../infrastructure/user_profile/repositories/user_profile.repository.impl';
import { UserProfileService } from '../../domain/user_profile/user_profile.service';
import { UserProfileServiceImpl } from '../../application/user_profile/user_profile.service.impl';
import { EnsureProfileUploadDirectoryUseCase } from '../../application/user_profile/use_cases/ensure_profile_upload_directory.use_case';
import { UserModule } from '../users/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileOrmEntity]), forwardRef(() => UserModule)],
    controllers: [UserProfileController],
    providers: [
        EnsureProfileUploadDirectoryUseCase,
        UserProfileRepositoryImpl,
        {
            provide: UserProfileRepository,
            useExisting: UserProfileRepositoryImpl,
        },
        UserProfileServiceImpl,
        {
            provide: UserProfileService,
            useExisting: UserProfileServiceImpl,
        },
    ],
    exports: [UserProfileService],
})
export class UserProfileModule {}
