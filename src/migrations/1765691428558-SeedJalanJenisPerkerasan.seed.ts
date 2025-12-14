import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanJenisPerkerasan1765691428558 implements MigrationInterface {
    name = 'SeedJalanJenisPerkerasan1765691428558';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanJenisPerkerasans = [
            { jenis: 'Perkerasan Lentur (Flexible Pavement)' },
            { jenis: 'Perkerasan Kaku (Rigid Pavement)' },
        ];

        for (const jenis of jalanJenisPerkerasans) {
            await queryRunner.query(
                `INSERT INTO "jalan_jenis_perkerasan" ("jenis")
                 VALUES ($1)
                 ON CONFLICT ("jenis") DO NOTHING`,
                [jenis.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = [
            'Perkerasan Lentur (Flexible Pavement)',
            'Perkerasan Kaku (Rigid Pavement)',
        ];

        const placeholders = jenisList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jalan_jenis_perkerasan" WHERE "jenis" IN (${placeholders})`,
            jenisList,
        );
    }
}

