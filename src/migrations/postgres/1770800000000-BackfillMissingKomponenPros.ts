import { MigrationInterface, QueryRunner } from 'typeorm';

const DEFAULT_MIN = 0.05;
const DEFAULT_AVG_MIN = 0.08;
const DEFAULT_AVG = 0.1;
const DEFAULT_AVG_MAX = 0.12;
const DEFAULT_MAX = 0.15;

export class BackfillMissingKomponenPros1770800000000 implements MigrationInterface {
    name = 'BackfillMissingKomponenPros1770800000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO asb_komponen_bangunan_pros_std
                (id_asb_komponen_bangunan_std, min, avg_min, avg, avg_max, max, created_at, updated_at)
            SELECT
                k.id,
                ${DEFAULT_MIN},
                ${DEFAULT_AVG_MIN},
                ${DEFAULT_AVG},
                ${DEFAULT_AVG_MAX},
                ${DEFAULT_MAX},
                NOW(),
                NOW()
            FROM asb_komponen_bangunan_stds k
            WHERE k.deleted_at IS NULL
              AND NOT EXISTS (
                SELECT 1
                FROM asb_komponen_bangunan_pros_std p
                WHERE p.id_asb_komponen_bangunan_std = k.id
                  AND p.deleted_at IS NULL
              )
        `);

        await queryRunner.query(`
            INSERT INTO asb_komponen_bangunan_pros_nonstd
                (id_asb_komponen_bangunan_nonstd, min, avg_min, avg, avg_max, max, created_at, updated_at)
            SELECT
                k.id,
                ${DEFAULT_MIN},
                ${DEFAULT_AVG_MIN},
                ${DEFAULT_AVG},
                ${DEFAULT_AVG_MAX},
                ${DEFAULT_MAX},
                NOW(),
                NOW()
            FROM asb_komponen_bangunan_nonstd k
            WHERE k.deleted_at IS NULL
              AND NOT EXISTS (
                SELECT 1
                FROM asb_komponen_bangunan_pros_nonstd p
                WHERE p.id_asb_komponen_bangunan_nonstd = k.id
                  AND p.deleted_at IS NULL
              )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Non-destructive: only remove rows that exactly match the default backfill values.
        await queryRunner.query(`
            DELETE FROM asb_komponen_bangunan_pros_std
            WHERE min = ${DEFAULT_MIN}
              AND avg_min = ${DEFAULT_AVG_MIN}
              AND avg = ${DEFAULT_AVG}
              AND avg_max = ${DEFAULT_AVG_MAX}
              AND max = ${DEFAULT_MAX}
              AND id_asb_komponen_bangunan_std IN (
                SELECT k.id FROM asb_komponen_bangunan_stds k
              )
        `);

        await queryRunner.query(`
            DELETE FROM asb_komponen_bangunan_pros_nonstd
            WHERE min = ${DEFAULT_MIN}
              AND avg_min = ${DEFAULT_AVG_MIN}
              AND avg = ${DEFAULT_AVG}
              AND avg_max = ${DEFAULT_AVG_MAX}
              AND max = ${DEFAULT_MAX}
              AND id_asb_komponen_bangunan_nonstd IN (
                SELECT k.id FROM asb_komponen_bangunan_nonstd k
              )
        `);
    }
}
