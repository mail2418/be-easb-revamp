import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterJalanJenisPerkerasanColumn1766231451286 implements MigrationInterface {
    name = 'AlterJalanJenisPerkerasanColumn1766231451286';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename column from 'jenis' to 'jenis_perkerasan'
        await queryRunner.query(`
            ALTER TABLE "jalan_jenis_perkerasan" 
            RENAME COLUMN "jenis" TO "jenis_perkerasan";
        `);

        // Drop old index
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_jenis_perkerasan_jenis";
        `);

        // Create new index with new column name
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_perkerasan_jenis_perkerasan" 
            ON "jalan_jenis_perkerasan" ("jenis_perkerasan");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop new index
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_jenis_perkerasan_jenis_perkerasan";
        `);

        // Rename column back from 'jenis_perkerasan' to 'jenis'
        await queryRunner.query(`
            ALTER TABLE "jalan_jenis_perkerasan" 
            RENAME COLUMN "jenis_perkerasan" TO "jenis";
        `);

        // Recreate old index
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_perkerasan_jenis" 
            ON "jalan_jenis_perkerasan" ("jenis");
        `);
    }
}

