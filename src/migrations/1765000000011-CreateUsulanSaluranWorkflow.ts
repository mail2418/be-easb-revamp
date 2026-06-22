import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsulanSaluranWorkflow1765000000011 implements MigrationInterface {
    name = 'CreateUsulanSaluranWorkflow1765000000011';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "tipe_saluran" CASCADE;`);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "tipe_saluran" (
                "id" SERIAL PRIMARY KEY,
                "tipe_saluran" VARCHAR(50) NOT NULL UNIQUE,
                "tipe" VARCHAR(100),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        const tipeSaluran = [
            { tipe_saluran: 'u_ds', tipe: 'U-DS' },
            { tipe_saluran: 'dpt_a', tipe: 'DPT A' },
            { tipe_saluran: 'dpt_b', tipe: 'DPT B' },
        ];

        for (const row of tipeSaluran) {
            await queryRunner.query(
                `INSERT INTO "tipe_saluran" ("tipe_saluran", "tipe") VALUES ($1, $2) ON CONFLICT ("tipe_saluran") DO NOTHING`,
                [row.tipe_saluran, row.tipe],
            );
        }

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_saluran_status" (
                "id" SERIAL PRIMARY KEY,
                "status" VARCHAR(255) NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        const statuses = [
            'Draft',
            'Diajukan',
            'Disetujui',
            'Ditolak',
            'Verifikasi Index ADBANG',
            'Verifikasi Informasi ADBANG',
            'Verifikasi BPKAD',
            'Verifikasi BAPPEDA',
        ];

        for (const status of statuses) {
            await queryRunner.query(
                `INSERT INTO "usulan_saluran_status" ("status") VALUES ($1) ON CONFLICT ("status") DO NOTHING`,
                [status],
            );
        }

        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_saluran" CASCADE;`);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_saluran" (
                "id" SERIAL PRIMARY KEY,
                "id_opd" INTEGER NOT NULL,
                "id_usulan_saluran_status" INTEGER NOT NULL DEFAULT 1,
                "id_asb_jenis" INTEGER,
                "id_tipe_saluran" INTEGER,
                "id_rekening" INTEGER,
                "id_rekening_review" INTEGER,
                "id_kabkota" INTEGER,
                "id_kecamatan" INTEGER,
                "id_kelurahan" INTEGER,
                "id_verifikator_adbang" INTEGER,
                "id_verifikator_bpkad" INTEGER,
                "id_verifikator_bappeda" INTEGER,
                "id_reject_verif" INTEGER,
                "is_include_ppn" BOOLEAN NOT NULL DEFAULT false,
                "tahun_anggaran" INTEGER,
                "nama_usulan" TEXT NOT NULL,
                "alamat" TEXT,
                "lebar" DOUBLE PRECISION,
                "keterangan_tambahan" TEXT,
                "data_ruang_lingkup" JSONB,
                "data_smkk" JSONB,
                "verifikator_adbang_review_at" TIMESTAMPTZ,
                "verifikator_bpkad_review_at" TIMESTAMPTZ,
                "verifikator_bappeda_review_at" TIMESTAMPTZ,
                "rejected_at" TIMESTAMPTZ,
                "reject_reason" TEXT,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_opd" ON "usulan_saluran" ("id_opd");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_status" ON "usulan_saluran" ("id_usulan_saluran_status");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_tahun" ON "usulan_saluran" ("tahun_anggaran");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_saluran_deleted" ON "usulan_saluran" ("deleted_at");`);

        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_opd"
            FOREIGN KEY ("id_opd") REFERENCES "opds"("id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_status"
            FOREIGN KEY ("id_usulan_saluran_status") REFERENCES "usulan_saluran_status"("id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_asb_jenis"
            FOREIGN KEY ("id_asb_jenis") REFERENCES "asb_jenis"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_tipe"
            FOREIGN KEY ("id_tipe_saluran") REFERENCES "tipe_saluran"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_rekening"
            FOREIGN KEY ("id_rekening") REFERENCES "rekenings"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_rekening_review"
            FOREIGN KEY ("id_rekening_review") REFERENCES "rekenings"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_kabkota"
            FOREIGN KEY ("id_kabkota") REFERENCES "kabkotas"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_kecamatan"
            FOREIGN KEY ("id_kecamatan") REFERENCES "kecamatans"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_kelurahan"
            FOREIGN KEY ("id_kelurahan") REFERENCES "kelurahans"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_verifikator_adbang"
            FOREIGN KEY ("id_verifikator_adbang") REFERENCES "verifikators"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_verifikator_bpkad"
            FOREIGN KEY ("id_verifikator_bpkad") REFERENCES "verifikators"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_verifikator_bappeda"
            FOREIGN KEY ("id_verifikator_bappeda") REFERENCES "verifikators"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_saluran"
            ADD CONSTRAINT "fk_usulan_saluran_reject_verif"
            FOREIGN KEY ("id_reject_verif") REFERENCES "users"("id") ON DELETE SET NULL;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_tipe_saluran_updated_at') THEN
                    CREATE TRIGGER set_tipe_saluran_updated_at
                    BEFORE UPDATE ON "tipe_saluran"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_saluran_status_updated_at') THEN
                    CREATE TRIGGER set_usulan_saluran_status_updated_at
                    BEFORE UPDATE ON "usulan_saluran_status"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_saluran_updated_at') THEN
                    CREATE TRIGGER set_usulan_saluran_updated_at
                    BEFORE UPDATE ON "usulan_saluran"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_usulan_saluran_updated_at ON "usulan_saluran";`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_usulan_saluran_status_updated_at ON "usulan_saluran_status";`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_tipe_saluran_updated_at ON "tipe_saluran";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_reject_verif";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_bappeda";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_bpkad";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_verifikator_adbang";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_kelurahan";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_kecamatan";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_kabkota";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_rekening_review";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_rekening";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_tipe";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_asb_jenis";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_status";`);
        await queryRunner.query(`ALTER TABLE "usulan_saluran" DROP CONSTRAINT IF EXISTS "fk_usulan_saluran_opd";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_tahun";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_status";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_saluran_opd";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_saluran";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_saluran_status";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "tipe_saluran";`);
    }
}
