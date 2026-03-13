import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsb1764339734300 implements MigrationInterface {
    name = 'CreateAsb1764339734300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb" (
                "id" SERIAL NOT NULL,
                "id_asb_jenis" INTEGER NOT NULL,
                "id_asb_status" INTEGER NOT NULL,
                "id_opd" INTEGER NOT NULL,
                "id_asb_tipe_bangunan" INTEGER NOT NULL,
                "id_rekening" INTEGER,
                "id_rekening_review" INTEGER,
                "id_kabkota" INTEGER,
                "id_asb_klasifikasi" INTEGER,
                "tahun_anggaran" INTEGER,
                "nama_asb" TEXT NOT NULL,
                "alamat" TEXT,
                "jumlah_kontraktor" INTEGER,
                "total_lantai" INTEGER,
                "reject_reason" TEXT,
                "shst" DOUBLE PRECISION,
                "perencanaan_konstruksi" DOUBLE PRECISION,
                "pengawasan_konstruksi" DOUBLE PRECISION,
                "management_konstruksi" DOUBLE PRECISION,
                "pengelolaan_kegiatan" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb" PRIMARY KEY ("id")
            )
        `);

        // Create indexes for foreign keys
        await queryRunner.query(`CREATE INDEX "idx_asb_asb_jenis" ON "asb" ("id_asb_jenis")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_asb_status" ON "asb" ("id_asb_status")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_opds" ON "asb" ("id_opd")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_tipe_bangunan" ON "asb" ("id_asb_tipe_bangunan")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_rekenings" ON "asb" ("id_rekening")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_rekening_reviews" ON "asb" ("id_rekening_review")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_kabkotas" ON "asb" ("id_kabkota")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_klasifikasi" ON "asb" ("id_asb_klasifikasi")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_deleted_at" ON "asb" ("deleted_at")`);

        // Add foreign keys - Required (CASCADE)
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_asb_jenis"
            FOREIGN KEY ("id_asb_jenis")
            REFERENCES "asb_jenis"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_asb_status"
            FOREIGN KEY ("id_asb_status")
            REFERENCES "asb_status"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_opds"
            FOREIGN KEY ("id_opd")
            REFERENCES "opds"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_tipe_bangunan"
            FOREIGN KEY ("id_asb_tipe_bangunan")
            REFERENCES "asb_tipe_bangunan"("id")
            ON DELETE CASCADE
        `);

        // Add foreign keys - Optional (SET NULL)
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_rekenings"
            FOREIGN KEY ("id_rekening")
            REFERENCES "rekenings"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_rekening_reviews"
            FOREIGN KEY ("id_rekening_review")
            REFERENCES "rekenings"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_kabkotas"
            FOREIGN KEY ("id_kabkota")
            REFERENCES "kabkotas"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "fk_asb_klasifikasi"
            FOREIGN KEY ("id_asb_klasifikasi")
            REFERENCES "asb_klasifikasi"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_updated_at
            BEFORE UPDATE ON "asb"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_updated_at ON "asb"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_updated_at`);

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_klasifikasi"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_kabkotas"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_rekening_reviews"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_rekenings"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_tipe_bangunan"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_opds"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_asb_status"`);
        await queryRunner.query(`ALTER TABLE "asb" DROP CONSTRAINT IF EXISTS "fk_asb_asb_jenis"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_klasifikasi"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_kabkotas"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_rekening_reviews"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_rekenings"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_tipe_bangunan"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_opds"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_asb_status"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_asb_jenis"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb"`);
    }
}
