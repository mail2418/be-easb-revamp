import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuditEvents1782000000000 implements MigrationInterface {
    name = 'CreateAuditEvents1782000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`audit_events\` (
                \`id\` BIGINT NOT NULL AUTO_INCREMENT,
                \`id_user\` INT NULL,
                \`username\` VARCHAR(100) NULL,
                \`action\` VARCHAR(100) NOT NULL,
                \`resource\` VARCHAR(100) NULL,
                \`resource_id\` VARCHAR(100) NULL,
                \`method\` VARCHAR(10) NULL,
                \`path\` VARCHAR(512) NULL,
                \`status_code\` INT NULL,
                \`ip_address\` VARCHAR(64) NULL,
                \`user_agent\` VARCHAR(512) NULL,
                \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`),
                INDEX \`idx_audit_events_id_user\` (\`id_user\`),
                INDEX \`idx_audit_events_action\` (\`action\`),
                INDEX \`idx_audit_events_created_at\` (\`created_at\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`audit_events\`;`);
    }
}
