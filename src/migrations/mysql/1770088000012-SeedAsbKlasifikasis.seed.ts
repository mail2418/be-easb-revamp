import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKlasifikasis1770088000012 implements MigrationInterface {
    name = 'SeedAsbKlasifikasis1770088000012';

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
                `INSERT IGNORE INTO \`asb_klasifikasi\` (\`klasifikasi\`, \`id_asb_tipe_bangunan\`)
                 VALUES (?, ?)`,
                [klasifikasi.klasifikasi, klasifikasi.id_asb_tipe_bangunan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`asb_klasifikasi\` WHERE \`klasifikasi\` IN ('Sederhana', 'Tidak Sederhana', 'Type C,D,E', 'Type A', 'Type B', 'Depan', 'Belakang', 'Samping')`
        );
    }
}
