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
import { AsbDetailService } from '../../domain/asb_detail/asb_detail.service';
import { GetAsbDetailByAsbDto } from './dto/get_asb_detail_by_asb.dto';

@Controller('asb-detail')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
export class AsbDetailController {
    constructor(private readonly service: AsbDetailService) { }

    @Get('get-by-asb')
    async getByAsb(@Query() dto: GetAsbDetailByAsbDto) {
        try {
            const result = await this.service.getByAsb(dto);
            return {
                statusCode: HttpStatus.OK,
                message: 'ASB Detail list retrieved successfully',
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
