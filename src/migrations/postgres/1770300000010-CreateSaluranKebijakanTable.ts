import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSaluranKebijakanTable1770300000010 implements MigrationInterface {
    name = 'CreateSaluranKebijakanTable1770300000010';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "saluran_kebijakan" (
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

        await queryRunner.query(`
            ALTER TABLE "saluran_kebijakan"
            ADD CONSTRAINT "fk_saluran_kebijakan_kabkota"
            FOREIGN KEY ("id_kabkota")
            REFERENCES "kabkotas"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_saluran_kebijakan_kabkota_bulan_tahun"
            ON "saluran_kebijakan" ("id_kabkota", "bulan", "tahun");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_saluran_kebijakan_updated_at') THEN
                    CREATE TRIGGER set_saluran_kebijakan_updated_at
                    BEFORE UPDATE ON "saluran_kebijakan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_saluran_kebijakan_updated_at ON "saluran_kebijakan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_saluran_kebijakan_kabkota_bulan_tahun";`);
        await queryRunner.query(`ALTER TABLE "saluran_kebijakan" DROP CONSTRAINT IF EXISTS "fk_saluran_kebijakan_kabkota";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "saluran_kebijakan";`);
    }
}
