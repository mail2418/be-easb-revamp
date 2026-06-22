import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSaluranSpesifikasiDesainTable1770300000006 implements MigrationInterface {
    name = 'CreateSaluranSpesifikasiDesainTable1770300000006';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_spesifikasi_desain" (
                "id" SERIAL PRIMARY KEY,
                "id_usulan_saluran" INTEGER NOT NULL,
                "id_ruang_lingkup" INTEGER NOT NULL,
                "id_hspk" INTEGER NOT NULL,
                "volume" DOUBLE PRECISION NOT NULL,
                "spasi" DOUBLE PRECISION NOT NULL,
                "tinggi" DOUBLE PRECISION NOT NULL,
                "harga_spec" DOUBLE PRECISION NOT NULL,
                "keterangan_tambahan" TEXT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_desain"
            ADD CONSTRAINT "fk_saluran_spesifikasi_desain_usulan_saluran"
            FOREIGN KEY ("id_usulan_saluran")
            REFERENCES "usulan_saluran"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_desain"
            ADD CONSTRAINT "fk_saluran_spesifikasi_desain_ruang_lingkup"
            FOREIGN KEY ("id_ruang_lingkup")
            REFERENCES "jalan_saluran_ruang_lingkup"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_desain"
            ADD CONSTRAINT "fk_saluran_spesifikasi_desain_hspk"
            FOREIGN KEY ("id_hspk")
            REFERENCES "hspk"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_usulan_saluran"
            ON "saluran_spesifikasi_desain" ("id_usulan_saluran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_ruang_lingkup"
            ON "saluran_spesifikasi_desain" ("id_ruang_lingkup");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_hspk"
            ON "saluran_spesifikasi_desain" ("id_hspk");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_deleted"
            ON "saluran_spesifikasi_desain" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_saluran_spesifikasi_desain_updated_at') THEN
                    CREATE TRIGGER set_saluran_spesifikasi_desain_updated_at
                    BEFORE UPDATE ON "saluran_spesifikasi_desain"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_saluran_spesifikasi_desain_updated_at ON "saluran_spesifikasi_desain";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_hspk";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_ruang_lingkup";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_usulan_saluran";`);
        await queryRunner.query(`ALTER TABLE "saluran_spesifikasi_desain" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_desain_hspk";`);
        await queryRunner.query(`ALTER TABLE "saluran_spesifikasi_desain" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_desain_ruang_lingkup";`);
        await queryRunner.query(`ALTER TABLE "saluran_spesifikasi_desain" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_desain_usulan_saluran";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_desain";`);
    }
}
