import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcryptjs';

export class SeedUsers1762602188283 implements MigrationInterface {
    name = 'SeedUsers1762602188283';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Validate required environment variables
        const superadminPassword = process.env.SUPERADMIN_DEFAULT_PASSWORD;
        const seedPassword = process.env.SEED_DEFAULT_PASSWORD;

        if (!superadminPassword) {
            throw new Error(
                'SUPERADMIN_DEFAULT_PASSWORD environment variable is required for seeding superadmin user',
            );
        }

        if (!seedPassword) {
            throw new Error(
                'SEED_DEFAULT_PASSWORD environment variable is required for seeding default users',
            );
        }

        const SALT_ROUNDS = 12;

        // Insert superadmin with SUPERADMIN_DEFAULT_PASSWORD
        await queryRunner.query(
            `INSERT INTO "users" ("username","password_hash","roles")
       VALUES ($1, $2, $3)
       ON CONFLICT ("username") DO NOTHING`,
            [
                'superadmin',
                await bcrypt.hash(superadminPassword, SALT_ROUNDS),
                ['superadmin', 'admin', 'verifikator', 'opd', 'guest'],
            ],
        );

        // Insert other users with SEED_DEFAULT_PASSWORD
        await queryRunner.query(
            `INSERT INTO "users" ("username","password_hash","roles")
            VALUES ($1, $2, $3)
            ON CONFLICT ("username") DO NOTHING`,
            ['admin', await bcrypt.hash(seedPassword, SALT_ROUNDS), ['admin']],
        );

        await queryRunner.query(
            `INSERT INTO "users" ("username","password_hash","roles")
            VALUES ($1, $2, $3)
            ON CONFLICT ("username") DO NOTHING`,
            ['verifikator', await bcrypt.hash(seedPassword, SALT_ROUNDS), ['verifikator']],
        );

        await queryRunner.query(
            `INSERT INTO "users" ("username","password_hash","roles")
            VALUES ($1, $2, $3)
            ON CONFLICT ("username") DO NOTHING`,
            ['opd', await bcrypt.hash(seedPassword, SALT_ROUNDS), ['opd']],
        );

        await queryRunner.query(
            `INSERT INTO "users" ("username","password_hash","roles")
            VALUES ($1, $2, $3)
            ON CONFLICT ("username") DO NOTHING`,
            ['guest', await bcrypt.hash(seedPassword, SALT_ROUNDS), ['guest']],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const username = process.env.SEED_ADMIN_USERNAME ?? 'superadmin';
        await queryRunner.query(`DELETE FROM "users" WHERE "username" = $1`, [username]);
    }
}
