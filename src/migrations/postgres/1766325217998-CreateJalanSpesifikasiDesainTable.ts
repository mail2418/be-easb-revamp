import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSpesifikasiDesainTable1766325217998 implements MigrationInterface {
    name = 'CreateJalanSpesifikasiDesainTable1766325217998';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_spesifikasi_desain" (
                "id" SERIAL PRIMARY KEY,
                "id_usulan_jalan" INTEGER NOT NULL,
                "id_ruang_lingkup" INTEGER NOT NULL,
                "id_hspk" INTEGER NOT NULL,
                "volume" DOUBLE PRECISION NOT NULL,
                "lebar" DOUBLE PRECISION NOT NULL,
                "spasi" DOUBLE PRECISION NOT NULL,
                "tinggi" DOUBLE PRECISION NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Create foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            ADD CONSTRAINT "fk_jalan_spesifikasi_desain_usulan_jalan"
            FOREIGN KEY ("id_usulan_jalan")
            REFERENCES "usulan_jalan"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            ADD CONSTRAINT "fk_jalan_spesifikasi_desain_ruang_lingkup"
            FOREIGN KEY ("id_ruang_lingkup")
            REFERENCES "jalan_saluran_ruang_lingkup"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_spesifikasi_desain"
            ADD CONSTRAINT "fk_jalan_spesifikasi_desain_hspk"
            FOREIGN KEY ("id_hspk")
            REFERENCES "hspk"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_usulan_jalan" 
            ON "jalan_spesifikasi_desain" ("id_usulan_jalan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_ruang_lingkup" 
            ON "jalan_spesifikasi_desain" ("id_ruang_lingkup");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_hspk" 
            ON "jalan_spesifikasi_desain" ("id_hspk");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_spesifikasi_desain_deleted" 
            ON "jalan_spesifikasi_desain" ("deleted_at");
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_spesifikasi_desain_updated_at') THEN
                    CREATE TRIGGER set_jalan_spesifikasi_desain_updated_at
                    BEFORE UPDATE ON "jalan_spesifikasi_desain"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TRIGGER IF EXISTS set_jalan_spesifikasi_desain_updated_at ON "jalan_spesifikasi_desain";`,
        );
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_hspk";`);
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_ruang_lingkup";`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "idx_jalan_spesifikasi_desain_usulan_jalan";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_spesifikasi_desain" DROP CONSTRAINT IF EXISTS "fk_jalan_spesifikasi_desain_hspk";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_spesifikasi_desain" DROP CONSTRAINT IF EXISTS "fk_jalan_spesifikasi_desain_ruang_lingkup";`,
        );
        await queryRunner.query(
            `ALTER TABLE "jalan_spesifikasi_desain" DROP CONSTRAINT IF EXISTS "fk_jalan_spesifikasi_desain_usulan_jalan";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_spesifikasi_desain";`);
    }
}
