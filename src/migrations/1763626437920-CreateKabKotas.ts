import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateKabKota1763626437920 implements MigrationInterface {
    name = 'CreateKabKota1763626437920';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "kabkotas" (
                "id" SERIAL PRIMARY KEY,
                "kode" VARCHAR(10) NOT NULL UNIQUE,
                "nama" VARCHAR(255) NOT NULL,
                "province_id" INTEGER NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL,
                CONSTRAINT "fk_kabkotas_province" 
                    FOREIGN KEY ("province_id") 
                    REFERENCES "provinces" ("id") 
                    ON DELETE RESTRICT ON UPDATE CASCADE
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_kabkotas_province_id" ON "kabkotas" ("province_id");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_kabkotas_kode" ON "kabkotas" ("kode");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_kabkotas_active" ON "kabkotas" ("is_active");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_kabkotas_province_active" ON "kabkotas" ("province_id", "is_active");
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_kabkotas_updated_at') THEN
                    CREATE TRIGGER set_kabkotas_updated_at
                    BEFORE UPDATE ON "kabkotas"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_kabkotas_updated_at ON "kabkotas";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kabkotas_province_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kabkotas_active";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kabkotas_kode";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kabkotas_province_id";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "kabkotas";`);
    }
}
