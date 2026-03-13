import { AsbLog } from './asb_log.entity';

export abstract class AsbLogService {
    // Main logging method for user activities
    abstract logUserActivity(message: string, idUser: number): Promise<AsbLog>;

    // Query methods
    abstract findById(id: number): Promise<AsbLog>;
    abstract getUserLogs(
        idUser: number,
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }>;
    abstract getAsbLogs(
        idAsb: number,
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }>;
    abstract getAllLogs(
        page: number,
        amount: number,
    ): Promise<{ data: AsbLog[]; total: number }>;
    abstract getRecentLogs(limit: number): Promise<AsbLog[]>;
}
