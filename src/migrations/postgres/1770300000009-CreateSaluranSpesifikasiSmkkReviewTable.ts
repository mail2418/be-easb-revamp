import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSaluranSpesifikasiSmkkReviewTable1770300000009 implements MigrationInterface {
    name = 'CreateSaluranSpesifikasiSmkkReviewTable1770300000009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_spesifikasi_smkk_review" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "id_usulan_saluran" INTEGER NOT NULL,
                "id_jalan_saluran_smkk" INTEGER NOT NULL,
                "harga_spec" DECIMAL(15, 2) NOT NULL,
                "jumlah_barang" DECIMAL(15, 2) NOT NULL,
                "harga_satuan" DECIMAL(15, 2) NOT NULL DEFAULT 0,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_jenis_usulan"
            FOREIGN KEY ("id_jenis_usulan")
            REFERENCES "jenis_usulan"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_usulan_saluran"
            FOREIGN KEY ("id_usulan_saluran")
            REFERENCES "usulan_saluran"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk"
            FOREIGN KEY ("id_jalan_saluran_smkk")
            REFERENCES "jalan_saluran_smkk"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_jenis_usulan"
            ON "saluran_spesifikasi_smkk_review" ("id_jenis_usulan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_usulan_saluran"
            ON "saluran_spesifikasi_smkk_review" ("id_usulan_saluran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_jalan_saluran_smkk"
            ON "saluran_spesifikasi_smkk_review" ("id_jalan_saluran_smkk");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_spesifikasi_smkk_review_deleted"
            ON "saluran_spesifikasi_smkk_review" ("deleted_at");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_saluran_spesifikasi_smkk_review_updated_at') THEN
                    CREATE TRIGGER set_saluran_spesifikasi_smkk_review_updated_at
                    BEFORE UPDATE ON "saluran_spesifikasi_smkk_review"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_saluran_spesifikasi_smkk_review_updated_at ON "saluran_spesifikasi_smkk_review";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_review_deleted";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_review_jalan_saluran_smkk";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_review_usulan_saluran";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_review_jenis_usulan";`,
        );
        await queryRunner.query(
            `ALTER TABLE "saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk";`,
        );
        await queryRunner.query(
            `ALTER TABLE "saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_review_usulan_saluran";`,
        );
        await queryRunner.query(
            `ALTER TABLE "saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_review_jenis_usulan";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_smkk_review";`);
    }
}
