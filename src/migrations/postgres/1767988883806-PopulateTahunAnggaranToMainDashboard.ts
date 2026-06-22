import { MigrationInterface, QueryRunner } from 'typeorm';

export class PopulateTahunAnggaranToMainDashboard1767988883806 implements MigrationInterface {
    name = 'PopulateTahunAnggaranToMainDashboard1767988883806';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE "main_dashboard" md
            SET "tahun_anggaran" = a.tahun_anggaran
            FROM "asb" a
            WHERE md.id_usulan = a.id
                AND md.id_jenis_usulan = 1
                AND a.deleted_at IS NULL;
        `);

        await queryRunner.query(`
            UPDATE "main_dashboard" md
            SET "tahun_anggaran" = uj.tahun_anggaran
            FROM "usulan_jalan" uj
            WHERE md.id_usulan = uj.id
                AND md.id_jenis_usulan IN (2, 3)
                AND uj.deleted_at IS NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Set tahun_anggaran to NULL for all records
        await queryRunner.query(`
            UPDATE "main_dashboard"
            SET "tahun_anggaran" = NULL;
        `);
    }
}
