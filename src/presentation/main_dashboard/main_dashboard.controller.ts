import {
    Controller,
    Get,
    Query,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { MainDashboardService } from '../../application/main_dashboard/main_dashboard.service';
import { GetMainDashboardDto } from '../../application/main_dashboard/dto/get_main_dashboard.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';

@Controller('main-dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MainDashboardController {
    constructor(private readonly service: MainDashboardService) { }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async findAll(
        @Query() dto: GetMainDashboardDto,
    ): Promise<ResponseDto> {
        const result = await this.service.findAll(dto);

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Main Dashboard list retrieved successfully',
            data: result,
        };
    }
}

