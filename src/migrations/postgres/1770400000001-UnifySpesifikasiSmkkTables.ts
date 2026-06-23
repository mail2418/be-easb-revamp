import { MigrationInterface, QueryRunner } from 'typeorm';

export class UnifySpesifikasiSmkkTables1770400000001 implements MigrationInterface {
    name = 'UnifySpesifikasiSmkkTables1770400000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ========== jalan_saluran_spesifikasi_smkk ==========
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_spesifikasi_smkk_usulan_jalan";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            RENAME COLUMN "id_usulan_jalan" TO "id_usulan";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_usulan_jalan";
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_id_usulan"
            ON "jalan_saluran_spesifikasi_smkk" ("id_usulan");
        `);

        await queryRunner.query(`
            INSERT INTO "jalan_saluran_spesifikasi_smkk" (
                "id_jenis_usulan", "id_usulan", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan",
                "created_at", "updated_at", "deleted_at"
            )
            SELECT
                "id_jenis_usulan", "id_usulan_saluran", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan",
                "created_at", "updated_at", "deleted_at"
            FROM "saluran_spesifikasi_smkk";
        `);

        await queryRunner.query(`
            DROP TRIGGER IF EXISTS set_saluran_spesifikasi_smkk_updated_at ON "saluran_spesifikasi_smkk";
        `);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_deleted";`);
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_jalan_saluran_smkk";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_usulan_saluran";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_saluran_spesifikasi_smkk_jenis_usulan";`,
        );
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_jalan_saluran_smkk";
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_usulan_saluran";
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_jenis_usulan";
        `);
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_smkk";`);

        // ========== jalan_saluran_spesifikasi_smkk_review ==========
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            DROP CONSTRAINT IF EXISTS "fk_jalan_saluran_spesifikasi_smkk_review_usulan_jalan";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            RENAME COLUMN "id_usulan_jalan" TO "id_usulan";
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_usulan_jalan";
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_id_usulan"
            ON "jalan_saluran_spesifikasi_smkk_review" ("id_usulan");
        `);

        await queryRunner.query(`
            INSERT INTO "jalan_saluran_spesifikasi_smkk_review" (
                "id_jenis_usulan", "id_usulan", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan",
                "created_at", "updated_at", "deleted_at"
            )
            SELECT
                "id_jenis_usulan", "id_usulan_saluran", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan",
                "created_at", "updated_at", "deleted_at"
            FROM "saluran_spesifikasi_smkk_review";
        `);

        await queryRunner.query(`
            DROP TRIGGER IF EXISTS set_saluran_spesifikasi_smkk_review_updated_at ON "saluran_spesifikasi_smkk_review";
        `);
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
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk";
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_review_usulan_saluran";
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review" DROP CONSTRAINT IF EXISTS "fk_saluran_spesifikasi_smkk_review_jenis_usulan";
        `);
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_spesifikasi_smkk_review";`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
            FOREIGN KEY ("id_jenis_usulan") REFERENCES "jenis_usulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_usulan_saluran"
            FOREIGN KEY ("id_usulan_saluran") REFERENCES "usulan_saluran"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk"
            FOREIGN KEY ("id_jalan_saluran_smkk") REFERENCES "jalan_saluran_smkk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        await queryRunner.query(`
            INSERT INTO "saluran_spesifikasi_smkk_review" (
                "id_jenis_usulan", "id_usulan_saluran", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan", "created_at", "updated_at", "deleted_at"
            )
            SELECT "id_jenis_usulan", "id_usulan", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan", "created_at", "updated_at", "deleted_at"
            FROM "jalan_saluran_spesifikasi_smkk_review" WHERE "id_jenis_usulan" = 3;
        `);
        await queryRunner.query(`
            DELETE FROM "jalan_saluran_spesifikasi_smkk_review" WHERE "id_jenis_usulan" = 3;
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_id_usulan";
        `);
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            RENAME COLUMN "id_usulan" TO "id_usulan_jalan";
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_review_usulan_jalan"
            ON "jalan_saluran_spesifikasi_smkk_review" ("id_usulan_jalan");
        `);
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk_review"
            ADD CONSTRAINT "fk_jalan_saluran_spesifikasi_smkk_review_usulan_jalan"
            FOREIGN KEY ("id_usulan_jalan") REFERENCES "usulan_jalan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_spesifikasi_smkk" (
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
            ALTER TABLE "saluran_spesifikasi_smkk"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_jenis_usulan"
            FOREIGN KEY ("id_jenis_usulan") REFERENCES "jenis_usulan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_usulan_saluran"
            FOREIGN KEY ("id_usulan_saluran") REFERENCES "usulan_saluran"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "saluran_spesifikasi_smkk"
            ADD CONSTRAINT "fk_saluran_spesifikasi_smkk_jalan_saluran_smkk"
            FOREIGN KEY ("id_jalan_saluran_smkk") REFERENCES "jalan_saluran_smkk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        await queryRunner.query(`
            INSERT INTO "saluran_spesifikasi_smkk" (
                "id_jenis_usulan", "id_usulan_saluran", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan", "created_at", "updated_at", "deleted_at"
            )
            SELECT "id_jenis_usulan", "id_usulan", "id_jalan_saluran_smkk",
                "harga_spec", "jumlah_barang", "harga_satuan", "created_at", "updated_at", "deleted_at"
            FROM "jalan_saluran_spesifikasi_smkk" WHERE "id_jenis_usulan" = 3;
        `);
        await queryRunner.query(`
            DELETE FROM "jalan_saluran_spesifikasi_smkk" WHERE "id_jenis_usulan" = 3;
        `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_saluran_spesifikasi_smkk_id_usulan";
        `);
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            RENAME COLUMN "id_usulan" TO "id_usulan_jalan";
        `);
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_saluran_spesifikasi_smkk_usulan_jalan"
            ON "jalan_saluran_spesifikasi_smkk" ("id_usulan_jalan");
        `);
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_spesifikasi_smkk"
            ADD CONSTRAINT "fk_jalan_saluran_spesifikasi_smkk_usulan_jalan"
            FOREIGN KEY ("id_usulan_jalan") REFERENCES "usulan_jalan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }
}
