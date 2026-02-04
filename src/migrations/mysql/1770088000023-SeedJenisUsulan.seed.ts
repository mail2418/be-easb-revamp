import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJenisUsulan1770088000023 implements MigrationInterface {
    name = 'SeedJenisUsulan1770088000023';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jenisUsulanData = [
            { jenis: 'Gedung' },
            { jenis: 'Jalan' },
            { jenis: 'Saluran' },
        ];

        for (const item of jenisUsulanData) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jenis_usulan\` (\`jenis\`)
                 VALUES (?)`,
                [item.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = ['Gedung', 'Jalan', 'Saluran'];

        const placeholders = jenisList.map(() => '?').join(', ');
        await queryRunner.query(
            `DELETE FROM \`jenis_usulan\` WHERE \`jenis\` IN (${placeholders})`,
            jenisList,
        );
    }
}
