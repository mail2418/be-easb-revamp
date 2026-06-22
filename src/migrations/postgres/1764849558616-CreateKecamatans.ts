import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateKecamatans1764849558616 implements MigrationInterface {
    name = 'CreateKecamatans1764849558616';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "kecamatans" (
                "id" SERIAL PRIMARY KEY,
                "id_kabkota" INTEGER NOT NULL,
                "kode_kecamatan" VARCHAR(50) NOT NULL,
                "nama_kecamatan" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_kecamatans_kabkota" ON "kecamatans" ("id_kabkota")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_kecamatans_deleted_at" ON "kecamatans" ("deleted_at")`);

        // Add foreign key to kabkotas
        await queryRunner.query(`
            ALTER TABLE "kecamatans"
            ADD CONSTRAINT "fk_kecamatans_kabkotas"
            FOREIGN KEY ("id_kabkota")
            REFERENCES "kabkotas"("id")
            ON DELETE CASCADE
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_kecamatans_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_kecamatans_updated_at
            BEFORE UPDATE ON "kecamatans"
            FOR EACH ROW
            EXECUTE FUNCTION set_kecamatans_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_kecamatans_updated_at ON "kecamatans"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_kecamatans_updated_at`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "kecamatans" DROP CONSTRAINT IF EXISTS "fk_kecamatans_kabkotas"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kecamatans_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kecamatans_kabkota"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "kecamatans"`);
    }
}
