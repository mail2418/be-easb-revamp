import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validationSchema } from './config/validation';
import configuration from './config/configuration';

import { AuthModule } from './presentation/auth/auth.module';
import { UserModule } from './presentation/users/user.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseCaptureInterceptor } from './common/interceptors/response_capture.interceptors';

// import module lain sesuai kebutuhan

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('db.host'),
                port: config.get<number>('db.port'),
                username: config.get('db.username'),
                password: config.get('db.password'),
                database: config.get('db.name'),
                entities: [__dirname + '/infrastructure/**/orm/*.orm_entity{.ts,.js}'],
                synchronize: false, // always false in production
                migrationsRun: true,
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        UserModule,
        // other modules...
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseCaptureInterceptor },
    ],
})
export class AppModule {}
