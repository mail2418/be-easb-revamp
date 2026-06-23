import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add timestamp columns (created_at, updated_at, deleted_at) to shst table
 *
 * This migration adds the missing timestamp columns to match PostgreSQL schema.
 * The shst table was created in InitialSchema without these columns, but they
 * exist in PostgreSQL and are required for proper soft delete functionality.
 */
export class AddTimestampColumnsToShst1770110000000 implements MigrationInterface {
    name = 'AddTimestampColumnsToShst1770110000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add created_at column
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            ADD COLUMN \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
        `);

        // Add updated_at column with ON UPDATE CURRENT_TIMESTAMP
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            ADD COLUMN \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        `);

        // Add deleted_at column (nullable for soft delete)
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            ADD COLUMN \`deleted_at\` timestamp(6) NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop columns in reverse order
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            DROP COLUMN IF EXISTS \`deleted_at\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`shst\`
            DROP COLUMN IF EXISTS \`updated_at\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`shst\`
            DROP COLUMN IF EXISTS \`created_at\`
        `);
    }
}
