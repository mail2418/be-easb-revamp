import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JalanSpesifikasiDesainReviewService } from "../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { CreateJalanSpesifikasiDesainReviewDto } from "./dto/create_jalan_spesifikasi_desain_review.dto";
import { UpdateJalanSpesifikasiDesainReviewDto } from "./dto/update_jalan_spesifikasi_desain_review.dto";
import { GetJalanSpesifikasiDesainReviewDto } from "./dto/get_jalan_spesifikasi_desain_review.dto";

@Controller('jalan-spesifikasi-desain-review')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JalanSpesifikasiDesainReviewController {
    constructor(private readonly jalanSpesifikasiDesainReviewService: JalanSpesifikasiDesainReviewService) { }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERADMIN, Role.VERIFIKATOR, Role.OPD)
    async findAll(@Query() dto: GetJalanSpesifikasiDesainReviewDto) {
        try {
            const result = await this.jalanSpesifikasiDesainReviewService.findAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain Review list retrieved successfully',
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
            const result = await this.jalanSpesifikasiDesainReviewService.findById(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain Review retrieved successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Post()
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSpesifikasiDesainReviewDto) {
        try {
            const result = await this.jalanSpesifikasiDesainReviewService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Jalan Spesifikasi Desain Review created successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJalanSpesifikasiDesainReviewDto) {
        try {
            const result = await this.jalanSpesifikasiDesainReviewService.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain Review updated successfully',
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
            const result = await this.jalanSpesifikasiDesainReviewService.delete(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain Review deleted successfully',
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
