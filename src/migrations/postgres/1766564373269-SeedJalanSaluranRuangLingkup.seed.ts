import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSaluranRuangLingkup1766564373269 implements MigrationInterface {
    name = 'SeedJalanSaluranRuangLingkup1766564373269';

    private readonly rows = [
        { id_jenis_usulan: 2, deskripsi_ruang_lingkup: 'SMKK' },
        { id_jenis_usulan: 2, deskripsi_ruang_lingkup: 'PERKERASAN BETON' },
        { id_jenis_usulan: 2, deskripsi_ruang_lingkup: 'PEKERJAAN TANAH DAN GEOSINTETIK' },
        { id_jenis_usulan: 2, deskripsi_ruang_lingkup: 'PERKERASAN BERBUTIR' },
        { id_jenis_usulan: 2, deskripsi_ruang_lingkup: 'PERKERASAN ASPAL' },
        { id_jenis_usulan: 2, deskripsi_ruang_lingkup: 'PEKERJAAN HARIAN & PEKERJAAN LAIN-LAIN' },
        { id_jenis_usulan: 3, deskripsi_ruang_lingkup: 'DRAINASE' },
        { id_jenis_usulan: 3, deskripsi_ruang_lingkup: 'PEKERJAAN PREVENTIF' },
        { id_jenis_usulan: 3, deskripsi_ruang_lingkup: 'STRUKTUR' },
        { id_jenis_usulan: 3, deskripsi_ruang_lingkup: 'REHABILITASI JEMBATAN' },
        { id_jenis_usulan: 3, deskripsi_ruang_lingkup: 'PEKERJAAN PEMELIHARAAN KINERJA' },
        { id_jenis_usulan: 3, deskripsi_ruang_lingkup: 'SMKK' },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `INSERT INTO "jalan_saluran_ruang_lingkup" ("id_jenis_usulan", "deskripsi_ruang_lingkup")
                 VALUES ($1, $2)
                 ON CONFLICT ("id_jenis_usulan", "deskripsi_ruang_lingkup") DO NOTHING`,
                [row.id_jenis_usulan, row.deskripsi_ruang_lingkup],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `DELETE FROM "jalan_saluran_ruang_lingkup"
                 WHERE "id_jenis_usulan" = $1 AND "deskripsi_ruang_lingkup" = $2`,
                [row.id_jenis_usulan, row.deskripsi_ruang_lingkup],
            );
        }
    }
}
