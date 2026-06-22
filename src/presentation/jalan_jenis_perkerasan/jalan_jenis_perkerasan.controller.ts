import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { toErrorResponseDto, toResponseDto } from '../../common/utils/controller_response.util';
import { Role } from '../../domain/user/user_role.enum';
import { JalanJenisPerkerasanService } from '../../domain/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service';
import { CreateJalanJenisPerkerasanDto } from './dto/create_jalan_jenis_perkerasan.dto';
import { UpdateJalanJenisPerkerasanDto } from './dto/update_jalan_jenis_perkerasan.dto';
import { DeleteJalanJenisPerkerasanDto } from './dto/delete_jalan_jenis_perkerasan.dto';

@Controller('jalan-jenis-perkerasan')
@Roles(Role.SUPERADMIN, Role.ADMIN)
export class JalanJenisPerkerasanController {
    constructor(private readonly service: JalanJenisPerkerasanService) {}

    @Post()
    async create(@Body() dto: CreateJalanJenisPerkerasanDto): Promise<ResponseDto> {
        try {
            const data = await this.service.create(dto);
            return toResponseDto(data, 'Jalan jenis perkerasan created', HttpStatus.CREATED);
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Put()
    async update(@Body() dto: UpdateJalanJenisPerkerasanDto): Promise<ResponseDto> {
        try {
            const data = await this.service.update(dto);
            return toResponseDto(data, 'Jalan jenis perkerasan updated');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Delete()
    async delete(@Body() dto: DeleteJalanJenisPerkerasanDto): Promise<ResponseDto> {
        try {
            const data = await this.service.delete(dto);
            return toResponseDto(data, 'Jalan jenis perkerasan deleted');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get()
    async findAll(@Query() dto: PaginationQueryDto): Promise<ResponseDto> {
        try {
            const data = await this.service.findAll(dto);
            return toResponseDto(data, 'Jalan jenis perkerasan list retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try {
            const data = await this.service.findById(id);
            return toResponseDto(data, 'Jalan jenis perkerasan detail retrieved');
        } catch (error) {
            return toErrorResponseDto(error);
        }
    }
}
