import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Query,
    Request,
    HttpStatus,
    HttpException,
    ParseIntPipe,
} from '@nestjs/common';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { FindAllUsulanJalanDto } from '../../application/usulan_jalan/dto/find_all_usulan_jalan.dto';
import { StoreInformasiUsulanJalanDto } from './dto/store_informasi_usulan_jalan.dto';
import { StoreRuangLingkupUsulanJalanDto } from './dto/store_ruang_lingkup_usulan_jalan.dto';
import { UpdateUsulanJalanDto } from './dto/update_usulan_jalan.dto';
import { DeleteUsulanJalanDto } from './dto/delete_usulan_jalan.dto';
import { VerifyInformasiUsulanJalanDto } from './dto/verify_informasi_usulan_jalan.dto';
import { VerifyRuangLingkupUsulanJalanDto } from './dto/verify_ruang_lingkup_usulan_jalan.dto';
import { VerifyUsulanJalanDto } from './dto/verify_usulan_jalan.dto';
import { RejectUsulanJalanDto } from './dto/reject_usulan_jalan.dto';
import { ForbiddenException } from '@nestjs/common';
import { GetUsulanJalanAnalyticsFilterDto } from '../../application/usulan_jalan/dto/get_usulan_jalan_analytics_filter.dto';

interface ResponseDto {
    status: string;
    responseCode: number;
    message: string;
    data: any;
}

@Controller('usulan-jalan')
export class UsulanJalanController {
    constructor(private readonly usulanJalanService: UsulanJalanService) { }

    @Get('analytics')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getAnalytics(
        @Query() filter: GetUsulanJalanAnalyticsFilterDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.getAnalytics(userIdOpd, userRoles, filter);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan analytics retrieved successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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
    async findAll(
        @Query() dto: FindAllUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.findAll(dto, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan list retrieved successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Get('id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(
        @Query('id', ParseIntPipe) id: number,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.findById(id, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan retrieved successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Post('store-informasi')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeInformasi(
        @Body() dto: StoreInformasiUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.storeInformasi(dto, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Informasi Usulan Jalan stored successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('store-ruang-lingkup')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeRuangLingkup(
        @Body() dto: StoreRuangLingkupUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.storeRuangLingkup(dto, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Ruang Lingkup Usulan Jalan stored successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('update')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async update(
        @Body() dto: UpdateUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.updateUsulanJalan(dto, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan updated successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async delete(
        @Body() dto: DeleteUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.deleteUsulanJalan(dto.idUsulanJalan, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan deleted successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('verify-informasi')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyInformasi(
        @Body() dto: VerifyInformasiUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userId = req.user?.id?.toString() || null;
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.verifyInformasi(dto, userId, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Informasi Usulan Jalan verified successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('verify-ruang-lingkup')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyRuangLingkup(
        @Body() dto: VerifyRuangLingkupUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userId = req.user?.id?.toString() || null;
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.verifyRuangLingkup(dto, userId, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Ruang Lingkup Usulan Jalan verified successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('verify-adbang')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyAdbang(
        @Body() dto: VerifyUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userId = req.user?.id?.toString() || null;
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.verifyAdbang(dto.idUsulanJalan, userId, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan approved by ADBANG successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('verify-bpkad')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBpkad(
        @Body() dto: VerifyUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userId = req.user?.id?.toString() || null;
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.verifyBpkad(dto.idUsulanJalan, userId, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan approved by BPKAD successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('verify-bappeda')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBappeda(
        @Body() dto: VerifyUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userId = req.user?.id?.toString() || null;
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.verifyBappeda(dto.idUsulanJalan, userId, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan approved by BAPPEDA successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Put('reject')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async reject(
        @Body() dto: RejectUsulanJalanDto,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userId = req.user?.id?.toString() || null;
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            if (!userId) {
                throw new ForbiddenException('User ID is required');
            }

            const result = await this.usulanJalanService.reject(dto.idUsulanJalan, dto.rejectReason, userId, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Usulan Jalan rejected successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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

    @Get('reject-info')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getRejectInfo(
        @Query('id', ParseIntPipe) id: number,
        @Request() req,
    ): Promise<ResponseDto> {
        try {
            const userRoles = req.user?.roles || [];
            const userIdOpd = req.user?.idOpd || null;

            const result = await this.usulanJalanService.getRejectInfo(id, userIdOpd, userRoles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Reject verifikator info retrieved successfully',
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
                    message = Array.isArray(resObj.message)
                        ? resObj.message.join(', ')
                        : resObj.message ?? 'Error';
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


