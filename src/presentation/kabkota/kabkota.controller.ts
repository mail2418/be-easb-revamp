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
import { KabKotaService } from '../../domain/kabkota/kabkota.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateKabKotaDto } from './dto/create_kabkota.dto';
import { UpdateKabKotaDto } from './dto/update_kabkota.dto';
import { DeleteKabKotaDto } from './dto/delete_kabkota.dto';
import { GetKabKotasDto } from './dto/get_kabkotas.dto';
import { GetKabKotaDetailDto } from './dto/get_kabkota_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('kabkotas')
@Roles(Role.SUPERADMIN)
export class KabKotaController {
    constructor(private readonly kabKotaService: KabKotaService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateKabKotaDto): Promise<ResponseDto> {
        try {
            const kabkota = await this.kabKotaService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'KabKota created',
                data: kabkota,
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
    async updateKabKota(@Body() dto: UpdateKabKotaDto): Promise<ResponseDto> {
        try {
            const kabkota = await this.kabKotaService.updateKabKota(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'KabKota updated',
                data: kabkota,
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
    async deleteKabKota(@Body() dto: DeleteKabKotaDto): Promise<ResponseDto> {
        try {
            const deleted = await this.kabKotaService.deleteKabKota(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'KabKota deleted',
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
    async getKabKotas(@Query() dto: GetKabKotasDto): Promise<ResponseDto> {
        try {
            const result = await this.kabKotaService.getKabKotas(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'KabKotas retrieved',
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
    async getKabKotaDetail(@Query() dto: GetKabKotaDetailDto): Promise<ResponseDto> {
        try {
            const kabkota = await this.kabKotaService.getKabKotaDetail(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'KabKota detail retrieved',
                data: kabkota,
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
