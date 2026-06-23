import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanRuangLingkupPerkerasanLentur1770087536004 implements MigrationInterface {
    name = 'CreateJalanRuangLingkupPerkerasanLentur1770087536004';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`jalan_ruang_lingkup_perkerasan_lentur\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`jenis\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`idx_jalan_ruang_lingkup_perkerasan_lentur_jenis\` (\`jenis\`),
                INDEX \`idx_jalan_ruang_lingkup_perkerasan_lentur_deleted\` (\`deleted_at\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`idx_jalan_ruang_lingkup_perkerasan_lentur_deleted\` ON \`jalan_ruang_lingkup_perkerasan_lentur\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_jalan_ruang_lingkup_perkerasan_lentur_jenis\` ON \`jalan_ruang_lingkup_perkerasan_lentur\``,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS \`jalan_ruang_lingkup_perkerasan_lentur\``);
    }
}
