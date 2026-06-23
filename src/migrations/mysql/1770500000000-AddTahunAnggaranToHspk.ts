import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTahunAnggaranToHspk1770500000000 implements MigrationInterface {
    name = 'AddTahunAnggaranToHspk1770500000000';

    private async dropIndexIfExists(
        queryRunner: QueryRunner,
        tableName: string,
        indexName: string,
    ): Promise<void> {
        const result = await queryRunner.query(
            `
            SELECT COUNT(*) as cnt
            FROM information_schema.STATISTICS
            WHERE table_schema = DATABASE()
              AND table_name = ?
              AND index_name = ?
            `,
            [tableName, indexName],
        );
        if (result[0]?.cnt > 0) {
            await queryRunner.query(`ALTER TABLE \`${tableName}\` DROP INDEX \`${indexName}\``);
        }
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.dropIndexIfExists(queryRunner, 'hspk', 'UQ_hspk_no_mata_pembayaran');
        await this.dropIndexIfExists(queryRunner, 'hspk', 'IDX_1b9bf3851a35fda749b1f347f3');

        await queryRunner.query(`
            ALTER TABLE \`hspk\`
            ADD COLUMN \`tahun_anggaran\` int NULL
        `);

        await queryRunner.query(`
            UPDATE \`hspk\` SET \`tahun_anggaran\` = 2026 WHERE \`tahun_anggaran\` IS NULL
        `);

        await queryRunner.query(`
            ALTER TABLE \`hspk\`
            MODIFY COLUMN \`tahun_anggaran\` int NOT NULL
        `);

        await queryRunner.query(`
            ALTER TABLE \`hspk\`
            ADD UNIQUE INDEX \`UQ_hspk_tahun_no_mata_pembayaran\` (\`tahun_anggaran\`, \`no_mata_pembayaran\`)
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_hspk_tahun_anggaran\` ON \`hspk\` (\`tahun_anggaran\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await this.dropIndexIfExists(queryRunner, 'hspk', 'idx_hspk_tahun_anggaran');
        await this.dropIndexIfExists(queryRunner, 'hspk', 'UQ_hspk_tahun_no_mata_pembayaran');

        await queryRunner.query(`
            ALTER TABLE \`hspk\` DROP COLUMN \`tahun_anggaran\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`hspk\`
            ADD UNIQUE INDEX \`UQ_hspk_no_mata_pembayaran\` (\`no_mata_pembayaran\`)
        `);
    }
}
