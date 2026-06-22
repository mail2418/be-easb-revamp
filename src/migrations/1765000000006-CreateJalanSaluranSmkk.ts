import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSaluranSmkk1765000000006 implements MigrationInterface {
    name = 'CreateJalanSaluranSmkk1765000000006';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_saluran_smkk" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "no_mata_pembayaran" VARCHAR(100) NOT NULL DEFAULT '',
                "satuan" VARCHAR(100) NOT NULL DEFAULT '',
                "uraian" TEXT NOT NULL DEFAULT '',
                "pengali" DECIMAL(15,4) NOT NULL DEFAULT 1,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL,
                CONSTRAINT "FK_jalan_saluran_smkk_jenis_usulan"
                    FOREIGN KEY ("id_jenis_usulan") REFERENCES "jenis_usulan"("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION
            );
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_saluran_smkk_updated_at') THEN
                    CREATE TRIGGER set_jalan_saluran_smkk_updated_at
                    BEFORE UPDATE ON "jalan_saluran_smkk"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_jalan_saluran_smkk_updated_at ON "jalan_saluran_smkk";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_saluran_smkk";`);
    }
}
