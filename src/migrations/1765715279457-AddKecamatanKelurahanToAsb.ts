import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddKecamatanKelurahanToAsb1765715279457 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add id_kecamatan column
        await queryRunner.addColumn(
            'asb',
            new TableColumn({
                name: 'id_kecamatan',
                type: 'int',
                isNullable: true,
            })
        );

        // Add id_kelurahan column
        await queryRunner.addColumn(
            'asb',
            new TableColumn({
                name: 'id_kelurahan',
                type: 'int',
                isNullable: true,
            })
        );

        // Check if kecamatans table exists before adding foreign key
        const hasKecamatanTable = await queryRunner.hasTable('kecamatans');
        if (hasKecamatanTable) {
            await queryRunner.createForeignKey(
                'asb',
                new TableForeignKey({
                    columnNames: ['id_kecamatan'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'kecamatans',
                    onDelete: 'SET NULL',
                })
            );
        }

        // Check if kelurahans table exists before adding foreign key
        const hasKelurahanTable = await queryRunner.hasTable('kelurahans');
        if (hasKelurahanTable) {
            await queryRunner.createForeignKey(
                'asb',
                new TableForeignKey({
                    columnNames: ['id_kelurahan'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'kelurahans',
                    onDelete: 'SET NULL',
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys first (if they exist)
        const table = await queryRunner.getTable('asb');
        
        if (table) {
            const kecamatanForeignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf('id_kecamatan') !== -1
            );
            if (kecamatanForeignKey) {
                await queryRunner.dropForeignKey('asb', kecamatanForeignKey);
            }

            const kelurahanForeignKey = table.foreignKeys.find(
                (fk) => fk.columnNames.indexOf('id_kelurahan') !== -1
            );
            if (kelurahanForeignKey) {
                await queryRunner.dropForeignKey('asb', kelurahanForeignKey);
            }
        }

        // Drop columns
        await queryRunner.dropColumn('asb', 'id_kelurahan');
        await queryRunner.dropColumn('asb', 'id_kecamatan');
    }
}

