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
    Param,
    Query,
} from '@nestjs/common';
import { AsbFungsiRuangService } from '../../domain/asb_fungsi_ruang/asb_fungsi_ruang.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateAsbFungsiRuangDto } from './dto/create_asb_fungsi_ruang.dto';
import { UpdateAsbFungsiRuangDto } from './dto/update_asb_fungsi_ruang.dto';
import { DeleteAsbFungsiRuangDto } from './dto/delete_asb_fungsi_ruang.dto';
import { GetAsbFungsiRuangsDto } from './dto/get_asb_fungsi_ruangs.dto';
import { GetAsbFungsiRuangDetailDto } from './dto/get_asb_fungsi_ruang_detail.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-fungsi-ruangs')
@Roles(Role.SUPERADMIN)
export class AsbFungsiRuangController {
    constructor(private readonly asbFungsiRuangService: AsbFungsiRuangService) {}

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbFungsiRuangDto): Promise<ResponseDto> {
        try {
            const asbFungsiRuang = await this.asbFungsiRuangService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbFungsiRuang created',
                data: asbFungsiRuang,
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
    async updateAsbFungsiRuang(@Body() dto: UpdateAsbFungsiRuangDto): Promise<ResponseDto> {
        try {
            const asbFungsiRuang = await this.asbFungsiRuangService.update(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbFungsiRuang updated',
                data: asbFungsiRuang,
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
    async deleteAsbFungsiRuang(@Body() dto: DeleteAsbFungsiRuangDto): Promise<ResponseDto> {
        try {
            const deleted = await this.asbFungsiRuangService.delete(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbFungsiRuang deleted',
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
    async getAsbFungsiRuangs(@Query() dto: GetAsbFungsiRuangsDto): Promise<ResponseDto> {
        try {
            const result = await this.asbFungsiRuangService.findAll(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbFungsiRuangs retrieved',
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
    async getAsbFungsiRuangDetail(@Query() dto: GetAsbFungsiRuangDetailDto): Promise<ResponseDto> {
        try {
            const asbFungsiRuang = await this.asbFungsiRuangService.findById(dto.id);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbFungsiRuang detail retrieved',
                data: asbFungsiRuang,
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
