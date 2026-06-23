import { Controller, Post, Body, UseGuards, Res, Req } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from '../../application/auth/auth.service';
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

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

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
    ): Promise<ResponseDto> {
        const user = await this.authService.validateUser(dto);
        const token = await this.authService.login(user);

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
    async logout(@Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
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
