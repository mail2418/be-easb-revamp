import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export class SeedVerifikators1764955227945 implements MigrationInterface {
    name = 'SeedVerifikators1764955227945';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHash = await bcrypt.hash('12345678', 10);

        const verifikatorsData = [
            { username: 'VerifikatorAdbang1', type: 'ADBANG' },
            { username: 'VerifikatorAdbang2', type: 'ADBANG' },
            { username: 'VerifikatorBpkad1', type: 'BPKAD' },
            { username: 'VerifikatorBpkad2', type: 'BPKAD' },
            { username: 'VerifikatorBappeda1', type: 'BAPPEDA' },
            { username: 'VerifikatorBappeda2', type: 'BAPPEDA' },
        ];

        for (const data of verifikatorsData) {
            // 1. Insert User
            // We use RETURNING id to get the new user's ID
            const userResult = await queryRunner.query(
                `INSERT INTO "users" ("username", "password_hash", "roles", "created_at", "updated_at")
                 VALUES ($1, $2, $3, DEFAULT, DEFAULT)
                 ON CONFLICT ("username") DO UPDATE SET "updated_at" = NOW()
                 RETURNING "id"`,
                [data.username, passwordHash, ['verifikator']]
            );

            // If user already existed and ON CONFLICT DO UPDATE happened, userResult might still contain the ID.
            // If ON CONFLICT DO NOTHING was used, it wouldn't return anything if conflict.
            // But here I used DO UPDATE so it should return. 
            // However, to be safe and idempotent if run multiple times, let's fetch ID if not returned.

            let userId: number;

            if (userResult && userResult.length > 0) {
                userId = userResult[0].id;
            } else {
                // Fallback if RETURNING didn't work (unlikely with DO UPDATE) or logic differs
                const checkUser = await queryRunner.query(
                    `SELECT "id" FROM "users" WHERE "username" ILIKE $1`,
                    [data.username]
                );
                if (checkUser && checkUser.length > 0) {
                    userId = checkUser[0].id;
                } else {
                    console.error(`Failed to retrieve ID for user ${data.username}`);
                    continue;
                }
            }

            // 2. Insert Verifikator
            await queryRunner.query(
                `INSERT INTO "verifikators" ("id_user", "jenis_verifikator", "verifikator", "created_at", "updated_at")
                 VALUES ($1, $2, $3, DEFAULT, DEFAULT)
                 ON CONFLICT ("id_user") DO UPDATE SET 
                    "jenis_verifikator" = EXCLUDED."jenis_verifikator",
                    "verifikator" = EXCLUDED."verifikator",
                    "updated_at" = NOW()`,
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

        // 1. Get User IDs
        const users = await queryRunner.query(
            `SELECT "id" FROM "users" WHERE "username" IN ($1, $2, $3, $4, $5, $6)`,
            usernames
        );

        const userIds = users.map((u: any) => u.id);

        if (userIds.length > 0) {
            // 2. Delete from verifikators 
            // (Actually CASCADE on users delete would handle this, but explicit is fine)
            await queryRunner.query(
                `DELETE FROM "verifikators" WHERE "id_user" = ANY($1)`,
                [userIds]
            );
        }

        // 3. Delete users
        await queryRunner.query(
            `DELETE FROM "users" WHERE "username" IN ($1, $2, $3, $4, $5, $6)`,
            usernames
        );
    }
}
