import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsulanSaluranStatus1770300000001 implements MigrationInterface {
    name = 'CreateUsulanSaluranStatus1770300000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_saluran_status" (
                "id" SERIAL PRIMARY KEY,
                "status" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_status_status" ON "usulan_saluran_status" ("status");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_status_deleted" ON "usulan_saluran_status" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_saluran_status_updated_at') THEN
                    CREATE TRIGGER set_usulan_saluran_status_updated_at
                    BEFORE UPDATE ON "usulan_saluran_status"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_usulan_saluran_status_updated_at ON "usulan_saluran_status";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_status_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_status_status";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_saluran_status";`);
    }
}
