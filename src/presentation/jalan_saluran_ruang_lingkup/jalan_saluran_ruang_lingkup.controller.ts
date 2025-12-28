import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { JalanSaluranRuangLingkupService } from "../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service";
import { CreateJalanSaluranRuangLingkupDto } from "./dto/create_jalan_saluran_ruang_lingkup.dto";
import { UpdateJalanSaluranRuangLingkupDto } from "./dto/update_jalan_saluran_ruang_lingkup.dto";
import { GetJalanSaluranRuangLingkupDto } from "./dto/get_jalan_saluran_ruang_lingkup.dto";
import { ResponseDto } from "../../common/dto/response.dto";

@Controller('jalan-saluran-ruang-lingkup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JalanSaluranRuangLingkupController {
    constructor(private readonly service: JalanSaluranRuangLingkupService) { }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSaluranRuangLingkupDto): Promise<ResponseDto> {
        try {
            const result = await this.service.create(dto);
            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "JalanSaluranRuangLingkup created successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJalanSaluranRuangLingkupDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSaluranRuangLingkup updated successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async delete(@Param('id') id: string): Promise<ResponseDto> {
        try {
            await this.service.delete(Number(id));
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSaluranRuangLingkup deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(@Param('id') id: string): Promise<ResponseDto> {
        try {
            const result = await this.service.findById(Number(id));
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSaluranRuangLingkup retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetJalanSaluranRuangLingkupDto): Promise<ResponseDto> {
        try {
            const result = await this.service.findAll(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSaluranRuangLingkup list retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
