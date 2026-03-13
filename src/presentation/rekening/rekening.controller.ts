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
import { RekeningService } from '../../domain/rekening/rekening.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateRekeningDto } from './dto/create_rekening.dto';
import { UpdateRekeningDto } from './dto/update_rekening.dto';
import { DeleteRekeningDto } from './dto/delete_rekening.dto';
import { GetRekeningsDto } from './dto/get_rekenings.dto';
import { GetRekeningDetailDto } from './dto/get_rekening_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('rekenings')
@Roles(Role.SUPERADMIN)
export class RekeningController {
    constructor(private readonly rekeningService: RekeningService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateRekeningDto): Promise<ResponseDto> {
        try {
            const rekening = await this.rekeningService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Rekening created',
                data: rekening,
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
    async updateRekening(@Body() dto: UpdateRekeningDto): Promise<ResponseDto> {
        try {
            const rekening = await this.rekeningService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rekening updated',
                data: rekening,
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
    async deleteRekening(@Body() dto: DeleteRekeningDto): Promise<ResponseDto> {
        try {
            const deleted = await this.rekeningService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rekening deleted',
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
    async getRekenings(@Query() dto: GetRekeningsDto): Promise<ResponseDto> {
        try {
            const result = await this.rekeningService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rekenings retrieved',
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
    async getRekeningDetail(@Query() dto: GetRekeningDetailDto): Promise<ResponseDto> {
        try {
            const rekening = await this.rekeningService.findById(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rekening detail retrieved',
                data: rekening,
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
