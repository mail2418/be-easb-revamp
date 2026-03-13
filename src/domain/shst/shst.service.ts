import { Express } from 'express';
import { CreateShstDto } from "../../presentation/shst/dto/create_shst.dto";
import { UpdateNominalShstDto } from "../../presentation/shst/dto/update_nominal_shst.dto";
import { GetShstDto } from "../../presentation/shst/dto/get_shst.dto";
import { GetShstDetailDto } from "../../presentation/shst/dto/get_shst_detail.dto";
import { GetShstFileDto } from "../../presentation/shst/dto/get_shst_file.dto";
import { Shst } from "./shst.entity";
import { ShstsPaginationResultDto } from "../../presentation/shst/dto/shsts_pagination_result.dto";
import { GetShstNominalDto } from '../../application/shst/dto/get_shst_nominal.dto';

export abstract class ShstService {
    abstract create(dto: CreateShstDto, file: Express.Multer.File): Promise<Shst>;
    abstract delete(dto: GetShstDetailDto): Promise<boolean>;
    abstract updateNominal(dto: UpdateNominalShstDto): Promise<Shst>;
    abstract findAll(dto: GetShstDto): Promise<ShstsPaginationResultDto>;
    abstract findById(dto: GetShstDetailDto): Promise<Shst>;
    abstract getFilePath(dto: GetShstFileDto): Promise<string>;
    abstract downloadFile(dto: GetShstFileDto): Promise<{ filePath: string; downloadUrl: string }>;
    abstract getNominal(dto: GetShstNominalDto): Promise<number>;
}

