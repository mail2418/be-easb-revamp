import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSpesifikasiDesainLentur1770103100005 implements MigrationInterface {
    name = 'SeedJalanSpesifikasiDesainLentur1770103100005';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            { spec: 'Bagan Desain 3', desc: 'Bagan Desain 3 : Opsi Biaya Minimum dengan CTB' },
            { spec: 'Bagan Desain 3A', desc: 'Bagan Desain 3A : Opsi Biaya Minimum dengan HRS' },
            { spec: 'Bagan Desain 3B', desc: 'Bagan Desain 3B : Aspal dengan Lapis Fondasi Berbutir' },
            { spec: 'Bagan Desain 3C', desc: 'Bagan Desain 3C : Penyesuaian LPA pada Bagan Desain 3B untuk Tanah Dasar CBR ≥ 7%' },
        ];

        for (const item of items) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_spesifikasi_desain_lentur\` (\`spec\`, \`desc\`) VALUES (?, ?)`,
                [item.spec, item.desc],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`jalan_spesifikasi_desain_lentur\` WHERE \`spec\` IN ('Bagan Desain 3', 'Bagan Desain 3A', 'Bagan Desain 3B', 'Bagan Desain 3C')`
        );
    }
}
