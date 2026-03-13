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
            ('Lantai 10', 'L.10', 1.333, 2),
            ('Lantai 11', 'L.11', 1.364, 2),
            ('Lantai 12', 'L.12', 1.393, 2),
            ('Lantai 13', 'L.13', 1.420, 2),
            ('Lantai 14', 'L.14', 1.445, 2),
            ('Lantai 15', 'L.15', 1.468, 2),
            ('Lantai 16', 'L.16', 1.489, 2),
            ('Lantai 17', 'L.17', 1.508, 2),
            ('Lantai 18', 'L.18', 1.525, 2),
            ('Lantai 19', 'L.19', 1.541, 2),
            ('Lantai 20', 'L.20', 1.556, 2),
            ('Lantai 21', 'L.21', 1.570, 2),
            ('Lantai 22', 'L.22', 1.584, 2),
            ('Lantai 23', 'L.23', 1.597, 2),
            ('Lantai 24', 'L.24', 1.610, 2),
            ('Lantai 25', 'L.25', 1.622, 2),
            ('Lantai 26', 'L.26', 1.634, 2),
            ('Lantai 27', 'L.27', 1.645, 2),
            ('Lantai 28', 'L.28', 1.656, 2),
            ('Lantai 29', 'L.29', 1.666, 2),
            ('Lantai 30', 'L.30', 1.676, 2);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Hapus hanya data yang di-seed oleh migration ini
        await queryRunner.query(`
            DELETE FROM "asb_lantais"
            WHERE "lantai" IN (
                'Basement 3', 'Basement 2', 'Basement 1',
                'Lantai 1', 'Lantai 2', 'Lantai 3', 'Lantai 4', 'Lantai 5',
                'Lantai 6', 'Lantai 7', 'Lantai 8', 'Lantai 9', 'Lantai 10',
                'Lantai 11', 'Lantai 12', 'Lantai 13', 'Lantai 14', 'Lantai 15',
                'Lantai 16', 'Lantai 17', 'Lantai 18', 'Lantai 19', 'Lantai 20',
                'Lantai 21', 'Lantai 22', 'Lantai 23', 'Lantai 24', 'Lantai 25',
                'Lantai 26', 'Lantai 27', 'Lantai 28', 'Lantai 29', 'Lantai 30'
            );
        `);
    }
}
