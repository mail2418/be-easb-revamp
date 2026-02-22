import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJenisUsulanTable1763805006428 implements MigrationInterface {
    name = 'CreateJenisUsulanTable1763805006428';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jenis_usulan" (
                "id" SERIAL PRIMARY KEY,
                "jenis" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jenis_usulan_jenis" 
            ON "jenis_usulan" ("jenis");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jenis_usulan_deleted" 
            ON "jenis_usulan" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jenis_usulan_updated_at') THEN
                    CREATE TRIGGER set_jenis_usulan_updated_at
                    BEFORE UPDATE ON "jenis_usulan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jenis_usulan_updated_at ON "jenis_usulan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jenis_usulan_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jenis_usulan_jenis";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jenis_usulan";`);
    }
}

