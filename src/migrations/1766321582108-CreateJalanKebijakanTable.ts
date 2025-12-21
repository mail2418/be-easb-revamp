import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanKebijakanTable1766321582108 implements MigrationInterface {
    name = 'CreateJalanKebijakanTable1766321582108';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "jalan_kebijakan" (
                "id" SERIAL PRIMARY KEY,
                "id_kabkota" INTEGER NOT NULL,
                "bulan" INTEGER NOT NULL,
                "tahun" INTEGER NOT NULL,
                "nilai_ppn" DECIMAL(15, 2) NOT NULL,
                "nilai_smkk" DECIMAL(15, 2) NOT NULL,
                "suku_bunga" DECIMAL(15, 2) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Foreign Key
        await queryRunner.query(`
            ALTER TABLE "jalan_kebijakan"
            ADD CONSTRAINT "fk_jalan_kebijakan_kabkota"
            FOREIGN KEY ("id_kabkota")
            REFERENCES "kab_kota"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Index for faster lookup
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_kebijakan_kabkota_bulan_tahun" 
            ON "jalan_kebijakan" ("id_kabkota", "bulan", "tahun");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_jalan_kebijakan_kabkota_bulan_tahun";`);
        await queryRunner.query(`ALTER TABLE "jalan_kebijakan" DROP CONSTRAINT IF EXISTS "fk_jalan_kebijakan_kabkota";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "jalan_kebijakan";`);
    }
}
