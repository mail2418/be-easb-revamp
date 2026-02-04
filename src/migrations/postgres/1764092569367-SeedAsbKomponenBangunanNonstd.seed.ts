import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKomponenBangunanNonstd1764092569367 implements MigrationInterface {
    name = 'SeedAsbKomponenBangunanNonstd1764092569367';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO asb_komponen_bangunan_nonstd (komponen, files, id_asb_jenis, id_asb_tipe_bangunan) VALUES
            ('Alat Pengkondisi Udara', 'ORIGIN', 1, 5),
            ('Elevator/Escalator', 'ORIGIN', 1, 5),
            ('Tata Suara (Sound System)', 'ORIGIN', 1, 5),
            ('Telepon/PABX', 'ORIGIN', 1, 5),
            ('Instalasi IT (Informasi dan Teknologi)', 'ORIGIN', 1, 5),
            ('Elektrikal', 'ORIGIN', 1, 5),
            ('Sistem Proteksi Kebakaran', 'ORIGIN', 1, 5),
            ('Penangkal Petir Khusus', 'ORIGIN', 1, 5),
            ('IPAL', 'ORIGIN', 1, 5),
            ('Interior (dan Furniture)', 'ORIGIN', 1, 5),
            ('Gas Pembakaran', 'ORIGIN', 1, 5),
            ('Gas Medis', 'ORIGIN', 1, 5),
            ('Pencegahan Bahaya Rayap', 'ORIGIN', 1, 5),
            ('Pondasi Dalam', 'ORIGIN', 1, 5),
            ('Fasilitas Penyandang Disabilitas', 'ORIGIN', 1, 5),
            ('Sarana dan Prasarana Lingkungan', 'ORIGIN', 1, 5),
            ('Peningkatan Mutu', 'ORIGIN', 1, 5),
            ('Perizinan selain IMB', 'ORIGIN', 1, 5),
            ('Penyiapan Pematangan Lahan', 'ORIGIN', 1, 5),
            ('Pemenuhan Persyaratan Bangunan Gedung Hijau', 'ORIGIN', 1, 5),
            ('Penyambungan Utilitas', 'ORIGIN', 1, 5),
            ('Alat Pengkondisi Udara', 'ORIGIN', 2, 5),
            ('Elevator/Escalator', 'ORIGIN', 2, 5),
            ('Tata Suara (Sound System)', 'ORIGIN', 2, 5),
            ('Telepon/PABX', 'ORIGIN', 2, 5),
            ('Instalasi IT (Informasi dan Teknologi)', 'ORIGIN', 2, 5),
            ('Elektrikal', 'ORIGIN', 2, 5),
            ('Sistem Proteksi Kebakaran', 'ORIGIN', 2, 5),
            ('Penangkal Petir Khusus', 'ORIGIN', 2, 5),
            ('IPAL', 'ORIGIN', 2, 5),
            ('Interior (dan Furniture)', 'ORIGIN', 2, 5),
            ('Gas Pembakaran', 'ORIGIN', 2, 5),
            ('Gas Medis', 'ORIGIN', 2, 5),
            ('Pencegahan Bahaya Rayap', 'ORIGIN', 2, 5),
            ('Pondasi Dalam', 'ORIGIN', 2, 5),
            ('Fasilitas Penyandang Disabilitas', 'ORIGIN', 2, 5),
            ('Sarana dan Prasarana Lingkungan', 'ORIGIN', 2, 5),
            ('Peningkatan Mutu', 'ORIGIN', 2, 5),
            ('Perizinan selain IMB', 'ORIGIN', 2, 5),
            ('Penyiapan Pematangan Lahan', 'ORIGIN', 2, 5),
            ('Pemenuhan Persyaratan Bangunan Gedung Hijau', 'ORIGIN', 2, 5),
            ('Penyambungan Utilitas', 'ORIGIN', 2, 5);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM asb_komponen_bangunan_nonstd 
            WHERE komponen IN (
                'Alat Pengkondisi Udara', 'Elevator/Escalator', 'Tata Suara (Sound System)',
                'Telepon/PABX', 'Instalasi IT (Informasi dan Teknologi)', 'Elektrikal',
                'Sistem Proteksi Kebakaran', 'Penangkal Petir Khusus', 'IPAL',
                'Interior (dan Furniture)', 'Gas Pembakaran', 'Gas Medis',
                'Pencegahan Bahaya Rayap', 'Pondasi Dalam', 'Fasilitas Penyandang Disabilitas',
                'Sarana dan Prasarana Lingkungan', 'Peningkatan Mutu', 'Perizinan selain IMB',
                'Penyiapan Pematangan Lahan', 'Pemenuhan Persyaratan Bangunan Gedung Hijau',
                'Penyambungan Utilitas'
            );
        `);
    }
}
