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
import { KecamatanService } from '../../domain/kecamatan/kecamatan.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateKecamatanDto } from './dto/create_kecamatan.dto';
import { UpdateKecamatanDto } from './dto/update_kecamatan.dto';
import { DeleteKecamatanDto } from './dto/delete_kecamatan.dto';
import { GetKecamatansDto } from './dto/get_kecamatans.dto';
import { GetKecamatanDetailDto } from './dto/get_kecamatan_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('kecamatans')
@Roles(Role.SUPERADMIN)
export class KecamatanController {
    constructor(private readonly kecamatanService: KecamatanService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateKecamatanDto): Promise<ResponseDto> {
        try {
            const kecamatan = await this.kecamatanService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Kecamatan created',
                data: kecamatan,
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
    async update(@Body() dto: UpdateKecamatanDto): Promise<ResponseDto> {
        try {
            const kecamatan = await this.kecamatanService.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kecamatan updated',
                data: kecamatan,
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
    async deleteKecamatan(@Body() dto: DeleteKecamatanDto): Promise<ResponseDto> {
        try {
            await this.kecamatanService.delete(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kecamatan deleted',
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
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getKecamatans(@Query() dto: GetKecamatansDto): Promise<ResponseDto> {
        try {
            const result = await this.kecamatanService.getAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kecamatans retrieved',
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
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getKecamatanDetail(@Query() dto: GetKecamatanDetailDto): Promise<ResponseDto> {
        try {
            const kecamatan = await this.kecamatanService.getById(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Kecamatan detail retrieved',
                data: kecamatan,
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
