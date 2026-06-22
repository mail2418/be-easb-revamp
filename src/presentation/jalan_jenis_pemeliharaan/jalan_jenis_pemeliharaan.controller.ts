import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { toErrorResponseDto, toResponseDto } from '../../common/utils/controller_response.util';
import { Role } from '../../domain/user/user_role.enum';
import { JalanJenisPemeliharaanService } from '../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service';
import { CreateJalanJenisPemeliharaanDto } from './dto/create_jalan_jenis_pemeliharaan.dto';
import { UpdateJalanJenisPemeliharaanDto } from './dto/update_jalan_jenis_pemeliharaan.dto';
import { DeleteJalanJenisPemeliharaanDto } from './dto/delete_jalan_jenis_pemeliharaan.dto';

@Controller('jalan-jenis-pemeliharaan')
@Roles(Role.SUPERADMIN, Role.ADMIN)
export class JalanJenisPemeliharaanController {
    constructor(private readonly service: JalanJenisPemeliharaanService) {}
    @Post() async create(@Body() dto: CreateJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try { return toResponseDto(await this.service.create(dto), 'Created', HttpStatus.CREATED); } catch (e) { return toErrorResponseDto(e); }
    }
    @Put() async update(@Body() dto: UpdateJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try { return toResponseDto(await this.service.update(dto), 'Updated'); } catch (e) { return toErrorResponseDto(e); }
    }
    @Delete() async delete(@Body() dto: DeleteJalanJenisPemeliharaanDto): Promise<ResponseDto> {
        try { return toResponseDto(await this.service.delete(dto), 'Deleted'); } catch (e) { return toErrorResponseDto(e); }
    }
    @Get() async findAll(@Query() dto: PaginationQueryDto): Promise<ResponseDto> {
        try { return toResponseDto(await this.service.findAll(dto), 'List retrieved'); } catch (e) { return toErrorResponseDto(e); }
    }
    @Get(':id') async findById(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try { return toResponseDto(await this.service.findById(id), 'Detail retrieved'); } catch (e) { return toErrorResponseDto(e); }
    }
}
