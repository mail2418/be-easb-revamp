import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateKelurahans1764851869231 implements MigrationInterface {
    name = 'CreateKelurahans1764851869231';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "kelurahans" (
                "id" SERIAL PRIMARY KEY,
                "id_kecamatan" INTEGER NOT NULL,
                "nama_kelurahan" VARCHAR(255) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_kelurahans_kecamatan" ON "kelurahans" ("id_kecamatan")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "idx_kelurahans_deleted_at" ON "kelurahans" ("deleted_at")`);

        // Add foreign key to kecamatans
        await queryRunner.query(`
            ALTER TABLE "kelurahans"
            ADD CONSTRAINT "fk_kelurahans_kecamatans"
            FOREIGN KEY ("id_kecamatan")
            REFERENCES "kecamatans"("id")
            ON DELETE CASCADE
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_kelurahans_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_kelurahans_updated_at
            BEFORE UPDATE ON "kelurahans"
            FOR EACH ROW
            EXECUTE FUNCTION set_kelurahans_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_kelurahans_updated_at ON "kelurahans"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_kelurahans_updated_at`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "kelurahans" DROP CONSTRAINT IF EXISTS "fk_kelurahans_kecamatans"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kelurahans_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_kelurahans_kecamatan"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "kelurahans"`);
    }
}
