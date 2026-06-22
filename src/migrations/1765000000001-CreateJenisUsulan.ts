import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJenisUsulan1765000000001 implements MigrationInterface {
    name = 'CreateJenisUsulan1765000000001';

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
        await queryRunner.query(`DROP TABLE IF EXISTS "jenis_usulan";`);
    }
}
