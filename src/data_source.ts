import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const isRender = process.env.NODE_ENV === 'production' && process.env.DB_URL?.includes('render');

export default new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    ssl: isRender ? { rejectUnauthorized: false } : false,

    // SESUAIKAN dengan penamaan file entity kamu (sudah kita sarankan pakai *.orm-entity.ts)
    entities: ['src/infrastructure/**/orm/*.orm_entity.ts'],

    migrations: ['src/migrations/*{.ts,.js}'],
    migrationsTableName: 'typeorm_migrations',

    // optional, tapi sangat disarankan agar snake_case konsisten
    namingStrategy: new SnakeNamingStrategy(),

    // Tidak pakai synchronize di CLI; migrasi yang handle
    synchronize: false,
    logging: ['error', 'warn'],
});