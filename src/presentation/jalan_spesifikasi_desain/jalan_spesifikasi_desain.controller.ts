import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JalanSpesifikasiDesainService } from "../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { GetJalanSpesifikasiDesainDto } from "./dto/get_jalan_spesifikasi_desain.dto";
import { CreateJalanSpesifikasiDesainDto } from "./dto/create_jalan_spesifikasi_desain.dto";
import { UpdateJalanSpesifikasiDesainDto } from "./dto/update_jalan_spesifikasi_desain.dto";

@Controller('jalan-spesifikasi-desain')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JalanSpesifikasiDesainController {
    constructor(private readonly jalanSpesifikasiDesainService: JalanSpesifikasiDesainService) { }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VERIFIKATOR, Role.OPD)
    async findAll(@Query() dto: GetJalanSpesifikasiDesainDto) {
        try {
            const result = await this.jalanSpesifikasiDesainService.findAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain list retrieved successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Get('id')
    @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VERIFIKATOR, Role.OPD)
    async findById(@Query('id') id: number) {
        try {
            const result = await this.jalanSpesifikasiDesainService.findById(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain retrieved successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSpesifikasiDesainDto) {
        try {
            const result = await this.jalanSpesifikasiDesainService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Jalan Spesifikasi Desain created successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJalanSpesifikasiDesainDto) {
        try {
            const result = await this.jalanSpesifikasiDesainService.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain updated successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async delete(@Query('id') id: number) {
        try {
            const result = await this.jalanSpesifikasiDesainService.delete(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain deleted successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
