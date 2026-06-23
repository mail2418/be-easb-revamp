import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJenisStandars1770088000010 implements MigrationInterface {
    name = 'SeedJenisStandars1770088000010';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jenisStandars = [
            { jenis: 'SSH' },
            { jenis: 'HSPK' },
            { jenis: 'ASB' },
            { jenis: 'SBU' },
        ];

        for (const jenis of jenisStandars) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jenis_standars\` (\`jenis\`)
                 VALUES (?)`,
                [jenis.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`jenis_standars\` WHERE \`jenis\` IN ('SSH', 'HSPK', 'ASB', 'SBU')`,
        );
    }
}
