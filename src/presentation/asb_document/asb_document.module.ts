import { Express } from 'express';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AsbDocumentOrmEntity } from '../../infrastructure/asb_document/orm/asb_document.orm_entity';
import { AsbDocumentRepository } from '../../domain/asb_document/asb_document.repository';
import { AsbDocumentRepositoryImpl } from '../../infrastructure/asb_document/repositories/asb_document.repository.impl';
import { AsbDocumentService } from '../../domain/asb_document/asb_document.service';
import { AsbDocumentServiceImpl } from '../../application/asb_document/asb_document.service.impl';
import { ValidateDocumentUploadUseCase } from '../../application/asb_document/use_cases/validate_document_upload.use_case';
import { EnsureDocumentDirectoryUseCase } from '../../application/asb_document/use_cases/ensure_document_directory.use_case';
import { GenerateDocumentFilenameUseCase } from '../../application/asb_document/use_cases/generate_document_filename.use_case';
import { SaveDocumentUseCase } from '../../application/asb_document/use_cases/save_document.use_case';
import { DeleteDocumentUseCase } from '../../application/asb_document/use_cases/delete_document.use_case';
import { AsbDocumentController } from './asb_document.controller';
import { KertasKerjaUseCase } from 'src/application/asb_document/use_cases/kertas_kerja.use_case';
import { SuratPermohonanUseCase } from 'src/application/asb_document/use_cases/surat_permohonan.use_case';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbDocumentOrmEntity]),
        MulterModule.register({
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB
            },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type. Only documents (PDF, DOC, DOCX) are allowed.'), false);
                }
            },
        }),
    ],
    controllers: [AsbDocumentController],
    providers: [
        {
            provide: AsbDocumentRepository,
            useClass: AsbDocumentRepositoryImpl,
        },
        {
            provide: AsbDocumentService,
            useClass: AsbDocumentServiceImpl,
        },
        ValidateDocumentUploadUseCase,
        EnsureDocumentDirectoryUseCase,
        GenerateDocumentFilenameUseCase,
        SaveDocumentUseCase,
        DeleteDocumentUseCase,
        KertasKerjaUseCase,
        SuratPermohonanUseCase
    ],
    exports: [AsbDocumentService],
})
export class AsbDocumentModule { }
