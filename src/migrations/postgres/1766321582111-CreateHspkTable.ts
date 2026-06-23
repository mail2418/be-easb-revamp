import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHspkTable1766321582111 implements MigrationInterface {
    name = 'CreateHspkTable1766321582111';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "hspk" (
                "id" SERIAL PRIMARY KEY,
                "id_ruang_lingkup" INTEGER NOT NULL,
                "no_mata_pembayaran" VARCHAR(255) NOT NULL UNIQUE,
                "satuan" VARCHAR(255) NOT NULL,
                "harga_satuan" DECIMAL(15, 2) NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ NULL
            );
        `);

        // Create foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "hspk"
            ADD CONSTRAINT "fk_hspk_jalan_saluran_ruang_lingkup"
            FOREIGN KEY ("id_ruang_lingkup")
            REFERENCES "jalan_saluran_ruang_lingkup"("id")
            ON DELETE CASCADE
            ON UPDATE CASCADE;
        `);

        // Create indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_hspk_ruang_lingkup" 
            ON "hspk" ("id_ruang_lingkup");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_hspk_no_mata_pembayaran" 
            ON "hspk" ("no_mata_pembayaran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_hspk_deleted" 
            ON "hspk" ("deleted_at");
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_hspk_updated_at') THEN
                    CREATE TRIGGER set_hspk_updated_at
                    BEFORE UPDATE ON "hspk"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS set_hspk_updated_at ON "hspk";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_hspk_deleted";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_hspk_no_mata_pembayaran";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_hspk_ruang_lingkup";`);
        await queryRunner.query(
            `ALTER TABLE "hspk" DROP CONSTRAINT IF EXISTS "fk_hspk_jalan_saluran_ruang_lingkup";`,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS "hspk";`);
    }
}
