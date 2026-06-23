import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJenisUsulan1763805006429 implements MigrationInterface {
    name = 'SeedJenisUsulan1763805006429';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jenisUsulanData = [{ jenis: 'Gedung' }, { jenis: 'Jalan' }, { jenis: 'Saluran' }];

        for (const item of jenisUsulanData) {
            await queryRunner.query(
                `INSERT INTO "jenis_usulan" ("jenis")
                 VALUES ($1)
                 ON CONFLICT ("jenis") DO NOTHING`,
                [item.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = ['Gedung', 'Jalan', 'Saluran'];

        const placeholders = jenisList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "jenis_usulan" WHERE "jenis" IN (${placeholders})`,
            jenisList,
        );
    }
}
