import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedKecamatansTulungagung1764851253616 implements MigrationInterface {
    name = 'SeedKecamatansTulungagung1764851253616';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "kecamatans" ("id_kabkota", "kode_kecamatan", "nama_kecamatan") VALUES
            (62, '01', 'Tulungagung'),
            (62, '02', 'Boyolangu'),
            (62, '03', 'Kedungwaru'),
            (62, '04', 'Ngantru'),
            (62, '05', 'Kauman'),
            (62, '06', 'Pagerwojo'),
            (62, '07', 'Sendang'),
            (62, '08', 'Karangrejo'),
            (62, '09', 'Gondang'),
            (62, '10', 'Sumbergempol'),
            (62, '11', 'Ngunut'),
            (62, '12', 'Pucanglaban'),
            (62, '13', 'Rejotangan'),
            (62, '14', 'Kalidawir'),
            (62, '15', 'Besuki'),
            (62, '16', 'Campurdarat'),
            (62, '17', 'Bandung'),
            (62, '18', 'Pakel'),
            (62, '19', 'Tanggung Gunung')
            ON CONFLICT DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "kecamatans" 
            WHERE "id_kabkota" = 62 
            AND "kode_kecamatan" IN ('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19');
        `);
    }
}
