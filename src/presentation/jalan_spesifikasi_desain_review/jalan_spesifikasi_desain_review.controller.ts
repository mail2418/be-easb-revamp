import {
    Controller,
    Get,
    Query,
    UseGuards,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { JalanSpesifikasiDesainReviewService } from '../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service';
import { GetJalanSpesifikasiDesainReviewByUsulanJalanDto } from './dto/get_jalan_spesifikasi_desain_review_by_usulan_jalan.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('jalan-spesifikasi-desain-review')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
export class JalanSpesifikasiDesainReviewController {
    constructor(private readonly service: JalanSpesifikasiDesainReviewService) { }

    @Get('get-by-usulan-jalan')
    async getByUsulanJalan(@Query() dto: GetJalanSpesifikasiDesainReviewByUsulanJalanDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getByUsulanJalan(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Spesifikasi Desain Review list retrieved successfully',
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
