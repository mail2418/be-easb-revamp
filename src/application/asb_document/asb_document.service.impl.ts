import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import { Express } from 'express';
import { AsbDocument } from '../../domain/asb_document/asb_document.entity';
import { AsbDocumentService } from '../../domain/asb_document/asb_document.service';
import { AsbDocumentRepository } from '../../domain/asb_document/asb_document.repository';
import { DocumentSpec } from '../../domain/asb_document/document_spec.enum';
import { EnsureDocumentDirectoryUseCase } from './use_cases/ensure_document_directory.use_case';
import { SaveDocumentUseCase } from './use_cases/save_document.use_case';
import { DeleteDocumentUseCase } from './use_cases/delete_document.use_case';
import { GetAsbDocumentByAsbDto } from '../../presentation/asb_document/dto/get_asb_document_by_asb.dto';
import { KertasKerjaUseCase } from './use_cases/kertas_kerja.use_case';
import { KertasKerjaDto } from 'src/presentation/asb_document/dto/kertas_kerja.dto';
import { Readable } from 'typeorm/platform/PlatformTools.js';
import { SuratPermohonanDto } from 'src/presentation/asb_document/dto/surat_permohonan,dto';
import { SuratPermohonanUseCase } from './use_cases/surat_permohonan.use_case';
import { Role } from '../../domain/user/user_role.enum';

@Injectable()
export class AsbDocumentServiceImpl extends AsbDocumentService {
    constructor(
        private readonly repository: AsbDocumentRepository,
        private readonly ensureDocumentDir: EnsureDocumentDirectoryUseCase,
        private readonly saveDocument: SaveDocumentUseCase,
        private readonly deleteDocument: DeleteDocumentUseCase,
        private readonly kertasKerjaUseCase: KertasKerjaUseCase,
        private readonly suratPermohonanUseCase: SuratPermohonanUseCase
    ) {
        super();
        // Ensure upload directory exists on service initialization
        this.ensureDocumentDir.execute();
    }

    /**
     * Helper method to determine if idOpd filter should be applied
     * OPD role: filter by idOpd (users can only see documents for their OPD)
     * SUPERADMIN/ADMIN/VERIFIKATOR: no filter (can see all documents)
     */
    private getOpdFilter(idOpd: number | null, role: Role): number | null | undefined {
        if (role === Role.OPD && idOpd !== null) {
            return idOpd;
        }
        return undefined; // No filter for SUPERADMIN, ADMIN, VERIFIKATOR
    }

    async findBySpec(spec: DocumentSpec, idOpd?: number | null, role?: Role): Promise<AsbDocument[]> {
        try {
            const opdFilter = role ? this.getOpdFilter(idOpd ?? null, role) : undefined;
            return await this.repository.findBySpec(spec, opdFilter);
        } catch (error) {
            throw error;
        }
    }

