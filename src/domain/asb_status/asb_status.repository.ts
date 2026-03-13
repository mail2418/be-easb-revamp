import { AsbStatus } from "./asb_status.entity";
import { CreateAsbStatusDto } from "../../presentation/asb_status/dto/create_asb_status.dto";
import { UpdateAsbStatusDto } from "../../presentation/asb_status/dto/update_asb_status.dto";
import { GetAsbStatusDto } from "../../presentation/asb_status/dto/get_asb_status.dto";

export abstract class AsbStatusRepository {
    abstract create(dto: CreateAsbStatusDto): Promise<AsbStatus>;
    abstract update(dto: UpdateAsbStatusDto): Promise<AsbStatus>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<AsbStatus | null>;
    abstract findAll(dto: GetAsbStatusDto): Promise<{ data: AsbStatus[], total: number }>;
    abstract findByStatus(status: string): Promise<AsbStatus | null>;
}