import { MigrationInterface, QueryRunner } from 'typeorm';
import bcrypt from 'bcryptjs';

export class SeedUsers1770088000001 implements MigrationInterface {
    name = 'SeedUsers1770088000001';

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
        // Using INSERT IGNORE for MySQL (equivalent to ON CONFLICT DO NOTHING)
        // roles is stored as JSON string for simple-json column type
        await queryRunner.query(
            `INSERT IGNORE INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
             VALUES (?, ?, ?)`,
            [
                'superadmin',
                await bcrypt.hash(superadminPassword, SALT_ROUNDS),
                JSON.stringify(['superadmin', 'admin', 'verifikator', 'opd', 'guest']),
            ],
        );

        // Insert other users with SEED_DEFAULT_PASSWORD
        await queryRunner.query(
            `INSERT IGNORE INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
             VALUES (?, ?, ?)`,
            ['admin', await bcrypt.hash(seedPassword, SALT_ROUNDS), JSON.stringify(['admin'])],
        );

        await queryRunner.query(
            `INSERT IGNORE INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
             VALUES (?, ?, ?)`,
            [
                'verifikator',
                await bcrypt.hash(seedPassword, SALT_ROUNDS),
                JSON.stringify(['verifikator']),
            ],
        );

        await queryRunner.query(
            `INSERT IGNORE INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
             VALUES (?, ?, ?)`,
            ['opd', await bcrypt.hash(seedPassword, SALT_ROUNDS), JSON.stringify(['opd'])],
        );

        await queryRunner.query(
            `INSERT IGNORE INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
             VALUES (?, ?, ?)`,
            ['guest', await bcrypt.hash(seedPassword, SALT_ROUNDS), JSON.stringify(['guest'])],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`users\` WHERE \`username\` IN ('superadmin', 'admin', 'verifikator', 'opd', 'guest')`,
        );
    }
}
