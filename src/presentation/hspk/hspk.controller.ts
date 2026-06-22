import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Post,
    Put,
    Query,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import type { Express, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../common/decorators/roles.decorator';
import { ResponseDto } from '../../common/dto/response.dto';
import { toErrorResponseDto, toResponseDto } from '../../common/utils/controller_response.util';
import { Role } from '../../domain/user/user_role.enum';
import { HspkService } from '../../domain/hspk/hspk.service';
import { GetHspksDto } from './dto/get_hspks.dto';
import { CreateHspkDto } from './dto/create_hspk.dto';
import { UpdateHspkDto } from './dto/update_hspk.dto';
import { DeleteHspkDto } from './dto/delete_hspk.dto';
import { GetHspkDetailDto } from './dto/get_hspk_detail.dto';
import { GetHspkByRuangLingkupDto } from './dto/get_hspk_by_ruang_lingkup.dto';
import { BulkHspkDto } from './dto/bulk_hspk.dto';

@Controller('hspks')
@Roles(Role.SUPERADMIN, Role.ADMIN)
export class HspkController {
    constructor(private readonly service: HspkService) {}

    @Post()
    async create(@Body() dto: CreateHspkDto): Promise<ResponseDto> {
        try {
            const data = await this.service.create(dto);
            return toResponseDto(data, 'HSPK created', HttpStatus.CREATED);
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put()
    async update(@Body() dto: UpdateHspkDto): Promise<ResponseDto> {
        try {
            const data = await this.service.update(dto);
            return toResponseDto(data, 'HSPK updated');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Delete()
    async delete(@Body() dto: DeleteHspkDto): Promise<ResponseDto> {
        try {
            const data = await this.service.delete(dto);
            return toResponseDto(data, 'HSPK deleted');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get('template')
    async template(@Res() res: Response): Promise<void> {
        try {
            const buffer = await this.service.generateTemplate();
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            );
            res.setHeader(
                'Content-Disposition',
                'attachment; filename="HSPK_Template.xlsx"',
            );
            res.status(HttpStatus.OK).send(buffer);
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(toErrorResponseDto(error));
        }
    }

    @Post('bulk')
    @UseInterceptors(FileInterceptor('file'))
    async bulk(
        @Body() dto: BulkHspkDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseDto> {
        try {
            const data = await this.service.bulkImport(dto, file);
            return toResponseDto(data, 'HSPK bulk import completed', HttpStatus.CREATED);
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get('by-ruang-lingkup')
    async byRuangLingkup(@Query() dto: GetHspkByRuangLingkupDto): Promise<ResponseDto> {
        try {
            const data = await this.service.findByRuangLingkup(dto);
            return toResponseDto(data, 'HSPK by ruang lingkup retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get('detail')
    async detail(@Query() dto: GetHspkDetailDto): Promise<ResponseDto> {
        try {
            const data = await this.service.findById(dto);
            return toResponseDto(data, 'HSPK detail retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get()
    async findAll(@Query() dto: GetHspksDto): Promise<ResponseDto> {
        try {
            const data = await this.service.findAll(dto);
            return toResponseDto(data, 'HSPK list retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }
}
