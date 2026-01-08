import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorJalanSaluranSmkkTable1770200000005 implements MigrationInterface {
    name = 'RefactorJalanSaluranSmkkTable1770200000005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Drop all data from jalan_saluran_smkk
        await queryRunner.query(`DELETE FROM \`jalan_saluran_smkk\``);

        // Step 2: Drop foreign key constraint for id_ruang_lingkup
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP FOREIGN KEY \`FK_121517b19216391174838a43934\`
        `);

        // Step 3: Drop unique index (from AddAllMissingUniqueConstraints)
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP INDEX \`UQ_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian\`
        `);

        // Step 4: Drop index for id_ruang_lingkup
        await queryRunner.query(`
            DROP INDEX IF EXISTS \`idx_jalan_saluran_smkk_ruang_lingkup\` ON \`jalan_saluran_smkk\`
        `);

        // Step 5: Remove id_ruang_lingkup column
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP COLUMN \`id_ruang_lingkup\`
        `);

        // Step 6: Add id_jenis_usulan column
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD COLUMN \`id_jenis_usulan\` int NOT NULL DEFAULT 2
        `);

        // Step 7: Add foreign key constraint for id_jenis_usulan
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD CONSTRAINT \`fk_jalan_saluran_smkk_jenis_usulan\`
            FOREIGN KEY (\`id_jenis_usulan\`)
            REFERENCES \`jenis_usulan\`(\`id\`)
            ON DELETE CASCADE
            ON UPDATE CASCADE
        `);

        // Step 8: Create index for id_jenis_usulan
        await queryRunner.query(`
            CREATE INDEX \`idx_jalan_saluran_smkk_jenis_usulan\`
            ON \`jalan_saluran_smkk\` (\`id_jenis_usulan\`)
        `);

        // Step 9: Create new unique constraint (MySQL requires prefix length for TEXT in unique index)
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD UNIQUE INDEX \`UQ_jalan_saluran_smkk_jenis_usulan_no_mata_uraian\`
            (\`id_jenis_usulan\`, \`no_mata_pembayaran\`, \`uraian\`(500))
        `);

        // Step 10: Delete id=1 and id=12 from jalan_saluran_ruang_lingkup
        await queryRunner.query(`
            DELETE FROM \`jalan_saluran_ruang_lingkup\`
            WHERE \`id\` IN (1, 12)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the changes
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP INDEX \`UQ_jalan_saluran_smkk_jenis_usulan_no_mata_uraian\`
        `);

        await queryRunner.query(`
            DROP INDEX \`idx_jalan_saluran_smkk_jenis_usulan\` ON \`jalan_saluran_smkk\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP FOREIGN KEY \`fk_jalan_saluran_smkk_jenis_usulan\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP COLUMN \`id_jenis_usulan\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD COLUMN \`id_ruang_lingkup\` int NULL
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD CONSTRAINT \`FK_121517b19216391174838a43934\`
            FOREIGN KEY (\`id_ruang_lingkup\`)
            REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_jalan_saluran_smkk_ruang_lingkup\`
            ON \`jalan_saluran_smkk\` (\`id_ruang_lingkup\`)
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD UNIQUE INDEX \`UQ_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian\`
            (\`id_ruang_lingkup\`, \`no_mata_pembayaran\`, \`uraian\`(500))
        `);
    }
}
