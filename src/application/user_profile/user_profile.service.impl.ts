import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserProfileService } from '../../domain/user_profile/user_profile.service';
import { UserProfileRepository } from '../../domain/user_profile/user_profile.repository';
import { UserRepository } from '../../domain/user/user.repository';
import { OpdService } from '../../domain/opd/opd.service';
import { UpdateUserProfileDto } from '../../presentation/user_profile/dto/update_user_profile.dto';
import { UserProfileDto } from '../../presentation/user_profile/dto/user_profile.dto';
import { Role } from '../../domain/user/user_role.enum';

@Injectable()
export class UserProfileServiceImpl implements UserProfileService {
    constructor(
        private readonly profileRepo: UserProfileRepository,
        private readonly userRepo: UserRepository,
        private readonly opdService: OpdService,
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

        let opd: UserProfileDto['opd'] = null;
        if (user.roles.includes(Role.OPD)) {
            const opdRecord = await this.opdService.getOpdByUser(userId);
            if (opdRecord) {
                opd = { opd: opdRecord.opd, alias: opdRecord.alias };
            }
        }

        return {
            id: profile.id,
            idUser: userId,
            nama: profile.nama,
            nip: profile.nip ?? null,
            username: user.username,
            roles: user.roles,
            opd,
        };
    }
}
