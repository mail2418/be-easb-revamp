import { AsbLog } from './asb_log.entity';

export abstract class AsbLogRepository {
    abstract create(log: string, idUser: number): Promise<AsbLog>;
    abstract findById(id: number): Promise<AsbLog | null>;
    abstract findByUser(
        idUser: number,
        page: number,
        amount: number,
    ): Promise<[AsbLog[], number]>;
    abstract findByAsb(
        idAsb: number,
        page: number,
        amount: number,
    ): Promise<[AsbLog[], number]>;
    abstract findAll(
        page: number,
        amount: number,
    ): Promise<[AsbLog[], number]>;
    abstract findRecent(limit: number): Promise<AsbLog[]>;
}
