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
import { JalanJenisPemeliharaanService } from '../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateJalanJenisPemeliharaanDto } from './dto/create_jalan_jenis_pemeliharaan.dto';
import { UpdateJalanJenisPemeliharaanDto } from './dto/update_jalan_jenis_pemeliharaan.dto';
import { DeleteJalanJenisPemeliharaanDto } from './dto/delete_jalan_jenis_pemeliharaan.dto';
import { GetJalanJenisPemeliharaanDto } from './dto/get_jalan_jenis_pemeliharaan.dto';
import { GetJalanJenisPemeliharaanDetailDto } from './dto/get_jalan_jenis_pemeliharaan_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('jalan-jenis-pemeliharaan')
@Roles(Role.SUPERADMIN)
export class JalanJenisPemeliharaanController {
    constructor(private readonly jalanJenisPemeliharaanService: JalanJenisPemeliharaanService) {}

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try {
            const jalanJenisPemeliharaan = await this.jalanJenisPemeliharaanService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Jalan Jenis Pemeliharaan created',
                data: jalanJenisPemeliharaan,
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
    async update(@Body() dto: UpdateJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try {
            const jalanJenisPemeliharaan = await this.jalanJenisPemeliharaanService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Pemeliharaan updated',
                data: jalanJenisPemeliharaan,
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
    async delete(@Body() dto: DeleteJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanJenisPemeliharaanService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Pemeliharaan deleted',
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
    async findAll(@Query() dto: GetJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanJenisPemeliharaanService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Pemeliharaan list retrieved',
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
    async findById(@Query() dto: GetJalanJenisPemeliharaanDetailDto): Promise<ResponseDto> {
        try {
            const jalanJenisPemeliharaan = await this.jalanJenisPemeliharaanService.findById(
                dto.id,
            );

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Pemeliharaan detail retrieved',
                data: jalanJenisPemeliharaan,
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
