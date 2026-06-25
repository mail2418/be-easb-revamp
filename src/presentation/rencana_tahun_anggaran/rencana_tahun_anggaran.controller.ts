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
import { RencanaTahunAnggaranService } from '../../domain/rencana_tahun_anggaran/rencana_tahun_anggaran.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateRencanaTahunAnggaranDto } from './dto/create_rencana_tahun_anggaran.dto';
import { UpdateRencanaTahunAnggaranDto } from './dto/update_rencana_tahun_anggaran.dto';
import { DeleteRencanaTahunAnggaranDto } from './dto/delete_rencana_tahun_anggaran.dto';
import { GetRencanaTahunAnggaransDto } from './dto/get_rencana_tahun_anggarans.dto';
import { GetRencanaTahunAnggaranDetailDto } from './dto/get_rencana_tahun_anggaran_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('rencana-tahun-anggarans')
export class RencanaTahunAnggaranController {
    constructor(private readonly service: RencanaTahunAnggaranService) {}

    private handleError(error: unknown): ResponseDto {
        if (error instanceof HttpException) {
            const status = error.getStatus();
            const response = error.getResponse();
            let message: string;
            if (typeof response === 'string') {
                message = response;
            } else {
                const resObj = response as { message?: string | string[] };
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
            }
            return { status: 'error', responseCode: status, message, data: null };
        }
        return {
            status: 'error',
            responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            data: null,
        };
    }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateRencanaTahunAnggaranDto): Promise<ResponseDto> {
        try {
            const row = await this.service.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Rencana tahun anggaran created',
                data: row,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateRencanaTahunAnggaranDto): Promise<ResponseDto> {
        try {
            const row = await this.service.updateRencanaTahunAnggaran(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rencana tahun anggaran updated',
                data: row,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async delete(@Body() dto: DeleteRencanaTahunAnggaranDto): Promise<ResponseDto> {
        try {
            const deleted = await this.service.deleteRencanaTahunAnggaran(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rencana tahun anggaran deleted',
                data: deleted,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getList(@Query() dto: GetRencanaTahunAnggaransDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getRencanaTahunAnggarans(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rencana tahun anggaran retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('detail')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getDetail(@Query() dto: GetRencanaTahunAnggaranDetailDto): Promise<ResponseDto> {
        try {
            const row = await this.service.getRencanaTahunAnggaranDetail(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rencana tahun anggaran detail retrieved',
                data: row,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }
}
