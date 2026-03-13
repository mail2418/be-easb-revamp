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
import { SatuanService } from '../../domain/satuan/satuan.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateSatuanDto } from './dto/create_satuan.dto';
import { UpdateSatuanDto } from './dto/update_satuan.dto';
import { DeleteSatuanDto } from './dto/delete_satuan.dto';
import { GetSatuansDto } from './dto/get_satuans.dto';
import { GetSatuanDetailDto } from './dto/get_satuan_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('satuans')
@Roles(Role.SUPERADMIN)
export class SatuanController {
    constructor(private readonly satuanService: SatuanService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateSatuanDto): Promise<ResponseDto> {
        try {
            const satuan = await this.satuanService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Satuan created',
                data: satuan,
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
    async updateSatuan(@Body() dto: UpdateSatuanDto): Promise<ResponseDto> {
        try {
            const satuan = await this.satuanService.updateSatuan(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Satuan updated',
                data: satuan,
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
    async deleteSatuan(@Body() dto: DeleteSatuanDto): Promise<ResponseDto> {
        try {
            const deleted = await this.satuanService.deleteSatuan(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Satuan deleted',
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
    async getSatuans(@Query() dto: GetSatuansDto): Promise<ResponseDto> {
        try {
            const result = await this.satuanService.getSatuans(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Satuans retrieved',
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
    async getSatuanDetail(@Query() dto: GetSatuanDetailDto): Promise<ResponseDto> {
        try {
            const satuan = await this.satuanService.getSatuanDetail(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Satuan detail retrieved',
                data: satuan,
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
