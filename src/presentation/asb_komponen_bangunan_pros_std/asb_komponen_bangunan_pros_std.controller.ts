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
import { AsbKomponenBangunanProsStdService } from '../../domain/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateAsbKomponenBangunanProsStdDto } from './dto/create_asb_komponen_bangunan_pros_std.dto';
import { UpdateAsbKomponenBangunanProsStdDto } from './dto/update_asb_komponen_bangunan_pros_std.dto';
import { DeleteAsbKomponenBangunanProsStdDto } from './dto/delete_asb_komponen_bangunan_pros_std.dto';
import { GetAsbKomponenBangunanProsStdListDto } from './dto/get_asb_komponen_bangunan_pros_std_list.dto';
import { GetAsbKomponenBangunanProsStdDetailDto } from './dto/get_asb_komponen_bangunan_pros_std_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-komponen-bangunan-pros-std')
@Roles(Role.SUPERADMIN)
export class AsbKomponenBangunanProsStdController {
    constructor(private readonly service: AsbKomponenBangunanProsStdService) { }

    @Post()
    @Roles(Role.SUPERADMIN)
    async create(@Body() dto: CreateAsbKomponenBangunanProsStdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbKomponenBangunanProsStd created',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put()
    @Roles(Role.SUPERADMIN)
    async update(@Body() dto: UpdateAsbKomponenBangunanProsStdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsStd updated',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete()
    @Roles(Role.SUPERADMIN)
    async delete(@Body() dto: DeleteAsbKomponenBangunanProsStdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.delete(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsStd deleted',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    @Roles(Role.SUPERADMIN)
    async getAll(@Query() dto: GetAsbKomponenBangunanProsStdListDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsStd list retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('detail')
    @Roles(Role.SUPERADMIN)
    async getDetail(@Query() dto: GetAsbKomponenBangunanProsStdDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getDetail(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsStd detail retrieved',
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
