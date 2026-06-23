import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSpesifikasiDesainKaku1770103100004 implements MigrationInterface {
    name = 'SeedJalanSpesifikasiDesainKaku1770103100004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                spec: 'Bagan Desain 4',
                desc: 'Bagan Desain 4 : Perkerasan Kaku untuk Beban Lalu Lintas Berat',
            },
            {
                spec: 'Bagan Desain 4A',
                desc: 'Bagan Desain 4A : Perkerasan Kaku untuk Beban Lalu Lintas Ringan',
            },
        ];

        for (const item of items) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_spesifikasi_desain_kaku\` (\`spec\`, \`desc\`) VALUES (?, ?)`,
                [item.spec, item.desc],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`jalan_spesifikasi_desain_kaku\` WHERE \`spec\` IN ('Bagan Desain 4', 'Bagan Desain 4A')`,
        );
    }
}
