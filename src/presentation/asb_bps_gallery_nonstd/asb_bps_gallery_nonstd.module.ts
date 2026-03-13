import { Express } from 'express';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AsbBpsGalleryNonstdOrmEntity } from '../../infrastructure/asb_bps_gallery_nonstd/orm/asb_bps_gallery_nonstd.orm_entity';
import { AsbBpsGalleryNonstdRepository } from '../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.repository';
import { AsbBpsGalleryNonstdRepositoryImpl } from '../../infrastructure/asb_bps_gallery_nonstd/repositories/asb_bps_gallery_nonstd.repository.impl';
import { AsbBpsGalleryNonstdService } from '../../domain/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.service';
import { AsbBpsGalleryNonstdServiceImpl } from 'src/application/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.service.impl';
import { ValidateFileUploadUseCase } from '../../application/asb_bps_gallery_nonstd/use_cases/validate_file_upload.use_case';
import { EnsureUploadDirectoryUseCase } from '../../application/asb_bps_gallery_nonstd/use_cases/ensure_upload_directory.use_case';
import { GenerateFilenameUseCase } from '../../application/asb_bps_gallery_nonstd/use_cases/generate_filename.use_case';
import { SaveFileUseCase } from '../../application/asb_bps_gallery_nonstd/use_cases/save_file.use_case';
import { DeleteFileUseCase } from '../../application/asb_bps_gallery_nonstd/use_cases/delete_file.use_case';
import { AsbBpsGalleryNonstdController } from './asb_bps_gallery_nonstd.controller';
import { AsbKomponenBangunanStdModule } from '../asb_komponen_bangunan_std/asb_komponen_bangunan_std.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBpsGalleryNonstdOrmEntity]),
        MulterModule.register({
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB
            },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                ];
                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type. Only images are allowed.'), false);
                }
            },
        }),
        AsbKomponenBangunanStdModule,
    ],
    controllers: [AsbBpsGalleryNonstdController],
    providers: [
        {
            provide: AsbBpsGalleryNonstdRepository,
            useClass: AsbBpsGalleryNonstdRepositoryImpl,
        },
        {
            provide: AsbBpsGalleryNonstdService,
            useClass: AsbBpsGalleryNonstdServiceImpl,
        },
        ValidateFileUploadUseCase,
        EnsureUploadDirectoryUseCase,
        GenerateFilenameUseCase,
        SaveFileUseCase,
        DeleteFileUseCase,
    ],
    exports: [AsbBpsGalleryNonstdService],
})
export class AsbBpsGalleryNonstdModule { }
