import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSaluranSmkkNew1770200000006 implements MigrationInterface {
    name = 'SeedJalanSaluranSmkkNew1770200000006';

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
                `INSERT IGNORE INTO \`jalan_saluran_smkk\` (\`id_jenis_usulan\`, \`no_mata_pembayaran\`, \`uraian\`, \`satuan\`, \`harga_satuan\`, \`pengali\`) VALUES (?, ?, ?, ?, ?, ?)`,
                [row.id_jenis_usulan, row.no_mata_pembayaran, row.uraian, row.satuan, row.harga_satuan, row.pengali],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `DELETE FROM \`jalan_saluran_smkk\` WHERE \`id_jenis_usulan\` = ? AND \`no_mata_pembayaran\` = ? AND \`uraian\` = ?`,
                [row.id_jenis_usulan, row.no_mata_pembayaran, row.uraian],
            );
        }
    }
}
