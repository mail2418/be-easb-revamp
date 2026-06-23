import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserProfileService } from '../../domain/user_profile/user_profile.service';
import { UserProfileRepository } from '../../domain/user_profile/user_profile.repository';
import { UserRepository } from '../../domain/user/user.repository';
import { UpdateUserProfileDto } from '../../presentation/user_profile/dto/update_user_profile.dto';
import { UserProfileDto } from '../../presentation/user_profile/dto/user_profile.dto';
import { Role } from '../../domain/user/user_role.enum';
import { EnsureProfileUploadDirectoryUseCase } from './use_cases/ensure_profile_upload_directory.use_case';
import * as fs from 'fs';
import * as path from 'path';
import type { Express } from 'express';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

@Injectable()
export class UserProfileServiceImpl implements UserProfileService {
    constructor(
        private readonly profileRepo: UserProfileRepository,
        private readonly userRepo: UserRepository,
        private readonly ensureUploadDir: EnsureProfileUploadDirectoryUseCase,
    ) {}

    async getMyProfile(userId: number): Promise<UserProfileDto> {
        return this.buildProfileDto(userId);
    }

    async getProfileById(
        targetUserId: number,
        requesterId: number,
        requesterRoles: Role[],
    ): Promise<UserProfileDto> {
        this.assertCanView(targetUserId, requesterId, requesterRoles);
        return this.buildProfileDto(targetUserId);
    }

    async updateMyProfile(userId: number, dto: UpdateUserProfileDto): Promise<UserProfileDto> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.profileRepo.ensureForUser(userId, user.username);
        await this.profileRepo.update(userId, {
            nama: dto.nama,
            nip: dto.nip === '' ? null : dto.nip,
        });

        return this.buildProfileDto(userId);
    }

    async uploadPhoto(userId: number, file: Express.Multer.File): Promise<UserProfileDto> {
        if (!file) {
            throw new BadRequestException('Photo file is required');
        }
        if (!ALLOWED_MIME.has(file.mimetype)) {
            throw new BadRequestException('Photo must be JPEG, PNG, or WebP');
        }
        if (file.size > MAX_PHOTO_BYTES) {
            throw new BadRequestException('Photo must be 2 MB or smaller');
        }

        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.profileRepo.ensureForUser(userId, user.username);

        const ext =
            file.mimetype === 'image/png' ? 'png' : file.mimetype === 'image/webp' ? 'webp' : 'jpg';
        const uploadDir = this.ensureUploadDir.getUploadDirectory();
        const filename = `user-${userId}.${ext}`;
        const absolutePath = path.join(uploadDir, filename);
        const relativePath = path.join('profiles', filename);

        const existing = await this.profileRepo.findByUserId(userId);
        if (existing?.photoPath) {
            const oldPath = path.join(process.env.UPLOAD_DIR || 'public', existing.photoPath);
            if (fs.existsSync(oldPath) && oldPath !== absolutePath) {
                fs.unlinkSync(oldPath);
            }
        }

        fs.writeFileSync(absolutePath, file.buffer);
        await this.profileRepo.update(userId, { photoPath: relativePath });

        return this.buildProfileDto(userId);
    }

    async getPhotoPath(
        targetUserId: number,
        requesterId: number,
        requesterRoles: Role[],
    ): Promise<string> {
        this.assertCanView(targetUserId, requesterId, requesterRoles);

        const profile = await this.profileRepo.findByUserId(targetUserId);
        if (!profile?.photoPath) {
            throw new NotFoundException('Profile photo not found');
        }

        const absolutePath = path.join(process.env.UPLOAD_DIR || 'public', profile.photoPath);
        if (!fs.existsSync(absolutePath)) {
            throw new NotFoundException('Profile photo file not found');
        }

        return absolutePath;
    }

    async ensureProfileForUser(idUser: number, defaultNama: string): Promise<void> {
        await this.profileRepo.ensureForUser(idUser, defaultNama);
    }

    private assertCanView(targetUserId: number, requesterId: number, requesterRoles: Role[]): void {
        const isAdmin =
            requesterRoles.includes(Role.ADMIN) || requesterRoles.includes(Role.SUPERADMIN);
        if (targetUserId !== requesterId && !isAdmin) {
            throw new ForbiddenException('Not allowed to view this profile');
        }
    }

    private async buildProfileDto(userId: number): Promise<UserProfileDto> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const profile = await this.profileRepo.ensureForUser(userId, user.username);

        return {
            id: profile.id,
            idUser: userId,
            nama: profile.nama,
            nip: profile.nip ?? null,
            username: user.username,
            roles: user.roles,
            photoUrl: profile.photoPath ? `/users/profile/photo/${userId}` : null,
        };
    }
}
