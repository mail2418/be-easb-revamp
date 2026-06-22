import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserProfiles1771000000000 implements MigrationInterface {
    name = 'CreateUserProfiles1771000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_profiles" (
                "id" SERIAL PRIMARY KEY,
                "id_user" INTEGER NOT NULL UNIQUE,
                "nama" VARCHAR(255) NOT NULL,
                "nip" VARCHAR(50) NULL,
                "photo_path" VARCHAR(500) NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "fk_user_profiles_user" FOREIGN KEY ("id_user")
                    REFERENCES "users"("id") ON DELETE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_user_profiles_id_user" ON "user_profiles" ("id_user");
        `);

        await queryRunner.query(`
            INSERT INTO "user_profiles" ("id_user", "nama", "nip", "created_at", "updated_at")
            SELECT u.id, u.username, NULL, NOW(), NOW()
            FROM "users" u
            WHERE u.deleted_at IS NULL
              AND NOT EXISTS (
                SELECT 1 FROM "user_profiles" p WHERE p.id_user = u.id
              );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user_profiles";`);
    }
}
