import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRencanaTahunAnggarans1783000000000 implements MigrationInterface {
    name = 'CreateRencanaTahunAnggarans1783000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`rencana_tahun_anggarans\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`tahun\` INT NOT NULL,
                \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
                \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` DATETIME(6) NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`UQ_rencana_tahun_anggarans_tahun\` (\`tahun\`),
                INDEX \`idx_rencana_tahun_anggarans_active\` (\`is_active\`),
                INDEX \`idx_rencana_tahun_anggarans_deleted\` (\`deleted_at\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        await queryRunner.query(`
            INSERT IGNORE INTO \`rencana_tahun_anggarans\` (\`tahun\`, \`is_active\`)
            VALUES (${currentYear}, 1), (${nextYear}, 1);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`rencana_tahun_anggarans\`;`);
    }
}
