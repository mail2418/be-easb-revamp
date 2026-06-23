import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add All Missing UNIQUE Constraints from PostgreSQL
 *
 * This migration adds all UNIQUE constraints that exist in PostgreSQL
 * but were missing in MySQL InitialSchema.
 *
 * These constraints ensure data integrity and prevent duplicate entries
 * that could cause issues in the application logic.
 */
export class AddAllMissingUniqueConstraints1770200000002 implements MigrationInterface {
    name = 'AddAllMissingUniqueConstraints1770200000002';

    /**
     * Helper function to check if index exists
     */
    private async indexExists(
        queryRunner: QueryRunner,
        tableName: string,
        indexName: string,
    ): Promise<boolean> {
        const result = await queryRunner.query(
            `
            SELECT COUNT(*) as count
            FROM information_schema.STATISTICS
            WHERE table_schema = DATABASE()
            AND table_name = ?
            AND index_name = ?
        `,
            [tableName, indexName],
        );
        return result[0].count > 0;
    }

    /**
     * Helper function to add unique index if not exists
     */
    private async addUniqueIndexIfNotExists(
        queryRunner: QueryRunner,
        tableName: string,
        indexName: string,
        columns: string,
    ): Promise<void> {
        const exists = await this.indexExists(queryRunner, tableName, indexName);
        if (!exists) {
            await queryRunner.query(`
                ALTER TABLE \`${tableName}\`
                ADD UNIQUE INDEX \`${indexName}\` (${columns})
            `);
        }
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Single column UNIQUE constraints

        // 1. satuans.satuan
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'satuans',
            'UQ_satuans_satuan',
            '`satuan`',
        );

