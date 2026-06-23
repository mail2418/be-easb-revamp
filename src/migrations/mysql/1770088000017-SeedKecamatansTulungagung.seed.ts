import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedKecamatansTulungagung1770088000017 implements MigrationInterface {
    name = 'SeedKecamatansTulungagung1770088000017';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get id_kabkota for Tulungagung (kode '3504') instead of hardcoding id = 62
        // This ensures compatibility even if auto-increment values differ between PostgreSQL and MySQL
        const kabkotas = await queryRunner.query(
            `SELECT id FROM \`kabkotas\` WHERE \`kode\` = ? LIMIT 1`,
            ['3504'], // Tulungagung
        );

        if (!kabkotas || kabkotas.length === 0) {
            throw new Error(
                'Kabkota with kode 3504 (Tulungagung) not found. Make sure SeedKabKotas has been run.',
            );
        }

        const idKabkota = kabkotas[0].id as number;

        await queryRunner.query(
            `
            INSERT IGNORE INTO \`kecamatans\` (\`id_kabkota\`, \`kode_kecamatan\`, \`nama_kecamatan\`) VALUES
            (?, '01', 'Tulungagung'),
            (?, '02', 'Boyolangu'),
            (?, '03', 'Kedungwaru'),
            (?, '04', 'Ngantru'),
            (?, '05', 'Kauman'),
            (?, '06', 'Pagerwojo'),
            (?, '07', 'Sendang'),
            (?, '08', 'Karangrejo'),
            (?, '09', 'Gondang'),
            (?, '10', 'Sumbergempol'),
            (?, '11', 'Ngunut'),
            (?, '12', 'Pucanglaban'),
            (?, '13', 'Rejotangan'),
            (?, '14', 'Kalidawir'),
            (?, '15', 'Besuki'),
            (?, '16', 'Campurdarat'),
            (?, '17', 'Bandung'),
            (?, '18', 'Pakel'),
            (?, '19', 'Tanggung Gunung')
        `,
            Array(19).fill(idKabkota),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get id_kabkota for Tulungagung (kode '3504')
        const kabkotas = await queryRunner.query(
            `SELECT id FROM \`kabkotas\` WHERE \`kode\` = ? LIMIT 1`,
            ['3504'], // Tulungagung
        );

        if (kabkotas && kabkotas.length > 0) {
            const idKabkota = kabkotas[0].id as number;
            await queryRunner.query(
                `
                DELETE FROM \`kecamatans\` 
                WHERE \`id_kabkota\` = ? 
                AND \`kode_kecamatan\` IN ('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19')
            `,
                [idKabkota],
            );
        }
    }
}
