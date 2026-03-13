import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    HttpStatus,
    HttpException,
    Query,
} from '@nestjs/common';
import { KelurahanService } from '../../domain/kelurahan/kelurahan.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateKelurahanDto } from './dto/create_kelurahan.dto';
import { UpdateKelurahanDto } from './dto/update_kelurahan.dto';
import { DeleteKelurahanDto } from './dto/delete_kelurahan.dto';
import { GetKelurahansDto } from './dto/get_kelurahans.dto';
import { GetKelurahanDetailDto } from './dto/get_kelurahan_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('kelurahans')
export class KelurahanController {
    constructor(private readonly kelurahanService: KelurahanService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateKelurahanDto): Promise<ResponseDto> {
        try {
            const kelurahan = await this.kelurahanService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Kelurahan created',
                data: kelurahan,
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
                    message = Array.isArray(resObj.message) ? resObj.message.join(', ') : resObj.message ?? 'Error';
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
    @Roles(Role.SUPERADMIN)
    async update(@Body() dto: UpdateKelurahanDto): Promise<ResponseDto> {
        try {
            const kelurahan = await this.kelurahanService.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kelurahan updated',
                data: kelurahan,
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
                    message = Array.isArray(resObj.message) ? resObj.message.join(', ') : resObj.message ?? 'Error';
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
    @Roles(Role.SUPERADMIN)
    async deleteKelurahan(@Body() dto: DeleteKelurahanDto): Promise<ResponseDto> {
        try {
            await this.kelurahanService.delete(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kelurahan deleted',
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
                    message = Array.isArray(resObj.message) ? resObj.message.join(', ') : resObj.message ?? 'Error';
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
    @Roles(Role.OPD, Role.ADMIN, Role.VERIFIKATOR, Role.SUPERADMIN)
    async getKelurahans(@Query() dto: GetKelurahansDto): Promise<ResponseDto> {
        try {
            const result = await this.kelurahanService.getAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kelurahans retrieved',
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
                    message = Array.isArray(resObj.message) ? resObj.message.join(', ') : resObj.message ?? 'Error';
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
    @Roles(Role.OPD, Role.ADMIN, Role.VERIFIKATOR, Role.SUPERADMIN)
    async getKelurahanDetail(@Query() dto: GetKelurahanDetailDto): Promise<ResponseDto> {
        try {
            const kelurahan = await this.kelurahanService.getById(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kelurahan detail retrieved',
                data: kelurahan,
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
                    message = Array.isArray(resObj.message) ? resObj.message.join(', ') : resObj.message ?? 'Error';
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
