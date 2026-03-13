import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AsbBpsGalleryStdOrmEntity } from '../../infrastructure/asb_bps_gallery_std/orm/asb_bps_gallery_std.orm_entity';
import { AsbBpsGalleryStdRepository } from '../../domain/asb_bps_gallery_std/asb_bps_gallery_std.repository';
import { AsbBpsGalleryStdRepositoryImpl } from '../../infrastructure/asb_bps_gallery_std/repositories/asb_bps_gallery_std.repository.impl';
import { AsbBpsGalleryStdService } from '../../domain/asb_bps_gallery_std/asb_bps_gallery_std.service';
import { AsbBpsGalleryStdServiceImpl } from 'src/application/asb_bps_gallery_std/asb_bps_gallery_std.service.impl';
import { ValidateFileUploadUseCase } from '../../application/asb_bps_gallery_std/use_cases/validate_file_upload.use_case';
import { EnsureUploadDirectoryUseCase } from '../../application/asb_bps_gallery_std/use_cases/ensure_upload_directory.use_case';
import { GenerateFilenameUseCase } from '../../application/asb_bps_gallery_std/use_cases/generate_filename.use_case';
import { SaveFileUseCase } from '../../application/asb_bps_gallery_std/use_cases/save_file.use_case';
import { DeleteFileUseCase } from '../../application/asb_bps_gallery_std/use_cases/delete_file.use_case';
import { AsbBpsGalleryStdController } from './asb_bps_gallery_std.controller';
import { AsbKomponenBangunanStdModule } from '../asb_komponen_bangunan_std/asb_komponen_bangunan_std.module';
import { Express } from 'express';

@Module({
    imports: [
        TypeOrmModule.forFeature([AsbBpsGalleryStdOrmEntity]),
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
    controllers: [AsbBpsGalleryStdController],
    providers: [
        {
            provide: AsbBpsGalleryStdRepository,
            useClass: AsbBpsGalleryStdRepositoryImpl,
        },
        {
            provide: AsbBpsGalleryStdService,
            useClass: AsbBpsGalleryStdServiceImpl,
        },
        ValidateFileUploadUseCase,
        EnsureUploadDirectoryUseCase,
        GenerateFilenameUseCase,
        SaveFileUseCase,
        DeleteFileUseCase,
    ],
    exports: [AsbBpsGalleryStdService],
})
export class AsbBpsGalleryStdModule { }
