import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { JenisUsulanService } from "../../domain/jenis_usulan/jenis_usulan.service";
import { CreateJenisUsulanDto } from "./dto/create_jenis_usulan.dto";
import { UpdateJenisUsulanDto } from "./dto/update_jenis_usulan.dto";
import { GetJenisUsulanDto } from "./dto/get_jenis_usulan.dto";

@Controller('jenis-usulan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JenisUsulanController {
    constructor(private readonly service: JenisUsulanService) { }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJenisUsulanDto) {
        try {
            const result = await this.service.create(dto);
            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "JenisUsulan created successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJenisUsulanDto) {
        try {
            const result = await this.service.update(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisUsulan updated successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async delete(@Param('id') id: string) {
        try {
            await this.service.delete(Number(id));
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisUsulan deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(@Param('id') id: string) {
        try {
            const result = await this.service.findById(Number(id));
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisUsulan retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetJenisUsulanDto) {
        try {
            const result = await this.service.findAll(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JenisUsulan list retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
