/**
 * Dynamic Data Source Configuration
 * 
 * Automatically selects PostgreSQL or MySQL based on DB_TYPE environment variable.
 * 
 * Usage:
 *   npm run typeorm migration:run
 *   npm run typeorm migration:revert
 * 
 * For database-specific commands, use:
 *   npm run typeorm:postgres migration:run  (PostgreSQL only)
 *   npm run typeorm:mysql migration:run     (MySQL only)
 * 
 * Environment Variables:
 *   DB_TYPE - 'postgres' (default) or 'mysql'
 *   DB_URL - Connection URL (used when specific URLs not set)
 *   DB_URL_POSTGRES - PostgreSQL specific URL (optional)
 *   DB_URL_MYSQL - MySQL specific URL (optional)
 */

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const dbType = (process.env.DB_TYPE || 'postgres') as 'postgres' | 'mysql';

// Select the appropriate URL based on DB_TYPE
const getDbUrl = (): string => {
    if (dbType === 'mysql') {
        const url = process.env.DB_URL_MYSQL || process.env.DB_URL;
        if (!url) throw new Error('Database URL not configured. Set DB_URL_MYSQL or DB_URL in .env');
        return url;
    }
    
    // Default: PostgreSQL
    const url = process.env.DB_URL_POSTGRES || process.env.DB_URL;
    if (!url) throw new Error('Database URL not configured. Set DB_URL_POSTGRES or DB_URL in .env');
    return url;
};

const dbUrl = getDbUrl();
const isRender = process.env.NODE_ENV === 'production' && dbUrl.includes('render');

// Build configuration based on DB_TYPE
const getDataSourceOptions = (): DataSourceOptions => {
    if (dbType === 'mysql') {
        return {
            type: 'mysql',
            url: dbUrl,
            entities: ['src/infrastructure/**/orm/*.orm_entity.ts'],
            migrations: ['src/migrations/mysql/*{.ts,.js}'],
            migrationsTableName: 'typeorm_migrations',
            namingStrategy: new SnakeNamingStrategy(),
            synchronize: false,
            logging: ['error', 'warn'],
            timezone: '+07:00',
            charset: 'utf8mb4',
        };
    }

    // Default: PostgreSQL
    return {
        type: 'postgres',
        url: dbUrl,
        ssl: isRender ? { rejectUnauthorized: false } : false,
        entities: ['src/infrastructure/**/orm/*.orm_entity.ts'],
        migrations: ['src/migrations/postgres/*{.ts,.js}'],
        migrationsTableName: 'typeorm_migrations',
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
        logging: ['error', 'warn'],
        extra: {
            options: '-c timezone=Asia/Jakarta',
        },
    };
};

export default new DataSource(getDataSourceOptions());
