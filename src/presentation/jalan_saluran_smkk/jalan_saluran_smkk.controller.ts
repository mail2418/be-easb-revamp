import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { toErrorResponseDto, toResponseDto } from '../../common/utils/controller_response.util';
import { Role } from '../../domain/user/user_role.enum';
import { JalanSaluranSmkkService } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service';
import { CreateJalanSaluranSmkkDto } from './dto/create_jalan_saluran_smkk.dto';
import { UpdateJalanSaluranSmkkDto } from './dto/update_jalan_saluran_smkk.dto';

@Controller('jalan-saluran-smkk')
@Roles(Role.SUPERADMIN, Role.ADMIN)
export class JalanSaluranSmkkController {
    constructor(private readonly service: JalanSaluranSmkkService) {}
    @Post() async create(@Body() dto: CreateJalanSaluranSmkkDto): Promise<ResponseDto> { try { return toResponseDto(await this.service.create(dto), 'Created', HttpStatus.CREATED); } catch (e) { return toErrorResponseDto(e); } }
    @Put() async update(@Body() dto: UpdateJalanSaluranSmkkDto): Promise<ResponseDto> { try { return toResponseDto(await this.service.update(dto), 'Updated'); } catch (e) { return toErrorResponseDto(e); } }
    @Delete(':id') async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> { try { return toResponseDto(await this.service.delete(id), 'Deleted'); } catch (e) { return toErrorResponseDto(e); } }
    @Get('jenis-usulan/:id') async findByJenisUsulan(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> { try { return toResponseDto(await this.service.findByJenisUsulan(id), 'List by jenis usulan retrieved'); } catch (e) { return toErrorResponseDto(e); } }
    @Get() async findAll(@Query() dto: PaginationQueryDto): Promise<ResponseDto> { try { return toResponseDto(await this.service.findAll(dto), 'List retrieved'); } catch (e) { return toErrorResponseDto(e); } }
    @Get(':id') async findById(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> { try { return toResponseDto(await this.service.findById(id), 'Detail retrieved'); } catch (e) { return toErrorResponseDto(e); } }
}