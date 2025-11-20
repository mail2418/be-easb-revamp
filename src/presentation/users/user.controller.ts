import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  HttpException,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UpdateUserByAdminDto } from './dto/update_user_by_admin.dto';
import { DeleteUserDto } from './dto/delete_user.dto';
import { DeleteUserByAdminDto } from './dto/delete_user_by_admin.dto';
import { GetUsersDto } from './dto/get_users.dto';
import { GetUserDetailDto } from './dto/get_user_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from 'src/domain/user/user_role.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.SUPERADMIN)
    @Post('create')
    async create(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User created',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                // response bisa string atau object { message: string | string[]; ... }
                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.ADMIN)
    @Post('/admin/create')
    async createUserByAdmin(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.createUserByAdmin(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User created',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                // response bisa string atau object { message: string | string[]; ... }
                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.SUPERADMIN)
    @Patch('update')
    async updateUser(@Body() dto: UpdateUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.updateUser(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User updated',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.ADMIN)
    @Patch('/admin/update')
    async updateUserByAdmin(@Body() dto: UpdateUserByAdminDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.updateUserByAdmin(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User updated by admin',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.SUPERADMIN)
    @Delete('delete')
    async deleteUser(@Body() dto: DeleteUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            await this.userService.deleteUser(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User deleted',
                data: null,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.ADMIN)
    @Delete('admin/delete')
    async deleteUserByAdmin(@Body() dto: DeleteUserByAdminDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            await this.userService.deleteUserByAdmin(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User deleted by admin',
                data: null,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Get('list')
    async getUsers(@Body() dto: GetUsersDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const result = await this.userService.getUsers(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Users retrieved',
                data: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Get('detail')
    async getUserDetail(@Body() dto: GetUserDetailDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.getUserDetail(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User detail retrieved',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }
}
