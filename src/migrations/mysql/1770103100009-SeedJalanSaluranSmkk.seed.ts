import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSaluranSmkk1770103100009 implements MigrationInterface {
    name = 'SeedJalanSaluranSmkk1770103100009';

    private readonly rows = [
        { id_ruang_lingkup: 1, no_mata_pembayaran: 'SSH.1', uraian: 'Helm Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.3 },
        { id_ruang_lingkup: 1, no_mata_pembayaran: 'SSH.2', uraian: 'Rompi Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.2 },
        { id_ruang_lingkup: 1, no_mata_pembayaran: 'SSH.3', uraian: 'Sepatu Safety', satuan: 'Pasang', harga_satuan: 0, pengali: 0.5 },
        { id_ruang_lingkup: 12, no_mata_pembayaran: 'SSH.1', uraian: 'Helm Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.3 },
        { id_ruang_lingkup: 12, no_mata_pembayaran: 'SSH.2', uraian: 'Rompi Safety', satuan: 'Buah', harga_satuan: 0, pengali: 0.2 },
        { id_ruang_lingkup: 12, no_mata_pembayaran: 'SSH.3', uraian: 'Sepatu Safety', satuan: 'Pasang', harga_satuan: 0, pengali: 0.5 },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_saluran_smkk\` (\`id_ruang_lingkup\`, \`no_mata_pembayaran\`, \`uraian\`, \`satuan\`, \`harga_satuan\`, \`pengali\`) VALUES (?, ?, ?, ?, ?, ?)`,
                [row.id_ruang_lingkup, row.no_mata_pembayaran, row.uraian, row.satuan, row.harga_satuan, row.pengali],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `DELETE FROM \`jalan_saluran_smkk\` WHERE \`id_ruang_lingkup\` = ? AND \`no_mata_pembayaran\` = ? AND \`uraian\` = ?`,
                [row.id_ruang_lingkup, row.no_mata_pembayaran, row.uraian],
            );
        }
    }
}
