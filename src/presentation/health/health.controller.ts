import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Public } from '../../common/decorators/public.decorator';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
    ) {}

    @Public()
    @Get()
    @HealthCheck()
    liveness() {
        return this.health.check([]);
    }

    @Public()
    @Get('ready')
    @HealthCheck()
    readiness() {
        return this.health.check([() => this.db.pingCheck('database')]);
    }
}
