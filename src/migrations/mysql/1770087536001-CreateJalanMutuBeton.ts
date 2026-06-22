import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanMutuBeton1770087536001 implements MigrationInterface {
    name = 'CreateJalanMutuBeton1770087536001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`jalan_mutu_beton\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`jenis\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`idx_jalan_mutu_beton_jenis\` (\`jenis\`),
                INDEX \`idx_jalan_mutu_beton_deleted\` (\`deleted_at\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_jalan_mutu_beton_deleted\` ON \`jalan_mutu_beton\``);
        await queryRunner.query(`DROP INDEX \`idx_jalan_mutu_beton_jenis\` ON \`jalan_mutu_beton\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`jalan_mutu_beton\``);
    }
}
