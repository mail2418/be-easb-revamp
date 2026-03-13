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
import { AsbKomponenBangunanStdService } from '../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateAsbKomponenBangunanStdDto } from './dto/create_asb_komponen_bangunan_std.dto';
import { UpdateAsbKomponenBangunanStdDto } from './dto/update_asb_komponen_bangunan_std.dto';
import { DeleteAsbKomponenBangunanStdDto } from './dto/delete_asb_komponen_bangunan_std.dto';
import { GetAsbKomponenBangunanStdsDto } from './dto/get_asb_komponen_bangunan_stds.dto';
import { GetAsbKomponenBangunanStdDetailDto } from './dto/get_asb_komponen_bangunan_std_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-komponen-bangunans')
@Roles(Role.SUPERADMIN)
export class AsbKomponenBangunanController {
    constructor(private readonly service: AsbKomponenBangunanStdService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbKomponenBangunanStdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbKomponenBangunan created',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put()
    @Roles(Role.SUPERADMIN)
    async update(@Body() dto: UpdateAsbKomponenBangunanStdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunan updated',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete()
    @Roles(Role.SUPERADMIN)
    async delete(@Body() dto: DeleteAsbKomponenBangunanStdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.delete(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunan deleted',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getAll(@Query() dto: GetAsbKomponenBangunanStdsDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunans retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('detail')
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getDetail(@Query() dto: GetAsbKomponenBangunanStdDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getDetail(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunan detail retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: any): ResponseDto {
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
