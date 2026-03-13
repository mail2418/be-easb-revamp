import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (config: ConfigService): DataSourceOptions => {
    const url = config.get<string | undefined>('db.url');
    const isRender = config.get<string | undefined>('db.isRender');

    if (url) {
        // ✅ PRODUCTION: use connection string only
        return {
            type: 'postgres',
            url,
            ssl: isRender ? { rejectUnauthorized: false } : false,

            entities: [__dirname + '/../infrastructure/**/orm/*.orm_entity{.ts,.js}'],
            synchronize: false,
            migrationsRun: true,
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        };
    }

    // ✅ DEVELOPMENT: use discrete host/port/etc
    return {
        type: 'postgres',
        url: config.get('db.url'),
        ssl: isRender ? { rejectUnauthorized: false } : false,
        entities: [__dirname + '/../infrastructure/**/orm/*.orm_entity{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    };
};
