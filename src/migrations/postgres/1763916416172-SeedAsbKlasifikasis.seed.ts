import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKlasifikasis1763916416172 implements MigrationInterface {
    name = 'SeedAsbKlasifikasis1763916416172';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbKlasifikasis = [
            { klasifikasi: 'Sederhana', id_asb_tipe_bangunan: 1 },
            { klasifikasi: 'Tidak Sederhana', id_asb_tipe_bangunan: 1 },
            { klasifikasi: 'Type C,D,E', id_asb_tipe_bangunan: 2 },
            { klasifikasi: 'Type A', id_asb_tipe_bangunan: 2 },
            { klasifikasi: 'Type B', id_asb_tipe_bangunan: 2 },
            { klasifikasi: 'Depan', id_asb_tipe_bangunan: 3 },
            { klasifikasi: 'Belakang', id_asb_tipe_bangunan: 3 },
            { klasifikasi: 'Samping', id_asb_tipe_bangunan: 3 },
            { klasifikasi: 'Depan', id_asb_tipe_bangunan: 4 },
            { klasifikasi: 'Belakang', id_asb_tipe_bangunan: 4 },
            { klasifikasi: 'Samping', id_asb_tipe_bangunan: 4 },
        ];

        for (const klasifikasi of asbKlasifikasis) {
            await queryRunner.query(
                `INSERT INTO "asb_klasifikasi" ("klasifikasi", "id_asb_tipe_bangunan")
                 VALUES ($1, $2)`,
                [klasifikasi.klasifikasi, klasifikasi.id_asb_tipe_bangunan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const klasifikasiList = [
            'Sederhana',
            'Tidak Sederhana',
            'Type C,D,E',
            'Type A',
            'Type B',
            'Depan',
            'Belakang',
            'Samping',
        ];

        const placeholders = klasifikasiList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "asb_klasifikasi" WHERE "klasifikasi" IN (${placeholders})`,
            klasifikasiList,
        );
    }
}
