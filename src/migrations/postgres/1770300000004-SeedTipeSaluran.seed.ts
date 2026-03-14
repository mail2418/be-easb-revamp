import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTipeSaluran1770300000004 implements MigrationInterface {
    name = 'SeedTipeSaluran1770300000004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tipeSalurans = [
            { tipe_saluran: 'Saluran Beton' },
            { tipe_saluran: 'Saluran Pasangan Batu' },
            { tipe_saluran: 'Saluran Gorong-gorong' },
        ];

        for (const item of tipeSalurans) {
            await queryRunner.query(
                `INSERT INTO "tipe_saluran" ("tipe_saluran")
                 VALUES ($1)`,
                [item.tipe_saluran],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tipeList = ['Saluran Beton', 'Saluran Pasangan Batu', 'Saluran Gorong-gorong'];
        const placeholders = tipeList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "tipe_saluran" WHERE "tipe_saluran" IN (${placeholders})`,
            tipeList,
        );
    }
}
