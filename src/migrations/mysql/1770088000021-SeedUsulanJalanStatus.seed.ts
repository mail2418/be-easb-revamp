import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsulanJalanStatus1770088000021 implements MigrationInterface {
    name = 'SeedUsulanJalanStatus1770088000021';

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
                `INSERT IGNORE INTO \`usulan_jalan_status\` (\`status\`)
                 VALUES (?)`,
                [item.status],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`usulan_jalan_status\` WHERE \`status\` IN (
                'Input Informasi Usulan Jalan',
                'Input Ruang Lingkup dan Spesifikasi Jalan',
                'Memenuhi Syarat',
                'Tidak Memenuhi Syarat',
                'Verifikasi Informasi Usulan Jalan',
                'Verifikasi Ruang Lingkup dan Spesifikasi Jalan',
                'Verifikasi Adbang',
                'Verifikasi Bpkad',
                'Verifikasi Bappeda'
            )
        `);
    }
}
