import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsulanJalanStatus1765718448215 implements MigrationInterface {
    name = 'SeedUsulanJalanStatus1765718448215';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usulanJalanStatuses = [
            { status: 'Input Informasi Usulan Jalan' },
            { status: 'Input Ruang Lingkup dan Spesifikasi Jalan' },
            { status: 'Memenuhi Syarat' },
            { status: 'Tidak Memenuhi Syarat' },
            { status: 'Verifikasi Informasi Usulan Jalan' },
            { status: 'Verifikasi Ruang Lingkup dan Spesifikasi Jalan' },
            { status: 'Verifikasi Adbang' },
            { status: 'Verifikasi Bpkad' },
            { status: 'Verifikasi Bappeda' },
        ];

        for (const item of usulanJalanStatuses) {
            await queryRunner.query(
                `INSERT INTO "usulan_jalan_status" ("status")
                 VALUES ($1)
                 ON CONFLICT ("status") DO NOTHING`,
                [item.status],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const statusList = [
            'Input Informasi Usulan Jalan',
            'Input Ruang Lingkup dan Spesifikasi Jalan',
            'Memenuhi Syarat',
            'Tidak Memenuhi Syarat',
            'Verifikasi Informasi Usulan Jalan',
            'Verifikasi Ruang Lingkup dan Spesifikasi Jalan',
            'Verifikasi Adbang',
            'Verifikasi Bpkad',
            'Verifikasi Bappeda',
        ];

        const placeholders = statusList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "usulan_jalan_status" WHERE "status" IN (${placeholders})`,
            statusList,
        );
    }
}

