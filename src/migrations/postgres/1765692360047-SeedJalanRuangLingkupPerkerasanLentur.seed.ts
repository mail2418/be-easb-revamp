import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanRuangLingkupPerkerasanLentur1765692360047 implements MigrationInterface {
    name = 'SeedJalanRuangLingkupPerkerasanLentur1765692360047';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanRuangLingkupPerkerasanLenturs = [
            { jenis: 'Perkerasan Aspal' },
            { jenis: 'Lapis Pondasi' },
            { jenis: 'Galian Tanah' },
            { jenis: 'Timbunan Tanah' },
            { jenis: 'Pemadatan Tanah' },
            { jenis: 'Marka dan Rambu Jalan' },
            { jenis: 'Patok Jalan (Patok Rambu, Pengarah, dan Kilometer)' },
            { jenis: 'Median Jalan' },
        ];

        for (const jenis of jalanRuangLingkupPerkerasanLenturs) {
            await queryRunner.query(
                `INSERT INTO "jalan_ruang_lingkup_perkerasan_lentur" ("jenis")
                 VALUES ($1)
                 ON CONFLICT ("jenis") DO NOTHING`,
                [jenis.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = [
            'Perkerasan Aspal',
            'Lapis Pondasi',
            'Galian Tanah',
            'Timbunan Tanah',
            'Pemadatan Tanah',
            'Marka dan Rambu Jalan',
            'Patok Jalan (Patok Rambu, Pengarah, dan Kilometer)',
            'Median Jalan',
        ];

        const placeholders = jenisList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jalan_ruang_lingkup_perkerasan_lentur" WHERE "jenis" IN (${placeholders})`,
            jenisList,
        );
    }
}

