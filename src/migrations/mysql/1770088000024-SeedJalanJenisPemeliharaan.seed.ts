import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanJenisPemeliharaan1770088000024 implements MigrationInterface {
    name = 'SeedJalanJenisPemeliharaan1770088000024';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jenisArray = [
            { jenis_pemeliharaan: 'Pemeliharaan Rutin' },
            { jenis_pemeliharaan: 'Pemeliharaan Berkala' },
            { jenis_pemeliharaan: 'Rehabilitasi' },
        ];

        for (const item of jenisArray) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_jenis_pemeliharaan\` (\`jenis_pemeliharaan\`)
                 VALUES (?)`,
                [item.jenis_pemeliharaan],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`jalan_jenis_pemeliharaan\` WHERE \`jenis_pemeliharaan\` IN (
                'Pemeliharaan Rutin',
                'Pemeliharaan Berkala',
                'Rehabilitasi'
            )
        `);
    }
}
