import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbStatus1763809784137 implements MigrationInterface {
    name = 'SeedAsbStatus1763809784137';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const asbStatuses = [
            { status: 'General Documents' },
            { status: 'Luas Total Bangunan (LTB), Koefesien Luas Bangunan (KLB) dan Koefesien Fungsi Bangunan (KFB)' },
            { status: 'Kebutuhan Biaya Pekerjaan Standar (BPS)' },
            { status: 'Kebutuhan Biaya Pekerjaan Non Standar (BPNS)' },
            { status: 'Setup Rekening' },
            { status: 'Proses Verifikasi' },
            { status: 'Tidak Memenuhi Syarat' },
            { status: 'Memenuhi Syarat' },
            { status: 'Verifikasi Luas Total Bangunan (LTB), Koefesien Luas Bangunan (KLB) dan Koefesien Fungsi Bangunan (KFB)' },
            { status: 'Verifikasi Kebutuhan Biaya Pekerjaan Standart (BPS)' },
            { status: 'Verifikasi Kebutuhan Biaya Pekerjaan Non Standar (BPNS)' },
            { status: 'Verifikasi Rekening Belanja' },
            { status: 'Verifikasi Biaya Pekerjaan' },
        ];

        for (const status of asbStatuses) {
            await queryRunner.query(
                `INSERT INTO "asb_status" ("status")
                 VALUES ($1)
                 ON CONFLICT ("status") DO NOTHING`,
                [status.status],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const statusList = [
            'General Documents',
            'Luas Total Bangunan (LTB), Koefesien Luas Bangunan (KLB) dan Koefesien Fungsi Bangunan (KFB)',
            'Kebutuhan Biaya Pekerjaan Standar (BPS)',
            'Kebutuhan Biaya Pekerjaan Non Standar (BPNS)',
            'Setup Rekening',
            'Proses Verifikasi',
            'Tidak Memenuhi Syarat',
            'Memenuhi Syarat',
            'Verifikasi Luas Total Bangunan (LTB), Koefesien Luas Bangunan (KLB) dan Koefesien Fungsi Bangunan (KFB)',
            'Verifikasi Kebutuhan Biaya Pekerjaan Standart (BPS)',
            'Verifikasi Kebutuhan Biaya Pekerjaan Non Standar (BPNS)',
            'Verifikasi Rekening Belanja',
            'Verifikasi Biaya Pekerjaan',
        ];

        const placeholders = statusList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "asb_status" WHERE "status" IN (${placeholders})`,
            statusList,
        );
    }
}
