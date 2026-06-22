import { MigrationInterface, QueryRunner } from 'typeorm';

export class BackfillAndDeduplicateMainDashboard1770900000001 implements MigrationInterface {
    name = 'BackfillAndDeduplicateMainDashboard1770900000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove duplicate rows, keep the earliest entry per usulan + jenis.
        await queryRunner.query(`
            DELETE FROM main_dashboard a
            USING main_dashboard b
            WHERE a.id > b.id
              AND a.id_usulan = b.id_usulan
              AND a.id_jenis_usulan = b.id_jenis_usulan
        `);

        await queryRunner.query(`
            INSERT INTO main_dashboard (id_usulan, id_jenis_usulan, id_asb_status, nama_usulan, reject_info, tahun_anggaran, created_at)
            SELECT
                a.id,
                1,
                a.id_asb_status,
                a.nama_asb,
                a.reject_reason,
                a.tahun_anggaran,
                a.created_at
            FROM asb a
            WHERE a.deleted_at IS NULL
              AND NOT EXISTS (
                SELECT 1
                FROM main_dashboard md
                WHERE md.id_usulan = a.id
                  AND md.id_jenis_usulan = 1
              )
        `);

        await queryRunner.query(`
            INSERT INTO main_dashboard (id_usulan, id_jenis_usulan, id_asb_status, nama_usulan, reject_info, tahun_anggaran, created_at)
            SELECT
                uj.id,
                2,
                uj.id_usulan_jalan_status,
                uj.nama_usulan,
                uj.reject_reason,
                uj.tahun_anggaran,
                uj.created_at
            FROM usulan_jalan uj
            WHERE uj.deleted_at IS NULL
              AND NOT EXISTS (
                SELECT 1
                FROM main_dashboard md
                WHERE md.id_usulan = uj.id
                  AND md.id_jenis_usulan = 2
              )
        `);

        await queryRunner.query(`
            INSERT INTO main_dashboard (id_usulan, id_jenis_usulan, id_asb_status, nama_usulan, reject_info, tahun_anggaran, created_at)
            SELECT
                us.id,
                3,
                us.id_usulan_saluran_status,
                us.nama_usulan,
                us.reject_reason,
                us.tahun_anggaran,
                us.created_at
            FROM usulan_saluran us
            WHERE us.deleted_at IS NULL
              AND NOT EXISTS (
                SELECT 1
                FROM main_dashboard md
                WHERE md.id_usulan = us.id
                  AND md.id_jenis_usulan = 3
              )
        `);

        // Keep denormalized dashboard rows in sync with source usulan tables.
        await queryRunner.query(`
            UPDATE main_dashboard md
            SET
                id_asb_status = a.id_asb_status,
                nama_usulan = a.nama_asb,
                reject_info = a.reject_reason,
                tahun_anggaran = a.tahun_anggaran
            FROM asb a
            WHERE md.id_usulan = a.id
              AND md.id_jenis_usulan = 1
              AND a.deleted_at IS NULL
        `);

        await queryRunner.query(`
            UPDATE main_dashboard md
            SET
                id_asb_status = uj.id_usulan_jalan_status,
                nama_usulan = uj.nama_usulan,
                reject_info = uj.reject_reason,
                tahun_anggaran = uj.tahun_anggaran
            FROM usulan_jalan uj
            WHERE md.id_usulan = uj.id
              AND md.id_jenis_usulan = 2
              AND uj.deleted_at IS NULL
        `);

        await queryRunner.query(`
            UPDATE main_dashboard md
            SET
                id_asb_status = us.id_usulan_saluran_status,
                nama_usulan = us.nama_usulan,
                reject_info = us.reject_reason,
                tahun_anggaran = us.tahun_anggaran
            FROM usulan_saluran us
            WHERE md.id_usulan = us.id
              AND md.id_jenis_usulan = 3
              AND us.deleted_at IS NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Non-destructive rollback is not practical for backfilled rows.
    }
}
