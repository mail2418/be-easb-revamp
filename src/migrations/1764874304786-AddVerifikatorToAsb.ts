import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVerifikatorToAsb1764874304786 implements MigrationInterface {
    name = 'AddVerifikatorToAsb1764874304786';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add id_verifikator column to asb table
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "id_verifikator" INTEGER NULL
        `);

        // Add foreign key constraint to users table
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD CONSTRAINT "FK_asb_verifikator"
            FOREIGN KEY ("id_verifikator")
            REFERENCES "users"("id")
            ON DELETE SET NULL
            ON UPDATE NO ACTION
        `);

        // Add index for performance
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_asb_id_verifikator"
            ON "asb" ("id_verifikator")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop index
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_asb_id_verifikator"
        `);

        // Drop foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP CONSTRAINT IF EXISTS "FK_asb_verifikator"
        `);

        // Drop column
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "id_verifikator"
        `);
    }
}
