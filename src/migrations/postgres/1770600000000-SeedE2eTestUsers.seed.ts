import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedE2eTestUsers1770600000000 implements MigrationInterface {
    name = 'SeedE2eTestUsers1770600000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const seedPassword = process.env.SEED_DEFAULT_PASSWORD;

        if (!seedPassword) {
            throw new Error(
                'SEED_DEFAULT_PASSWORD environment variable is required for seeding E2E users',
            );
        }

        const hashedPassword = await bcrypt.hash(seedPassword, 12);

        const e2eOpdUsers = [
            {
                username: 'E2E_UserBPD',
                opd: 'Badan Pendapatan Daerah (E2E Test)',
                alias: 'BPD',
            },
            {
                username: 'E2E_UserDPUDPR',
                opd: 'Dinas Pekerjaan Umum Dan Penataan Ruang (E2E Test)',
                alias: 'DPUDPR',
            },
        ];

        for (const data of e2eOpdUsers) {
            await queryRunner.query(
                `
                INSERT INTO "users" ("username", "password_hash", "roles")
                VALUES ($1, $2, ARRAY['opd'])
                ON CONFLICT ("username") DO NOTHING
            `,
                [data.username, hashedPassword],
            );

            const userResult = await queryRunner.query(
                `
                SELECT id FROM "users" WHERE "username" = $1
            `,
                [data.username],
            );

            if (userResult.length > 0) {
                const userId = userResult[0].id;

                await queryRunner.query(
                    `
                    INSERT INTO "opds" ("opd", "alias", "id_user")
                    VALUES ($1, $2, $3)
                    ON CONFLICT ("opd") DO NOTHING
                `,
                    [data.opd, data.alias, userId],
                );
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usernames = ['E2E_UserBPD', 'E2E_UserDPUDPR'];

        for (const username of usernames) {
            const userResult = await queryRunner.query(
                `
                SELECT id FROM "users" WHERE "username" = $1
            `,
                [username],
            );

            if (userResult.length > 0) {
                const userId = userResult[0].id;
                await queryRunner.query(`DELETE FROM "opds" WHERE "id_user" = $1`, [userId]);
            }
        }

        await queryRunner.query(
            `
            DELETE FROM "users" WHERE "username" = ANY($1)
        `,
            [usernames],
        );
    }
}
