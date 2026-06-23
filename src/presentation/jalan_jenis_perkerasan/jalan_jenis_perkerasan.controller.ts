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
import { JalanJenisPerkerasanService } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateJalanJenisPerkerasanDto } from './dto/create_jalan_jenis_perkerasan.dto';
import { UpdateJalanJenisPerkerasanDto } from './dto/update_jalan_jenis_perkerasan.dto';
import { DeleteJalanJenisPerkerasanDto } from './dto/delete_jalan_jenis_perkerasan.dto';
import { GetJalanJenisPerkerasanDto } from './dto/get_jalan_jenis_perkerasan.dto';
import { GetJalanJenisPerkerasanDetailDto } from './dto/get_jalan_jenis_perkerasan_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('jalan-jenis-perkerasan')
@Roles(Role.SUPERADMIN)
export class JalanJenisPerkerasanController {
    constructor(private readonly jalanJenisPerkerasanService: JalanJenisPerkerasanService) {}

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanJenisPerkerasanDto): Promise<ResponseDto> {
        try {
            const jalanJenisPerkerasan = await this.jalanJenisPerkerasanService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Jalan Jenis Perkerasan created',
                data: jalanJenisPerkerasan,
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
    async updateJalanJenisPerkerasan(
        @Body() dto: UpdateJalanJenisPerkerasanDto,
    ): Promise<ResponseDto> {
        try {
            const jalanJenisPerkerasan = await this.jalanJenisPerkerasanService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Perkerasan updated',
                data: jalanJenisPerkerasan,
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
    async deleteJalanJenisPerkerasan(
        @Body() dto: DeleteJalanJenisPerkerasanDto,
    ): Promise<ResponseDto> {
        try {
            const deleted = await this.jalanJenisPerkerasanService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Perkerasan deleted',
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
    async getJalanJenisPerkerasans(@Query() dto: GetJalanJenisPerkerasanDto): Promise<ResponseDto> {
        try {
            const result = await this.jalanJenisPerkerasanService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Perkerasan list retrieved',
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
    async getJalanJenisPerkerasanDetail(
        @Query() dto: GetJalanJenisPerkerasanDetailDto,
    ): Promise<ResponseDto> {
        try {
            const jalanJenisPerkerasan = await this.jalanJenisPerkerasanService.findById(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Jenis Perkerasan detail retrieved',
                data: jalanJenisPerkerasan,
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
