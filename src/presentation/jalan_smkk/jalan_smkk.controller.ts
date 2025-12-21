import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { JalanSmkkService } from "../../domain/jalan_smkk/jalan_smkk.service";
import { CreateJalanSmkkDto } from "./dto/create_jalan_smkk.dto";
import { UpdateJalanSmkkDto } from "./dto/update_jalan_smkk.dto";
import { GetJalanSmkkDto } from "./dto/get_jalan_smkk.dto";

@Controller('jalan-smkk')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JalanSmkkController {
    constructor(private readonly service: JalanSmkkService) { }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateJalanSmkkDto) {
        try {
            const result = await this.service.create(dto);
            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "JalanSmkk created successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateJalanSmkkDto) {
        try {
            const result = await this.service.update(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSmkk updated successfully",
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
                message: "JalanSmkk deleted successfully"
            };
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async findById(@Param('id') id: string) {
        try {
            const result = await this.service.findById(Number(id));
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSmkk retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetJalanSmkkDto) {
        try {
            const result = await this.service.findAll(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "JalanSmkk list retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
