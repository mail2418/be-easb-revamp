import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSeedJalanSmkkToSmkkGlobal1767629950946 implements MigrationInterface {
    name = 'UpdateSeedJalanSmkkToSmkkGlobal1767629950946';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Update seed data to use new table name
        await queryRunner.query(
            `
            INSERT INTO "smkk_global" ("bulan", "tahun", "persentase_smkk")
            SELECT $1, $2, $3
            WHERE NOT EXISTS (
                SELECT 1 FROM "smkk_global"
                WHERE "bulan" = $1 AND "tahun" = $2
            )
        `,
            [12, 2025, 0.02],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DELETE FROM "smkk_global"
            WHERE "bulan" = $1 AND "tahun" = $2 AND "persentase_smkk" = $3
        `,
            [12, 2025, 0.02],
        );
    }
}
