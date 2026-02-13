import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdJenisUsulanToRekenings1770088000007 implements MigrationInterface {
    name = 'AddIdJenisUsulanToRekenings1770088000007';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add id_jenis_usulan column
        await queryRunner.query(`
            ALTER TABLE \`rekenings\` 
            ADD COLUMN \`id_jenis_usulan\` INT NULL
        `);

        // Create index for better query performance
        await queryRunner.query(`
            CREATE INDEX \`idx_rekenings_id_jenis_usulan\` 
            ON \`rekenings\` (\`id_jenis_usulan\`)
        `);

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE \`rekenings\`
            ADD CONSTRAINT \`fk_rekenings_jenis_usulan\`
            FOREIGN KEY (\`id_jenis_usulan\`)
            REFERENCES \`jenis_usulan\`(\`id\`)
            ON DELETE SET NULL
            ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.query(`
            ALTER TABLE \`rekenings\`
            DROP FOREIGN KEY \`fk_rekenings_jenis_usulan\`
        `);

        // Drop index
        await queryRunner.query(`
            DROP INDEX \`idx_rekenings_id_jenis_usulan\` ON \`rekenings\`
        `);

        // Drop column
        await queryRunner.query(`
            ALTER TABLE \`rekenings\` 
            DROP COLUMN \`id_jenis_usulan\`
        `);
    }
}
