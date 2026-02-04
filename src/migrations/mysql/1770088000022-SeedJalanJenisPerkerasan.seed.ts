import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanJenisPerkerasan1770088000022 implements MigrationInterface {
    name = 'SeedJalanJenisPerkerasan1770088000022';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanJenisPerkerasans = [
            { jenis_perkerasan: 'Perkerasan Lentur' },
            { jenis_perkerasan: 'Perkerasan Lentur + Bahu' },
            { jenis_perkerasan: 'Perkerasan Lentur + Pondasi' },
            { jenis_perkerasan: 'Perkerasan Kaku' },
            { jenis_perkerasan: 'Perkerasan Kaku + Bahu' },
            { jenis_perkerasan: 'Perkerasan Kaku + Pondasi' },
        ];

        for (const item of jalanJenisPerkerasans) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_jenis_perkerasan\` (\`jenis_perkerasan\`)
                 VALUES (?)`,
                [item.jenis_perkerasan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`jalan_jenis_perkerasan\` WHERE \`jenis_perkerasan\` IN (
                'Perkerasan Lentur',
                'Perkerasan Lentur + Bahu',
                'Perkerasan Lentur + Pondasi',
                'Perkerasan Kaku',
                'Perkerasan Kaku + Bahu',
                'Perkerasan Kaku + Pondasi'
            )
        `);
    }
}
