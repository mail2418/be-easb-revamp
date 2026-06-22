import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedVerifikators1770088000020 implements MigrationInterface {
    name = 'SeedVerifikators1770088000020';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Validate required environment variable
        const seedPassword = process.env.SEED_DEFAULT_PASSWORD;
        
        if (!seedPassword) {
            throw new Error('SEED_DEFAULT_PASSWORD environment variable is required for seeding verifikator users');
        }

        const SALT_ROUNDS = 12;
        const passwordHash = await bcrypt.hash(seedPassword, SALT_ROUNDS);

        const verifikatorsData = [
            { username: 'VerifikatorAdbang1', type: 'ADBANG' },
            { username: 'VerifikatorAdbang2', type: 'ADBANG' },
            { username: 'VerifikatorBpkad1', type: 'BPKAD' },
            { username: 'VerifikatorBpkad2', type: 'BPKAD' },
            { username: 'VerifikatorBappeda1', type: 'BAPPEDA' },
            { username: 'VerifikatorBappeda2', type: 'BAPPEDA' },
        ];

        for (const data of verifikatorsData) {
            // 1. Insert User with ON DUPLICATE KEY UPDATE for MySQL
            await queryRunner.query(
                `INSERT INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE \`updated_at\` = NOW()`,
                [data.username, passwordHash, JSON.stringify(['verifikator'])]
            );

            // 2. Get user ID
            const userResult = await queryRunner.query(
                `SELECT \`id\` FROM \`users\` WHERE \`username\` = ?`,
                [data.username]
            );

            if (!userResult || userResult.length === 0) {
                continue;
            }

            const userId = userResult[0].id;

            // 3. Insert Verifikator with ON DUPLICATE KEY UPDATE
            await queryRunner.query(
                `INSERT INTO \`verifikators\` (\`id_user\`, \`jenis_verifikator\`, \`verifikator\`)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    \`jenis_verifikator\` = VALUES(\`jenis_verifikator\`),
                    \`verifikator\` = VALUES(\`verifikator\`),
                    \`updated_at\` = NOW()`,
                [userId, data.type, data.username]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usernames = [
            'VerifikatorAdbang1', 'VerifikatorAdbang2',
            'VerifikatorBpkad1', 'VerifikatorBpkad2',
            'VerifikatorBappeda1', 'VerifikatorBappeda2'
        ];

        const placeholders = usernames.map(() => '?').join(', ');

        // 1. Get User IDs
        const users = await queryRunner.query(
            `SELECT \`id\` FROM \`users\` WHERE \`username\` IN (${placeholders})`,
            usernames
        );

        const userIds = users.map((u: any) => u.id);

        if (userIds.length > 0) {
            const userIdPlaceholders = userIds.map(() => '?').join(', ');
            // 2. Delete from verifikators 
            await queryRunner.query(
                `DELETE FROM \`verifikators\` WHERE \`id_user\` IN (${userIdPlaceholders})`,
                userIds
            );
        }

        // 3. Delete users
        await queryRunner.query(
            `DELETE FROM \`users\` WHERE \`username\` IN (${placeholders})`,
            usernames
        );
    }
}
