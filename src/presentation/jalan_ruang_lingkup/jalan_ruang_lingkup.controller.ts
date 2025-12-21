import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JalanRuangLingkupService } from "../../domain/jalan_ruang_lingkup/jalan_ruang_lingkup.service";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { GetJalanRuangLingkupDto } from "./dto/get_jalan_ruang_lingkup.dto";
import { CreateJalanRuangLingkupDto } from "./dto/create_jalan_ruang_lingkup.dto";
import { UpdateJalanRuangLingkupDto } from "./dto/update_jalan_ruang_lingkup.dto";

@Controller('jalan-ruang-lingkup')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JalanRuangLingkupController {
    constructor(private readonly jalanRuangLingkupService: JalanRuangLingkupService) { }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VERIFIKATOR, Role.OPD)
    async findAll(@Query() dto: GetJalanRuangLingkupDto) {
        try {
            const result = await this.jalanRuangLingkupService.findAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Ruang Lingkup list retrieved successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VERIFIKATOR, Role.OPD)
    async findById(@Param('id') id: string) {
        try {
            const result = await this.jalanRuangLingkupService.findById(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Ruang Lingkup retrieved successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanRuangLingkupDto) {
        try {
            const result = await this.jalanRuangLingkupService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Jalan Ruang Lingkup created successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJalanRuangLingkupDto) {
        try {
            const result = await this.jalanRuangLingkupService.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Ruang Lingkup updated successfully',
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
            const result = await this.jalanRuangLingkupService.delete(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Ruang Lingkup deleted successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
