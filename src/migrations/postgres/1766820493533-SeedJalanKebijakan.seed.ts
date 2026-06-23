import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanKebijakan1766820493533 implements MigrationInterface {
    name = 'SeedJalanKebijakan1766820493533';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            INSERT INTO "jalan_kebijakan" ("id_kabkota", "bulan", "tahun", "nilai_ppn", "nilai_smkk", "suku_bunga")
            SELECT $1, $2, $3, $4, $5, $6
            WHERE NOT EXISTS (
                SELECT 1 FROM "jalan_kebijakan"
                WHERE "id_kabkota" = $1 AND "bulan" = $2 AND "tahun" = $3
            )
        `,
            [62, 12, 2025, 0.11, 0.02, 0.08],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DELETE FROM "jalan_kebijakan"
            WHERE "id_kabkota" = $1 AND "bulan" = $2 AND "tahun" = $3
        `,
            [62, 12, 2025],
        );
    }
}
