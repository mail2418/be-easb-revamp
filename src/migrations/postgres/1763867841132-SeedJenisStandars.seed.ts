import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJenisStandars1763867841132 implements MigrationInterface {
    name = 'SeedJenisStandars1763867841132';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jenisStandars = [
            { jenis: 'SSH' },
            { jenis: 'HSPK' },
            { jenis: 'ASB' },
            { jenis: 'SBU' },
        ];

        for (const jenis of jenisStandars) {
            await queryRunner.query(
                `INSERT INTO "jenis_standars" ("jenis")
                 VALUES ($1)
                 ON CONFLICT ("jenis") DO NOTHING`,
                [jenis.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = [
            'SSH',
            'HSPK',
            'ASB',
            'SBU',
        ];

        const placeholders = jenisList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jenis_standars" WHERE "jenis" IN (${placeholders})`,
            jenisList,
        );
    }
}
