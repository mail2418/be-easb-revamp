import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSaluranSpesifikasiSmkkReviewTable1767632032210
    implements MigrationInterface
{
    name = 'CreateJalanSaluranSpesifikasiSmkkReviewTable1767632032210';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_saluran_spesifikasi_smkk_review" (
                "id" SERIAL PRIMARY KEY,
                "id_jenis_usulan" INTEGER NOT NULL,
                "id_usulan_jalan" INTEGER NOT NULL,
                "id_jalan_saluran_smkk" INTEGER NOT NULL,
                "harga_spec" DECIMAL(15, 2) NOT NULL,
                "jumlah_barang" DECIMAL(15, 2) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Foreign Keys
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_jalan_saluran_spesifikasi_smkk_review_jenis_usulan"
            FOREIGN KEY ("id_jenis_usulan")
            REFERENCES "jenis_usulan"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_jalan_saluran_spesifikasi_smkk_review_usulan_jalan"
            FOREIGN KEY ("id_usulan_jalan")
            REFERENCES "usulan_jalan"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_jalan_saluran_spesifikasi_smkk_review_jalan_saluran_smkk"
            FOREIGN KEY ("id_jalan_saluran_smkk")
            REFERENCES "jalan_saluran_smkk"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_jenis_usulan" 
            ON "jalan_saluran_spesifikasi_smkk_review" ("id_jenis_usulan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_usulan_jalan" 
            ON "jalan_saluran_spesifikasi_smkk_review" ("id_usulan_jalan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_jalan_saluran_smkk" 
            ON "jalan_saluran_spesifikasi_smkk_review" ("id_jalan_saluran_smkk");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_deleted" 
            ON "jalan_saluran_spesifikasi_smkk_review" ("deleted_at");
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_saluran_spesifikasi_smkk_review_updated_at') THEN
                    CREATE TRIGGER set_jalan_saluran_spesifikasi_smkk_review_updated_at
                    BEFORE UPDATE ON "jalan_saluran_spesifikasi_smkk_review"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_jalan_saluran_spesifikasi_smkk_review_updated_at ON "jalan_saluran_spesifikasi_smkk_review";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_deleted";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_jalan_saluran_smkk";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_usulan_jalan";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_jenis_usulan";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_spesifikasi_smkk_review_jalan_saluran_smkk";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_spesifikasi_smkk_review_usulan_jalan";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_spesifikasi_smkk_review_jenis_usulan";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_saluran_spesifikasi_smkk_review";`);
    }
}