        // 2. asb_lantais.lantai
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'asb_lantais',
            'UQ_asb_lantais_lantai',
            '`lantai`',
        );

        // 3. asb_jenis.jenis
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'asb_jenis',
            'UQ_asb_jenis_jenis',
            '`jenis`',
        );

        // 4. asb_status.status
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'asb_status',
            'UQ_asb_status_status',
            '`status`',
        );

        // 5. asb_tipe_bangunan.tipe_bangunan
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'asb_tipe_bangunan',
            'UQ_asb_tipe_bangunan_tipe_bangunan',
            '`tipe_bangunan`',
        );

        // 6. asb_fungsi_ruangs.nama_fungsi_ruang
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'asb_fungsi_ruangs',
            'UQ_asb_fungsi_ruangs_nama_fungsi_ruang',
            '`nama_fungsi_ruang`',
        );

        // 7. jenis_standars.jenis
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jenis_standars',
            'UQ_jenis_standars_jenis',
            '`jenis`',
        );

        // 8. jenis_usulan.jenis
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jenis_usulan',
            'UQ_jenis_usulan_jenis',
            '`jenis`',
        );

        // 9. usulan_jalan_status.status
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'usulan_jalan_status',
            'UQ_usulan_jalan_status_status',
            '`status`',
        );

        // 10. hspk.no_mata_pembayaran
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'hspk',
            'UQ_hspk_no_mata_pembayaran',
            '`no_mata_pembayaran`',
        );

        // 11. jalan_jenis_perkerasan.jenis_perkerasan
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_jenis_perkerasan',
            'UQ_jalan_jenis_perkerasan_jenis_perkerasan',
            '`jenis_perkerasan`',
        );

        // 12. jalan_mutu_beton.jenis
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_mutu_beton',
            'UQ_jalan_mutu_beton_jenis',
            '`jenis`',
        );

        // 13. jalan_spesifikasi_desain_lentur.spec
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_spesifikasi_desain_lentur',
            'UQ_jalan_spesifikasi_desain_lentur_spec',
            '`spec`',
        );

        // 14. jalan_spesifikasi_desain_kaku.spec
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_spesifikasi_desain_kaku',
            'UQ_jalan_spesifikasi_desain_kaku_spec',
            '`spec`',
        );

        // 15. jalan_ruang_lingkup_perkerasan_lentur.jenis
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_ruang_lingkup_perkerasan_lentur',
            'UQ_jalan_ruang_lingkup_perkerasan_lentur_jenis',
            '`jenis`',
        );

        // 16. jalan_ruang_lingkup_perkerasan_kaku.jenis
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_ruang_lingkup_perkerasan_kaku',
            'UQ_jalan_ruang_lingkup_perkerasan_kaku_jenis',
            '`jenis`',
        );

        // Composite UNIQUE constraints

        // 17. asb_klasifikasi (klasifikasi, id_asb_tipe_bangunan)
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'asb_klasifikasi',
            'UQ_asb_klasifikasi_klasifikasi_tipe',
            '`klasifikasi`, `id_asb_tipe_bangunan`',
        );

        // 18. shst (tahun, id_asb_tipe_bangunan, id_asb_klasifikasi, id_kabkota)
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'shst',
            'UQ_shst_unique',
            '`tahun`, `id_asb_tipe_bangunan`, `id_asb_klasifikasi`, `id_kabkota`',
        );

        // 19. jalan_saluran_ruang_lingkup (id_jenis_usulan, deskripsi_ruang_lingkup)
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_saluran_ruang_lingkup',
            'UQ_jalan_saluran_ruang_lingkup_jenis_deskripsi',
            '`id_jenis_usulan`, `deskripsi_ruang_lingkup`',
        );

        // 20. jalan_saluran_smkk (id_ruang_lingkup, no_mata_pembayaran, uraian)
        // Note: MySQL requires prefix length for TEXT columns in unique indexes
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_saluran_smkk',
            'UQ_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian',
            '`id_ruang_lingkup`, `no_mata_pembayaran`, `uraian`(500)',
        );

        // 21. jalan_jenis_pemeliharaan (tingkat_pemeliharaan, jenis_pemeliharaan)
        await this.addUniqueIndexIfNotExists(
            queryRunner,
            'jalan_jenis_pemeliharaan',
            'UQ_jalan_jenis_pemeliharaan_tingkat_jenis',
            '`tingkat_pemeliharaan`, `jenis_pemeliharaan`',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop composite UNIQUE constraints first
        await queryRunner.query(`
            ALTER TABLE \`jalan_jenis_pemeliharaan\`
            DROP INDEX \`UQ_jalan_jenis_pemeliharaan_tingkat_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            DROP INDEX \`UQ_jalan_saluran_smkk_ruang_lingkup_no_mata_uraian\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_ruang_lingkup\`
            DROP INDEX \`UQ_jalan_saluran_ruang_lingkup_jenis_deskripsi\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`shst\`
            DROP INDEX \`UQ_shst_unique\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`asb_klasifikasi\`
            DROP INDEX \`UQ_asb_klasifikasi_klasifikasi_tipe\`
        `);

        // Drop single column UNIQUE constraints
        await queryRunner.query(`
            ALTER TABLE \`jalan_ruang_lingkup_perkerasan_kaku\`
            DROP INDEX \`UQ_jalan_ruang_lingkup_perkerasan_kaku_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_ruang_lingkup_perkerasan_lentur\`
            DROP INDEX \`UQ_jalan_ruang_lingkup_perkerasan_lentur_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_kaku\`
            DROP INDEX \`UQ_jalan_spesifikasi_desain_kaku_spec\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_lentur\`
            DROP INDEX \`UQ_jalan_spesifikasi_desain_lentur_spec\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_mutu_beton\`
            DROP INDEX \`UQ_jalan_mutu_beton_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jalan_jenis_perkerasan\`
            DROP INDEX \`UQ_jalan_jenis_perkerasan_jenis_perkerasan\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`hspk\`
            DROP INDEX \`UQ_hspk_no_mata_pembayaran\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan_status\`
            DROP INDEX \`UQ_usulan_jalan_status_status\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jenis_usulan\`
            DROP INDEX \`UQ_jenis_usulan_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`jenis_standars\`
            DROP INDEX \`UQ_jenis_standars_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`asb_fungsi_ruangs\`
            DROP INDEX \`UQ_asb_fungsi_ruangs_nama_fungsi_ruang\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`asb_tipe_bangunan\`
            DROP INDEX \`UQ_asb_tipe_bangunan_tipe_bangunan\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`asb_status\`
            DROP INDEX \`UQ_asb_status_status\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`asb_jenis\`
            DROP INDEX \`UQ_asb_jenis_jenis\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`asb_lantais\`
            DROP INDEX \`UQ_asb_lantais_lantai\`
        `);

        await queryRunner.query(`
            ALTER TABLE \`satuans\`
            DROP INDEX \`UQ_satuans_satuan\`
        `);
    }
}
