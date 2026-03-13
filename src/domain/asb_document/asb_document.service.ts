import { Express } from 'express';
import { AsbDocument } from './asb_document.entity';
import { DocumentSpec } from './document_spec.enum';
import { GetAsbDocumentByAsbDto } from '../../presentation/asb_document/dto/get_asb_document_by_asb.dto';
import { KertasKerjaDto } from 'src/presentation/asb_document/dto/kertas_kerja.dto';
import { SuratPermohonanDto } from 'src/presentation/asb_document/dto/surat_permohonan,dto';
import { Role } from '../user/user_role.enum';

export abstract class AsbDocumentService {
    abstract findBySpec(spec: DocumentSpec, idOpd?: number | null, role?: Role): Promise<AsbDocument[]>;
    abstract getByAsb(dto: GetAsbDocumentByAsbDto, idOpd?: number | null, role?: Role): Promise<{ data: AsbDocument[], total: number, page: number, amount: number, totalPages: number }>;
    abstract deleteByAsbId(idAsb: number): Promise<void>;
    abstract generateAsbKertasKerja(dto: KertasKerjaDto): Promise<boolean>;
    abstract generateSuratPermohonan(dto: SuratPermohonanDto): Promise<boolean>;
    abstract downloadAllByAsbAsZip(idAsb: number, idOpd?: number | null, role?: Role): Promise<{ buffer: Buffer, filename: string }>;
    abstract downloadByAsbAndSpec(idAsb: number, spec: DocumentSpec, idOpd?: number | null, role?: Role): Promise<{ buffer: Buffer, filename: string }>;
}