    async getByAsb(dto: GetAsbDocumentByAsbDto, idOpd?: number | null, role?: Role): Promise<{ data: AsbDocument[], total: number, page: number, amount: number, totalPages: number }> {
        try {
            const opdFilter = role ? this.getOpdFilter(idOpd ?? null, role) : undefined;
            const [data, total] = await this.repository.findByAsb(dto.idAsb, dto.page, dto.amount, opdFilter);
            return {
                data,
                total,
                page: dto.page,
                amount: dto.amount,
                totalPages: Math.ceil(total / dto.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteByAsbId(idAsb: number): Promise<void> {
        try {
            // Get all documents for this ASB
            const documents = await this.repository.findByAsbIdAll(idAsb);

            // Delete each document (file and DB)
            for (const doc of documents) {
                // Delete file from disk
                this.deleteDocument.execute(doc.filename);

                // Soft delete from database  
                await this.repository.delete(doc.id);
            }
        } catch (error) {
            throw error;
        }
    }

    async generateAsbKertasKerja(dto: KertasKerjaDto): Promise<boolean> {
        try {
            const asbDoc = await this.kertasKerjaUseCase.execute(dto)
            const file: Express.Multer.File = {
                buffer: asbDoc,
                originalname: `${dto.dataAsb.opd?.opd}.pdf`,
                size: asbDoc.length,
                encoding: '7bit',
                mimetype: 'application/pdf',
                destination: '',
                filename: '',
                path: '',
                fieldname: '',
                stream: Readable.from(asbDoc),
            };

            const filepath = this.saveDocument.execute(file, DocumentSpec.KERTAS_KERJA);

            await this.repository.create(dto.dataAsb.id, DocumentSpec.KERTAS_KERJA, filepath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async generateSuratPermohonan(dto: SuratPermohonanDto): Promise<boolean> {
        try {
            const asbDoc = await this.suratPermohonanUseCase.execute(dto)
            const file: Express.Multer.File = {
                buffer: asbDoc,
                originalname: `${dto.opd}_${dto.nama_asb}.pdf`,
                size: asbDoc.length,
                encoding: '7bit',
                mimetype: 'application/pdf',
                destination: '',
                filename: '',
                path: '',
                fieldname: '',
                stream: Readable.from(asbDoc),
            };

            const filepath = this.saveDocument.execute(file, DocumentSpec.SURAT_PERMOHONAN);
            await this.repository.create(dto.idAsb, DocumentSpec.SURAT_PERMOHONAN, filepath);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async downloadAllByAsbAsZip(idAsb: number, idOpd?: number | null, role?: Role): Promise<{ buffer: Buffer, filename: string }> {
        try {
            // Get all documents for this ASB with OPD filter
            const opdFilter = role ? this.getOpdFilter(idOpd ?? null, role) : undefined;
            const documents = await this.repository.findByAsbIdAll(idAsb, opdFilter);

            if (!documents || documents.length === 0) {
                throw new NotFoundException(`No documents found for ASB with id ${idAsb}`);
            }

            // Create a buffer to store the zip file
            const chunks: Buffer[] = [];
            const archive = archiver('zip', {
                zlib: { level: 9 } // Maximum compression
            });

            // Listen for archive data
            archive.on('data', (chunk) => {
                chunks.push(chunk);
            });

            // Finalize promise
            const archivePromise = new Promise<Buffer>((resolve, reject) => {
                archive.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                archive.on('error', (err) => {
                    reject(err);
                });
            });

            // Add each document to the archive
            for (const doc of documents) {
                if (fs.existsSync(doc.filename)) {
                    const fileBuffer = fs.readFileSync(doc.filename);
                    const fileName = path.basename(doc.filename);
                    archive.append(fileBuffer, { name: fileName });
                }
            }

            // Finalize the archive
            await archive.finalize();

            // Wait for the archive to complete
            const buffer = await archivePromise;

            return {
                buffer,
                filename: `asb_documents_${idAsb}.zip`
            };
        } catch (error) {
            throw error;
        }
    }

    async downloadByAsbAndSpec(idAsb: number, spec: DocumentSpec, idOpd?: number | null, role?: Role): Promise<{ buffer: Buffer, filename: string }> {
        try {
            // Get all documents for this ASB with OPD filter
            const opdFilter = role ? this.getOpdFilter(idOpd ?? null, role) : undefined;
            const documents = await this.repository.findByAsbIdAll(idAsb, opdFilter);

            // Filter by spec
            const document = documents.find(doc => doc.spec === spec);

            if (!document) {
                throw new NotFoundException(
                    `Document with spec ${spec} not found for ASB with id ${idAsb}`
                );
            }

            // Check if file exists
            if (!fs.existsSync(document.filename)) {
                throw new NotFoundException(
                    `File not found on disk: ${document.filename}`
                );
            }

            // Read the file
            const buffer = fs.readFileSync(document.filename);
            const filename = path.basename(document.filename);

            return {
                buffer,
                filename
            };
        } catch (error) {
            throw error;
        }
    }
}
