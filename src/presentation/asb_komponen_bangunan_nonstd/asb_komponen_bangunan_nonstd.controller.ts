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
import { AsbKomponenBangunanNonstdService } from '../../domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateAsbKomponenBangunanNonstdDto } from './dto/create_asb_komponen_bangunan_nonstd.dto';
import { UpdateAsbKomponenBangunanNonstdDto } from './dto/update_asb_komponen_bangunan_nonstd.dto';
import { DeleteAsbKomponenBangunanNonstdDto } from './dto/delete_asb_komponen_bangunan_nonstd.dto';
import { GetAsbKomponenBangunanNonstdsDto } from './dto/get_asb_komponen_bangunan_nonstds.dto';
import { GetAsbKomponenBangunanNonstdDetailDto } from './dto/get_asb_komponen_bangunan_nonstd_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-komponen-bangunan-nonstds')
@Roles(Role.SUPERADMIN)
export class AsbKomponenBangunanNonstdController {
    constructor(private readonly service: AsbKomponenBangunanNonstdService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbKomponenBangunanNonstdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbKomponenBangunanNonstd created',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put()
    @Roles(Role.SUPERADMIN)
    async update(@Body() dto: UpdateAsbKomponenBangunanNonstdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanNonstd updated',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete()
    @Roles(Role.SUPERADMIN)
    async delete(@Body() dto: DeleteAsbKomponenBangunanNonstdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.delete(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanNonstd deleted',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getAll(@Query() dto: GetAsbKomponenBangunanNonstdsDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanNonstds retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('detail')
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getDetail(@Query() dto: GetAsbKomponenBangunanNonstdDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getDetail(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanNonstd detail retrieved',
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
