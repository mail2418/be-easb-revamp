import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanSmkk1766682231217 implements MigrationInterface {
    name = 'SeedJalanSmkk1766682231217';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "jalan_smkk" ("bulan", "tahun", "persentase_smkk")
            SELECT $1, $2, $3
            WHERE NOT EXISTS (
                SELECT 1 FROM "jalan_smkk"
                WHERE "bulan" = $1 AND "tahun" = $2
            )
        `, [12, 2025, 0.02]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "jalan_smkk"
            WHERE "bulan" = $1 AND "tahun" = $2 AND "persentase_smkk" = $3
        `, [12, 2025, 0.02]);
    }
}

