import { AsbLantai } from "./asb_lantai.entity";
import { CreateAsbLantaiDto } from "../../presentation/asb_lantai/dto/create_asb_lantai.dto";
import { UpdateAsbLantaiDto } from "../../presentation/asb_lantai/dto/update_asb_lantai.dto";
import { GetAsbLantaisDto } from "../../presentation/asb_lantai/dto/get_asb_lantais.dto";
import { AsbLantaiPaginationResultDto } from "../../presentation/asb_lantai/dto/asb_lantai_pagination_result.dto";

export abstract class AsbLantaiRepository {
  abstract create(dto: CreateAsbLantaiDto): Promise<AsbLantai>;
  abstract update(dto: UpdateAsbLantaiDto): Promise<AsbLantai>;
  abstract delete(id: number): Promise<boolean>;
  abstract findById(id: number): Promise<AsbLantai | null>;
  abstract findAll(dto: GetAsbLantaisDto): Promise<AsbLantaiPaginationResultDto>;
  abstract findByLantai(lantai: string): Promise<AsbLantai | null>;
}
