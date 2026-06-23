import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanJenisPemeliharaan1766240678560 implements MigrationInterface {
    name = 'SeedJalanJenisPemeliharaan1766240678560';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const data = [
            {
                tingkat_pemeliharaan: 'Pemeliharaan Rutin',
                jenis_pemeliharaan: 'ringan',
                deskripsi: 'Mencegah kerusakan dan menjaga kondisi jalan tetap baik',
                ruang_lingkup:
                    'Pembersihan saluran drainase, bahu jalan, dan permukaan jalan\n\tPenutupan lubang kecil dengan tambalan\n\tPengecaatan marka jalan dan perbaikan rambu\n\tPemotongan rumput di bahu jalan',
            },
            {
                tingkat_pemeliharaan: 'Pemeliharaan Rutin',
                jenis_pemeliharaan: 'berat',
                deskripsi: 'Mencegah kerusakan dan menjaga kondisi jalan tetap baik',
                ruang_lingkup:
                    'Pembersihan saluran drainase, bahu jalan, dan permukaan jalan\n\tPenutupan lubang kecil dengan tambalan\n\tPengecaatan marka jalan dan perbaikan rambu\n\tPemotongan rumput di bahu jalan',
            },
            {
                tingkat_pemeliharaan: 'Pemeliharaan Berkala',
                jenis_pemeliharaan: 'ringan',
                deskripsi: 'Kondisi jalan mulai menurun tapi strukturnya masih baik',
                ruang_lingkup:
                    'Pelapisan ulang (overlay) aspal\n\tPeremajaan lapisan aus (resurfacing)\n\tPenggantian sebagian lapisan perkreasan',
            },
            {
                tingkat_pemeliharaan: 'Pemeliharaan Berkala',
                jenis_pemeliharaan: 'berat',
                deskripsi: 'Kondisi jalan mulai menurun tapi strukturnya masih baik',
                ruang_lingkup:
                    'Pelapisan ulang (overlay) aspal\n\tPeremajaan lapisan aus (resurfacing)\n\tPenggantian sebagian lapisan perkreasan',
            },
            {
                tingkat_pemeliharaan: 'Rehabilitasi Jalan',
                jenis_pemeliharaan: 'ringan',
                deskripsi:
                    'Kerusakan cukup berat sehingga lapisan perkerasan dan struktur bawahnya perlu diperbaiki',
                ruang_lingkup:
                    'Rekonstruksi sebagian lapisan pondasi\n\tPenggantian sebagian lapisan perkerasan rusak',
            },
            {
                tingkat_pemeliharaan: 'Rehabilitasi Jalan',
                jenis_pemeliharaan: 'berat',
                deskripsi:
                    'Kerusakan cukup berat sehingga lapisan perkerasan dan struktur bawahnya perlu diperbaiki',
                ruang_lingkup:
                    'Rekonstruksi sebagian lapisan pondasi\n\tPenggantian sebagian lapisan perkerasan rusak',
            },
            {
                tingkat_pemeliharaan: 'Rekonstruksi',
                jenis_pemeliharaan: 'ringan',
                deskripsi: 'Kondisi jalan rusak total dan tidak efisien untuk diperbaiki',
                ruang_lingkup: 'Peningkatan kapasitas /geometri jalan',
            },
            {
                tingkat_pemeliharaan: 'Rekonstruksi',
                jenis_pemeliharaan: 'berat',
                deskripsi: 'Kondisi jalan rusak total dan tidak efisien untuk diperbaiki',
                ruang_lingkup: 'Peningkatan kapasitas /geometri jalan',
            },
        ];

        for (const item of data) {
            await queryRunner.query(
                `INSERT INTO "jalan_jenis_pemeliharaan" 
                 ("tingkat_pemeliharaan", "jenis_pemeliharaan", "ruang_lingkup", "deskripsi")
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT ("tingkat_pemeliharaan", "jenis_pemeliharaan") DO NOTHING`,
                [
                    item.tingkat_pemeliharaan,
                    item.jenis_pemeliharaan,
                    item.ruang_lingkup,
                    item.deskripsi,
                ],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tingkatList = [
            'Pemeliharaan Rutin',
            'Pemeliharaan Berkala',
            'Rehabilitasi Jalan',
            'Rekonstruksi',
        ];

        const jenisList = ['ringan', 'berat'];

        for (const tingkat of tingkatList) {
            for (const jenis of jenisList) {
                await queryRunner.query(
                    `DELETE FROM "jalan_jenis_pemeliharaan" 
                     WHERE "tingkat_pemeliharaan" = $1 AND "jenis_pemeliharaan" = $2`,
                    [tingkat, jenis],
                );
            }
        }
    }
}
