import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbJakon1764112396964 implements MigrationInterface {
    name = 'CreateAsbJakon1764112396964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create type enum
        await queryRunner.query(`
            DO $$ BEGIN
                CREATE TYPE "asb_jakon_type_enum" AS ENUM ('perencanaan', 'pengawasan', 'management', 'pengelolaan');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;
        `);

        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_jakon" (
                "id" SERIAL NOT NULL,
                "id_asb_tipe_bangunan" INTEGER NOT NULL,
                "id_asb_jenis" INTEGER NOT NULL,
                "id_asb_klasifikasi" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "type" "asb_jakon_type_enum" NOT NULL,
                "nama" TEXT NOT NULL,
                "spec" VARCHAR(255) NOT NULL,
                "price_from" DOUBLE PRECISION NOT NULL,
                "price_to" DOUBLE PRECISION NOT NULL,
                "satuan" VARCHAR(50) NOT NULL,
                "standard" DOUBLE PRECISION NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_jakon" PRIMARY KEY ("id"),
                CONSTRAINT "chk_asb_jakon_price_range" CHECK ("price_to" >= "price_from")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_jakon_tipe_bangunan" ON "asb_jakon" ("id_asb_tipe_bangunan")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_jakon_jenis" ON "asb_jakon" ("id_asb_jenis")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_jakon_klasifikasi" ON "asb_jakon" ("id_asb_klasifikasi")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_jakon_tahun" ON "asb_jakon" ("tahun")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_jakon_type" ON "asb_jakon" ("type")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_jakon_deleted_at" ON "asb_jakon" ("deleted_at")`);

        // Add foreign keys with CASCADE
        await queryRunner.query(`
            ALTER TABLE "asb_jakon"
            ADD CONSTRAINT "fk_asb_jakon_tipe_bangunan"
            FOREIGN KEY ("id_asb_tipe_bangunan")
            REFERENCES "asb_tipe_bangunan"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_jakon"
            ADD CONSTRAINT "fk_asb_jakon_jenis"
            FOREIGN KEY ("id_asb_jenis")
            REFERENCES "asb_jenis"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_jakon"
            ADD CONSTRAINT "fk_asb_jakon_klasifikasi"
            FOREIGN KEY ("id_asb_klasifikasi")
            REFERENCES "asb_klasifikasi"("id")
            ON DELETE CASCADE
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_jakon_updated_at') THEN
                    CREATE TRIGGER set_asb_jakon_updated_at
                    BEFORE UPDATE ON "asb_jakon"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_jakon_updated_at ON "asb_jakon"`);

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb_jakon" DROP CONSTRAINT IF EXISTS "fk_asb_jakon_klasifikasi"`);
        await queryRunner.query(`ALTER TABLE "asb_jakon" DROP CONSTRAINT IF EXISTS "fk_asb_jakon_jenis"`);
        await queryRunner.query(`ALTER TABLE "asb_jakon" DROP CONSTRAINT IF EXISTS "fk_asb_jakon_tipe_bangunan"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_type"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_tahun"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_klasifikasi"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_jenis"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_jakon_tipe_bangunan"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_jakon"`);

        // Drop enum
        await queryRunner.query(`DROP TYPE IF EXISTS "asb_jakon_type_enum"`);
    }
}
