import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSaluranSpesifikasiDesainReviewTable1770300000007 implements MigrationInterface {
    name = 'CreateSaluranSpesifikasiDesainReviewTable1770300000007';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_spesifikasi_desain_review" (
                "id" SERIAL PRIMARY KEY,
                "id_usulan_saluran" INTEGER NOT NULL,
                "id_ruang_lingkup" INTEGER NOT NULL,
                "id_hspk" INTEGER NOT NULL,
                "volume_review" DOUBLE PRECISION NOT NULL,
                "spasi_review" DOUBLE PRECISION NOT NULL,
                "tinggi_review" DOUBLE PRECISION NOT NULL,
                "harga_spec_review" DOUBLE PRECISION NOT NULL,
                "keterangan_tambahan_review" TEXT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_desain_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_desain_review_usulan_saluran"
            FOREIGN KEY ("id_usulan_saluran")
            REFERENCES "usulan_saluran"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_desain_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_desain_review_ruang_lingkup"
            FOREIGN KEY ("id_ruang_lingkup")
            REFERENCES "jalan_saluran_ruang_lingkup"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_desain_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_desain_review_hspk"
            FOREIGN KEY ("id_hspk")
            REFERENCES "hspk"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_review_usulan_saluran"
            ON "saluran_spesifikasi_desain_review" ("id_usulan_saluran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_review_ruang_lingkup"
            ON "saluran_spesifikasi_desain_review" ("id_ruang_lingkup");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_review_hspk"
            ON "saluran_spesifikasi_desain_review" ("id_hspk");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_desain_review_deleted"
            ON "saluran_spesifikasi_desain_review" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_saluran_spesifikasi_desain_review_updated_at') THEN
                    CREATE TRIGGER set_saluran_spesifikasi_desain_review_updated_at
                    BEFORE UPDATE ON "saluran_spesifikasi_desain_review"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_saluran_spesifikasi_desain_review_updated_at ON "saluran_spesifikasi_desain_review";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_review_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_review_hspk";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_review_ruang_lingkup";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_desain_review_usulan_saluran";`);
        await queryRunner.query(`ALTER TABLE "saluran_spesifikasi_desain_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_desain_review_hspk";`);
        await queryRunner.query(`ALTER TABLE "saluran_spesifikasi_desain_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_desain_review_ruang_lingkup";`);
        await queryRunner.query(`ALTER TABLE "saluran_spesifikasi_desain_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_desain_review_usulan_saluran";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_desain_review";`);
    }
}
