import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbJenis1770088000023 implements MigrationInterface {
    name = 'SeedAsbJenis1770088000023';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbJenises = [
            { jenis: 'Pembangunan', asb: 'Fisik' },
            { jenis: 'Pemeliharaan', asb: 'Fisik' },
        ];

        for (const jenis of asbJenises) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`asb_jenis\` (\`jenis\`, \`asb\`)
                 VALUES (?, ?)`,
                [jenis.jenis, jenis.asb],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`asb_jenis\` WHERE \`jenis\` IN ('Pembangunan', 'Pemeliharaan')`
        );
    }
}
