import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbBipekStandard1764307674061 implements MigrationInterface {
    name = 'CreateAsbBipekStandard1764307674061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_bipek_standards" (
                "id" SERIAL NOT NULL,
                "files" VARCHAR(10) NOT NULL DEFAULT 'ORIGIN',
                "id_asb_komponen_bangunan_std" INTEGER,
                "bobot_input" DOUBLE PRECISION,
                "bobot_input_prosentase" DOUBLE PRECISION,
                "calculation_method" VARCHAR(20),
                "jumlah_bobot" DOUBLE PRECISION,
                "rincian_harga" DOUBLE PRECISION,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_bipek_standards" PRIMARY KEY ("id"),
                CONSTRAINT "ck_asb_bipek_standards_files" CHECK ("files" IN ('ORIGIN', 'REVIEW')),
                CONSTRAINT "ck_asb_bipek_standards_calculation_method" CHECK ("calculation_method" IN ('min', 'avg', 'max', 'avg_min', 'avg_max'))
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standards_files" ON "asb_bipek_standards" ("files")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standards_komponen_bangunan_std" ON "asb_bipek_standards" ("id_asb_komponen_bangunan_std")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standards_calculation_method" ON "asb_bipek_standards" ("calculation_method")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_bipek_standards_deleted_at" ON "asb_bipek_standards" ("deleted_at")`);

        // Add foreign key to asb_komponen_bangunan_std
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standards"
            ADD CONSTRAINT "fk_asb_bipek_standards_komponen_bangunan_std"
            FOREIGN KEY ("id_asb_komponen_bangunan_std")
            REFERENCES "asb_komponen_bangunan_stds"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_bipek_standards_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_bipek_standards_updated_at
            BEFORE UPDATE ON "asb_bipek_standards"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_bipek_standards_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_bipek_standards_updated_at ON "asb_bipek_standards"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_bipek_standards_updated_at`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "asb_bipek_standards" DROP CONSTRAINT IF EXISTS "fk_asb_bipek_standards_komponen_bangunan_std"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standards_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standards_calculation_method"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standards_komponen_bangunan_std"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_bipek_standards_files"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_bipek_standards"`);
    }
}
