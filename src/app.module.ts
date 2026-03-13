import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';

import { AuthModule } from './presentation/auth/auth.module';
import { UserModule } from './presentation/users/user.module';
import { ProvinceModule } from './presentation/provinces/province.module';
import { KabKotaModule } from './presentation/kabkota/kabkota.module';
import { SatuanModule } from './presentation/satuan/satuan.module';
import { AsbFungsiRuangModule } from './presentation/asb_fungsi_ruang/asb_fungsi_ruang.module';
import { AsbJenisModule } from './presentation/asb_jenis/asb_jenis.module';
import { AsbLantaiModule } from './presentation/asb_lantai/asb_lantai.module';
import { AsbStatusModule } from './presentation/asb_status/asb_status.module';
import { RekeningModule } from './presentation/rekening/rekening.module';
import { JenisStandarModule } from './presentation/jenis_standar/jenis_standar.module';
import { AsbTipeBangunanModule } from './presentation/asb_tipe_bangunan/asb_tipe_bangunan.module';
import { AsbKlasifikasiModule } from './presentation/asb_klasifikasi/asb_klasifikasi.module';
import { ShstModule } from './presentation/shst/shst.module';
import { AsbKomponenBangunanStdModule } from './presentation/asb_komponen_bangunan_std/asb_komponen_bangunan_std.module';
import { AsbKomponenBangunanNonstdModule } from './presentation/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.module';
import { AsbKomponenBangunanProsStdModule } from './presentation/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.module';
import { AsbKomponenBangunanProsNonstdModule } from './presentation/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.module';
import { AsbJakonModule } from './presentation/asb_jakon/asb_jakon.module';
import { AsbBpsGalleryStdModule } from './presentation/asb_bps_gallery_std/asb_bps_gallery_std.module';
import { AsbBpsGalleryNonstdModule } from './presentation/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.module';
import { AsbDocumentModule } from './presentation/asb_document/asb_document.module';
import { AsbLogModule } from './presentation/asb_log/asb_log.module';
import { AsbDetailModule } from './presentation/asb_detail/asb_detail.module';
import { AsbBipekStandardModule } from './presentation/asb_bipek_standard/asb_bipek_standard.module';
import { AsbBipekNonStdModule } from './presentation/asb_bipek_non_std/asb_bipek_non_std.module';
import { AsbDetailReviewModule } from './presentation/asb_detail_review/asb_detail_review.module';
import { AsbBipekStandardReviewModule } from './presentation/asb_bipek_standard_review/asb_bipek_standard_review.module';
import { AsbBipekNonStdReviewModule } from './presentation/asb_bipek_non_std_review/asb_bipek_non_std_review.module';
import { AsbModule } from './presentation/asb/asb.module';
import { OpdModule } from './presentation/opd/opd.module';
import { VerifikatorModule } from './presentation/verifikator/verifikator.module';
import { StandardKlasifikasiModule } from './presentation/standard_klasifikasi/standard_klasifikasi.module';
import { KecamatanModule } from './presentation/kecamatan/kecamatan.module';
import { KelurahanModule } from './presentation/kelurahan/kelurahan.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseCaptureInterceptor } from './common/interceptors/response_capture.interceptors';
import { DataSourceOptions } from 'typeorm';

// import module lain sesuai kebutuhan

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService): DataSourceOptions => {
                const url = config.get<string | undefined>('db.url');

                // If DB_URL is set (production) → use connection string
                if (url) {
                    return {
                        type: 'postgres',
                        url,
                        entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.js,.ts}'],
                        synchronize: false,
                        migrationsRun: false,
                        migrations: [__dirname + '/migrations/*{.js,.ts}'],
                    };
                }

                // Otherwise (development) → use host/port/etc
                return {
                    type: 'postgres',
                    url: config.get('db.url'),
                    entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.ts,.js}'],
                    synchronize: false, // always false in production
                    migrationsRun: false,
                    migrations: [__dirname + '/migrations/*{.js,.ts}'],
                };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        ProvinceModule,
        KabKotaModule,
        SatuanModule,
        AsbFungsiRuangModule,
        AsbJenisModule,
        AsbLantaiModule,
        RekeningModule,
        AsbStatusModule,
        JenisStandarModule,
        AsbTipeBangunanModule,
        AsbKlasifikasiModule,
        ShstModule,
        AsbKomponenBangunanStdModule,
        AsbKomponenBangunanNonstdModule,
        AsbKomponenBangunanProsStdModule,
        AsbKomponenBangunanProsNonstdModule,
        AsbJakonModule,
        AsbBpsGalleryStdModule,
        AsbBpsGalleryNonstdModule,
        AsbDocumentModule,
        AsbLogModule,
        AsbDetailModule,
        AsbBipekStandardModule,
        AsbBipekNonStdModule,
        AsbDetailReviewModule,
        AsbBipekStandardReviewModule,
        AsbBipekNonStdReviewModule,
        AsbModule,
        OpdModule,
        VerifikatorModule,
        StandardKlasifikasiModule,
        AsbJakonModule,
        KecamatanModule,
        KelurahanModule
        // other modules...
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseCaptureInterceptor },
    ],
})
export class AppModule { }
