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
    ParseIntPipe,
    UploadedFile,
    UseInterceptors,
    Res,
    StreamableFile,
} from '@nestjs/common';
import type { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { HspkService } from '../../domain/hspk/hspk.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateHspkDto } from './dto/create_hspk.dto';
import { UpdateHspkDto } from './dto/update_hspk.dto';
import { GetHspkDto } from './dto/get_hspk.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('hspks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HspkController {
    constructor(private readonly hspkService: HspkService) {}

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Post('bulk')
    @UseInterceptors(FileInterceptor('file'))
    async createBulk(@UploadedFile() file: Express.Multer.File): Promise<ResponseDto> {
        try {
            const result = await this.hspkService.createBulk(file);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: `${result.created} HSPK record(s) created successfully`,
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

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Get('template')
    async downloadTemplate(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        try {
            const { buffer, filename } = await this.hspkService.downloadTemplate();

            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            });

            return new StreamableFile(buffer);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Post()
    async create(@Body() dto: CreateHspkDto): Promise<ResponseDto> {
        try {
            const hspk = await this.hspkService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'HSPK created successfully',
                data: hspk,
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

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Put()
    async update(@Body() dto: UpdateHspkDto): Promise<ResponseDto> {
        try {
            const hspk = await this.hspkService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'HSPK updated successfully',
                data: hspk,
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

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @Delete()
    async delete(@Body() dto: { id: number }): Promise<ResponseDto> {
        try {
            const deleted = await this.hspkService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'HSPK deleted successfully',
                data: { deleted },
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

    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPD, Role.VERIFIKATOR)
    @Get()
    async findAll(@Query() dto: GetHspkDto): Promise<ResponseDto> {
        try {
            const result = await this.hspkService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'HSPK list retrieved successfully',
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

    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPD, Role.VERIFIKATOR)
    @Get('detail')
    async findById(@Query('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try {
            const hspk = await this.hspkService.findById(id);

            if (!hspk) {
                return {
                    status: 'error',
                    responseCode: HttpStatus.NOT_FOUND,
                    message: `HSPK with id ${id} not found`,
                    data: null,
                };
            }

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'HSPK retrieved successfully',
                data: hspk,
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

    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPD, Role.VERIFIKATOR)
    @Get('by-no-mata-pembayaran')
    async findByNoMataPembayaran(
        @Query('no_mata_pembayaran') no_mata_pembayaran: string,
        @Query('tahun_anggaran', ParseIntPipe) tahun_anggaran: number,
    ): Promise<ResponseDto> {
        try {
            const hspk = await this.hspkService.findByNoMataPembayaranAndTahun(
                no_mata_pembayaran,
                tahun_anggaran,
            );

            if (!hspk) {
                return {
                    status: 'error',
                    responseCode: HttpStatus.NOT_FOUND,
                    message: `HSPK with no_mata_pembayaran ${no_mata_pembayaran} and tahun_anggaran ${tahun_anggaran} not found`,
                    data: null,
                };
            }

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'HSPK retrieved successfully',
                data: hspk,
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

    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPD, Role.VERIFIKATOR)
    @Get('by-ruang-lingkup')
    async findByRuangLingkup(
        @Query('id_ruang_lingkup', ParseIntPipe) id_ruang_lingkup: number,
        @Query('tahun_anggaran') tahunAnggaranRaw?: string,
    ): Promise<ResponseDto> {
        try {
            let tahun_anggaran: number | undefined;
            if (tahunAnggaranRaw !== undefined && tahunAnggaranRaw !== '') {
                const parsed = Number.parseInt(tahunAnggaranRaw, 10);
                tahun_anggaran = Number.isNaN(parsed) ? undefined : parsed;
            }
            const hspks = await this.hspkService.findByRuangLingkup(
                id_ruang_lingkup,
                tahun_anggaran,
            );

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'HSPK list by ruang lingkup retrieved successfully',
                data: hspks,
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
