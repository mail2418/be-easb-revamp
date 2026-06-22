import {
    Controller,
    Get,
    Patch,
    Post,
    Param,
    Body,
    Req,
    Res,
    ParseIntPipe,
    HttpStatus,
    UseInterceptors,
    UploadedFile,
    HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { createReadStream } from 'fs';
import * as path from 'path';
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

    @Post('me/photo')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN, Role.GUEST)
    @UseInterceptors(FileInterceptor('photo'))
    async uploadPhoto(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseDto> {
        const user = req.user as UserContext;
        const data = await this.profileService.uploadPhoto(parseInt(user.userId, 10), file);
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Profile photo uploaded successfully',
            data,
        };
    }

    @Get('photo/:userId')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN, Role.GUEST)
    async getPhoto(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req: Request,
        @Res() res: Response,
    ): Promise<void> {
        const user = req.user as UserContext;
        const absolutePath = await this.profileService.getPhotoPath(
            userId,
            parseInt(user.userId, 10),
            user.roles,
        );
        const ext = path.extname(absolutePath).toLowerCase();
        const mime =
            ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
        res.setHeader('Content-Type', mime);
        createReadStream(absolutePath).pipe(res);
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

    private handleError(error: unknown): never {
        if (error instanceof HttpException) {
            throw error;
        }
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
