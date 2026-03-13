import { Controller, Get, Param, ParseIntPipe, UseGuards, Req, HttpStatus, HttpException, Body, Post, Put, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import type { Express, Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbWithRelationsDto } from '../../application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from '../../application/asb/dto/find_all_asb.dto';
import { CreateAsbStoreIndexDto } from '../../application/asb/dto/create_asb_store_index.dto';
import { UpdateAsbStoreIndexDto } from '../../application/asb/dto/update_asb_store_index.dto';
import { DeleteAsbDto } from '../../application/asb/dto/delete_asb.dto';
import { UpdateAsbStoreLantaiDto } from '../../application/asb/dto/update_asb_store_lantai.dto';
import { StoreBpsDto } from './dto/store_bps.dto';
import { StoreBpnsDto } from './dto/store_bpns.dto';
import { StoreRekeningDto } from './dto/store_rekening.dto';
import { VerifyLantaiDto } from './dto/verify_lantai.dto';
import { VerifyBpnsDto } from './dto/verify_bpns.dto';
import { VerifyRekeningDto } from './dto/verify_rekening.dto';
import { UserContext } from '../../common/types/user-context.type';
import { StoreVerifDto } from './dto/store_verif.dto';
import { GetAsbByMonthYearDto } from 'src/application/asb/dto/get_asb_by_moth_year.dto';
import { VerifyBpsDto } from './dto/verify_bps.dto';
import { VerifyPekerjaanDto } from './dto/verify_pekerjaan.dto';
import { VerifyDto } from './dto/verify.dto';
import { RejectDto } from './dto/reject.dto';

@Controller('asb')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsbController {
    constructor(private readonly asbService: AsbService) { }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(
        @Query() dto: FindAllAsbDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.findAll(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB list retrieved successfully',
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

    @Get('id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(
        @Query('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: AsbWithRelationsDto }> {
        const user = req.user as UserContext;

        const asb = await this.asbService.findById(id, user.idOpd, user.roles);

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'ASB retrieved successfully',
            data: asb as unknown as AsbWithRelationsDto,
        };
    }

    @Get('by-month-year')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getAsbByMonthYear(
        @Query() dto: GetAsbByMonthYearDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: { date: string; count: number }[] }> {
        const user = req.user as UserContext;

        const data = await this.asbService.getAsbByMonthYear(dto, user.idOpd, user.roles);

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'ASB retrieved successfully',
            data,
        };
    }

    @Get('by-month-year-status')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getAsbByMonthYearStatus(
        @Query() dto: GetAsbByMonthYearDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: { asbStatus: string; amount: number }[] }> {
        const user = req.user as UserContext;

        const data = await this.asbService.getAsbByMonthYearStatus(dto, user.idOpd, user.roles);

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'ASB status summary retrieved successfully',
            data,
        };
    }

    @Post('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeIndex(
        @Body() dto: CreateAsbStoreIndexDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            console.log("Dto: ", dto);
            const user = req.user as UserContext;
            const result = await this.asbService.createIndex(dto, user.idOpd, user.roles, user.username);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'ASB created successfully',
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

    @Put('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async updateIndex(
        @Body() dto: UpdateAsbStoreIndexDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.updateIndex(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB updated successfully',
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

    @Delete()
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async deleteAsb(
        @Body() dto: DeleteAsbDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.deleteAsb(dto.id_asb, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB deleted successfully',
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

    @Put('store-lantai')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeLantai(
        @Body() dto: UpdateAsbStoreLantaiDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.storeLantai(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB lantai stored successfully',
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

    @Put('store-bps')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeBps(
        @Body() dto: StoreBpsDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.storeBps(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB BPS stored successfully',
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

    @Put('store-bpns')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeBpns(
        @Body() dto: StoreBpnsDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.storeBpns(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB BPNS stored successfully',
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

    @Put('store-rekening')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeRekening(
        @Body() dto: StoreRekeningDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.storeRekening(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB rekening stored successfully',
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

    @Put('store-verif')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeVerif(
        @Body() dto: StoreVerifDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.storeVerif(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB verif stored successfully',
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

    @Put('verify-lantai')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyLantai(
        @Body() dto: VerifyLantaiDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.verifyLantai(dto, user.userId, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB lantai verified successfully',
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
                        message = resObj.message.jsonMessage.join(', ');
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

    @Put('verify-bps')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBps(
        @Body() dto: VerifyBpsDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.verifyBps(dto, user.userId, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB BPS verified successfully',
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


    @Put('verify-bpns')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBpns(
        @Body() dto: VerifyBpnsDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.verifyBpns(dto, user.userId, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB BPNS verified successfully',
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

    @Put('verify-rekening')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyRekening(
        @Body() dto: VerifyRekeningDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.verifyRekening(dto, user.userId, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB rekening verified successfully',
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

    @Put('verify-pekerjaan')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyPekerjaan(
        @Body() dto: VerifyPekerjaanDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.verifyPekerjaan(dto, user.userId, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB pekerjaan verified successfully',
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

    @Put('verify')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verify(
        @Body() dto: VerifyDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.verify(dto.id_asb, user.userId, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB verified successfully',
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

    @Put('reject')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async reject(
        @Body() dto: RejectDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.reject(dto.id_asb, dto.reject_reason, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB rejected successfully',
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
}
