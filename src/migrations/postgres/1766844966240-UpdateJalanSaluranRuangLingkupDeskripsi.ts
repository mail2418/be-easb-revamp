import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateJalanSaluranRuangLingkupDeskripsi1766844966240 implements MigrationInterface {
    name = 'UpdateJalanSaluranRuangLingkupDeskripsi1766844966240';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop unique constraint temporarily to allow updates
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_ruang_lingkup"
            DROP CONSTRAINT IF EXISTS "uq_jalan_saluran_ruang_lingkup_jenis_deskripsi"
        `);

        // Check if id=3 already has 'PEKERJAAN TANAH DAN GEOSINTETIK'
        // If so, we only need to update id=2 and keep id=3
        const existing3 = await queryRunner.query(`
            SELECT "id", "id_jenis_usulan", "deskripsi_ruang_lingkup"
            FROM "jalan_saluran_ruang_lingkup"
            WHERE "id" = 3
        `);

        // Check if id=2 has 'PERKERASAN BETON'
        const existing2 = await queryRunner.query(`
            SELECT "id", "id_jenis_usulan", "deskripsi_ruang_lingkup"
            FROM "jalan_saluran_ruang_lingkup"
            WHERE "id" = 2
        `);

        // If id=3 already has 'PEKERJAAN TANAH DAN GEOSINTETIK' with same id_jenis_usulan as id=2
        if (existing3.length > 0 && existing3[0].deskripsi_ruang_lingkup === 'PEKERJAAN TANAH DAN GEOSINTETIK' && 
            existing2.length > 0 && existing2[0].id_jenis_usulan === existing3[0].id_jenis_usulan) {
            // Only update id=2, and delete id=3 to avoid duplicate
            await queryRunner.query(`
                UPDATE "jalan_saluran_ruang_lingkup"
                SET "deskripsi_ruang_lingkup" = 'PEKERJAAN TANAH DAN GEOSINTETIK'
                WHERE "id" = 2 AND "deskripsi_ruang_lingkup" = 'PERKERASAN BETON'
            `);
            // Delete id=3 since it's a duplicate
            await queryRunner.query(`
                DELETE FROM "jalan_saluran_ruang_lingkup"
                WHERE "id" = 3
            `);
        } else {
            // Update id=2: Change deskripsi_ruang_lingkup from 'PERKERASAN BETON' to 'PEKERJAAN TANAH DAN GEOSINTETIK'
            await queryRunner.query(`
                UPDATE "jalan_saluran_ruang_lingkup"
                SET "deskripsi_ruang_lingkup" = 'PEKERJAAN TANAH DAN GEOSINTETIK'
                WHERE "id" = 2 AND "deskripsi_ruang_lingkup" = 'PERKERASAN BETON'
            `);

            // Update id=3: Change deskripsi_ruang_lingkup from 'PERKERASAN BETON' to 'PEKERJAAN TANAH DAN GEOSINTETIK'
            await queryRunner.query(`
                UPDATE "jalan_saluran_ruang_lingkup"
                SET "deskripsi_ruang_lingkup" = 'PEKERJAAN TANAH DAN GEOSINTETIK'
                WHERE "id" = 3 AND "deskripsi_ruang_lingkup" = 'PERKERASAN BETON'
            `);

            // Remove duplicates: keep the one with smaller id, delete others
            await queryRunner.query(`
                DELETE FROM "jalan_saluran_ruang_lingkup" a
                USING "jalan_saluran_ruang_lingkup" b
                WHERE a."id_jenis_usulan" = b."id_jenis_usulan"
                  AND a."deskripsi_ruang_lingkup" = b."deskripsi_ruang_lingkup"
                  AND a."deskripsi_ruang_lingkup" = 'PEKERJAAN TANAH DAN GEOSINTETIK'
                  AND a."id" > b."id"
            `);
        }

        // Re-add unique constraint
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_ruang_lingkup"
            ADD CONSTRAINT "uq_jalan_saluran_ruang_lingkup_jenis_deskripsi"
            UNIQUE ("id_jenis_usulan", "deskripsi_ruang_lingkup")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop unique constraint temporarily to allow updates
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_ruang_lingkup"
            DROP CONSTRAINT IF EXISTS "uq_jalan_saluran_ruang_lingkup_jenis_deskripsi"
        `);

        // Revert id=2: Change deskripsi_ruang_lingkup back from 'PEKERJAAN TANAH DAN GEOSINTETIK' to 'PERKERASAN BETON'
        await queryRunner.query(`
            UPDATE "jalan_saluran_ruang_lingkup"
            SET "deskripsi_ruang_lingkup" = 'PERKERASAN BETON'
            WHERE "id" = 2 AND "deskripsi_ruang_lingkup" = 'PEKERJAAN TANAH DAN GEOSINTETIK'
        `);

        // Check if id=3 exists and needs to be reverted
        // If id=3 was deleted in up(), we need to recreate it with 'PEKERJAAN TANAH DAN GEOSINTETIK'
        // But since we don't know the original id_jenis_usulan, we'll check if it exists first
        const existing3 = await queryRunner.query(`
            SELECT "id" FROM "jalan_saluran_ruang_lingkup" WHERE "id" = 3
        `);

        if (existing3.length > 0) {
            // Revert id=3: Change deskripsi_ruang_lingkup back from 'PEKERJAAN TANAH DAN GEOSINTETIK' to 'PERKERASAN BETON'
            await queryRunner.query(`
                UPDATE "jalan_saluran_ruang_lingkup"
                SET "deskripsi_ruang_lingkup" = 'PERKERASAN BETON'
                WHERE "id" = 3 AND "deskripsi_ruang_lingkup" = 'PEKERJAAN TANAH DAN GEOSINTETIK'
            `);
        } else {
            // If id=3 was deleted, we need to recreate it
            // Get id_jenis_usulan from id=2 to recreate id=3
            const id2Data = await queryRunner.query(`
                SELECT "id_jenis_usulan" FROM "jalan_saluran_ruang_lingkup" WHERE "id" = 2
            `);
            
            if (id2Data.length > 0) {
                await queryRunner.query(`
                    INSERT INTO "jalan_saluran_ruang_lingkup" ("id_jenis_usulan", "deskripsi_ruang_lingkup")
                    VALUES ($1, 'PEKERJAAN TANAH DAN GEOSINTETIK')
                    ON CONFLICT DO NOTHING
                `, [id2Data[0].id_jenis_usulan]);
            }
        }

        // Re-add unique constraint
        await queryRunner.query(`
            ALTER TABLE "jalan_saluran_ruang_lingkup"
            ADD CONSTRAINT "uq_jalan_saluran_ruang_lingkup_jenis_deskripsi"
            UNIQUE ("id_jenis_usulan", "deskripsi_ruang_lingkup")
        `);
    }
}

