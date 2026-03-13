import type { Response, Request } from 'express';
import {
    Controller,
    Get,
    Query,
    UseGuards,
    HttpStatus,
    HttpException,
    Res,
    StreamableFile,
    Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { AsbDocumentService } from '../../domain/asb_document/asb_document.service';
import { DocumentSpec } from '../../domain/asb_document/document_spec.enum';
import { DownloadDocumentsByAsbDto } from './dto/download_documents_by_asb.dto';
import { GetAsbDocumentByAsbDto } from './dto/get_asb_document_by_asb.dto';
import { UserContext } from 'src/common/types/user-context.type';

@Controller('asb-document')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPERADMIN, Role.ADMIN, Role.OPD, Role.VERIFIKATOR)
export class AsbDocumentController {
    constructor(private readonly service: AsbDocumentService) { }

    @Get('by-asb')
    async getByAsb(
        @Query() dto: GetAsbDocumentByAsbDto,
        @Req() req: Request,
    ) {
        try {
            const user = req.user as UserContext;
            const result = await this.service.getByAsb(dto, user.idOpd, user.roles[0]);
            return {
                statusCode: HttpStatus.OK,
                message: 'Documents by ASB retrieved successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('by-spec')
    async findBySpec(
        @Query('spec') spec: DocumentSpec,
        @Req() req: Request,
    ) {
        try {
            const user = req.user as UserContext;
            const result = await this.service.findBySpec(spec, user.idOpd, user.roles[0]);
            return {
                statusCode: HttpStatus.OK,
                message: 'AsbDocument list by spec retrieved successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('download-all-by-asb')
    async downloadAllByAsb(
        @Query() dto: DownloadDocumentsByAsbDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
    ) {
        try {
            const user = req.user as UserContext;
            const { buffer, filename } = await this.service.downloadAllByAsbAsZip(
                dto.idAsb,
                user.idOpd,
                user.roles[0],
            );

            res.set({
                'Content-Type': 'application/zip',
                'Content-Disposition': `attachment; filename="${filename}"`,
            });

            return new StreamableFile(buffer);
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('download-surat-permohonan')
    async downloadSuratPermohonan(
        @Query() dto: DownloadDocumentsByAsbDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const user = req.user as UserContext;
            const { buffer, filename } = await this.service.downloadByAsbAndSpec(
                dto.idAsb,
                DocumentSpec.SURAT_PERMOHONAN,
                user.idOpd,
                user.roles[0],
            );

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': dto.view === 'true'
                    ? `inline; filename="${filename}"`
                    : `attachment; filename="${filename}"`,
            });

            return new StreamableFile(buffer);
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('download-kertas-kerja')
    async downloadKertasKerja(
        @Query() dto: DownloadDocumentsByAsbDto,
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const user = req.user as UserContext;
            const { buffer, filename } = await this.service.downloadByAsbAndSpec(
                dto.idAsb,
                DocumentSpec.KERTAS_KERJA,
                user.idOpd,
                user.roles[0],
            );

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': dto.view === 'true'
                    ? `inline; filename="${filename}"`
                    : `attachment; filename="${filename}"`,
            });

            return new StreamableFile(buffer);
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        if (error instanceof HttpException) {
            throw error;
        }

        if (error.message?.includes('not found')) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

        if (error.message?.includes('File')) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        if (error.code === '23503') {
            throw new HttpException(
                'Foreign key constraint violation',
                HttpStatus.BAD_REQUEST,
            );
        }

        throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
