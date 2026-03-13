import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAsbLog1764118553937 implements MigrationInterface {
    name = 'CreateAsbLog1764118553937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create table
        await queryRunner.query(`
            CREATE TABLE "asb_log" (
                "id" SERIAL NOT NULL,
                "id_user" INTEGER NOT NULL,
                "log" TEXT NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ,
                CONSTRAINT "pk_asb_log" PRIMARY KEY ("id")
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "idx_asb_log_user" ON "asb_log" ("id_user")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_log_created_at" ON "asb_log" ("created_at")`);
        await queryRunner.query(`CREATE INDEX "idx_asb_log_deleted_at" ON "asb_log" ("deleted_at")`);

        // Add foreign key with SET NULL to preserve logs
        await queryRunner.query(`
            ALTER TABLE "asb_log"
            ADD CONSTRAINT "fk_asb_log_user"
            FOREIGN KEY ("id_user")
            REFERENCES "users"("id")
            ON DELETE SET NULL
        `);

        // Create trigger for updated_at
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION set_asb_log_updated_at()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = now();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER trigger_set_asb_log_updated_at
            BEFORE UPDATE ON "asb_log"
            FOR EACH ROW
            EXECUTE FUNCTION set_asb_log_updated_at();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop trigger
        await queryRunner.query(`DROP TRIGGER IF EXISTS trigger_set_asb_log_updated_at ON "asb_log"`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS set_asb_log_updated_at`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "asb_log" DROP CONSTRAINT IF EXISTS "fk_asb_log_user"`);

        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_log_deleted_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_log_created_at"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_asb_log_user"`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS "asb_log"`);
    }
}
