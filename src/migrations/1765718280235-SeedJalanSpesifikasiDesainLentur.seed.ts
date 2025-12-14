import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSpesifikasiDesainLentur1765718280235 implements MigrationInterface {
    name = 'SeedJalanSpesifikasiDesainLentur1765718280235';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanSpesifikasiDesainLenturs = [
            {
                spec: 'Bagan Desain 3',
                desc: 'Bagan Desain 3 : Opsi Biaya Minimum dengan CTB',
            },
            {
                spec: 'Bagan Desain 3A',
                desc: 'Bagan Desain 3A : Opsi Biaya Minimum dengan HRS',
            },
            {
                spec: 'Bagan Desain 3B',
                desc: 'Bagan Desain 3B : Aspal dengan Lapis Fondasi Berbutir',
            },
            {
                spec: 'Bagan Desain 3C',
                desc: 'Bagan Desain 3C : Penyesuaian LPA pada Bagan Desain 3B untuk Tanah Dasar CBR ≥ 7%',
            },
        ];

        for (const item of jalanSpesifikasiDesainLenturs) {
            await queryRunner.query(
                `INSERT INTO "jalan_spesifikasi_desain_lentur" ("spec", "desc")
                 VALUES ($1, $2)
                 ON CONFLICT ("spec") DO NOTHING`,
                [item.spec, item.desc],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const specList = [
            'Bagan Desain 3',
            'Bagan Desain 3A',
            'Bagan Desain 3B',
            'Bagan Desain 3C',
        ];

        const placeholders = specList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jalan_spesifikasi_desain_lentur" WHERE "spec" IN (${placeholders})`,
            specList,
        );
    }
}

