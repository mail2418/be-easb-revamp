/**
 * MySQL Data Source Configuration
 * 
 * Used for running migrations with MySQL database.
 * 
 * Usage:
 *   npm run typeorm:mysql migration:run
 *   npm run typeorm:mysql migration:revert
 * 
 * Environment Variables:
 *   DB_URL_MYSQL - MySQL connection URL (preferred)
 *   DB_URL - Fallback if DB_URL_MYSQL is not set
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

// Use DB_URL_MYSQL if available, otherwise fallback to DB_URL
const dbUrl = process.env.DB_URL_MYSQL || process.env.DB_URL;

if (!dbUrl) {
    throw new Error('Database URL not configured. Set DB_URL_MYSQL or DB_URL in .env');
}

export default new DataSource({
    type: 'mysql',
    url: dbUrl,

    entities: ['src/infrastructure/**/orm/*.orm_entity.ts'],

    migrations: ['src/migrations/mysql/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',

    namingStrategy: new SnakeNamingStrategy(),

    synchronize: false,
    logging: ['error', 'warn'],
    
    // MySQL specific settings
    timezone: '+07:00', // Asia/Jakarta
    charset: 'utf8mb4',
});
