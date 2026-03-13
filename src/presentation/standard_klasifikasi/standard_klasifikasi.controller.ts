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
import { StandardKlasifikasiService } from '../../domain/standard_klasifikasi/standard_klasifikasi.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateStandardKlasifikasiDto } from './dto/create_standard_klasifikasi.dto';
import { UpdateStandardKlasifikasiDto } from './dto/update_standard_klasifikasi.dto';
import { DeleteStandardKlasifikasiDto } from './dto/delete_standard_klasifikasi.dto';
import { GetStandardKlasifikasisDto } from './dto/get_standard_klasifikasis.dto';
import { GetStandardKlasifikasiDetailDto } from './dto/get_standard_klasifikasi_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('standard-klasifikasis')
@Roles(Role.SUPERADMIN)
export class StandardKlasifikasiController {
    constructor(private readonly standardKlasifikasiService: StandardKlasifikasiService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateStandardKlasifikasiDto): Promise<ResponseDto> {
        try {
            const standardKlasifikasi = await this.standardKlasifikasiService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Standard Klasifikasi created',
                data: standardKlasifikasi,
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
    async update(@Body() dto: UpdateStandardKlasifikasiDto): Promise<ResponseDto> {
        try {
            const standardKlasifikasi = await this.standardKlasifikasiService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Standard Klasifikasi updated',
                data: standardKlasifikasi,
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
    async deleteStandardKlasifikasi(@Body() dto: DeleteStandardKlasifikasiDto): Promise<ResponseDto> {
        try {
            const deleted = await this.standardKlasifikasiService.delete(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Standard Klasifikasi deleted',
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
    async getStandardKlasifikasis(@Query() dto: GetStandardKlasifikasisDto): Promise<ResponseDto> {
        try {
            const result = await this.standardKlasifikasiService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Standard Klasifikasis retrieved',
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
    async getStandardKlasifikasiDetail(@Query() dto: GetStandardKlasifikasiDetailDto): Promise<ResponseDto> {
        try {
            const standardKlasifikasi = await this.standardKlasifikasiService.findById(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Standard Klasifikasi detail retrieved',
                data: standardKlasifikasi,
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
