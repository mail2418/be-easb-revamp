import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanJenisPemeliharaanTable1766240678559 implements MigrationInterface {
    name = 'CreateJalanJenisPemeliharaanTable1766240678559';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if table exists, if not create it
        const tableExists = await queryRunner.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'jalan_jenis_pemeliharaan'
            );
        `);

        if (!tableExists[0].exists) {
            // Create table with new structure
            await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS "jalan_jenis_pemeliharaan" (
                    "id" SERIAL PRIMARY KEY,
                    "tingkat_pemeliharaan" VARCHAR(255) NOT NULL,
                    "jenis_pemeliharaan" VARCHAR(255) NOT NULL,
                    "ruang_lingkup" TEXT NOT NULL,
                    "deskripsi" TEXT NOT NULL,
                    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                    "deleted_at" TIMESTAMPTZ NULL,
                    CONSTRAINT "uk_jalan_jenis_pemeliharaan_tingkat_jenis" 
                        UNIQUE ("tingkat_pemeliharaan", "jenis_pemeliharaan")
                );
            `);
        } else {
            // Table exists, alter it
            // Drop old columns if they exist
            await queryRunner.query(`
                DO $$ 
                BEGIN
                    IF EXISTS (SELECT 1 FROM information_schema.columns 
                               WHERE table_name = 'jalan_jenis_pemeliharaan' 
                               AND column_name = 'jenis') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" DROP COLUMN IF EXISTS "jenis";
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns 
                               WHERE table_name = 'jalan_jenis_pemeliharaan' 
                               AND column_name = 'desc') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" DROP COLUMN IF EXISTS "desc";
                    END IF;
                    IF EXISTS (SELECT 1 FROM information_schema.columns 
                               WHERE table_name = 'jalan_jenis_pemeliharaan' 
                               AND column_name = 'uraian') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" DROP COLUMN IF EXISTS "uraian";
                    END IF;
                END $$;
            `);

            // Add new columns if they don't exist
            await queryRunner.query(`
                DO $$ 
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                   WHERE table_name = 'jalan_jenis_pemeliharaan' 
                                   AND column_name = 'tingkat_pemeliharaan') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" 
                        ADD COLUMN "tingkat_pemeliharaan" VARCHAR(255);
                    END IF;
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                   WHERE table_name = 'jalan_jenis_pemeliharaan' 
                                   AND column_name = 'jenis_pemeliharaan') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" 
                        ADD COLUMN "jenis_pemeliharaan" VARCHAR(255);
                    END IF;
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                   WHERE table_name = 'jalan_jenis_pemeliharaan' 
                                   AND column_name = 'ruang_lingkup') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" 
                        ADD COLUMN "ruang_lingkup" TEXT;
                    END IF;
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                                   WHERE table_name = 'jalan_jenis_pemeliharaan' 
                                   AND column_name = 'deskripsi') THEN
                        ALTER TABLE "jalan_jenis_pemeliharaan" 
                        ADD COLUMN "deskripsi" TEXT;
                    END IF;
                END $$;
            `);

            // Set NOT NULL constraints after data migration (if needed)
            await queryRunner.query(`
                ALTER TABLE "jalan_jenis_pemeliharaan" 
                ALTER COLUMN "tingkat_pemeliharaan" SET NOT NULL,
                ALTER COLUMN "jenis_pemeliharaan" SET NOT NULL,
                ALTER COLUMN "ruang_lingkup" SET NOT NULL,
                ALTER COLUMN "deskripsi" SET NOT NULL;
            `);
        }

        // Drop old indexes if they exist
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_jenis_pemeliharaan_jenis";
        `);

        // Create new indexes
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_pemeliharaan_tingkat" 
            ON "jalan_jenis_pemeliharaan" ("tingkat_pemeliharaan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_pemeliharaan_jenis" 
            ON "jalan_jenis_pemeliharaan" ("jenis_pemeliharaan");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_jalan_jenis_pemeliharaan_deleted" 
            ON "jalan_jenis_pemeliharaan" ("deleted_at");
        `);

        // Add unique constraint if not exists
        await queryRunner.query(`
            DO $$ 
            BEGIN
                IF NOT EXISTS (
                    SELECT 1 FROM pg_constraint 
                    WHERE conname = 'uk_jalan_jenis_pemeliharaan_tingkat_jenis'
                ) THEN
                    ALTER TABLE "jalan_jenis_pemeliharaan" 
                    ADD CONSTRAINT "uk_jalan_jenis_pemeliharaan_tingkat_jenis" 
                    UNIQUE ("tingkat_pemeliharaan", "jenis_pemeliharaan");
                END IF;
            END $$;
        `);

        // Create or update trigger for updated_at
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_jalan_jenis_pemeliharaan_updated_at') THEN
                    CREATE TRIGGER set_jalan_jenis_pemeliharaan_updated_at
                    BEFORE UPDATE ON "jalan_jenis_pemeliharaan"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop new columns and recreate old ones
        await queryRunner.query(`
            ALTER TABLE "jalan_jenis_pemeliharaan" 
            DROP COLUMN IF EXISTS "tingkat_pemeliharaan",
            DROP COLUMN IF EXISTS "jenis_pemeliharaan",
            DROP COLUMN IF EXISTS "ruang_lingkup",
            DROP COLUMN IF EXISTS "deskripsi";
        `);

        await queryRunner.query(`
            ALTER TABLE "jalan_jenis_pemeliharaan" 
            ADD COLUMN IF NOT EXISTS "jenis" VARCHAR(255),
            ADD COLUMN IF NOT EXISTS "desc" VARCHAR(255),
            ADD COLUMN IF NOT EXISTS "uraian" VARCHAR(255);
        `);

        // Drop new indexes
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_jalan_jenis_pemeliharaan_tingkat";
            DROP INDEX IF EXISTS "idx_jalan_jenis_pemeliharaan_jenis";
            DROP INDEX IF EXISTS "idx_jalan_jenis_pemeliharaan_deleted";
        `);

        // Drop unique constraint
        await queryRunner.query(`
            ALTER TABLE "jalan_jenis_pemeliharaan" 
            DROP CONSTRAINT IF EXISTS "uk_jalan_jenis_pemeliharaan_tingkat_jenis";
        `);
    }
}
