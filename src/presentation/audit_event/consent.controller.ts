import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { AuditEventService } from '../../domain/audit_event/audit_event.service';
import { ResponseDto } from '../../common/dto/response.dto';

class RecordConsentDto {
    @IsOptional()
    @IsString()
    @MaxLength(50)
    version?: string;
}

/**
 * Records a data-subject's acceptance of the privacy policy (UU PDP).
 * Stored as an audit event (action "consent_accept"); createdAt is the consent
 * timestamp and resourceId carries the policy version.
 */
@Controller('consent')
export class ConsentController {
    constructor(private readonly auditService: AuditEventService) {}

    @Post()
    async record(
        @Body() dto: RecordConsentDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        const user = req.user as { sub?: string | number; username?: string } | undefined;
        const idUser = user?.sub != null ? Number(user.sub) : null;
        const fwd = req.headers['x-forwarded-for'];
        const ipAddress =
            (typeof fwd === 'string' && fwd.split(',')[0].trim()) ||
            req.ip ||
            req.socket?.remoteAddress ||
            null;

        await this.auditService.record({
            idUser: Number.isNaN(idUser as number) ? null : idUser,
            username: user?.username ?? null,
            action: 'consent_accept',
            resource: 'privacy_policy',
            resourceId: dto.version ?? null,
            method: 'POST',
            path: '/consent',
            statusCode: HttpStatus.OK,
            ipAddress,
            userAgent: (req.headers['user-agent'] as string)?.slice(0, 512) ?? null,
        });

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'Consent recorded',
            data: null,
        };
    }
}
