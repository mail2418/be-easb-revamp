import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Query,
    UseGuards,
    HttpStatus,
    HttpException,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { AsbBpsGalleryNonstdService } from '../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.service';
import { CreateAsbBpsGalleryNonstdDto } from './dto/create_asb_bps_gallery_nonstd.dto';
import { UpdateAsbBpsGalleryNonstdDto } from './dto/update_asb_bps_gallery_nonstd.dto';
import { DeleteAsbBpsGalleryNonstdDto } from './dto/delete_asb_bps_gallery_nonstd.dto';
import { GetAsbBpsGalleryNonstdListDto } from './dto/get_asb_bps_gallery_nonstd_list.dto';
import { GetAsbBpsGalleryNonstdListFilterDto } from './dto/get_asb_bps_gallery_nonstd_list_filter.dto';
import { GetAsbBpsGalleryNonstdDetailDto } from './dto/get_asb_bps_gallery_nonstd_detail.dto';
import { AsbBpsGalleryNonstdPaginationResultDto } from './dto/asb_bps_gallery_nonstd_pagination_result.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import type { Express } from 'express';

@Controller('asb-bps-gallery-nonstd')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPERADMIN)
export class AsbBpsGalleryNonstdController {
    constructor(private readonly service: AsbBpsGalleryNonstdService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() dto: CreateAsbBpsGalleryNonstdDto,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<ResponseDto> {
        try {
            if (!file) {
                throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
            }

            const result = await this.service.create(dto, file);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbBpsGallery created successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get()
    async findAll(
        @Query() paginationDto: GetAsbBpsGalleryNonstdListDto,
        @Query() filterDto: GetAsbBpsGalleryNonstdListFilterDto,
    ): Promise<ResponseDto<AsbBpsGalleryNonstdPaginationResultDto>> {
        try {
            const page = paginationDto.page ?? 1;
            const amount = paginationDto.amount ?? 10;
            const result = await this.service.findAll(
                page,
                amount,
                filterDto,
            );

            const response: AsbBpsGalleryNonstdPaginationResultDto = {
                data: result.data,
                total: result.total,
                page,
                amount,
                totalPages: Math.ceil(result.total / amount),
            };

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbBpsGallery list retrieved successfully',
                data: response,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('detail')
    async findOne(@Query() dto: GetAsbBpsGalleryNonstdDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.service.findById(dto.id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbBpsGallery detail retrieved successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Body() dto: UpdateAsbBpsGalleryNonstdDto,
        @UploadedFile() file?: Express.Multer.File,
    ): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto.id, dto, file);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbBpsGallery updated successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Delete()
    async remove(@Body() dto: DeleteAsbBpsGalleryNonstdDto): Promise<ResponseDto> {
        try {
            await this.service.delete(dto.id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbBpsGallery deleted successfully',
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('by-komponen-bangunan-nonstd')
    async findByKomponenBangunanNonstd(@Query('id') id: number): Promise<ResponseDto> {
        try {
            const result = await this.service.findByKomponenBangunanNonstdId(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbBpsGallery list by komponen bangunan retrieved successfully',
                data: result,
            };
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
