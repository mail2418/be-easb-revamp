import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';

import { AuthModule } from './presentation/auth/auth.module';
import { UserModule } from './presentation/users/user.module';
import { UserProfileModule } from './presentation/user_profile/user_profile.module';
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
import { JalanJenisPerkerasanModule } from './presentation/jalan_jenis_perkerasan/jalan_jenis_perkerasan.module';
import { UsulanJalanStatusModule } from './presentation/usulan_jalan_status/usulan_jalan_status.module';
import { UsulanJalanModule } from './presentation/usulan_jalan/usulan_jalan.module';
import { UsulanSaluranModule } from './presentation/usulan_saluran/usulan_saluran.module';
import { JalanJenisPemeliharaanModule } from './presentation/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.module';
import { PpnGlobalModule } from './presentation/ppn_global/ppn_global.module';
import { SmkkGlobalModule } from './presentation/smkk_global/smkk_global.module';
import { JalanKebijakanModule } from './presentation/jalan_kebijakan/jalan_kebijakan.module';
import { JenisUsulanModule } from './presentation/jenis_usulan/jenis_usulan.module';
import { JalanSaluranRuangLingkupModule } from './presentation/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.module';
import { JalanSaluranSmkkModule } from './presentation/jalan_saluran_smkk/jalan_saluran_smkk.module';
import { HspkModule } from './presentation/hspk/hspk.module';
import { MainDashboardModule } from './presentation/main_dashboard/main_dashboard.module';
import { HealthModule } from './presentation/health/health.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ResponseCaptureInterceptor } from './common/interceptors/response_capture.interceptors';
import { DataSourceOptions } from 'typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// import module lain sesuai kebutuhan

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService): DataSourceOptions => {
                const dbType = config.get<'postgres' | 'mysql'>('db.type') || 'postgres';
                const url = config.get<string | undefined>('db.url');

                if (!url) {
                    throw new Error('Database URL not configured. Set DB_URL in .env');
                }

                // Common configuration for both databases
                const commonConfig = {
                    url,
                    entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.js,.ts}'],
                    synchronize: false,
                    migrationsRun: false,
                    namingStrategy: new SnakeNamingStrategy(),
                    logging: ['error', 'warn'] as ('error' | 'warn')[],
                };

                // MySQL Configuration
                if (dbType === 'mysql') {
                    return {
                        ...commonConfig,
                        type: 'mysql',
                        migrations: [__dirname + '/migrations/mysql/*{.js,.ts}'],
                        timezone: '+07:00', // Asia/Jakarta
                        charset: 'utf8mb4',
                    };
                }

                // PostgreSQL Configuration (default)
                const isRender = config.get<boolean>('db.isRender');
                return {
                    ...commonConfig,
                    type: 'postgres',
                    ssl: isRender ? { rejectUnauthorized: false } : false,
                    migrations: [__dirname + '/migrations/postgres/*{.js,.ts}'],
                    extra: {
                        options: '-c timezone=Asia/Jakarta',
                    },
                };
            },
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        UserProfileModule,
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
        KelurahanModule,
        JalanJenisPerkerasanModule,
        UsulanJalanStatusModule,
        UsulanJalanModule,
        UsulanSaluranModule,
        JalanJenisPemeliharaanModule,
        PpnGlobalModule,
        SmkkGlobalModule,
        JalanKebijakanModule,
        JenisUsulanModule,
        JalanSaluranRuangLingkupModule,
        JalanSaluranSmkkModule,
        HspkModule,
        MainDashboardModule,
        HealthModule,
        PrometheusModule.register({
            path: '/metrics',
            defaultMetrics: {
                enabled: true,
            },
        }),
        ThrottlerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => [
                {
                    ttl: config.get<number>('throttler.ttl', 60000),
                    limit: config.get<number>('throttler.limit', 100),
                },
            ],
        }),
        // other modules...
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseCaptureInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
