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
    Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateVerifikatorDto } from '../../application/verifikator/dto/create_verifikator.dto';
import { UpdateVerifikatorDto } from '../../application/verifikator/dto/update_verifikator.dto';
import { DeleteVerifikatorDto } from '../../application/verifikator/dto/delete_verifikator.dto';
import { GetVerifikatorsDto } from '../../application/verifikator/dto/get_verifikators.dto';
import { GetVerifikatorDetailDto } from '../../application/verifikator/dto/get_verifikator_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';
import { UserContext } from 'src/common/types/user-context.type';

@Controller('verifikators')
export class VerifikatorController {
    constructor(private readonly verifikatorService: VerifikatorService) { }

    @Get('check-verifikator-type')
    @Roles(Role.VERIFIKATOR)
    async checkVerifikatorType(
        @Req() req: Request
    ): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const result = await this.verifikatorService.checkVerifikatorType(Number(user.userId));

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Verifikator type retrieved',
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

    @Post()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async createVerifikator(@Body() dto: CreateVerifikatorDto): Promise<ResponseDto> {
        try {
            const verifikator = await this.verifikatorService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Verifikator created',
                data: verifikator,
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async updateVerifikator(@Body() dto: UpdateVerifikatorDto): Promise<ResponseDto> {
        try {
            const { id, ...updateData } = dto;
            const verifikator = await this.verifikatorService.update(id, updateData);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Verifikator updated',
                data: verifikator,
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async deleteVerifikator(@Body() dto: DeleteVerifikatorDto): Promise<ResponseDto> {
        try {
            const deleted = await this.verifikatorService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Verifikator deleted',
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async getVerifikators(@Query() dto: GetVerifikatorsDto): Promise<ResponseDto> {
        try {
            const result = await this.verifikatorService.findAll(dto.page, dto.amount);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Verifikators retrieved',
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async getVerifikatorDetail(@Query() dto: GetVerifikatorDetailDto): Promise<ResponseDto> {
        try {
            const verifikator = await this.verifikatorService.findById(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Verifikator detail retrieved',
                data: verifikator,
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
