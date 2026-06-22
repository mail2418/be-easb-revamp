import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsulanJalanWorkflow1765000000010 implements MigrationInterface {
    name = 'CreateUsulanJalanWorkflow1765000000010';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_jalan_status" (
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
                `INSERT INTO "usulan_jalan_status" ("status") VALUES ($1) ON CONFLICT ("status") DO NOTHING`,
                [status],
            );
        }

        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_jalan" CASCADE;`);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "usulan_jalan" (
                "id" SERIAL PRIMARY KEY,
                "id_opd" INTEGER NOT NULL,
                "id_usulan_jalan_status" INTEGER NOT NULL DEFAULT 1,
                "id_asb_jenis" INTEGER,
                "id_jalan_jenis_pemeliharaan" INTEGER,
                "id_jalan_jenis_perkerasan" INTEGER,
                "id_jalan_jenis_perkerasan_review" INTEGER,
                "id_rekening" INTEGER,
                "id_rekening_review" INTEGER,
                "id_kabkota" INTEGER,
                "id_kecamatan" INTEGER,
                "id_kelurahan" INTEGER,
                "id_verifikator_adbang" INTEGER,
                "id_verifikator_bpkad" INTEGER,
                "id_verifikator_bappeda" INTEGER,
                "id_reject_verif" INTEGER,
                "tahun_anggaran" INTEGER,
                "nama_usulan" TEXT NOT NULL,
                "alamat" TEXT,
                "lebar" DOUBLE PRECISION,
                "lebar_jalan_review" DOUBLE PRECISION,
                "keterangan_tambahan" TEXT,
                "keterangan_tambahan_review" TEXT,
                "data_ruang_lingkup" JSONB,
                "data_smkk" JSONB,
                "verified_adbang_at" TIMESTAMPTZ,
                "verified_bpkad_at" TIMESTAMPTZ,
                "verified_bappeda_at" TIMESTAMPTZ,
                "rejected_at" TIMESTAMPTZ,
                "reject_reason" TEXT,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_opd" ON "usulan_jalan" ("id_opd");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_status" ON "usulan_jalan" ("id_usulan_jalan_status");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_tahun" ON "usulan_jalan" ("tahun_anggaran");`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_usulan_jalan_deleted" ON "usulan_jalan" ("deleted_at");`);

        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_opd"
            FOREIGN KEY ("id_opd") REFERENCES "opds"("id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_status"
            FOREIGN KEY ("id_usulan_jalan_status") REFERENCES "usulan_jalan_status"("id") ON DELETE CASCADE;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_asb_jenis"
            FOREIGN KEY ("id_asb_jenis") REFERENCES "asb_jenis"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_jenis_pemeliharaan"
            FOREIGN KEY ("id_jalan_jenis_pemeliharaan") REFERENCES "jalan_jenis_pemeliharaan"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_jenis_perkerasan"
            FOREIGN KEY ("id_jalan_jenis_perkerasan") REFERENCES "jalan_jenis_perkerasan"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_jenis_perkerasan_review"
            FOREIGN KEY ("id_jalan_jenis_perkerasan_review") REFERENCES "jalan_jenis_perkerasan"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_rekening"
            FOREIGN KEY ("id_rekening") REFERENCES "rekenings"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_rekening_review"
            FOREIGN KEY ("id_rekening_review") REFERENCES "rekenings"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_kabkota"
            FOREIGN KEY ("id_kabkota") REFERENCES "kabkotas"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_kecamatan"
            FOREIGN KEY ("id_kecamatan") REFERENCES "kecamatans"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_kelurahan"
            FOREIGN KEY ("id_kelurahan") REFERENCES "kelurahans"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_verifikator_adbang"
            FOREIGN KEY ("id_verifikator_adbang") REFERENCES "verifikators"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_verifikator_bpkad"
            FOREIGN KEY ("id_verifikator_bpkad") REFERENCES "verifikators"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_verifikator_bappeda"
            FOREIGN KEY ("id_verifikator_bappeda") REFERENCES "verifikators"("id") ON DELETE SET NULL;
        `);
        await queryRunner.query(`
            ALTER TABLE "usulan_jalan"
            ADD CONSTRAINT "fk_usulan_jalan_reject_verif"
            FOREIGN KEY ("id_reject_verif") REFERENCES "users"("id") ON DELETE SET NULL;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_jalan_status_updated_at') THEN
                    CREATE TRIGGER set_usulan_jalan_status_updated_at
                    BEFORE UPDATE ON "usulan_jalan_status"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_usulan_jalan_updated_at') THEN
                    CREATE TRIGGER set_usulan_jalan_updated_at
                    BEFORE UPDATE ON "usulan_jalan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_usulan_jalan_updated_at ON "usulan_jalan";`);
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_usulan_jalan_status_updated_at ON "usulan_jalan_status";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_reject_verif";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_verifikator_bappeda";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_verifikator_bpkad";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_verifikator_adbang";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_kelurahan";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_kecamatan";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_kabkota";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_rekening_review";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_rekening";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_jenis_perkerasan_review";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_jenis_perkerasan";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_jenis_pemeliharaan";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_asb_jenis";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_status";`);
        await queryRunner.query(`ALTER TABLE "usulan_jalan" DROP CONSTRAINT IF EXISTS "fk_usulan_jalan_opd";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_jalan_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_jalan_tahun";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_jalan_status";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_usulan_jalan_opd";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_jalan";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "usulan_jalan_status";`);
    }
}
