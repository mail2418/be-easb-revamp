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
import { ProvinceService } from '../../domain/provinces/province.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateProvinceDto } from './dto/create_province.dto';
import { UpdateProvinceDto } from './dto/update_province.dto';
import { DeleteProvinceDto } from './dto/delete_province.dto';
import { GetProvincesDto } from './dto/get_provinces.dto';
import { GetProvinceDetailDto } from './dto/get_province_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('provinces')
@Roles(Role.SUPERADMIN)
export class ProvinceController {
    constructor(private readonly provinceService: ProvinceService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateProvinceDto): Promise<ResponseDto> {
        try {
            const province = await this.provinceService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Province created',
                data: province,
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
    @Roles(Role.SUPERADMIN)
    async updateProvince(@Body() dto: UpdateProvinceDto): Promise<ResponseDto> {
        try {
            const province = await this.provinceService.updateProvince(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Province updated',
                data: province,
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
    @Roles(Role.SUPERADMIN)
    async deleteProvince(@Body() dto: DeleteProvinceDto): Promise<ResponseDto> {
        try {
            const deleted = await this.provinceService.deleteProvince(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Province deleted',
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
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getProvinces(@Query() dto: GetProvincesDto): Promise<ResponseDto> {
        try {
            const result = await this.provinceService.getProvinces(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Provinces retrieved',
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
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getProvinceDetail(@Query() dto: GetProvinceDetailDto): Promise<ResponseDto> {
        try {
            const province = await this.provinceService.getProvinceDetail(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Province detail retrieved',
                data: province,
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
