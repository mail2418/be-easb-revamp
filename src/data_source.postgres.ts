/**
 * PostgreSQL Data Source Configuration
 * 
 * Used for running migrations with PostgreSQL database.
 * 
 * Usage:
 *   npm run typeorm:postgres migration:run
 *   npm run typeorm:postgres migration:revert
 * 
 * Environment Variables:
 *   DB_URL_POSTGRES - PostgreSQL connection URL (preferred)
 *   DB_URL - Fallback if DB_URL_POSTGRES is not set
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

// Use DB_URL_POSTGRES if available, otherwise fallback to DB_URL
const dbUrl = process.env.DB_URL_POSTGRES || process.env.DB_URL;

if (!dbUrl) {
    throw new Error('Database URL not configured. Set DB_URL_POSTGRES or DB_URL in .env');
}

const isRender = process.env.NODE_ENV === 'production' && dbUrl.includes('render');

export default new DataSource({
    type: 'postgres',
    url: dbUrl,
    ssl: isRender ? { rejectUnauthorized: false } : false,

    entities: ['src/infrastructure/**/orm/*.orm_entity.ts'],

    // PostgreSQL migrations folder
    migrations: ['src/migrations/postgres/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',

    namingStrategy: new SnakeNamingStrategy(),

    synchronize: false,
    logging: ['error', 'warn'],
    
    extra: {
        options: '-c timezone=Asia/Jakarta'
    },
});
