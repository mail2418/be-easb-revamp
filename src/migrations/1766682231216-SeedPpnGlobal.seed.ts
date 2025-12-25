import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPpnGlobal1766682231216 implements MigrationInterface {
    name = 'SeedPpnGlobal1766682231216';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "ppn_global" ("bulan", "tahun", "persentase_ppn")
            SELECT $1, $2, $3
            WHERE NOT EXISTS (
                SELECT 1 FROM "ppn_global"
                WHERE "bulan" = $1 AND "tahun" = $2
            )
        `, [12, 2025, 0.11]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "ppn_global"
            WHERE "bulan" = $1 AND "tahun" = $2 AND "persentase_ppn" = $3
        `, [12, 2025, 0.11]);
    }
}

