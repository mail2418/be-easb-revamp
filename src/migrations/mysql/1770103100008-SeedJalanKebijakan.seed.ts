import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanKebijakan1770103100008 implements MigrationInterface {
    name = 'SeedJalanKebijakan1770103100008';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get id_kabkota for Tulungagung (kode '3504') instead of hardcoding id = 62
        // This ensures compatibility even if auto-increment values differ between PostgreSQL and MySQL
        const kabkotas = await queryRunner.query(
            `SELECT id FROM \`kabkotas\` WHERE \`kode\` = ? LIMIT 1`,
            ['3504'] // Tulungagung
        );

        if (!kabkotas || kabkotas.length === 0) {
            throw new Error('Kabkota with kode 3504 (Tulungagung) not found. Make sure SeedKabKotas has been run.');
        }

        const idKabkota = kabkotas[0].id as number;

        // Check if record exists before inserting
        const existing = await queryRunner.query(
            `SELECT 1 FROM \`jalan_kebijakan\` WHERE \`id_kabkota\` = ? AND \`bulan\` = ? AND \`tahun\` = ? LIMIT 1`,
            [idKabkota, 12, 2025]
        );
        
        if (!existing || existing.length === 0) {
            await queryRunner.query(
                `INSERT INTO \`jalan_kebijakan\` (\`id_kabkota\`, \`bulan\`, \`tahun\`, \`nilai_ppn\`, \`nilai_smkk\`, \`suku_bunga\`) VALUES (?, ?, ?, ?, ?, ?)`,
                [idKabkota, 12, 2025, 0.11, 0.02, 0.08]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get id_kabkota for Tulungagung (kode '3504')
        const kabkotas = await queryRunner.query(
            `SELECT id FROM \`kabkotas\` WHERE \`kode\` = ? LIMIT 1`,
            ['3504'] // Tulungagung
        );

        if (kabkotas && kabkotas.length > 0) {
            const idKabkota = kabkotas[0].id as number;
            await queryRunner.query(
                `DELETE FROM \`jalan_kebijakan\` WHERE \`id_kabkota\` = ? AND \`bulan\` = ? AND \`tahun\` = ?`,
                [idKabkota, 12, 2025]
            );
        }
    }
}
