import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanJenisPemeliharaan1765000000004 implements MigrationInterface {
    name = 'CreateJalanJenisPemeliharaan1765000000004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_jenis_pemeliharaan" (
                "id" SERIAL PRIMARY KEY,
                "tingkat_pemeliharaan" VARCHAR(255) NOT NULL DEFAULT '',
                "jenis_pemeliharaan" VARCHAR(255) NOT NULL DEFAULT '',
                "ruang_lingkup" VARCHAR(255) NOT NULL DEFAULT '',
                "deskripsi" TEXT NOT NULL DEFAULT '',
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_jenis_pemeliharaan_updated_at') THEN
                    CREATE TRIGGER set_jalan_jenis_pemeliharaan_updated_at
                    BEFORE UPDATE ON "jalan_jenis_pemeliharaan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jalan_jenis_pemeliharaan_updated_at ON "jalan_jenis_pemeliharaan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_jenis_pemeliharaan";`);
    }
}
