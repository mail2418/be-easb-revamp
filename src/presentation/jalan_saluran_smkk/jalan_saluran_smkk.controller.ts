import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { JalanSaluranSmkkService } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service';
import { CreateJalanSaluranSmkkDto } from './dto/create_jalan_saluran_smkk.dto';
import { UpdateJalanSaluranSmkkDto } from './dto/update_jalan_saluran_smkk.dto';
import { GetJalanSaluranSmkkDto } from './dto/get_jalan_saluran_smkk.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('jalan-saluran-smkk')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JalanSaluranSmkkController {
    constructor(private readonly service: JalanSaluranSmkkService) {}

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSaluranSmkkDto): Promise<ResponseDto> {
        const result = await this.service.create(dto);
        return {
            status: 'success',
            responseCode: HttpStatus.CREATED,
            message: 'JalanSaluranSmkk created successfully',
            data: result,
        };
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJalanSaluranSmkkDto): Promise<ResponseDto> {
        const result = await this.service.update(dto);
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'JalanSaluranSmkk updated successfully',
            data: result,
        };
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async delete(@Param('id') id: string): Promise<ResponseDto> {
        try {
            await this.service.delete(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'JalanSaluranSmkk deleted successfully',
            };
        } catch (error) {
            throw error;
        }
    }

    @Get('jenis-usulan/:idJenisUsulan')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findByJenisUsulan(@Param('idJenisUsulan') idJenisUsulan: string): Promise<ResponseDto> {
        const result = await this.service.findByJenisUsulan(Number(idJenisUsulan));
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'JalanSaluranSmkk by jenis usulan retrieved successfully',
            data: result,
        };
    }

    @Get(':id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(@Param('id') id: string): Promise<ResponseDto> {
        try {
            const result = await this.service.findById(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'JalanSaluranSmkk retrieved successfully',
                data: result,
            };
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetJalanSaluranSmkkDto): Promise<ResponseDto> {
        const result = await this.service.findAll(dto);
        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'JalanSaluranSmkk list retrieved successfully',
            data: result,
        };
    }
}
