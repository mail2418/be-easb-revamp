import { Controller, Get, Post, Put, Delete, Body, Query, Req, HttpStatus, HttpException, ParseIntPipe, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { UsulanSaluranService } from '../../domain/usulan_saluran/usulan_saluran.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { FindAllUsulanSaluranDto } from '../../application/usulan_saluran/dto/find_all_usulan_saluran.dto';
import { CreateUsulanSaluranStoreIndexDto } from '../../application/usulan_saluran/dto/create_usulan_saluran_store_index.dto';
import { UpdateUsulanSaluranStoreIndexDto } from '../../application/usulan_saluran/dto/update_usulan_saluran_store_index.dto';
import { StoreInformasiUsulanSaluranDto } from './dto/store_informasi_usulan_saluran.dto';
import { UpdateUsulanSaluranDto } from './dto/update_usulan_saluran.dto';
import { DeleteUsulanSaluranDto } from './dto/delete_usulan_saluran.dto';
import { VerifyIndexUsulanSaluranDto } from './dto/verify_index_usulan_saluran.dto';
import { VerifyInformasiUsulanSaluranDto } from './dto/verify_informasi_usulan_saluran.dto';
import { VerifyUsulanSaluranDto } from './dto/verify_usulan_saluran.dto';
import { VerifyBpkadUsulanSaluranDto } from './dto/verify_bpkad_usulan_saluran.dto';
import { RejectUsulanSaluranDto } from './dto/reject_usulan_saluran.dto';
import { ForbiddenException } from '@nestjs/common';
import { GetUsulanSaluranAnalyticsFilterDto } from '../../application/usulan_saluran/dto/get_usulan_saluran_analytics_filter.dto';
import { UserContext } from '../../common/types/user-context.type';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResponseDto } from '../../common/dto/response.dto';

function handleErr(e: unknown): ResponseDto {
    if (e instanceof HttpException) {
        const r = e.getResponse();
        const msg = typeof r === 'string' ? r : (Array.isArray((r as any).message) ? (r as any).message.join(', ') : (r as any).message ?? 'Error');
        return { status: 'error', responseCode: e.getStatus(), message: msg, data: null };
    }
    return { status: 'error', responseCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', data: null };
}

@Controller('usulan-saluran')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsulanSaluranController {
    constructor(private readonly svc: UsulanSaluranService) {}

    @Get('analytics')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getAnalytics(@Query() f: GetUsulanSaluranAnalyticsFilterDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.getAnalytics(u.idOpd, u.roles, f);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran analytics retrieved successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: FindAllUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.findAll(dto, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran list retrieved successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Get('id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(@Query('id', ParseIntPipe) id: number, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.findById(id, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran retrieved successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Post('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeIndex(@Body() dto: CreateUsulanSaluranStoreIndexDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.createIndex(dto, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran index created successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('update-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async updateIndex(@Body() dto: UpdateUsulanSaluranStoreIndexDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.updateIndex(dto, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran index updated successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('store-informasi')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeInformasi(@Body() dto: StoreInformasiUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.storeInformasi(dto, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Informasi Usulan Saluran stored successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('update')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.updateUsulanSaluran(dto, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran updated successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Delete()
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async delete(@Body() dto: DeleteUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.deleteUsulanSaluran(dto.idUsulanSaluran, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran deleted successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('verify-index')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyIndex(@Body() dto: VerifyIndexUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.verifyIndex(dto, u.userId.toString(), u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran index verified successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('verify-informasi')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyInformasi(@Body() dto: VerifyInformasiUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.verifyInformasi(dto, u.userId.toString(), u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Informasi Usulan Saluran verified successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('verify-adbang')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyAdbang(@Body() dto: VerifyUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.verifyAdbang(dto.idUsulanSaluran, u.userId.toString(), u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran approved by ADBANG successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('verify-bpkad')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBpkad(@Body() dto: VerifyBpkadUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.verifyBpkad(dto, u.userId.toString(), u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran approved by BPKAD successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('verify-bappeda')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBappeda(@Body() dto: VerifyUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.verifyBappeda(dto.idUsulanSaluran, u.userId.toString(), u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran approved by BAPPEDA successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Put('reject')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async reject(@Body() dto: RejectUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            if (!u?.userId) throw new ForbiddenException('User ID is required');
            const r = await this.svc.reject(dto.idUsulanSaluran, dto.rejectReason, u.userId.toString(), u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Usulan Saluran rejected successfully', data: r };
        } catch (e) { return handleErr(e); }
    }

    @Get('reject-info')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getRejectInfo(@Query('id', ParseIntPipe) id: number, @Req() req: Request): Promise<ResponseDto> {
        try {
            const u = req.user as UserContext;
            const r = await this.svc.getRejectInfo(id, u.idOpd, u.roles);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'Reject info retrieved successfully', data: r };
        } catch (e) { return handleErr(e); }
    }
}
