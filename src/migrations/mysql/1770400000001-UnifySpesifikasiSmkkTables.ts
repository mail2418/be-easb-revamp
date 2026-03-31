import { MigrationInterface, QueryRunner } from 'typeorm';

export class UnifySpesifikasiSmkkTables1770400000001 implements MigrationInterface {
    name = 'UnifySpesifikasiSmkkTables1770400000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ========== jalan_saluran_spesifikasi_smkk ==========
        // 1. Drop FK to usulan_jalan (MySQL uses FK_xxx format from InitialSchema)
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            DROP FOREIGN KEY \`FK_ea557ee30d2826ea0a1d73daf6a\`;
        `);

        // 2. Rename id_usulan_jalan to id_usulan
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            CHANGE COLUMN \`id_usulan_jalan\` \`id_usulan\` int NOT NULL;
        `);

        // 3. Drop old index, create new index on id_usulan
        await queryRunner.query(`
            DROP INDEX \`idx_jalan_saluran_spesifikasi_smkk_usulan_jalan\` ON \`jalan_saluran_spesifikasi_smkk\`;
        `);
        await queryRunner.query(`
            CREATE INDEX \`idx_jalan_saluran_spesifikasi_smkk_id_usulan\`
            ON \`jalan_saluran_spesifikasi_smkk\` (\`id_usulan\`);
        `);

        // 4. Migrate data from saluran_spesifikasi_smkk
        await queryRunner.query(`
            INSERT INTO \`jalan_saluran_spesifikasi_smkk\` (
                \`id_jenis_usulan\`, \`id_usulan\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`,
                \`created_at\`, \`updated_at\`, \`deleted_at\`
            )
            SELECT
                \`id_jenis_usulan\`, \`id_usulan_saluran\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`,
                \`created_at\`, \`updated_at\`, \`deleted_at\`
            FROM \`saluran_spesifikasi_smkk\`;
        `);

        // 5. Drop saluran_spesifikasi_smkk
        await queryRunner.query(`
            ALTER TABLE \`saluran_spesifikasi_smkk\`
            DROP FOREIGN KEY \`fk_saluran_spesifikasi_smkk_jalan_saluran_smkk\`;
        `);
        await queryRunner.query(`
            ALTER TABLE \`saluran_spesifikasi_smkk\`
            DROP FOREIGN KEY \`fk_saluran_spesifikasi_smkk_usulan_saluran\`;
        `);
        await queryRunner.query(`
            ALTER TABLE \`saluran_spesifikasi_smkk\`
            DROP FOREIGN KEY \`fk_saluran_spesifikasi_smkk_jenis_usulan\`;
        `);
        await queryRunner.query(`
            DROP TABLE IF EXISTS \`saluran_spesifikasi_smkk\`;
        `);

        // ========== jalan_saluran_spesifikasi_smkk_review ==========
        // 1. Drop FK to usulan_jalan
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            DROP FOREIGN KEY \`FK_1804c16bd433eab0bc0d7ffabd2\`;
        `);

        // 2. Rename id_usulan_jalan to id_usulan
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            CHANGE COLUMN \`id_usulan_jalan\` \`id_usulan\` int NOT NULL;
        `);

        // 3. Drop old index, create new index on id_usulan
        await queryRunner.query(`
            DROP INDEX \`idx_jalan_saluran_spesifikasi_smkk_review_usulan_jalan\` ON \`jalan_saluran_spesifikasi_smkk_review\`;
        `);
        await queryRunner.query(`
            CREATE INDEX \`idx_jalan_saluran_spesifikasi_smkk_review_id_usulan\`
            ON \`jalan_saluran_spesifikasi_smkk_review\` (\`id_usulan\`);
        `);

        // 4. Migrate data from saluran_spesifikasi_smkk_review
        await queryRunner.query(`
            INSERT INTO \`jalan_saluran_spesifikasi_smkk_review\` (
                \`id_jenis_usulan\`, \`id_usulan\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`,
                \`created_at\`, \`updated_at\`, \`deleted_at\`
            )
            SELECT
                \`id_jenis_usulan\`, \`id_usulan_saluran\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`,
                \`created_at\`, \`updated_at\`, \`deleted_at\`
            FROM \`saluran_spesifikasi_smkk_review\`;
        `);

        // 5. Drop saluran_spesifikasi_smkk_review
        await queryRunner.query(`
            ALTER TABLE \`saluran_spesifikasi_smkk_review\`
            DROP FOREIGN KEY \`fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk\`;
        `);
        await queryRunner.query(`
            ALTER TABLE \`saluran_spesifikasi_smkk_review\`
            DROP FOREIGN KEY \`fk_saluran_spesifikasi_smkk_review_usulan_saluran\`;
        `);
        await queryRunner.query(`
            ALTER TABLE \`saluran_spesifikasi_smkk_review\`
            DROP FOREIGN KEY \`fk_saluran_spesifikasi_smkk_review_jenis_usulan\`;
        `);
        await queryRunner.query(`
            DROP TABLE IF EXISTS \`saluran_spesifikasi_smkk_review\`;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Recreate saluran_spesifikasi_smkk_review
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`saluran_spesifikasi_smkk_review\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_jenis_usulan\` int NOT NULL,
                \`id_usulan_saluran\` int NOT NULL,
                \`id_jalan_saluran_smkk\` int NOT NULL,
                \`harga_spec\` decimal(15,2) NOT NULL,
                \`jumlah_barang\` decimal(15,2) NOT NULL,
                \`harga_satuan\` decimal(15,2) NOT NULL DEFAULT 0,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`fk_saluran_spesifikasi_smkk_review_jenis_usulan\` FOREIGN KEY (\`id_jenis_usulan\`) REFERENCES \`jenis_usulan\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_smkk_review_usulan_saluran\` FOREIGN KEY (\`id_usulan_saluran\`) REFERENCES \`usulan_saluran\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_smkk_review_jalan_saluran_smkk\` FOREIGN KEY (\`id_jalan_saluran_smkk\`) REFERENCES \`jalan_saluran_smkk\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            INSERT INTO \`saluran_spesifikasi_smkk_review\` (
                \`id_jenis_usulan\`, \`id_usulan_saluran\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`, \`created_at\`, \`updated_at\`, \`deleted_at\`
            )
            SELECT \`id_jenis_usulan\`, \`id_usulan\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`, \`created_at\`, \`updated_at\`, \`deleted_at\`
            FROM \`jalan_saluran_spesifikasi_smkk_review\` WHERE \`id_jenis_usulan\` = 3;
        `);
        await queryRunner.query(`
            DELETE FROM \`jalan_saluran_spesifikasi_smkk_review\` WHERE \`id_jenis_usulan\` = 3;
        `);

        // Revert jalan_saluran_spesifikasi_smkk_review
        await queryRunner.query(`
            DROP INDEX \`idx_jalan_saluran_spesifikasi_smkk_review_id_usulan\` ON \`jalan_saluran_spesifikasi_smkk_review\`;
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            CHANGE COLUMN \`id_usulan\` \`id_usulan_jalan\` int NOT NULL;
        `);
        await queryRunner.query(`
            CREATE INDEX \`idx_jalan_saluran_spesifikasi_smkk_review_usulan_jalan\`
            ON \`jalan_saluran_spesifikasi_smkk_review\` (\`id_usulan_jalan\`);
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            ADD CONSTRAINT \`FK_1804c16bd433eab0bc0d7ffabd2\` FOREIGN KEY (\`id_usulan_jalan\`) REFERENCES \`usulan_jalan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        // Recreate saluran_spesifikasi_smkk
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`saluran_spesifikasi_smkk\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_jenis_usulan\` int NOT NULL,
                \`id_usulan_saluran\` int NOT NULL,
                \`id_jalan_saluran_smkk\` int NOT NULL,
                \`harga_spec\` decimal(15,2) NOT NULL,
                \`jumlah_barang\` decimal(15,2) NOT NULL,
                \`harga_satuan\` decimal(15,2) NOT NULL DEFAULT 0,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`fk_saluran_spesifikasi_smkk_jenis_usulan\` FOREIGN KEY (\`id_jenis_usulan\`) REFERENCES \`jenis_usulan\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_smkk_usulan_saluran\` FOREIGN KEY (\`id_usulan_saluran\`) REFERENCES \`usulan_saluran\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_smkk_jalan_saluran_smkk\` FOREIGN KEY (\`id_jalan_saluran_smkk\`) REFERENCES \`jalan_saluran_smkk\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            INSERT INTO \`saluran_spesifikasi_smkk\` (
                \`id_jenis_usulan\`, \`id_usulan_saluran\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`, \`created_at\`, \`updated_at\`, \`deleted_at\`
            )
            SELECT \`id_jenis_usulan\`, \`id_usulan\`, \`id_jalan_saluran_smkk\`,
                \`harga_spec\`, \`jumlah_barang\`, \`harga_satuan\`, \`created_at\`, \`updated_at\`, \`deleted_at\`
            FROM \`jalan_saluran_spesifikasi_smkk\` WHERE \`id_jenis_usulan\` = 3;
        `);
        await queryRunner.query(`
            DELETE FROM \`jalan_saluran_spesifikasi_smkk\` WHERE \`id_jenis_usulan\` = 3;
        `);

        // Revert jalan_saluran_spesifikasi_smkk
        await queryRunner.query(`
            DROP INDEX \`idx_jalan_saluran_spesifikasi_smkk_id_usulan\` ON \`jalan_saluran_spesifikasi_smkk\`;
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            CHANGE COLUMN \`id_usulan\` \`id_usulan_jalan\` int NOT NULL;
        `);
        await queryRunner.query(`
            CREATE INDEX \`idx_jalan_saluran_spesifikasi_smkk_usulan_jalan\`
            ON \`jalan_saluran_spesifikasi_smkk\` (\`id_usulan_jalan\`);
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            ADD CONSTRAINT \`FK_ea557ee30d2826ea0a1d73daf6a\` FOREIGN KEY (\`id_usulan_jalan\`) REFERENCES \`usulan_jalan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }
}
