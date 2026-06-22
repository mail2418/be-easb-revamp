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
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import {
    DeleteUsulanJalanDto,
    GetUsulanJalanListDto,
    RejectUsulanJalanDto,
    StoreIndexUsulanJalanDto,
    StoreInformasiUsulanJalanDto,
    VerifyAdbangUsulanJalanDto,
    VerifyBappedaUsulanJalanDto,
    VerifyBpkadUsulanJalanDto,
    VerifyIndexUsulanJalanDto,
    VerifyInformasiUsulanJalanDto,
} from './dto/usulan_jalan.dto';

@Controller('usulan-jalan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsulanJalanController {
    constructor(private readonly service: UsulanJalanService) {}

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetUsulanJalanListDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.findAll(dto, user.idOpd, user.roles);
            return toResponseDto(data, 'Usulan jalan list retrieved');
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
            return toResponseDto(data, 'Usulan jalan retrieved');
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
            return toResponseDto(data, 'Usulan jalan detail retrieved');
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
    async storeIndexCreate(@Body() dto: StoreIndexUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.storeIndex(dto as unknown as Record<string, unknown>, user.idOpd, user.roles, false);
            return toResponseDto(data, 'Usulan jalan index created', HttpStatus.CREATED);
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeIndexUpdate(@Body() dto: StoreIndexUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.storeIndex(dto as unknown as Record<string, unknown>, user.idOpd, user.roles, true);
            return toResponseDto(data, 'Usulan jalan index updated');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('store-informasi')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async storeInformasi(@Body() dto: StoreInformasiUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.storeInformasi(dto as unknown as Record<string, unknown>, user.idOpd, user.roles);
            return toResponseDto(data, 'Usulan jalan informasi saved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-index')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyIndex(@Body() dto: VerifyIndexUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyIndex(dto as unknown as Record<string, unknown>, user.userId, user.roles);
            return toResponseDto(data, 'Usulan jalan index verified');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-informasi')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyInformasi(@Body() dto: VerifyInformasiUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyInformasi(dto as unknown as Record<string, unknown>, user.userId, user.roles);
            return toResponseDto(data, 'Usulan jalan informasi verified');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-adbang')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyAdbang(@Body() dto: VerifyAdbangUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyAdbang(dto.idUsulanJalan, user.userId, user.roles);
            return toResponseDto(data, 'Usulan jalan verified by ADBANG');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-bpkad')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBpkad(@Body() dto: VerifyBpkadUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyBpkad(dto as unknown as Record<string, unknown>, user.userId, user.roles);
            return toResponseDto(data, 'Usulan jalan verified by BPKAD');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('verify-bappeda')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async verifyBappeda(@Body() dto: VerifyBappedaUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.verifyBappeda(dto.idUsulanJalan, user.userId, user.roles);
            return toResponseDto(data, 'Usulan jalan verified by BAPPEDA');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put('reject')
    @Roles(Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async reject(@Body() dto: RejectUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.reject(dto.idUsulanJalan, dto.rejectReason, user.userId, user.roles);
            return toResponseDto(data, 'Usulan jalan rejected');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Delete()
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async delete(@Body() dto: DeleteUsulanJalanDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const data = await this.service.delete(dto.idUsulanJalan, user.idOpd, user.roles);
            return toResponseDto({ deleted: data }, 'Usulan jalan deleted');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }
}
