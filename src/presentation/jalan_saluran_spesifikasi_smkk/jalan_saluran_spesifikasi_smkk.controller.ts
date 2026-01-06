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
import { JalanSaluranSpesifikasiSmkkService } from '../../domain/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.service';
import { GetJalanSaluranSpesifikasiSmkkByUsulanJalanDto } from './dto/get_jalan_saluran_spesifikasi_smkk_by_usulan_jalan.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('jalan-saluran-spesifikasi-smkk')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
export class JalanSaluranSpesifikasiSmkkController {
    constructor(private readonly service: JalanSaluranSpesifikasiSmkkService) { }

    @Get('get-by-usulan-jalan')
    async getByUsulanJalan(@Query() dto: GetJalanSaluranSpesifikasiSmkkByUsulanJalanDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getByUsulanJalan(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Jalan Saluran Spesifikasi SMKK list retrieved successfully',
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

