import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    Req,
    ParseIntPipe,
    HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserProfileService } from '../../domain/user_profile/user_profile.service';
import { UpdateUserProfileDto } from './dto/update_user_profile.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { UserContext } from '../../common/types/user-context.type';

@Controller('users/profile')
export class UserProfileController {
    constructor(private readonly profileService: UserProfileService) {}

    @Get('me')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN, Role.GUEST)
    async getMyProfile(@Req() req: Request): Promise<ResponseDto> {
        const user = req.user as UserContext;
        const data = await this.profileService.getMyProfile(parseInt(user.userId, 10));
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Profile retrieved successfully',
            data,
        };
    }

    @Patch('me')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN, Role.GUEST)
    async updateMyProfile(
        @Req() req: Request,
        @Body() dto: UpdateUserProfileDto,
    ): Promise<ResponseDto> {
        const user = req.user as UserContext;
        const data = await this.profileService.updateMyProfile(parseInt(user.userId, 10), dto);
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Profile updated successfully',
            data,
        };
    }

    @Get(':id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN, Role.GUEST)
    async getProfileById(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        const user = req.user as UserContext;
        const data = await this.profileService.getProfileById(
            id,
            parseInt(user.userId, 10),
            user.roles,
        );
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Profile retrieved successfully',
            data,
        };
    }
}
