import { AsbDocument } from './asb_document.entity';
import { DocumentSpec } from './document_spec.enum';

export abstract class AsbDocumentRepository {
    abstract create(idAsb: number, spec: DocumentSpec, filename: string): Promise<AsbDocument>;
    abstract delete(id: number): Promise<void>;
    abstract findBySpec(spec: DocumentSpec, idOpd?: number | null): Promise<AsbDocument[]>;
    abstract findByAsb(idAsb: number, page: number, amount: number, idOpd?: number | null): Promise<[AsbDocument[], number]>;
    abstract findByAsbIdAll(idAsb: number, idOpd?: number | null): Promise<AsbDocument[]>;
}
