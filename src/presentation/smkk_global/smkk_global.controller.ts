import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { SmkkGlobalService } from '../../domain/smkk_global/smkk_global.service';
import { CreateSmkkGlobalDto } from './dto/create_smkk_global.dto';
import { UpdateSmkkGlobalDto } from './dto/update_smkk_global.dto';
import { GetSmkkGlobalDto } from './dto/get_smkk_global.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('smkk-global')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SmkkGlobalController {
    constructor(private readonly service: SmkkGlobalService) {}

    @Post()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async create(@Body() dto: CreateSmkkGlobalDto): Promise<ResponseDto> {
        try {
            const result = await this.service.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'SmkkGlobal created successfully',
                data: result,
            };
        } catch (error) {
            throw error;
        }
    }

    @Put()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async update(@Body() dto: UpdateSmkkGlobalDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'SmkkGlobal updated successfully',
                data: result,
            };
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async delete(@Param('id') id: string): Promise<ResponseDto> {
        try {
            await this.service.delete(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'SmkkGlobal deleted successfully',
            };
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async findById(@Param('id') id: string): Promise<ResponseDto> {
        try {
            const result = await this.service.findById(Number(id));
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'SmkkGlobal retrieved successfully',
                data: result,
            };
        } catch (error) {
            throw error;
        }
    }

    @Get()
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    async findAll(@Query() dto: GetSmkkGlobalDto): Promise<ResponseDto> {
        try {
            const result = await this.service.findAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'SmkkGlobal list retrieved successfully',
                data: result,
            };
        } catch (error) {
            throw error;
        }
    }
}
