import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanRuangLingkupPerkerasanLentur1770103100003 implements MigrationInterface {
    name = 'SeedJalanRuangLingkupPerkerasanLentur1770103100003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            'Perkerasan Aspal',
            'Lapis Pondasi',
            'Galian Tanah',
            'Timbunan Tanah',
            'Pemadatan Tanah',
            'Marka dan Rambu Jalan',
            'Patok Jalan (Patok Rambu, Pengarah, dan Kilometer)',
            'Median Jalan',
        ];

        for (const jenis of items) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_ruang_lingkup_perkerasan_lentur\` (\`jenis\`) VALUES (?)`,
                [jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const items = [
            'Perkerasan Aspal',
            'Lapis Pondasi',
            'Galian Tanah',
            'Timbunan Tanah',
            'Pemadatan Tanah',
            'Marka dan Rambu Jalan',
            'Patok Jalan (Patok Rambu, Pengarah, dan Kilometer)',
            'Median Jalan',
        ];
        const placeholders = items.map(() => '?').join(', ');
        await queryRunner.query(
            `DELETE FROM \`jalan_ruang_lingkup_perkerasan_lentur\` WHERE \`jenis\` IN (${placeholders})`,
            items,
        );
    }
}
