import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOpds1764081297396 implements MigrationInterface {
    name = 'CreateOpds1764081297396';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "opds" (
                "id" SERIAL PRIMARY KEY,
                "opd" VARCHAR(255) NOT NULL UNIQUE,
                "alias" VARCHAR(50) NOT NULL,
                "id_user" INTEGER NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_opds_opd" ON "opds" ("opd");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_opds_alias" ON "opds" ("alias");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_opds_id_user" ON "opds" ("id_user");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_opds_deleted" ON "opds" ("deleted_at");
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "idx_opds_id_user_unique" ON "opds" ("id_user") WHERE "deleted_at" IS NULL;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_opds_updated_at') THEN
                    CREATE TRIGGER set_opds_updated_at
                    BEFORE UPDATE ON "opds"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "opds" ADD CONSTRAINT "fk_opds_id_user" 
            FOREIGN KEY ("id_user") REFERENCES "users" ("id") 
            ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "opds" DROP CONSTRAINT IF EXISTS "fk_opds_id_user";`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_opds_updated_at ON "opds";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_opds_id_user_unique";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_opds_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_opds_id_user";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_opds_alias";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_opds_opd";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "opds";`);
    }
}
