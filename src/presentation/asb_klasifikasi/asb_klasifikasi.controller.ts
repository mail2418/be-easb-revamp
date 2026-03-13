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
import { AsbKlasifikasiService } from '../../domain/asb_klasifikasi/asb_klasifikasi.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateAsbKlasifikasiDto } from './dto/create_asb_klasifikasi.dto';
import { UpdateAsbKlasifikasiDto } from './dto/update_asb_klasifikasi.dto';
import { DeleteAsbKlasifikasiDto } from './dto/delete_asb_klasifikasi.dto';
import { GetAsbKlasifikasisDto } from './dto/get_asb_klasifikasis.dto';
import { GetAsbKlasifikasiDetailDto } from './dto/get_asb_klasifikasi_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-klasifikasis')
@Roles(Role.SUPERADMIN)
export class AsbKlasifikasiController {
    constructor(private readonly asbKlasifikasiService: AsbKlasifikasiService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbKlasifikasiDto): Promise<ResponseDto> {
        try {
            const asbKlasifikasi = await this.asbKlasifikasiService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbKlasifikasi created',
                data: asbKlasifikasi,
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
    async updateAsbKlasifikasi(@Body() dto: UpdateAsbKlasifikasiDto): Promise<ResponseDto> {
        try {
            const asbKlasifikasi = await this.asbKlasifikasiService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKlasifikasi updated',
                data: asbKlasifikasi,
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
    async deleteAsbKlasifikasi(@Body() dto: DeleteAsbKlasifikasiDto): Promise<ResponseDto> {
        try {
            const deleted = await this.asbKlasifikasiService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKlasifikasi deleted',
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
    @Roles(Role.SUPERADMIN)
    async getAsbKlasifikasis(@Query() dto: GetAsbKlasifikasisDto): Promise<ResponseDto> {
        try {
            const result = await this.asbKlasifikasiService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKlasifikasis retrieved',
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
    @Roles(Role.SUPERADMIN)
    async getAsbKlasifikasiDetail(@Query() dto: GetAsbKlasifikasiDetailDto): Promise<ResponseDto> {
        try {
            const asbKlasifikasi = await this.asbKlasifikasiService.findById(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKlasifikasi detail retrieved',
                data: asbKlasifikasi,
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
