import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanJenisPerkerasan1765000000003 implements MigrationInterface {
    name = 'CreateJalanJenisPerkerasan1765000000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_jenis_perkerasan" (
                "id" SERIAL PRIMARY KEY,
                "jenis_perkerasan" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_jenis_perkerasan_updated_at') THEN
                    CREATE TRIGGER set_jalan_jenis_perkerasan_updated_at
                    BEFORE UPDATE ON "jalan_jenis_perkerasan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jalan_jenis_perkerasan_updated_at ON "jalan_jenis_perkerasan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_jenis_perkerasan";`);
    }
}
