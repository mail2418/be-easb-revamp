import { Role } from '../user/user_role.enum';
import { UserProfileDto } from '../../presentation/user_profile/dto/user_profile.dto';
import { UpdateUserProfileDto } from '../../presentation/user_profile/dto/update_user_profile.dto';
import type { Express } from 'express';

export abstract class UserProfileService {
    abstract getMyProfile(userId: number): Promise<UserProfileDto>;
    abstract getProfileById(
        targetUserId: number,
        requesterId: number,
        requesterRoles: Role[],
    ): Promise<UserProfileDto>;
    abstract updateMyProfile(userId: number, dto: UpdateUserProfileDto): Promise<UserProfileDto>;
    abstract uploadPhoto(userId: number, file: Express.Multer.File): Promise<UserProfileDto>;
    abstract getPhotoPath(
        targetUserId: number,
        requesterId: number,
        requesterRoles: Role[],
    ): Promise<string>;
    abstract ensureProfileForUser(idUser: number, defaultNama: string): Promise<void>;
}
