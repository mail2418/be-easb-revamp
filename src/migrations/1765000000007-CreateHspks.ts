import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHspks1765000000007 implements MigrationInterface {
    name = 'CreateHspks1765000000007';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "hspks" (
                "id" SERIAL PRIMARY KEY,
                "id_ruang_lingkup" INTEGER NOT NULL,
                "tahun_anggaran" INTEGER NOT NULL,
                "no_mata_pembayaran" VARCHAR(100) NOT NULL DEFAULT '',
                "satuan" VARCHAR(100) NOT NULL DEFAULT '',
                "harga_satuan" DECIMAL(15,2) NOT NULL DEFAULT 0,
                "uraian" TEXT NOT NULL DEFAULT '',
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL,
                CONSTRAINT "FK_hspks_ruang_lingkup"
                    FOREIGN KEY ("id_ruang_lingkup") REFERENCES "jalan_saluran_ruang_lingkup"("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_hspks_tahun_anggaran" ON "hspks" ("tahun_anggaran");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_hspks_updated_at') THEN
                    CREATE TRIGGER set_hspks_updated_at
                    BEFORE UPDATE ON "hspks"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_hspks_updated_at ON "hspks";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_hspks_tahun_anggaran";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "hspks";`);
    }
}
