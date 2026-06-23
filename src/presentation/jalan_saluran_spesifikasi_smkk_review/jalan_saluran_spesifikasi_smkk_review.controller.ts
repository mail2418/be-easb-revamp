import { Controller, Get, Query, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { JalanSaluranSpesifikasiSmkkReviewService } from '../../domain/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.service';
import { GetJalanSaluranSpesifikasiSmkkReviewByUsulanJalanDto } from './dto/get_jalan_saluran_spesifikasi_smkk_review_by_usulan_jalan.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('jalan-saluran-spesifikasi-smkk-review')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
export class JalanSaluranSpesifikasiSmkkReviewController {
    constructor(private readonly service: JalanSaluranSpesifikasiSmkkReviewService) {}

    @Get('get-by-usulan-jalan')
    async getByUsulanJalan(
        @Query() dto: GetJalanSaluranSpesifikasiSmkkReviewByUsulanJalanDto,
    ): Promise<ResponseDto> {
        try {
            const result = await this.service.getByUsulanJalan(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Saluran Spesifikasi SMKK Review list retrieved successfully',
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
            throw new HttpException('Foreign key constraint violation', HttpStatus.BAD_REQUEST);
        }

        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
