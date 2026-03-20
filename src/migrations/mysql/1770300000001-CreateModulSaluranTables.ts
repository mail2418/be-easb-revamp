import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateModulSaluranTables1770300000001 implements MigrationInterface {
    name = 'CreateModulSaluranTables1770300000001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`usulan_saluran_status\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`status\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`UQ_usulan_saluran_status_status\` (\`status\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`tipe_saluran\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`tipe_saluran\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`usulan_saluran\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_opd\` int NOT NULL,
                \`id_usulan_saluran_status\` int NOT NULL,
                \`id_asb_jenis\` int NOT NULL,
                \`id_rekening\` int NULL,
                \`id_rekening_review\` int NULL,
                \`id_tipe_saluran\` int NULL,
                \`id_kabkota\` int NULL,
                \`id_kecamatan\` int NULL,
                \`id_kelurahan\` int NULL,
                \`id_verifikator_adbang\` int NULL,
                \`id_verifikator_bpkad\` int NULL,
                \`id_verifikator_bappeda\` int NULL,
                \`id_reject_verif\` int NULL,
                \`reject_reason\` text NULL,
                \`verifikator_adbang_review_at\` timestamp(6) NULL,
                \`verifikator_bpkad_review_at\` timestamp(6) NULL,
                \`verifikator_bappeda_review_at\` timestamp(6) NULL,
                \`reject_verifikator_review_at\` timestamp(6) NULL,
                \`is_include_ppn\` tinyint NOT NULL DEFAULT 0,
                \`tahun_anggaran\` int NOT NULL,
                \`nama_usulan\` text NOT NULL,
                \`alamat\` text NULL,
                \`uraian\` text NULL,
                \`spesifikasi\` text NULL,
                \`satuan\` varchar(255) NULL,
                \`deskripsi_desain\` text NULL,
                \`lebar\` float NULL,
                \`total_harga\` decimal(15,2) NULL,
                \`biaya_smkk\` decimal(15,2) NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`fk_usulan_saluran_opd\` FOREIGN KEY (\`id_opd\`) REFERENCES \`opds\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_usulan_saluran_status\` FOREIGN KEY (\`id_usulan_saluran_status\`) REFERENCES \`usulan_saluran_status\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_asb_jenis\` FOREIGN KEY (\`id_asb_jenis\`) REFERENCES \`asb_jenis\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_rekening\` FOREIGN KEY (\`id_rekening\`) REFERENCES \`rekenings\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_rekening_review\` FOREIGN KEY (\`id_rekening_review\`) REFERENCES \`rekenings\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_tipe_saluran\` FOREIGN KEY (\`id_tipe_saluran\`) REFERENCES \`tipe_saluran\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_kabkota\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_kecamatan\` FOREIGN KEY (\`id_kecamatan\`) REFERENCES \`kecamatans\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_kelurahan\` FOREIGN KEY (\`id_kelurahan\`) REFERENCES \`kelurahans\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_verifikator_adbang\` FOREIGN KEY (\`id_verifikator_adbang\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_verifikator_bpkad\` FOREIGN KEY (\`id_verifikator_bpkad\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_verifikator_bappeda\` FOREIGN KEY (\`id_verifikator_bappeda\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT \`fk_usulan_saluran_reject_verif\` FOREIGN KEY (\`id_reject_verif\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_usulan_saluran_status_tahun\` ON \`usulan_saluran\` (\`id_usulan_saluran_status\`, \`tahun_anggaran\`)
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`saluran_spesifikasi_desain\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_usulan_saluran\` int NOT NULL,
                \`id_ruang_lingkup\` int NOT NULL,
                \`id_hspk\` int NOT NULL,
                \`volume\` float NOT NULL,
                \`spasi\` float NOT NULL,
                \`tinggi\` float NOT NULL,
                \`harga_spec\` float NOT NULL,
                \`keterangan_tambahan\` text NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`fk_saluran_spesifikasi_desain_usulan_saluran\` FOREIGN KEY (\`id_usulan_saluran\`) REFERENCES \`usulan_saluran\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_desain_ruang_lingkup\` FOREIGN KEY (\`id_ruang_lingkup\`) REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_desain_hspk\` FOREIGN KEY (\`id_hspk\`) REFERENCES \`hspk\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_saluran_spesifikasi_desain_usulan_saluran\` ON \`saluran_spesifikasi_desain\` (\`id_usulan_saluran\`)
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`saluran_spesifikasi_desain_review\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_usulan_saluran\` int NOT NULL,
                \`id_ruang_lingkup\` int NOT NULL,
                \`id_hspk\` int NOT NULL,
                \`volume_review\` float NOT NULL,
                \`spasi_review\` float NOT NULL,
                \`tinggi_review\` float NOT NULL,
                \`harga_spec_review\` float NOT NULL,
                \`keterangan_tambahan_review\` text NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`fk_saluran_spesifikasi_desain_review_usulan_saluran\` FOREIGN KEY (\`id_usulan_saluran\`) REFERENCES \`usulan_saluran\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_desain_review_ruang_lingkup\` FOREIGN KEY (\`id_ruang_lingkup\`) REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT \`fk_saluran_spesifikasi_desain_review_hspk\` FOREIGN KEY (\`id_hspk\`) REFERENCES \`hspk\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_saluran_spesifikasi_desain_review_usulan_saluran\` ON \`saluran_spesifikasi_desain_review\` (\`id_usulan_saluran\`)
        `);

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
            CREATE INDEX \`idx_saluran_spesifikasi_smkk_usulan_saluran\` ON \`saluran_spesifikasi_smkk\` (\`id_usulan_saluran\`)
        `);

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
            CREATE INDEX \`idx_saluran_spesifikasi_smkk_review_usulan_saluran\` ON \`saluran_spesifikasi_smkk_review\` (\`id_usulan_saluran\`)
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`saluran_kebijakan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_kabkota\` int NOT NULL,
                \`bulan\` int NOT NULL,
                \`tahun\` int NOT NULL,
                \`nilai_ppn\` decimal(15,2) NOT NULL,
                \`nilai_smkk\` decimal(15,2) NOT NULL,
                \`suku_bunga\` decimal(15,2) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`fk_saluran_kebijakan_kabkota\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE = InnoDB
        `);

        await queryRunner.query(`
            CREATE INDEX \`idx_saluran_kebijakan_kabkota_bulan_tahun\` ON \`saluran_kebijakan\` (\`id_kabkota\`, \`bulan\`, \`tahun\`)
        `);

        const usulanSaluranStatuses = [
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

        for (const status of usulanSaluranStatuses) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`usulan_saluran_status\` (\`status\`) VALUES (?)`,
                [status],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`saluran_kebijakan\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`saluran_spesifikasi_smkk_review\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`saluran_spesifikasi_smkk\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`saluran_spesifikasi_desain_review\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`saluran_spesifikasi_desain\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`usulan_saluran\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`tipe_saluran\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`usulan_saluran_status\``);
    }
}
