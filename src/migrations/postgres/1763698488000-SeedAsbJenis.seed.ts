import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbJenis1763698488000 implements MigrationInterface {
    name = 'SeedAsbJenis1763698488000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbJenises = [
            { jenis: 'Pembangunan', asb: 'Fisik' },
            { jenis: 'Pemeliharaan', asb: 'Fisik' },
        ];

        for (const jenis of asbJenises) {
            await queryRunner.query(
                `INSERT INTO "asb_jenis" ("jenis", "asb")
                 VALUES ($1, $2)
                 ON CONFLICT ("jenis") DO NOTHING`,
                [jenis.jenis, jenis.asb],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const jenisList = [
            'Pembangunan',
            'Pemeliharaan',
        ];

        const placeholders = jenisList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "asb_jenis" WHERE "jenis" IN (${placeholders})`,
            jenisList,
        );
    }
}
