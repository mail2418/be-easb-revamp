import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorAsbVerifikatorFields1764930042129 implements MigrationInterface {
    name = 'RefactorAsbVerifikatorFields1764930042129';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename id_verifikator to id_verifikator_adpem
        await queryRunner.query(`
            ALTER TABLE "asb"
            RENAME COLUMN "id_verifikator" TO "id_verifikator_adpem"
        `);

        // Add id_verifikator_bpkad column
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "id_verifikator_bpkad" INTEGER NULL
        `);

        // Add id_verifikator_bappeda column
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "id_verifikator_bappeda" INTEGER NULL
        `);

        // Add timestamp columns for verification tracking
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "verified_adpem_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "verified_bpkad_at" TIMESTAMPTZ NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "verified_bappeda_at" TIMESTAMPTZ NULL
        `);

        // Add foreign key constraint for id_verifikator_bpkad
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "FK_asb_verifikator_bpkad"
            FOREIGN KEY ("id_verifikator_bpkad")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE NO ACTION;
            `);


        // Add foreign key constraint for id_verifikator_bappeda
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "FK_asb_verifikator_bappeda"
            FOREIGN KEY ("id_verifikator_bappeda")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE NO ACTION;
            `);

        // Add indexes for performance
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_asb_id_verifikator_bpkad"
            ON "asb"("id_verifikator_bpkad")
            `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_asb_id_verifikator_bappeda"
            ON "asb"("id_verifikator_bappeda")
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_asb_id_verifikator_bappeda"
            `);

        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_asb_id_verifikator_bpkad"
            `);

        // Drop foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP CONSTRAINT IF EXISTS "FK_asb_verifikator_bappeda"
            `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP CONSTRAINT IF EXISTS "FK_asb_verifikator_bpkad"
            `);

        // Drop new columns
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "verified_bappeda_at"
            `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "verified_bpkad_at"
            `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "verified_adpem_at"
            `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "id_verifikator_bappeda"
            `);

        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "id_verifikator_bpkad"
            `);

        // Rename column back
        await queryRunner.query(`
            ALTER TABLE "asb"
            RENAME COLUMN "id_verifikator_adpem" TO "id_verifikator"
            `);
    }
}
