import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJenisUsulan1765000000002 implements MigrationInterface {
    name = 'SeedJenisUsulan1765000000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "jenis_usulan" ("id", "jenis") VALUES
            (1, 'Default'),
            (2, 'Jalan'),
            (3, 'Saluran')
            ON CONFLICT ("id") DO NOTHING;
        `);

        await queryRunner.query(`
            SELECT setval('jenis_usulan_id_seq', (SELECT MAX(id) FROM "jenis_usulan"));
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "jenis_usulan" WHERE "id" IN (1, 2, 3);`);
    }
}
