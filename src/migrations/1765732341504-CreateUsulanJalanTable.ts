import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUsulanJalanTable1765732341504 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usulan_jalan',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'id_opd',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'id_usulan_jalan_status',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'id_jalan_jenis_perkerasan',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'id_jalan_jenis_perkerasan_review',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_mutu_beton',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_mutu_beton_review',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_spesifikasi_desain_lentur',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_spesifikasi_desain_lentur_review',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_spesifikasi_desain_kaku',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_spesifikasi_desain_kaku_review',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_ruang_lingkup_perkerasan_lentur',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_ruang_lingkup_perkerasan_lentur_review',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_ruang_lingkup_perkerasan_kaku',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_ruang_lingkup_perkerasan_kaku_review',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_kabkota',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_kecamatan',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_kelurahan',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_verifikator_adbang',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_verifikator_bpkad',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'id_verifikator_bappeda',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'reject_verif_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'tahun_anggaran',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'nama_usulan_jalan',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'alamat',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'lebar_jalan',
                        type: 'double precision',
                        isNullable: false,
                    },
                    {
                        name: 'lebar_jalan_review',
                        type: 'double precision',
                        isNullable: true,
                    },
                    {
                        name: 'keterangan_tambahan',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'keterangan_tambahan_review',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'verified_adbang_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                    {
                        name: 'verified_bpkad_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                    {
                        name: 'verified_bappeda_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                    {
                        name: 'rejected_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                    {
                        name: 'reject_reason',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false,
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        // Foreign Keys
        await queryRunner.createForeignKeys('usulan_jalan', [
            new TableForeignKey({
                columnNames: ['id_opd'],
                referencedColumnNames: ['id'],
                referencedTableName: 'opds',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['id_usulan_jalan_status'],
                referencedColumnNames: ['id'],
                referencedTableName: 'usulan_jalan_status',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['id_jalan_jenis_perkerasan'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_jenis_perkerasan',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['id_jalan_jenis_perkerasan_review'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_jenis_perkerasan',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_mutu_beton'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_mutu_beton',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_mutu_beton_review'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_mutu_beton',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_spesifikasi_desain_lentur'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_spesifikasi_desain_lentur',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_spesifikasi_desain_lentur_review'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_spesifikasi_desain_lentur',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_spesifikasi_desain_kaku'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_spesifikasi_desain_kaku',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_spesifikasi_desain_kaku_review'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_spesifikasi_desain_kaku',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_ruang_lingkup_perkerasan_lentur'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_ruang_lingkup_perkerasan_lentur',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_ruang_lingkup_perkerasan_lentur_review'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_ruang_lingkup_perkerasan_lentur',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_ruang_lingkup_perkerasan_kaku'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_ruang_lingkup_perkerasan_kaku',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_ruang_lingkup_perkerasan_kaku_review'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jalan_ruang_lingkup_perkerasan_kaku',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_kabkota'],
                referencedColumnNames: ['id'],
                referencedTableName: 'kabkotas',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_kecamatan'],
                referencedColumnNames: ['id'],
                referencedTableName: 'kecamatans',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_kelurahan'],
                referencedColumnNames: ['id'],
                referencedTableName: 'kelurahans',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_verifikator_adbang'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_verifikator_bpkad'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['id_verifikator_bappeda'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
            }),
            new TableForeignKey({
                columnNames: ['reject_verif_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usulan_jalan');
    }
}


