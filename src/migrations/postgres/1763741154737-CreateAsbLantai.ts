import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAsbLantai1763741154737 implements MigrationInterface {
    name = 'CreateAsbLantai1763741154737';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "asb_lantais" (
                "id" SERIAL PRIMARY KEY,
                "lantai" VARCHAR(255) NOT NULL UNIQUE,
                "type" VARCHAR(255) NOT NULL,
                "koef" DECIMAL(10,4) NOT NULL,
                "id_satuan" INTEGER NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_lantais_lantai" ON "asb_lantais" ("lantai");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_lantais_type" ON "asb_lantais" ("type");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_lantais_id_satuan" ON "asb_lantais" ("id_satuan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_asb_lantais_deleted" ON "asb_lantais" ("deleted_at");
        `);

        await queryRunner.query(`
            ALTER TABLE "asb_lantais" 
            ADD CONSTRAINT "fk_asb_lantais_id_satuan" 
            FOREIGN KEY ("id_satuan") REFERENCES "satuans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_asb_lantais_updated_at') THEN
                    CREATE TRIGGER set_asb_lantais_updated_at
                    BEFORE UPDATE ON "asb_lantais"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_asb_lantais_updated_at ON "asb_lantais";`);
        await queryRunner.query(`ALTER TABLE "asb_lantais" DROP CONSTRAINT IF EXISTS "fk_asb_lantais_id_satuan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_lantais_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_lantais_id_satuan";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_lantais_type";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_lantais_lantai";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_lantais";`);
    }
}
