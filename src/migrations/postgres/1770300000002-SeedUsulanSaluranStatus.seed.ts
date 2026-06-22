import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsulanSaluranStatus1770300000002 implements MigrationInterface {
    name = 'SeedUsulanSaluranStatus1770300000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usulanSaluranStatuses = [
            { status: 'Input Informasi Usulan Saluran' },
            { status: 'Input Ruang Lingkup dan Spesifikasi Saluran' },
            { status: 'Memenuhi Syarat' },
            { status: 'Tidak Memenuhi Syarat' },
            { status: 'Verifikasi Informasi Usulan Saluran' },
            { status: 'Verifikasi Ruang Lingkup dan Spesifikasi Saluran' },
            { status: 'Verifikasi Adbang' },
            { status: 'Verifikasi Bpkad' },
            { status: 'Verifikasi Bappeda' },
        ];

        for (const item of usulanSaluranStatuses) {
            await queryRunner.query(
                `INSERT INTO "usulan_saluran_status" ("status")
                 VALUES ($1)
                 ON CONFLICT ("status") DO NOTHING`,
                [item.status],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const statusList = [
            'Input Informasi Usulan Saluran',
            'Input Ruang Lingkup dan Spesifikasi Saluran',
            'Memenuhi Syarat',
            'Tidak Memenuhi Syarat',
            'Verifikasi Informasi Usulan Saluran',
            'Verifikasi Ruang Lingkup dan Spesifikasi Saluran',
            'Verifikasi Adbang',
            'Verifikasi Bpkad',
            'Verifikasi Bappeda',
        ];

        const placeholders = statusList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "usulan_saluran_status" WHERE "status" IN (${placeholders})`,
            statusList,
        );
    }
}
