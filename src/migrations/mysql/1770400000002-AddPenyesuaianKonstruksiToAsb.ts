import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPenyesuaianKonstruksiToAsb1770400000002 implements MigrationInterface {
    name = 'AddPenyesuaianKonstruksiToAsb1770400000002';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.addColumnIfMissing(
            queryRunner,
            'asb',
            'penyesuaian_perencanaan_konstruksi',
            'DECIMAL(20,2) NULL',
        );
        await this.addColumnIfMissing(
            queryRunner,
            'asb',
            'penyesuaian_pengawasan_konstruksi',
            'DECIMAL(20,2) NULL',
        );
        await this.addColumnIfMissing(
            queryRunner,
            'asb',
            'penyesuaian_management_konstruksi',
            'DECIMAL(20,2) NULL',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await this.dropColumnIfExists(queryRunner, 'asb', 'penyesuaian_management_konstruksi');
        await this.dropColumnIfExists(queryRunner, 'asb', 'penyesuaian_pengawasan_konstruksi');
        await this.dropColumnIfExists(queryRunner, 'asb', 'penyesuaian_perencanaan_konstruksi');
    }

    private async columnExists(
        queryRunner: QueryRunner,
        table: string,
        column: string,
    ): Promise<boolean> {
        const rows = await queryRunner.query(
            `SELECT 1 AS ok FROM information_schema.columns
             WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?
             LIMIT 1`,
            [table, column],
        );
        return Array.isArray(rows) && rows.length > 0;
    }

    private async addColumnIfMissing(
        queryRunner: QueryRunner,
        table: string,
        column: string,
        columnDefinition: string,
    ): Promise<void> {
        if (await this.columnExists(queryRunner, table, column)) return;
        await queryRunner.query(
            `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${columnDefinition}`,
        );
    }

    private async dropColumnIfExists(
        queryRunner: QueryRunner,
        table: string,
        column: string,
    ): Promise<void> {
        if (!(await this.columnExists(queryRunner, table, column))) return;
        await queryRunner.query(`ALTER TABLE \`${table}\` DROP COLUMN \`${column}\``);
    }
}
