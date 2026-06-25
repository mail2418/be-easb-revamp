import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../../application/auth/auth.service';
import { AuditEventService } from '../../domain/audit_event/audit_event.service';
import { ResponseDto } from 'src/common/dto/response.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshJwtAuthGuard } from 'src/common/guards/jwt_refresh.guard';
import { Role } from 'src/domain/user/user_role.enum';
import { Roles, ROLES_KEY } from 'src/common/decorators/roles.decorator';
import { RevokeAllDto } from './dto/revoke_all.dto';
import { Throttle } from '@nestjs/throttler';

const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
};

function requestIp(req: Request): string | null {
    const fwd = req.headers['x-forwarded-for'];
    if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
    return req.ip ?? req.socket?.remoteAddress ?? null;
}

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly auditService: AuditEventService,
    ) {}

    @Public()
    @Throttle({
        default: {
            ttl: parseInt(process.env.RATE_AUTH_TIME_LIMIT ?? '60000', 10),
            limit: parseInt(process.env.RATE_AUTH_REQ_LIMIT ?? '5', 10),
        },
    })
    @Post('login')
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        const ipAddress = requestIp(req);
        const userAgent = (req.headers['user-agent'] as string)?.slice(0, 512) ?? null;

        let user;
        try {
            user = await this.authService.validateUser(dto);
        } catch (error) {
            await this.auditService.record({
                username: dto.username,
                action: 'login_failed',
                resource: 'auth',
                method: 'POST',
                path: '/auth/login',
                statusCode: 401,
                ipAddress,
                userAgent,
            });
            throw error;
        }

        const token = await this.authService.login(user);

        await this.auditService.record({
            idUser: Number(user.id),
            username: user.username,
            action: 'login_success',
            resource: 'auth',
            method: 'POST',
            path: '/auth/login',
            statusCode: 200,
            ipAddress,
            userAgent,
        });

        res.cookie('refreshToken', token.refreshToken, {
            ...REFRESH_COOKIE_OPTIONS,
            maxAge: token.maxAgeRefresh,
        });

        return {
            status: 'success',
            responseCode: 200,
            message: 'Login successful',
            data: {
                accessToken: token.accessToken,
            },
        };
    }

    @Public()
    @Throttle({
        default: {
            ttl: parseInt(process.env.RATE_AUTH_TIME_LIMIT ?? '60000', 10),
            limit: parseInt(process.env.RATE_AUTH_REQ_LIMIT ?? '5', 10),
        },
    })
    @UseGuards(RefreshJwtAuthGuard)
    @Post('refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ): Promise<ResponseDto> {
        const user = req.user as any; // { sub, username, roles }
        const tokens = await this.authService.rotateTokens({
            id: user.sub,
            username: user.username,
            roles: user.roles,
        } as any);

        res.cookie('refreshToken', tokens.refreshToken, {
            ...REFRESH_COOKIE_OPTIONS,
            maxAge: tokens.maxAgeRefresh,
        });

        return {
            status: 'success',
            responseCode: 200,
            message: 'Token Rotated',
            data: { accessToken: tokens.accessToken },
        };
    }

    @Post('logout')
    async logout(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        const user = req.user as { sub?: string | number; username?: string } | undefined;
        await this.auditService.record({
            idUser: user?.sub != null ? Number(user.sub) : null,
            username: user?.username ?? null,
            action: 'logout',
            resource: 'auth',
            method: 'POST',
            path: '/auth/logout',
            statusCode: 200,
            ipAddress: requestIp(req),
            userAgent: (req.headers['user-agent'] as string)?.slice(0, 512) ?? null,
        });
        res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS);
        return { status: 'success', responseCode: 200, message: 'Logged out', data: null };
    }

    @Post('revoke-all')
    @Roles(Role.SUPERADMIN)
    async revokeAll(
        @Body() revokeDto: RevokeAllDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<ResponseDto> {
        await this.authService.revokeAllRefreshTokens(revokeDto);

        res.clearCookie('refreshToken', REFRESH_COOKIE_OPTIONS);
        return {
            status: 'success',
            responseCode: 200,
            message: 'All refresh tokens revoked',
            data: null,
        };
    }
}
