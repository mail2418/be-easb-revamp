import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbLog } from '../../domain/asb_log/asb_log.entity';
import { AsbLogService } from '../../domain/asb_log/asb_log.service';
import { AsbLogRepository } from '../../domain/asb_log/asb_log.repository';

@Injectable()
export class AsbLogServiceImpl extends AsbLogService {
    constructor(private readonly repository: AsbLogRepository) {
        super();
    }

    async logUserActivity(message: string, idUser: number): Promise<AsbLog> {
        return await this.repository.create(message, idUser);
    }

    async findById(id: number): Promise<AsbLog> {
        const log = await this.repository.findById(id);
        if (!log) {
            throw new NotFoundException(`Log with id ${id} not found`);
        }
        return log;
    }

    async getUserLogs(
        idUser: number,
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }> {
        const [data, total] = await this.repository.findByUser(
            idUser,
            page,
            amount,
        );
        return { data, total };
    }

    async getAsbLogs(
        idAsb: number,
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }> {
        const [data, total] = await this.repository.findByAsb(
            idAsb,
            page,
            amount,
        );
        return { data, total };
    }

    async getAllLogs(
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }> {
        const [data, total] = await this.repository.findAll(page, amount);
        return { data, total };
    }

    async getRecentLogs(limit: number): Promise<AsbLog[]> {
        return await this.repository.findRecent(limit);
    }
}
