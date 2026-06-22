import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateMainDashboardFromExistingData1767890341541 implements MigrationInterface {
    name = 'PopulateMainDashboardFromExistingData1767890341541';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "main_dashboard" ("id_usulan", "id_jenis_usulan", "id_asb_status", "nama_usulan", "reject_info", "created_at")
            SELECT 
                a.id AS id_usulan,
                1 AS id_jenis_usulan,
                a.id_asb_status,
                a.nama_asb AS nama_usulan,
                a.reject_reason AS reject_info,
                a.created_at
            FROM "asb" a
            WHERE a.deleted_at IS NULL
            ORDER BY a.created_at DESC;
        `);

        await queryRunner.query(`
            INSERT INTO "main_dashboard" ("id_usulan", "id_jenis_usulan", "id_asb_status", "nama_usulan", "reject_info", "created_at")
            SELECT 
                uj.id AS id_usulan,
                2 AS id_jenis_usulan,
                uj.id_usulan_jalan_status AS id_asb_status,
                uj.nama_usulan,
                uj.reject_reason AS reject_info,
                uj.created_at
            FROM "usulan_jalan" uj
            WHERE uj.deleted_at IS NULL
            ORDER BY uj.created_at DESC;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "main_dashboard";`);
    }
}
