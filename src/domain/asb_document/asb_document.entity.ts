import { DocumentSpec } from './document_spec.enum';

export class AsbDocument {
    id: number;
    idAsb: number | null;
    filename: string;
    spec: DocumentSpec;
}
