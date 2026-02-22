import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanJenisPerkerasan1766231451286 implements MigrationInterface {
    name = 'SeedJalanJenisPerkerasan1766231451286';

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
                `INSERT INTO "jalan_jenis_perkerasan" ("jenis_perkerasan")
                 VALUES ($1)
                 ON CONFLICT ("jenis_perkerasan") DO NOTHING`,
                [item.jenis_perkerasan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisPerkerasanList = [
            'Perkerasan Lentur',
            'Perkerasan Lentur + Bahu',
            'Perkerasan Lentur + Pondasi',
            'Perkerasan Kaku',
            'Perkerasan Kaku + Bahu',
            'Perkerasan Kaku + Pondasi',
        ];

        const placeholders = jenisPerkerasanList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jalan_jenis_perkerasan" WHERE "jenis_perkerasan" IN (${placeholders})`,
            jenisPerkerasanList,
        );
    }
}

