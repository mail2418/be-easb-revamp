import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseDto } from '../../common/dto/response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserContext } from '../../common/types/user-context.type';
import { toErrorResponseDto, toResponseDto } from '../../common/utils/controller_response.util';
import { Role } from '../../domain/user/user_role.enum';
import { UsulanSaluranService } from '../../domain/usulan_saluran/usulan_saluran.service';
import {
    DeleteUsulanSaluranDto,
    GetUsulanSaluranListDto,
    RejectUsulanSaluranDto,
    StoreIndexUsulanSaluranDto,
    StoreInformasiUsulanSaluranDto,
    VerifyAdbangUsulanSaluranDto,
    VerifyBappedaUsulanSaluranDto,
    VerifyBpkadUsulanSaluranDto,
    VerifyIndexUsulanSaluranDto,
    VerifyInformasiUsulanSaluranDto,
} from './dto/usulan_saluran.dto';

@Controller('usulan-saluran')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsulanSaluranController {
    constructor(private readonly service: UsulanSaluranService) {}

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetUsulanSaluranListDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.findAll(dto, user.idOpd, user.roles);
            return toResponseDto(data, 'Usulan saluran list retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get('id')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findById(@Query('id', ParseIntPipe) id: number, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.findById(id, user.idOpd, user.roles);
            return toResponseDto(data, 'Usulan saluran retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get('detail')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findDetail(@Query('id', ParseIntPipe) id: number, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.findById(id, user.idOpd, user.roles);
            return toResponseDto(data, 'Usulan saluran detail retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get('reject-info')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async rejectInfo(@Query('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try {
            const data = await this.service.getRejectInfo(id);
            return toResponseDto(data, 'Reject info retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Post('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeIndexCreate(@Body() dto: StoreIndexUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.storeIndex(dto as unknown as Record<string, unknown>, user.idOpd, user.roles, false);
            return toResponseDto(data, 'Usulan saluran index created', HttpStatus.CREATED);
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeIndexUpdate(@Body() dto: StoreIndexUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.storeIndex(dto as unknown as Record<string, unknown>, user.idOpd, user.roles, true);
            return toResponseDto(data, 'Usulan saluran index updated');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('store-informasi')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeInformasi(@Body() dto: StoreInformasiUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.storeInformasi(dto as unknown as Record<string, unknown>, user.idOpd, user.roles);
            return toResponseDto(data, 'Usulan saluran informasi saved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-index')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyIndex(@Body() dto: VerifyIndexUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyIndex(dto as unknown as Record<string, unknown>, user.userId, user.roles);
            return toResponseDto(data, 'Usulan saluran index verified');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-informasi')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyInformasi(@Body() dto: VerifyInformasiUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyInformasi(dto as unknown as Record<string, unknown>, user.userId, user.roles);
            return toResponseDto(data, 'Usulan saluran informasi verified');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-adbang')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyAdbang(@Body() dto: VerifyAdbangUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyAdbang(dto.idUsulanSaluran, user.userId, user.roles);
            return toResponseDto(data, 'Usulan saluran verified by ADBANG');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-bpkad')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBpkad(@Body() dto: VerifyBpkadUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyBpkad(dto as unknown as Record<string, unknown>, user.userId, user.roles);
            return toResponseDto(data, 'Usulan saluran verified by BPKAD');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-bappeda')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBappeda(@Body() dto: VerifyBappedaUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyBappeda(dto.idUsulanSaluran, user.userId, user.roles);
            return toResponseDto(data, 'Usulan saluran verified by BAPPEDA');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('reject')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async reject(@Body() dto: RejectUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.reject(dto.idUsulanSaluran, dto.rejectReason, user.userId, user.roles);
            return toResponseDto(data, 'Usulan saluran rejected');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Delete()
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async delete(@Body() dto: DeleteUsulanSaluranDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.delete(dto.idUsulanSaluran, user.idOpd, user.roles);
            return toResponseDto({ deleted: data }, 'Usulan saluran deleted');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }
}
