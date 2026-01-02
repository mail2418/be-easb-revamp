import { Controller, Post, Put, Delete, Get, Body, HttpStatus, HttpException, Query, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import type { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { AsbJakonService } from '../../domain/asb_jakon/asb_jakon.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { CreateAsbJakonDto } from './dto/create_asb_jakon.dto';
import { CreateBulkAsbJakonDto } from './dto/create_bulk_asb_jakon.dto';
import { UpdateAsbJakonDto } from './dto/update_asb_jakon.dto';
import { DeleteAsbJakonDto } from './dto/delete_asb_jakon.dto';
import { GetAsbJakonListDto } from './dto/get_asb_jakon_list.dto';
import { GetAsbJakonDetailDto } from './dto/get_asb_jakon_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('asb-jakon')
@Roles(Role.SUPERADMIN, Role.ADMIN)
export class AsbJakonController {
    constructor(private readonly service: AsbJakonService) { }

    @Post()
    async create(@Body() dto: CreateAsbJakonDto): Promise<ResponseDto> {
        try {
            const result = await this.service.create(dto);
            return { status: 'success', responseCode: HttpStatus.CREATED, message: 'AsbJakon created', data: result };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put()
    async update(@Body() dto: UpdateAsbJakonDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'AsbJakon updated', data: result };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete()
    async delete(@Body() dto: DeleteAsbJakonDto): Promise<ResponseDto> {
        try {
            const result = await this.service.delete(dto);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'AsbJakon deleted', data: result };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getAll(@Query() dto: GetAsbJakonListDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getAll(dto);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'AsbJakon list retrieved', data: result };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('detail')
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getDetail(@Query() dto: GetAsbJakonDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getDetail(dto);
            return { status: 'success', responseCode: HttpStatus.OK, message: 'AsbJakon detail retrieved', data: result };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Post('bulk')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    async createBulk(@Body() dto: CreateBulkAsbJakonDto, @UploadedFile() file: Express.Multer.File): Promise<ResponseDto> {
        try {
            const result = await this.service.createBulk(dto, file);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: `${result.created} AsbJakon record(s) created successfully`,
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('template')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async downloadTemplate(@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
        try {
            const { buffer, filename } = await this.service.downloadTemplate();

            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            });

            return new StreamableFile(buffer);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private handleError(error: any): ResponseDto {
        if (error instanceof HttpException) {
            const status = error.getStatus();
            const response = error.getResponse();
            let message: string;
            if (typeof response === 'string') {
                message = response;
            } else {
                const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
            }
            return { status: 'error', responseCode: status, message, data: null };
        }
        return { status: 'error', responseCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', data: null };
    }
}
