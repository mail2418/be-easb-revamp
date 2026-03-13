import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    UseGuards,
    HttpStatus,
    HttpException,
    Query,
} from '@nestjs/common';
import { OpdService } from '../../domain/opd/opd.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateOpdDto } from './dto/create_opd.dto';
import { UpdateOpdDto } from './dto/update_opd.dto';
import { DeleteOpdDto } from './dto/delete_opd.dto';
import { GetOpdsDto } from './dto/get_opds.dto';
import { GetOpdDetailDto } from './dto/get_opd_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('opds')
export class OpdController {
    constructor(private readonly opdService: OpdService) { }

    @Post()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async createOpd(@Body() dto: CreateOpdDto): Promise<ResponseDto> {
        try {
            const opd = await this.opdService.createOpd(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'OPD created',
                data: opd,
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

    @Put()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async updateOpd(@Body() dto: UpdateOpdDto): Promise<ResponseDto> {
        try {
            const opd = await this.opdService.updateOpd(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'OPD updated',
                data: opd,
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

    @Delete()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async deleteOpd(@Body() dto: DeleteOpdDto): Promise<ResponseDto> {
        try {
            const deleted = await this.opdService.deleteOpd(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'OPD deleted',
                data: deleted,
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

    @Get()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async getOpds(@Query() dto: GetOpdsDto): Promise<ResponseDto> {
        try {
            const result = await this.opdService.getOpds(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'OPDs retrieved',
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

    @Get('detail')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async getOpdDetail(@Query() dto: GetOpdDetailDto): Promise<ResponseDto> {
        try {
            const opd = await this.opdService.getOpdById(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'OPD detail retrieved',
                data: opd,
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

    @Get('user/:id_user')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async getOpdByUser(id_user: number): Promise<ResponseDto> {
        try {
            const opd = await this.opdService.getOpdByUser(id_user);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'OPD by user retrieved',
                data: opd,
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
