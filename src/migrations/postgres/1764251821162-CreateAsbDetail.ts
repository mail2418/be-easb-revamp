import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbDetail1764251821162 implements MigrationInterface {
    name = 'CreateAsbDetail1764251821162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_details" (
                "id" SERIAL NOT NULL,
                "files" VARCHAR(10) NOT NULL DEFAULT 'ORIGIN',
                "id_asb_lantai" INTEGER,
                "id_asb_fungsi_ruang" INTEGER,
                "asb_fungsi_ruang_koef" DOUBLE PRECISION,
                "lantai_koef" DOUBLE PRECISION,
                "luas" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_details" PRIMARY KEY ("id"),
                CONSTRAINT "ck_asb_details_files" CHECK ("files" IN ('ORIGIN', 'REVIEW'))
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_details_files" ON "asb_details" ("files")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_details_lantai" ON "asb_details" ("id_asb_lantai")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_details_fungsi_ruang" ON "asb_details" ("id_asb_fungsi_ruang")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_details_deleted_at" ON "asb_details" ("deleted_at")`);

        // Add foreign key to asb_lantai
        await queryRunner.query(`
            ALTER TABLE "asb_details"
            ADD CONSTRAINT "fk_asb_details_lantai"
            FOREIGN KEY ("id_asb_lantai")
            REFERENCES "asb_lantais"("id")
            ON DELETE SET NULL
        `);

        // Add foreign key to asb_fungsi_ruang
        await queryRunner.query(`
            ALTER TABLE "asb_details"
            ADD CONSTRAINT "fk_asb_details_fungsi_ruang"
            FOREIGN KEY ("id_asb_fungsi_ruang")
            REFERENCES "asb_fungsi_ruangs"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_details_updated_at') THEN
                    CREATE TRIGGER set_asb_details_updated_at
                    BEFORE UPDATE ON "asb_details"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_details_updated_at ON "asb_details"`);

        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "asb_details" DROP CONSTRAINT IF EXISTS "fk_asb_details_fungsi_ruang"`);
        await queryRunner.query(`ALTER TABLE "asb_details" DROP CONSTRAINT IF EXISTS "fk_asb_details_lantai"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_details_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_details_fungsi_ruang"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_details_lantai"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_details_files"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_details"`);
    }
}
