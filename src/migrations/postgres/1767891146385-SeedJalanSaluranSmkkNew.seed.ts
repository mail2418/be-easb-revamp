import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSaluranSmkkNew1767891146385 implements MigrationInterface {
    name = 'SeedJalanSaluranSmkkNew1767891146385';

    private readonly rows = [
        // 3 komponen dengan id_jenis_usulan = 2 (Jalan)
        { id_jenis_usulan: 2, no_mata_pembayaran: 'SSH.1', uraian: 'Helm Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.3 },
        { id_jenis_usulan: 2, no_mata_pembayaran: 'SSH.2', uraian: 'Rompi Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.2 },
        { id_jenis_usulan: 2, no_mata_pembayaran: 'SSH.3', uraian: 'Sepatu Safety', satuan: 'Pasang', harga_satuan: 0, pengali: 0.5 },
        // 3 komponen dengan id_jenis_usulan = 3 (Saluran)
        { id_jenis_usulan: 3, no_mata_pembayaran: 'SSH.1', uraian: 'Helm Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.3 },
        { id_jenis_usulan: 3, no_mata_pembayaran: 'SSH.2', uraian: 'Rompi Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.2 },
        { id_jenis_usulan: 3, no_mata_pembayaran: 'SSH.3', uraian: 'Sepatu Safety', satuan: 'Pasang', harga_satuan: 0, pengali: 0.5 },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `INSERT INTO "jalan_saluran_smkk" ("id_jenis_usulan", "no_mata_pembayaran", "uraian", "satuan", "harga_satuan", "pengali")
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT ("id_jenis_usulan", "no_mata_pembayaran", "uraian") DO NOTHING`,
                [row.id_jenis_usulan, row.no_mata_pembayaran, row.uraian, row.satuan, row.harga_satuan, row.pengali],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `DELETE FROM "jalan_saluran_smkk"
                 WHERE "id_jenis_usulan" = $1 AND "no_mata_pembayaran" = $2 AND "uraian" = $3`,
                [row.id_jenis_usulan, row.no_mata_pembayaran, row.uraian],
            );
        }
    }
}
