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
import { AsbBipekStandardService } from '../../domain/asb_bipek_standard/asb_bipek_standard.service';
import { GetAsbBipekStandardByAsbDto } from './dto/get_asb_bipek_standard_by_asb.dto';

@Controller('asb-bipek-standard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
export class AsbBipekStandardController {
    constructor(private readonly service: AsbBipekStandardService) { }

    @Get('get-by-asb')
    async getByAsb(@Query() dto: GetAsbBipekStandardByAsbDto) {
        try {
            const result = await this.service.getByAsb(dto);
            return {
                statusCode: HttpStatus.OK,
                message: 'ASB Bipek Standard list retrieved successfully',
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
