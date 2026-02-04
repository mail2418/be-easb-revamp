import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKomponenBangunanStd1770088000013 implements MigrationInterface {
    name = 'SeedAsbKomponenBangunanStd1770088000013';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed data for asb_jenis id = 1
        await queryRunner.query(`
            INSERT IGNORE INTO \`asb_komponen_bangunan_stds\` (\`komponen\`, \`files\`, \`id_asb_jenis\`, \`id_asb_tipe_bangunan\`) VALUES
            ('Pondasi', 'ORIGIN', 1, 1),
            ('Struktur', 'ORIGIN', 1, 1),
            ('Lantai', 'ORIGIN', 1, 1),
            ('Dinding', 'ORIGIN', 1, 1),
            ('Plafon', 'ORIGIN', 1, 1),
            ('Atap', 'ORIGIN', 1, 1),
            ('Utilitas', 'ORIGIN', 1, 1),
            ('Finishing', 'ORIGIN', 1, 1),
            ('Pondasi', 'ORIGIN', 1, 2),
            ('Struktur', 'ORIGIN', 1, 2),
            ('Lantai', 'ORIGIN', 1, 2),
            ('Dinding', 'ORIGIN', 1, 2),
            ('Plafon', 'ORIGIN', 1, 2),
            ('Atap', 'ORIGIN', 1, 2),
            ('Utilitas', 'ORIGIN', 1, 2),
            ('Finishing', 'ORIGIN', 1, 2)
        `);

        // Seed data for asb_jenis id = 2
        await queryRunner.query(`
            INSERT IGNORE INTO \`asb_komponen_bangunan_stds\` (\`komponen\`, \`files\`, \`id_asb_jenis\`, \`id_asb_tipe_bangunan\`) VALUES
            ('Pondasi', 'ORIGIN', 2, 1),
            ('Struktur Kolom, Balok & Ring Balk', 'ORIGIN', 2, 1),
            ('Struktur Plesteran', 'ORIGIN', 2, 1),
            ('Atap Rangka', 'ORIGIN', 2, 1),
            ('Atap Penutup', 'ORIGIN', 2, 1),
            ('Langit - Langit Rangka', 'ORIGIN', 2, 1),
            ('Langit - Langit Penutup', 'ORIGIN', 2, 1),
            ('Dinding Batu Bata / Partisi', 'ORIGIN', 2, 1),
            ('Dinding Plesteran', 'ORIGIN', 2, 1),
            ('Dinding Kaca', 'ORIGIN', 2, 1),
            ('Dinding Pintu', 'ORIGIN', 2, 1),
            ('Dinding Kosen', 'ORIGIN', 2, 1),
            ('Penutup Lantai', 'ORIGIN', 2, 1),
            ('Instalasi Listrik', 'ORIGIN', 2, 1),
            ('Instalasi Air', 'ORIGIN', 2, 1),
            ('Drainase Limbah', 'ORIGIN', 2, 1),
            ('Cat Struktur', 'ORIGIN', 2, 1),
            ('Cat Langit Langit', 'ORIGIN', 2, 1),
            ('Cat Dinding', 'ORIGIN', 2, 1),
            ('Cat Pintu/Kosen', 'ORIGIN', 2, 1),
            ('Pondasi', 'ORIGIN', 2, 2),
            ('Struktur Kolom, Balok & Ring Balk', 'ORIGIN', 2, 2),
            ('Struktur Plesteran', 'ORIGIN', 2, 2),
            ('Atap Rangka', 'ORIGIN', 2, 2),
            ('Atap Penutup', 'ORIGIN', 2, 2),
            ('Langit - Langit Rangka', 'ORIGIN', 2, 2),
            ('Langit - Langit Penutup', 'ORIGIN', 2, 2),
            ('Dinding Batu Bata / Partisi', 'ORIGIN', 2, 2),
            ('Dinding Plesteran', 'ORIGIN', 2, 2),
            ('Dinding Kaca', 'ORIGIN', 2, 2),
            ('Dinding Pintu', 'ORIGIN', 2, 2),
            ('Dinding Kosen', 'ORIGIN', 2, 2),
            ('Lantai (Penutup Lantai)', 'ORIGIN', 2, 2),
            ('Instalasi Listrik', 'ORIGIN', 2, 2),
            ('Instalasi Air', 'ORIGIN', 2, 2),
            ('Drainase Limbah', 'ORIGIN', 2, 2),
            ('Cat Struktur', 'ORIGIN', 2, 2),
            ('Cat Langit Langit', 'ORIGIN', 2, 2),
            ('Cat Dinding', 'ORIGIN', 2, 2),
            ('Cat Pintu/Kosen', 'ORIGIN', 2, 2),
            ('Pintu', 'ORIGIN', 2, 2)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`asb_komponen_bangunan_stds\` 
            WHERE \`komponen\` IN (
                'Pondasi', 'Struktur', 'Lantai', 'Dinding', 'Plafon', 'Atap', 'Utilitas', 'Finishing',
                'Struktur Kolom, Balok & Ring Balk', 'Struktur Plesteran',
                'Atap Rangka', 'Atap Penutup',
                'Langit - Langit Rangka', 'Langit - Langit Penutup',
                'Dinding Batu Bata / Partisi', 'Dinding Plesteran', 'Dinding Kaca', 
                'Dinding Pintu', 'Dinding Kosen',
                'Penutup Lantai', 'Lantai (Penutup Lantai)',
                'Instalasi Listrik', 'Instalasi Air', 'Drainase Limbah',
                'Cat Struktur', 'Cat Langit Langit', 'Cat Dinding', 'Cat Pintu/Kosen', 'Pintu'
            )
        `);
    }
}
