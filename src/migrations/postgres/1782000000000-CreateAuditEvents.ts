import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditEvents1782000000000 implements MigrationInterface {
    name = 'CreateAuditEvents1782000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "audit_events" (
                "id" BIGSERIAL PRIMARY KEY,
                "id_user" INT NULL,
                "username" VARCHAR(100) NULL,
                "action" VARCHAR(100) NOT NULL,
                "resource" VARCHAR(100) NULL,
                "resource_id" VARCHAR(100) NULL,
                "method" VARCHAR(10) NULL,
                "path" VARCHAR(512) NULL,
                "status_code" INT NULL,
                "ip_address" VARCHAR(64) NULL,
                "user_agent" VARCHAR(512) NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()
            );
        `);

        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_audit_events_id_user" ON "audit_events" ("id_user");`,
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_audit_events_action" ON "audit_events" ("action");`,
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_audit_events_created_at" ON "audit_events" ("created_at");`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_events_created_at";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_events_action";`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_audit_events_id_user";`);
        await queryRunner.query(`DROP TABLE IF EXISTS "audit_events";`);
    }
}
