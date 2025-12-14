import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsulanJalanStatus1765690922855 implements MigrationInterface {
    name = 'CreateUsulanJalanStatus1765690922855';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_jalan_status" (
                "id" SERIAL PRIMARY KEY,
                "status" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_status_status" ON "usulan_jalan_status" ("status");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_status_deleted" ON "usulan_jalan_status" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_jalan_status_updated_at') THEN
                    CREATE TRIGGER set_usulan_jalan_status_updated_at
                    BEFORE UPDATE ON "usulan_jalan_status"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_usulan_jalan_status_updated_at ON "usulan_jalan_status";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_jalan_status_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_jalan_status_status";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_jalan_status";`);
    }
}

