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
import { AsbLantaiService } from '../../domain/asb_lantai/asb_lantai.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateAsbLantaiDto } from './dto/create_asb_lantai.dto';
import { UpdateAsbLantaiDto } from './dto/update_asb_lantai.dto';
import { DeleteAsbLantaiDto } from './dto/delete_asb_lantai.dto';
import { GetAsbLantaisDto } from './dto/get_asb_lantais.dto';
import { GetAsbLantaiDetailDto } from './dto/get_asb_lantai_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-lantai')
@Roles(Role.SUPERADMIN)
export class AsbLantaiController {
    constructor(private readonly asbLantaiService: AsbLantaiService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbLantaiDto): Promise<ResponseDto> {
        try {
            const asbLantai = await this.asbLantaiService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbLantai created',
                data: asbLantai,
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
    async updateAsbLantai(@Body() dto: UpdateAsbLantaiDto): Promise<ResponseDto> {
        try {
            const asbLantai = await this.asbLantaiService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbLantai updated',
                data: asbLantai,
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
    async deleteAsbLantai(@Body() dto: DeleteAsbLantaiDto): Promise<ResponseDto> {
        try {
            const deleted = await this.asbLantaiService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbLantai deleted',
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
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getAsbLantais(@Query() dto: GetAsbLantaisDto): Promise<ResponseDto> {
        try {
            const result = await this.asbLantaiService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbLantais retrieved',
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
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getAsbLantaiDetail(@Query() dto: GetAsbLantaiDetailDto): Promise<ResponseDto> {
        try {
            const asbLantai = await this.asbLantaiService.findById(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbLantai detail retrieved',
                data: asbLantai,
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