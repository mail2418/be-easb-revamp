import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSaluranRuangLingkup1765000000005 implements MigrationInterface {
    name = 'CreateJalanSaluranRuangLingkup1765000000005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_saluran_ruang_lingkup" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "deskripsi_ruang_lingkup" VARCHAR(500) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL,
                CONSTRAINT "FK_jalan_saluran_ruang_lingkup_jenis_usulan"
                    FOREIGN KEY ("id_jenis_usulan") REFERENCES "jenis_usulan"("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_saluran_ruang_lingkup_updated_at') THEN
                    CREATE TRIGGER set_jalan_saluran_ruang_lingkup_updated_at
                    BEFORE UPDATE ON "jalan_saluran_ruang_lingkup"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jalan_saluran_ruang_lingkup_updated_at ON "jalan_saluran_ruang_lingkup";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_saluran_ruang_lingkup";`);
    }
}
