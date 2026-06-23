import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSaluranSmkk1767630754085 implements MigrationInterface {
    name = 'SeedJalanSaluranSmkk1767630754085';

    private readonly rows = [
        {
            id_ruang_lingkup: 1,
            no_mata_pembayaran: 'SSH.1',
            uraian: 'Helm Safety',
            satuan: 'Buah',
            harga_satuan: 0,
            pengali: 0.3,
        },
        {
            id_ruang_lingkup: 1,
            no_mata_pembayaran: 'SSH.2',
            uraian: 'Rompi Safety',
            satuan: 'Buah',
            harga_satuan: 0,
            pengali: 0.2,
        },
        {
            id_ruang_lingkup: 1,
            no_mata_pembayaran: 'SSH.3',
            uraian: 'Sepatu Safety',
            satuan: 'Pasang',
            harga_satuan: 0,
            pengali: 0.5,
        },
        {
            id_ruang_lingkup: 12,
            no_mata_pembayaran: 'SSH.1',
            uraian: 'Helm Safety',
            satuan: 'Buah',
            harga_satuan: 0,
            pengali: 0.3,
        },
        {
            id_ruang_lingkup: 12,
            no_mata_pembayaran: 'SSH.2',
            uraian: 'Rompi Safety',
            satuan: 'Buah',
            harga_satuan: 0,
            pengali: 0.2,
        },
        {
            id_ruang_lingkup: 12,
            no_mata_pembayaran: 'SSH.3',
            uraian: 'Sepatu Safety',
            satuan: 'Pasang',
            harga_satuan: 0,
            pengali: 0.5,
        },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `INSERT INTO "jalan_saluran_smkk" ("id_ruang_lingkup", "no_mata_pembayaran", "uraian", "satuan", "harga_satuan", "pengali")
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT ("id_ruang_lingkup", "no_mata_pembayaran", "uraian") DO NOTHING`,
                [
                    row.id_ruang_lingkup,
                    row.no_mata_pembayaran,
                    row.uraian,
                    row.satuan,
                    row.harga_satuan,
                    row.pengali,
                ],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const row of this.rows) {
            await queryRunner.query(
                `DELETE FROM "jalan_saluran_smkk"
                 WHERE "id_ruang_lingkup" = $1 AND "no_mata_pembayaran" = $2 AND "uraian" = $3`,
                [row.id_ruang_lingkup, row.no_mata_pembayaran, row.uraian],
            );
        }
    }
}
