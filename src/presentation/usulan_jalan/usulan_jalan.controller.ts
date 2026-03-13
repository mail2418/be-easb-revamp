import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UsulanJalanServiceImpl } from '../../application/usulan_jalan/usulan_jalan.service.impl';
import { CreateUsulanJalanDto } from '../../application/usulan_jalan/dto/create_usulan_jalan.dto';
import { GetUsulanJalanDetailDto } from 'src/application/usulan_jalan/dto/get_usulan_jalan_detail.dto';
import { GetUsulanJalanListDto } from 'src/application/usulan_jalan/dto/get_usulan_jalan_list.dto';
import { UpdateUsulanJalanDto } from 'src/application/usulan_jalan/dto/update_usulan_jalan.dto';
import { DeleteUsulanJalanDto } from 'src/application/usulan_jalan/dto/delete_usulan_jalan.dto';

@Controller('usulan-jalan')
export class UsulanJalanController {
    constructor(private readonly service: UsulanJalanServiceImpl) {}

    @Post()
    async create(@Body() dto: CreateUsulanJalanDto) {
        const created = await this.service.create(dto);
        return {
            status: 'success',
            responseCode: 201,
            message: 'Usulan jalan created',
            data: created,
        };
    }

    @Get('detail')
    async detail(@Query() dto: GetUsulanJalanDetailDto) {
        const found = await this.service.findById(dto.id);
        return {
            status: 'success',
            responseCode: 200,
            message: 'Usulan jalan detail retrieved',
            data: found,
        };
    }

    @Get()
    async list(@Query() dto: GetUsulanJalanListDto) {
        const page = dto.page ?? 1;
        const amount = dto.amount ?? 10;

        const result = await this.service.findAll(page, amount);

        return {
            status: 'success',
            responseCode: 200,
            message: 'Usulan jalan list retrieved',
            data: result.data,
            meta: {
                total: result.total,
                page: result.page,
                amount: result.amount,
                totalPages: result.totalPages,
            },
        };
    }

    @Put()
    async update(@Body() dto: UpdateUsulanJalanDto) {
        const { id, ...payload } = dto;
        const updated = await this.service.update(id, payload);
        return {
            status: 'success',
            responseCode: 200,
            message: 'Usulan jalan updated',
            data: updated,
        };
    }
    
    @Delete()
    async delete(@Body() dto: DeleteUsulanJalanDto) {
        const deleted = await this.service.delete(dto.id);
        return {
            status: deleted ? 'success' : 'error',
            responseCode: deleted ? 200 : 400,
            message: deleted ? 'Usulan jalan deleted' : 'Delete failed',
            data: null,
        };
    }
}
