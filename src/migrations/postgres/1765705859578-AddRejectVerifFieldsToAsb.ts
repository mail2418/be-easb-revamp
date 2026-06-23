import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddRejectVerifFieldsToAsb1765705859578 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add reject_verif_id column
        await queryRunner.addColumn(
            'asb',
            new TableColumn({
                name: 'reject_verif_id',
                type: 'int',
                isNullable: true,
            }),
        );

        // Add rejected_at column
        await queryRunner.addColumn(
            'asb',
            new TableColumn({
                name: 'rejected_at',
                type: 'timestamptz',
                isNullable: true,
            }),
        );

        // Add foreign key constraint for reject_verif_id
        await queryRunner.createForeignKey(
            'asb',
            new TableForeignKey({
                columnNames: ['reject_verif_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key first
        const table = await queryRunner.getTable('asb');
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('reject_verif_id') !== -1,
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey('asb', foreignKey);
        }

        // Drop columns
        await queryRunner.dropColumn('asb', 'rejected_at');
        await queryRunner.dropColumn('asb', 'reject_verif_id');
    }
}
