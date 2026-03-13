import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user/user.service';
import { LoginDto } from 'src/presentation/auth/dto/login.dto';
import { User } from 'src/domain/user/user.entity';
import { AuthRepository } from './auth.repository';
import { RevokeAllDto } from 'src/presentation/auth/dto/revoke_all.dto';
import { OpdRepository } from 'src/domain/opd/opd.repository';
import { Role } from 'src/domain/user/user_role.enum';

type Tokens = { accessToken: string; refreshToken: string, maxAgeAccess: number, maxAgeRefresh: number };

function parseTimeStringToMs(timeString: string): number {
    const match = timeString.match(/^(\d+)([smhd])$/);
    if (!match) return 0;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's': return value * 1000;
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        default: return 0;
    }
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
        private readonly authRepo: AuthRepository,
        private readonly opdRepo: OpdRepository,
    ) { }

    async validateUser(dto: LoginDto): Promise<User> {
        const user = await this.userService.validateUser(dto); // lakukan bcrypt.compare di use case
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return user;
    }

    private async signAccess(user: User): Promise<string> {
        let idOpd: number | null = null;

        // Only fetch OPD for pure OPD users (not ADMIN/SUPERADMIN)
        const hasAdminPrivileges = user.roles.includes(Role.ADMIN) || user.roles.includes(Role.SUPERADMIN);

        if (!hasAdminPrivileges && user.roles.includes(Role.OPD)) {
            const opd = await this.opdRepo.getOpdByUser(user.id);
            idOpd = opd?.id ?? null;
        }

        const payload = { sub: String(user.id), username: user.username, roles: user.roles, idOpd };
        const expiresIn = this.config.getOrThrow<string>('jwt.accessTtl');
        return this.jwt.sign(payload, { expiresIn } as any);
    }

    private async signRefresh(user: User): Promise<string> {
        let idOpd: number | null = null;

        // Only fetch OPD for pure OPD users (not ADMIN/SUPERADMIN)
        const hasAdminPrivileges = user.roles.includes(Role.ADMIN) || user.roles.includes(Role.SUPERADMIN);

        if (!hasAdminPrivileges && user.roles.includes(Role.OPD)) {
            const opd = await this.opdRepo.getOpdByUser(user.id);
            idOpd = opd?.id ?? null;
        }

        const payload = {
            sub: String(user.id),
            username: user.username,
            roles: user.roles,
            idOpd,
            tokenVersion: user.refreshTokenVersion ?? 0,
        };
        const expiresIn = this.config.getOrThrow<string>('jwt.refreshTtl');
        return this.jwt.sign(payload, { expiresIn } as any);
    }

    async login(user: User): Promise<Tokens> {
        const accessTtl = this.config.getOrThrow<string>('jwt.accessTtl');
        const refreshTtl = this.config.getOrThrow<string>('jwt.refreshTtl');

        return {
            accessToken: await this.signAccess(user),
            refreshToken: await this.signRefresh(user),
            maxAgeAccess: parseTimeStringToMs(accessTtl),
            maxAgeRefresh: parseTimeStringToMs(refreshTtl),
        };
    }

    async rotateTokens(user: User): Promise<Tokens> {
        return this.login(user);
    }

    async revokeAllRefreshTokens(revokeDto: RevokeAllDto): Promise<void> {
        const userId = revokeDto.userId;
        const user = await this.userService.findById(userId);
        if (!user) throw new UnauthorizedException('User not found');

        await this.authRepo.incrementRefreshTokenVersion(userId);
    }
}
