import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbDocument1764117467089 implements MigrationInterface {
    name = 'CreateAsbDocument1764117467089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type
        await queryRunner.query(`
            CREATE TYPE document_spec_enum AS ENUM (
                'SURAT_REKOMENDASI',
                'LAPORAN',
                'MATERI'
            )
        `);

        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_document" (
                "id" SERIAL NOT NULL,
                "filename" TEXT NOT NULL,
                "spec" document_spec_enum NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_document" PRIMARY KEY ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_document_spec" ON "asb_document" ("spec")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_document_deleted_at" ON "asb_document" ("deleted_at")`);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_document_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_document_updated_at
            BEFORE UPDATE ON "asb_document"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_document_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_document_updated_at ON "asb_document"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_document_updated_at`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_document_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_document_spec"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_document"`);

        // Drop enum type
        await queryRunner.query(`DROP TYPE IF EXISTS document_spec_enum`);
    }
}
