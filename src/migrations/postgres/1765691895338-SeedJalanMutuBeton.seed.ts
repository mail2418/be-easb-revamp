import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanMutuBeton1765691895338 implements MigrationInterface {
    name = 'SeedJalanMutuBeton1765691895338';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanMutuBetons = [
            { jenis: "f'c 20 Mpa" },
            { jenis: "f'c 25 Mpa" },
        ];

        for (const jenis of jalanMutuBetons) {
            await queryRunner.query(
                `INSERT INTO "jalan_mutu_beton" ("jenis")
                 VALUES ($1)
                 ON CONFLICT ("jenis") DO NOTHING`,
                [jenis.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = [
            "f'c 20 Mpa",
            "f'c 25 Mpa",
        ];

        const placeholders = jenisList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jalan_mutu_beton" WHERE "jenis" IN (${placeholders})`,
            jenisList,
        );
    }
}

