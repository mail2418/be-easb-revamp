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
        try {
            return await this.repository.create(message, idUser);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbLog> {
        try {
            const log = await this.repository.findById(id);
            if (!log) {
                throw new NotFoundException(`Log with id ${id} not found`);
            }
            return log;
        } catch (error) {
            throw error;
        }
    }

    async getUserLogs(
        idUser: number,
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }> {
        try {
            const [data, total] = await this.repository.findByUser(
                idUser,
                page,
                amount,
            );
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async getAsbLogs(
        idAsb: number,
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }> {
        try {
            const [data, total] = await this.repository.findByAsb(
                idAsb,
                page,
                amount,
            );
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async getAllLogs(
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }> {
        try {
            const [data, total] = await this.repository.findAll(page, amount);
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async getRecentLogs(limit: number): Promise<AsbLog[]> {
        try {
            return await this.repository.findRecent(limit);
        } catch (error) {
            throw error;
        }
    }
}
