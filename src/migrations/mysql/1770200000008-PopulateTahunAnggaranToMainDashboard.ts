import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateTahunAnggaranToMainDashboard1770200000008 implements MigrationInterface {
    name = 'PopulateTahunAnggaranToMainDashboard1770200000008';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // MySQL uses UPDATE ... INNER JOIN ... SET (PostgreSQL uses UPDATE ... SET ... FROM)
        await queryRunner.query(`
            UPDATE \`main_dashboard\` md
            INNER JOIN \`asb\` a ON md.id_usulan = a.id AND md.id_jenis_usulan = 1
            SET md.tahun_anggaran = a.tahun_anggaran
            WHERE a.deleted_at IS NULL
        `);

        await queryRunner.query(`
            UPDATE \`main_dashboard\` md
            INNER JOIN \`usulan_jalan\` uj ON md.id_usulan = uj.id AND md.id_jenis_usulan IN (2, 3)
            SET md.tahun_anggaran = uj.tahun_anggaran
            WHERE uj.deleted_at IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Set tahun_anggaran to NULL for all records
        await queryRunner.query(`
            UPDATE \`main_dashboard\`
            SET \`tahun_anggaran\` = NULL
        `);
    }
}
