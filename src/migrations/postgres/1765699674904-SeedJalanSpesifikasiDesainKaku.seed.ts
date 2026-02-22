import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSpesifikasiDesainKaku1765699674904 implements MigrationInterface {
    name = 'SeedJalanSpesifikasiDesainKaku1765699674904';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanSpesifikasiDesainKakus = [
            {
                spec: 'Bagan Desain 4',
                desc: 'Bagan Desain 4 : Perkerasan Kaku untuk Beban Lalu Lintas Berat',
            },
            {
                spec: 'Bagan Desain 4A',
                desc: 'Bagan Desain 4A : Perkerasan Kaku untuk Beban Lalu Lintas Ringan',
            },
        ];

        for (const item of jalanSpesifikasiDesainKakus) {
            await queryRunner.query(
                `INSERT INTO "jalan_spesifikasi_desain_kaku" ("spec", "desc")
                 VALUES ($1, $2)
                 ON CONFLICT ("spec") DO NOTHING`,
                [item.spec, item.desc],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const specList = [
            'Bagan Desain 4',
            'Bagan Desain 4A',
        ];

        const placeholders = specList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jalan_spesifikasi_desain_kaku" WHERE "spec" IN (${placeholders})`,
            specList,
        );
    }
}

