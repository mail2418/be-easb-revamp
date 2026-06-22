import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbLantai1763741154738 implements MigrationInterface {
    name = 'SeedAsbLantais1763741154738';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "asb_lantais" ("lantai", "type", "koef", "id_satuan") VALUES
            ('Basement 3', 'B.3', 1.393, 2),
            ('Basement 2', 'B.2', 1.299, 2),
            ('Basement 1', 'B.1', 1.197, 2),
            ('Lantai 1', 'L.1', 1.000, 2),
            ('Lantai 2', 'L.2', 1.090, 2),
            ('Lantai 3', 'L.3', 1.120, 2),
            ('Lantai 4', 'L.4', 1.135, 2),
            ('Lantai 5', 'L.5', 1.162, 2),
            ('Lantai 6', 'L.6', 1.197, 2),
            ('Lantai 7', 'L.7', 1.236, 2),
            ('Lantai 8', 'L.8', 1.265, 2),
            ('Lantai 9', 'L.9', 1.299, 2),
            ('Lantai 10', 'L.10', 1.333, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Hapus hanya data yang di-seed oleh migration ini
        await queryRunner.query(`
            DELETE FROM "asb_lantais"
            WHERE "lantai" IN (
                'Basement 3', 'Basement 2', 'Basement 1',
                'Lantai 1', 'Lantai 2', 'Lantai 3', 'Lantai 4', 'Lantai 5',
                'Lantai 6', 'Lantai 7', 'Lantai 8', 'Lantai 9', 'Lantai 10'
            );
        `);
    }
}
