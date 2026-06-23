import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJalanSpesifikasiDesainLentur1770087536002 implements MigrationInterface {
    name = 'CreateJalanSpesifikasiDesainLentur1770087536002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`jalan_spesifikasi_desain_lentur\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`spec\` varchar(255) NOT NULL,
                \`desc\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`idx_jalan_spesifikasi_desain_lentur_spec\` (\`spec\`),
                INDEX \`idx_jalan_spesifikasi_desain_lentur_deleted\` (\`deleted_at\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX \`idx_jalan_spesifikasi_desain_lentur_deleted\` ON \`jalan_spesifikasi_desain_lentur\``,
        );
        await queryRunner.query(
            `DROP INDEX \`idx_jalan_spesifikasi_desain_lentur_spec\` ON \`jalan_spesifikasi_desain_lentur\``,
        );
        await queryRunner.query(`DROP TABLE IF EXISTS \`jalan_spesifikasi_desain_lentur\``);
    }
}
