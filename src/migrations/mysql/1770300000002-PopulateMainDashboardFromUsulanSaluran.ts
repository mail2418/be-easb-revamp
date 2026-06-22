import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateMainDashboardFromUsulanSaluran1770300000002 implements MigrationInterface {
    name = 'PopulateMainDashboardFromUsulanSaluran1770300000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO \`main_dashboard\` (\`id_usulan\`, \`id_jenis_usulan\`, \`id_asb_status\`, \`nama_usulan\`, \`reject_info\`, \`tahun_anggaran\`, \`created_at\`)
            SELECT 
                us.id AS id_usulan,
                3 AS id_jenis_usulan,
                us.id_usulan_saluran_status AS id_asb_status,
                us.nama_usulan,
                us.reject_reason AS reject_info,
                us.tahun_anggaran,
                us.created_at
            FROM \`usulan_saluran\` us
            WHERE us.deleted_at IS NULL
                AND NOT EXISTS (
                    SELECT 1 FROM \`main_dashboard\` md
                    WHERE md.id_usulan = us.id AND md.id_jenis_usulan = 3
                )
            ORDER BY us.created_at DESC
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`main_dashboard\`
            WHERE id_jenis_usulan = 3
        `);
    }
}
