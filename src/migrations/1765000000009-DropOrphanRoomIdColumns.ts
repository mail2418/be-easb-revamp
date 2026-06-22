import { MigrationInterface, QueryRunner } from 'typeorm';

const TABLES_WITH_ROOM_ID = [
    'asb_bps_gallery_nonstd',
    'asb_bps_gallery_std',
    'asb_jakon',
    'asb_jenis',
    'asb_klasifikasi',
    'asb_komponen_bangunan_nonstd',
    'asb_komponen_bangunan_pros_nonstd',
    'asb_komponen_bangunan_pros_std',
    'asb_komponen_bangunan_stds',
    'asb_lantais',
    'asb_status',
    'asb_tipe_bangunan',
    'jenis_standars',
    'opds',
    'rekenings',
    'satuans',
    'shst',
    'standard_klasifikasi',
    'users',
    'verifikators',
];

export class DropOrphanRoomIdColumns1765000000009 implements MigrationInterface {
    name = 'DropOrphanRoomIdColumns1765000000009';

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const table of TABLES_WITH_ROOM_ID) {
            await queryRunner.query(`
                ALTER TABLE "${table}"
                DROP COLUMN IF EXISTS "room_id";
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (const table of TABLES_WITH_ROOM_ID) {
            await queryRunner.query(`
                ALTER TABLE "${table}"
                ADD COLUMN IF NOT EXISTS "room_id" INTEGER NOT NULL DEFAULT 0;
            `);
        }
    }
}
