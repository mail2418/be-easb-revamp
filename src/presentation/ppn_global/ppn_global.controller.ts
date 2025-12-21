import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../common/guards/jwt_auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { Role } from "../../domain/user/user_role.enum";
import { PpnGlobalService } from "../../domain/ppn_global/ppn_global.service";
import { CreatePpnGlobalDto } from "./dto/create_ppn_global.dto";
import { UpdatePpnGlobalDto } from "./dto/update_ppn_global.dto";
import { GetPpnGlobalDto } from "./dto/get_ppn_global.dto";

@Controller('ppn-global')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PpnGlobalController {
    constructor(private readonly service: PpnGlobalService) { }

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreatePpnGlobalDto) {
        try {
            const result = await this.service.create(dto);
            return {
                status: "success",
                responseCode: HttpStatus.CREATED,
                message: "PpnGlobal created successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdatePpnGlobalDto) {
        try {
            const result = await this.service.update(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "PpnGlobal updated successfully",
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
                message: "PpnGlobal deleted successfully"
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
                message: "PpnGlobal retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetPpnGlobalDto) {
        try {
            const result = await this.service.findAll(dto);
            return {
                status: "success",
                responseCode: HttpStatus.OK,
                message: "PpnGlobal list retrieved successfully",
                data: result
            };
        } catch (error) {
            throw error;
        }
    }
}
