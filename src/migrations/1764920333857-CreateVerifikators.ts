import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVerifikators1764920333857 implements MigrationInterface {
    name = 'CreateVerifikators1764920333857';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type for jenis_verifikator
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE "jenis_verifikator_enum" AS ENUM('ADBANG', 'BPKAD', 'BAPPEDA');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create verifikators table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "verifikators" (
                "id" SERIAL PRIMARY KEY,
                "id_user" INTEGER NOT NULL UNIQUE,
                "jenis_verifikator" "jenis_verifikator_enum" NOT NULL,
                "verifikator" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            )
        `);

        // Add foreign key constraint to users table
        await queryRunner.query(`
            ALTER TABLE "verifikators"
            ADD CONSTRAINT "FK_verifikators_user"
            FOREIGN KEY ("id_user")
            REFERENCES "users"("id")
            ON DELETE CASCADE
            ON UPDATE NO ACTION
        `);

        // Add index on id_user for performance
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_verifikators_id_user"
            ON "verifikators" ("id_user")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop index
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_verifikators_id_user"
        `);

        // Drop foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "verifikators"
            DROP CONSTRAINT "FK_verifikators_user"
        `);

        // Drop table
        await queryRunner.query(`
            DROP TABLE IF EXISTS "verifikators"
        `);

        // Drop enum type
        await queryRunner.query(`
            DROP TYPE IF EXISTS "jenis_verifikator_enum"
        `);
    }
}
