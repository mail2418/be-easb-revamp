import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { AuditEventService } from '../../domain/audit_event/audit_event.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { ResponseDto } from '../../common/dto/response.dto';

@Controller('audit-events')
@Roles(Role.SUPERADMIN)
export class AuditEventController {
    constructor(private readonly auditService: AuditEventService) {}

    @Get()
    @Roles(Role.SUPERADMIN)
    async list(
        @Query('page') page = '1',
        @Query('amount') amount = '20',
        @Query('idUser') idUser?: string,
        @Query('action') action?: string,
        @Query('resource') resource?: string,
    ): Promise<ResponseDto> {
        const { data, total } = await this.auditService.list(
            Math.max(1, parseInt(page, 10) || 1),
            Math.min(100, Math.max(1, parseInt(amount, 10) || 20)),
            {
                idUser: idUser ? parseInt(idUser, 10) : undefined,
                action: action || undefined,
                resource: resource || undefined,
            },
        );

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Audit events',
            data: { data, total },
        };
    }
}
