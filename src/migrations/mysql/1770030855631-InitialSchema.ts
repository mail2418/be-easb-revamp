import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1770030855631 implements MigrationInterface {
    name = 'InitialSchema1770030855631';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(50) NOT NULL,
                \`password_hash\` varchar(255) NOT NULL,
                \`roles\` varchar(2000) NOT NULL DEFAULT '[]',
                \`refresh_token_version\` int NOT NULL DEFAULT 0,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`verifikators\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_user\` int NOT NULL,
                \`jenis_verifikator\` enum ('ADBANG', 'BPKAD', 'BAPPEDA') NOT NULL,
                \`verifikator\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_09a4de12289248217f6da8fba2\` (\`id_user\`),
                UNIQUE INDEX \`REL_09a4de12289248217f6da8fba2\` (\`id_user\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`usulan_jalan_status\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`status\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`opds\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`opd\` varchar(255) NOT NULL,
                \`alias\` varchar(50) NOT NULL,
                \`id_user\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_9acec64565e5b3eca1e9fd0fc2\` (\`opd\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_jenis\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`jenis\` varchar(255) NOT NULL,
                \`asb\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_jenis_pemeliharaan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`tingkat_pemeliharaan\` varchar(255) NOT NULL,
                \`jenis_pemeliharaan\` varchar(255) NOT NULL,
                \`ruang_lingkup\` text NOT NULL,
                \`deskripsi\` text NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_jenis_perkerasan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`jenis_perkerasan\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`rekenings\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`rekening_kode\` varchar(255) NOT NULL,
                \`rekening_uraian\` varchar(500) NOT NULL,
                \`bulan\` int NOT NULL,
                \`tahun\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_0ab9f15c0815e19b2733432741\` (\`rekening_kode\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`kabkotas\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`kode\` varchar(10) NOT NULL,
                \`nama\` varchar(255) NOT NULL,
                \`province_id\` int NOT NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_040cfc60179579a88fa449a377\` (\`kode\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`kecamatans\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_kabkota\` int NOT NULL,
                \`kode_kecamatan\` varchar(50) NOT NULL,
                \`nama_kecamatan\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`kelurahans\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_kecamatan\` int NOT NULL,
                \`nama_kelurahan\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jenis_usulan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`jenis\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_saluran_ruang_lingkup\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_jenis_usulan\` int NOT NULL,
                \`deskripsi_ruang_lingkup\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`hspk\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_ruang_lingkup\` int NOT NULL,
                \`no_mata_pembayaran\` varchar(255) NOT NULL,
                \`satuan\` varchar(255) NOT NULL,
                \`harga_satuan\` decimal(15, 2) NULL,
                \`uraian\` text NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_1b9bf3851a35fda749b1f347f3\` (\`no_mata_pembayaran\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_spesifikasi_desain\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_usulan_jalan\` int NOT NULL,
                \`id_ruang_lingkup\` int NOT NULL,
                \`id_hspk\` int NOT NULL,
                \`volume\` float NOT NULL,
                \`spasi\` float NOT NULL,
                \`tinggi\` float NOT NULL,
                \`harga_spec\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_spesifikasi_desain_review\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_usulan_jalan\` int NOT NULL,
                \`id_ruang_lingkup\` int NOT NULL,
                \`id_hspk\` int NOT NULL,
                \`volume_review\` float NOT NULL,
                \`spasi_review\` float NOT NULL,
                \`tinggi_review\` float NOT NULL,
                \`harga_spec_review\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_saluran_smkk\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_ruang_lingkup\` int NOT NULL,
                \`no_mata_pembayaran\` varchar(255) NOT NULL,
                \`satuan\` varchar(255) NOT NULL,
                \`harga_satuan\` decimal(15, 2) NULL,
                \`uraian\` text NOT NULL,
                \`pengali\` decimal(10, 2) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_saluran_spesifikasi_smkk\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_jenis_usulan\` int NOT NULL,
                \`id_usulan_jalan\` int NOT NULL,
                \`id_jalan_saluran_smkk\` int NOT NULL,
                \`harga_spec\` decimal(15, 2) NOT NULL,
                \`jumlah_barang\` decimal(15, 2) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_saluran_spesifikasi_smkk_review\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_jenis_usulan\` int NOT NULL,
                \`id_usulan_jalan\` int NOT NULL,
                \`id_jalan_saluran_smkk\` int NOT NULL,
                \`harga_spec\` decimal(15, 2) NOT NULL,
                \`jumlah_barang\` decimal(15, 2) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`usulan_jalan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_opd\` int NOT NULL,
                \`id_usulan_jalan_status\` int NOT NULL,
                \`id_asb_jenis\` int NOT NULL,
                \`id_rekening\` int NULL,
                \`id_rekening_review\` int NULL,
                \`id_jalan_jenis_pemeliharaan\` int NULL,
                \`id_jalan_jenis_perkerasan\` int NULL,
                \`id_kabkota\` int NULL,
                \`id_kecamatan\` int NULL,
                \`id_kelurahan\` int NULL,
                \`id_verifikator_adbang\` int NULL,
                \`id_verifikator_bpkad\` int NULL,
                \`id_verifikator_bappeda\` int NULL,
                \`id_reject_verif\` int NULL,
                \`reject_reason\` text NULL,
                \`verifikator_adbang_review_at\` timestamp NULL,
                \`verifikator_bpkad_review_at\` timestamp NULL,
                \`verifikator_bappeda_review_at\` timestamp NULL,
                \`reject_verifikator_review_at\` timestamp NULL,
                \`is_include_ppn\` tinyint NOT NULL DEFAULT 0,
                \`tahun_anggaran\` int NOT NULL,
                \`nama_usulan\` text NOT NULL,
                \`alamat\` text NULL,
                \`uraian\` text NULL,
                \`spesifikasi\` text NULL,
                \`satuan\` varchar(255) NULL,
                \`deskripsi_desain\` text NULL,
                \`lebar\` float NULL,
                \`total_harga\` decimal(15, 2) NULL,
                \`biaya_smkk\` decimal(15, 2) NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`smkk_global\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`bulan\` int NOT NULL,
                \`tahun\` int NOT NULL,
                \`persentase_smkk\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_tipe_bangunan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`tipe_bangunan\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_klasifikasi\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_tipe_bangunan\` int NOT NULL,
                \`klasifikasi\` varchar(255) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`standard_klasifikasi\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`uraian_standard\` varchar(500) NOT NULL,
                \`uraian_spek\` varchar(500) NOT NULL,
                \`inflasi\` decimal(15, 2) NOT NULL,
                \`id_asb_klasifikasi\` int NOT NULL,
                \`id_kabkota\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`shst\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`tahun\` int NOT NULL,
                \`id_asb_tipe_bangunan\` int NOT NULL,
                \`id_asb_klasifikasi\` int NOT NULL,
                \`id_kabkota\` int NOT NULL,
                \`nominal\` float NOT NULL,
                \`file\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`satuans\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`satuan\` varchar(255) NOT NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`provinces\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`kode\` varchar(10) NOT NULL,
                \`nama\` varchar(255) NOT NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                UNIQUE INDEX \`IDX_53474af19e0ff0a6994cfb2afc\` (\`kode\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`ppn_global\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`bulan\` int NOT NULL,
                \`tahun\` int NOT NULL,
                \`persentase_ppn\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jenis_standars\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`jenis\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`jalan_kebijakan\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_kabkota\` int NOT NULL,
                \`bulan\` int NOT NULL,
                \`tahun\` int NOT NULL,
                \`nilai_ppn\` float NOT NULL,
                \`nilai_smkk\` float NOT NULL,
                \`suku_bunga\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_status\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`status\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_lantais\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`lantai\` varchar(255) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                \`koef\` decimal(10, 4) NOT NULL,
                \`id_satuan\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_fungsi_ruangs\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`nama_fungsi_ruang\` varchar(255) NOT NULL,
                \`koef\` decimal(10, 2) NOT NULL,
                \`is_active\` tinyint NOT NULL DEFAULT 1,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_details\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb\` int NULL,
                \`files\` varchar(10) NOT NULL DEFAULT 'ORIGIN',
                \`id_asb_lantai\` int NULL,
                \`id_asb_fungsi_ruang\` int NULL,
                \`asb_fungsi_ruang_koef\` float NULL,
                \`lantai_koef\` float NULL,
                \`luas\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_detail_reviews\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_detail\` int NULL,
                \`files\` varchar(10) NOT NULL DEFAULT 'ORIGIN',
                \`id_asb_lantai\` int NULL,
                \`id_asb_fungsi_ruang\` int NULL,
                \`id_asb\` int NULL,
                \`asb_fungsi_ruang_koef\` float NULL,
                \`lantai_koef\` float NULL,
                \`luas\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_komponen_bangunan_stds\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`komponen\` varchar(255) NOT NULL,
                \`files\` enum ('ORIGIN', 'REVIEW') NOT NULL,
                \`id_asb_jenis\` int NOT NULL,
                \`id_asb_tipe_bangunan\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_bipek_standards\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb\` int NULL,
                \`files\` varchar(10) NOT NULL DEFAULT 'ORIGIN',
                \`id_asb_komponen_bangunan_std\` int NULL,
                \`bobot_input\` float NULL,
                \`calculation_method\` varchar(20) NULL,
                \`jumlah_bobot\` float NULL,
                \`rincian_harga\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_bipek_standard_reviews\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_bipek_standard\` int NULL,
                \`id_asb_komponen_bangunan_std\` int NULL,
                \`id_asb\` int NULL,
                \`files\` varchar(10) NOT NULL DEFAULT 'ORIGIN',
                \`bobot_input\` float NULL,
                \`calculation_method\` varchar(20) NULL,
                \`jumlah_bobot\` float NULL,
                \`rincian_harga\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_komponen_bangunan_nonstd\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`komponen\` varchar(255) NOT NULL,
                \`files\` enum ('ORIGIN', 'REVIEW') NOT NULL,
                \`id_asb_jenis\` int NOT NULL,
                \`id_asb_tipe_bangunan\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_bipek_non_stds\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb\` int NULL,
                \`files\` varchar(10) NOT NULL DEFAULT 'ORIGIN',
                \`id_asb_komponen_bangunan_nonstd\` int NULL,
                \`bobot_input\` float NULL,
                \`bobot_input_prosentase\` float NULL,
                \`calculation_method\` varchar(20) NULL,
                \`jumlah_bobot\` float NULL,
                \`rincian_harga\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_bipek_non_std_reviews\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_bipek_non_std\` int NULL,
                \`id_asb_komponen_bangunan_nonstd\` int NULL,
                \`id_asb\` int NULL,
                \`files\` varchar(10) NOT NULL DEFAULT 'ORIGIN',
                \`bobot_input\` float NULL,
                \`calculation_method\` varchar(20) NULL,
                \`bobot_input_prosentase\` float NULL,
                \`jumlah_bobot\` float NULL,
                \`rincian_harga\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_jenis\` int NOT NULL,
                \`id_asb_status\` int NOT NULL,
                \`id_opd\` int NOT NULL,
                \`id_asb_tipe_bangunan\` int NOT NULL,
                \`id_rekening\` int NULL,
                \`id_rekening_review\` int NULL,
                \`id_kabkota\` int NULL,
                \`id_kecamatan\` int NULL,
                \`id_kelurahan\` int NULL,
                \`id_asb_klasifikasi\` int NULL,
                \`id_verifikator_adpem\` int NULL,
                \`id_verifikator_bpkad\` int NULL,
                \`id_verifikator_bappeda\` int NULL,
                \`reject_verif_id\` int NULL,
                \`tahun_anggaran\` int NULL,
                \`nama_asb\` text NOT NULL,
                \`alamat\` text NULL,
                \`jumlah_kontraktor\` int NULL,
                \`total_lantai\` int NULL,
                \`luas_tanah\` int NULL,
                \`verified_adpem_at\` timestamp NULL,
                \`verified_bpkad_at\` timestamp NULL,
                \`verified_bappeda_at\` timestamp NULL,
                \`rejected_at\` timestamp NULL,
                \`reject_reason\` text NULL,
                \`shst\` float NULL,
                \`perencanaan_konstruksi\` float NULL,
                \`pengawasan_konstruksi\` float NULL,
                \`management_konstruksi\` float NULL,
                \`pengelolaan_kegiatan\` float NULL,
                \`luas_total_bangunan\` float NULL,
                \`koefisien_lantai_total\` float NULL,
                \`koefisien_fungsi_ruang_total\` float NULL,
                \`total_biaya_pembangunan\` decimal(20, 2) NULL,
                \`nominal_bps\` decimal(20, 2) NULL,
                \`nominal_bpns\` decimal(20, 2) NULL,
                \`bobot_total_bps\` float NULL,
                \`bobot_total_bpns\` float NULL,
                \`rekapitulasi_biaya_konstruksi\` decimal(20, 2) NULL,
                \`rekapitulasi_biaya_konstruksi_rounded\` decimal(20, 2) NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_log\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_user\` int NULL,
                \`id_asb\` int NULL,
                \`log\` text NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_komponen_bangunan_pros_std\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_komponen_bangunan_std\` int NOT NULL,
                \`min\` float NOT NULL,
                \`avg_min\` float NULL,
                \`avg\` float NOT NULL,
                \`avg_max\` float NULL,
                \`max\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_komponen_bangunan_pros_nonstd\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_komponen_bangunan_nonstd\` int NOT NULL,
                \`min\` float NOT NULL,
                \`avg_min\` float NULL,
                \`avg\` float NOT NULL,
                \`avg_max\` float NULL,
                \`max\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_jakon\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_tipe_bangunan\` int NOT NULL,
                \`id_asb_jenis\` int NOT NULL,
                \`id_asb_klasifikasi\` int NOT NULL,
                \`tahun\` int NOT NULL,
                \`type\` enum (
                    'perencanaan',
                    'pengawasan',
                    'management',
                    'pengelolaan'
                ) NOT NULL,
                \`nama\` text NOT NULL,
                \`spec\` varchar(255) NOT NULL,
                \`price_from\` float NOT NULL,
                \`price_to\` float NOT NULL,
                \`satuan\` varchar(50) NOT NULL,
                \`standard\` float NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_document\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb\` int NULL,
                \`filename\` text NOT NULL,
                \`spec\` enum (
                    'SURAT_REKOMENDASI',
                    'SURAT_PERMOHONAN',
                    'KERTAS_KERJA',
                    'LAPORAN',
                    'MATERI'
                ) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_bps_gallery_std\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_komponen_bangunan_std\` int NULL,
                \`id_asb\` int NULL,
                \`filename\` text NOT NULL,
                \`jumlah_bobot\` float NULL,
                \`rincian_harga\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`asb_bps_gallery_nonstd\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`id_asb_komponen_bangunan_nonstd\` int NULL,
                \`id_asb\` int NULL,
                \`filename\` text NOT NULL,
                \`jumlah_bobot\` float NULL,
                \`rincian_harga\` float NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deleted_at\` timestamp(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`verifikators\`
            ADD CONSTRAINT \`FK_09a4de12289248217f6da8fba20\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`kecamatans\`
            ADD CONSTRAINT \`FK_c8cff392e917f19b68d91bf7757\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`kelurahans\`
            ADD CONSTRAINT \`FK_8e785df05285af2fc358422a928\` FOREIGN KEY (\`id_kecamatan\`) REFERENCES \`kecamatans\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_ruang_lingkup\`
            ADD CONSTRAINT \`FK_388db3949c508c7def5c80e4b68\` FOREIGN KEY (\`id_jenis_usulan\`) REFERENCES \`jenis_usulan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`hspk\`
            ADD CONSTRAINT \`FK_9f01b5470b06ce46984eab5bd24\` FOREIGN KEY (\`id_ruang_lingkup\`) REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain\`
            ADD CONSTRAINT \`FK_9da1b0fb04da6b8c8a28dfea553\` FOREIGN KEY (\`id_usulan_jalan\`) REFERENCES \`usulan_jalan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain\`
            ADD CONSTRAINT \`FK_4f9d4f6d5fd8460be7e4f72dbaa\` FOREIGN KEY (\`id_ruang_lingkup\`) REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain\`
            ADD CONSTRAINT \`FK_e602db60e850213d67e66e5404e\` FOREIGN KEY (\`id_hspk\`) REFERENCES \`hspk\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_review\`
            ADD CONSTRAINT \`FK_85d6fdc61810cc6d3b93a9fbaa8\` FOREIGN KEY (\`id_usulan_jalan\`) REFERENCES \`usulan_jalan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_review\`
            ADD CONSTRAINT \`FK_1df7d87fc688b6e75c47c34c51f\` FOREIGN KEY (\`id_ruang_lingkup\`) REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_review\`
            ADD CONSTRAINT \`FK_a036f618e48b6a0e8a84f4506fd\` FOREIGN KEY (\`id_hspk\`) REFERENCES \`hspk\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\`
            ADD CONSTRAINT \`FK_121517b19216391174838a43934\` FOREIGN KEY (\`id_ruang_lingkup\`) REFERENCES \`jalan_saluran_ruang_lingkup\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            ADD CONSTRAINT \`FK_715b0a34ec2bdeb2ca63bd81997\` FOREIGN KEY (\`id_jenis_usulan\`) REFERENCES \`jenis_usulan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            ADD CONSTRAINT \`FK_ea557ee30d2826ea0a1d73daf6a\` FOREIGN KEY (\`id_usulan_jalan\`) REFERENCES \`usulan_jalan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\`
            ADD CONSTRAINT \`FK_f5f7494335313534cdf13efb422\` FOREIGN KEY (\`id_jalan_saluran_smkk\`) REFERENCES \`jalan_saluran_smkk\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            ADD CONSTRAINT \`FK_65a37a54917ac0bf544289bdda0\` FOREIGN KEY (\`id_jenis_usulan\`) REFERENCES \`jenis_usulan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            ADD CONSTRAINT \`FK_1804c16bd433eab0bc0d7ffabd2\` FOREIGN KEY (\`id_usulan_jalan\`) REFERENCES \`usulan_jalan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\`
            ADD CONSTRAINT \`FK_c19bcdbe90ead10c0b7c868d705\` FOREIGN KEY (\`id_jalan_saluran_smkk\`) REFERENCES \`jalan_saluran_smkk\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_704636eb025731d884761d625f0\` FOREIGN KEY (\`id_opd\`) REFERENCES \`opds\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_e649e54ab8edd15005b279e823e\` FOREIGN KEY (\`id_usulan_jalan_status\`) REFERENCES \`usulan_jalan_status\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_1887b28a5b9981434965780e2f3\` FOREIGN KEY (\`id_asb_jenis\`) REFERENCES \`asb_jenis\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_c5bef564d312a17190dba712d01\` FOREIGN KEY (\`id_rekening\`) REFERENCES \`rekenings\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_2d7c9eee793cc0cc3340ccf47ae\` FOREIGN KEY (\`id_rekening_review\`) REFERENCES \`rekenings\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_34b5fe64dc5ecd81790661dedf4\` FOREIGN KEY (\`id_jalan_jenis_pemeliharaan\`) REFERENCES \`jalan_jenis_pemeliharaan\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_b32a4b18983a6b85b6bbaccabce\` FOREIGN KEY (\`id_jalan_jenis_perkerasan\`) REFERENCES \`jalan_jenis_perkerasan\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_467478ce68fe99ab325541d45c1\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_52e399863b7613e8168feb0c5a8\` FOREIGN KEY (\`id_kecamatan\`) REFERENCES \`kecamatans\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_d1b93bc91d808d223a90828aa01\` FOREIGN KEY (\`id_kelurahan\`) REFERENCES \`kelurahans\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_25ce0a2f7d298ce3ef6c0dffcfe\` FOREIGN KEY (\`id_verifikator_adbang\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_a7782cd06d2f74a5c087e3af5be\` FOREIGN KEY (\`id_verifikator_bpkad\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_36a09fdd6803adc04254fc72ae5\` FOREIGN KEY (\`id_verifikator_bappeda\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\`
            ADD CONSTRAINT \`FK_2597a4a0de6e15c8f8e82be3f14\` FOREIGN KEY (\`id_reject_verif\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_klasifikasi\`
            ADD CONSTRAINT \`FK_c1f42a50df3b890b2a96aaf01f9\` FOREIGN KEY (\`id_asb_tipe_bangunan\`) REFERENCES \`asb_tipe_bangunan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`standard_klasifikasi\`
            ADD CONSTRAINT \`FK_35d97c71b7afe4cb05c7dad9e32\` FOREIGN KEY (\`id_asb_klasifikasi\`) REFERENCES \`asb_klasifikasi\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`standard_klasifikasi\`
            ADD CONSTRAINT \`FK_d8101610e01be47577e41765a29\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            ADD CONSTRAINT \`FK_f583b442b37534b3c7e4fe6f936\` FOREIGN KEY (\`id_asb_tipe_bangunan\`) REFERENCES \`asb_tipe_bangunan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            ADD CONSTRAINT \`FK_fc2a40b20b85c4d95625b2f3899\` FOREIGN KEY (\`id_asb_klasifikasi\`) REFERENCES \`asb_klasifikasi\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`shst\`
            ADD CONSTRAINT \`FK_0d4c38b73f435a6f59a3a8ad6da\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_kebijakan\`
            ADD CONSTRAINT \`FK_4d89787e756cfb20953ad7770f0\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_lantais\`
            ADD CONSTRAINT \`FK_4f2efeb130bc1d706927874a5d8\` FOREIGN KEY (\`id_satuan\`) REFERENCES \`satuans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_details\`
            ADD CONSTRAINT \`FK_8525a4cffa0281d9e1182422d67\` FOREIGN KEY (\`id_asb_lantai\`) REFERENCES \`asb_lantais\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_details\`
            ADD CONSTRAINT \`FK_cc0efee4255e836b06f99af796b\` FOREIGN KEY (\`id_asb_fungsi_ruang\`) REFERENCES \`asb_fungsi_ruangs\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_details\`
            ADD CONSTRAINT \`FK_3be1bf68cd7a0b23640c8131a45\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\`
            ADD CONSTRAINT \`FK_5ca1559cdfd77a692fafdd72795\` FOREIGN KEY (\`id_asb_detail\`) REFERENCES \`asb_details\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\`
            ADD CONSTRAINT \`FK_da842fc5f94459aa447c5be6620\` FOREIGN KEY (\`id_asb_lantai\`) REFERENCES \`asb_lantais\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\`
            ADD CONSTRAINT \`FK_8717ea3cfe968e4fdbe0992dccf\` FOREIGN KEY (\`id_asb_fungsi_ruang\`) REFERENCES \`asb_fungsi_ruangs\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\`
            ADD CONSTRAINT \`FK_7908ab266758b86d41d15046b5f\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_stds\`
            ADD CONSTRAINT \`FK_df5553a1d3260025409477bd1f1\` FOREIGN KEY (\`id_asb_jenis\`) REFERENCES \`asb_jenis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_stds\`
            ADD CONSTRAINT \`FK_f2d04eceecae2bb2a2fd0436fca\` FOREIGN KEY (\`id_asb_tipe_bangunan\`) REFERENCES \`asb_tipe_bangunan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standards\`
            ADD CONSTRAINT \`FK_c3fd5fe4608ab6163a0f80f5c60\` FOREIGN KEY (\`id_asb_komponen_bangunan_std\`) REFERENCES \`asb_komponen_bangunan_stds\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standards\`
            ADD CONSTRAINT \`FK_98bbdbd986cb1c6fdcca7d03ef6\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standard_reviews\`
            ADD CONSTRAINT \`FK_e3bc581ebd9e308b8e508a0b1ac\` FOREIGN KEY (\`id_asb_bipek_standard\`) REFERENCES \`asb_bipek_standards\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standard_reviews\`
            ADD CONSTRAINT \`FK_a46217dbdbe1f92cb593ac5fefd\` FOREIGN KEY (\`id_asb_komponen_bangunan_std\`) REFERENCES \`asb_komponen_bangunan_stds\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standard_reviews\`
            ADD CONSTRAINT \`FK_c42046c1d6b77bb7d596f351db9\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_nonstd\`
            ADD CONSTRAINT \`FK_a2a3960e776e41bb788bd705313\` FOREIGN KEY (\`id_asb_jenis\`) REFERENCES \`asb_jenis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_nonstd\`
            ADD CONSTRAINT \`FK_dec23c02c95b6a4d9d4919bc02a\` FOREIGN KEY (\`id_asb_tipe_bangunan\`) REFERENCES \`asb_tipe_bangunan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_stds\`
            ADD CONSTRAINT \`FK_e4529c7100c9ecb89f9c81a3a6f\` FOREIGN KEY (\`id_asb_komponen_bangunan_nonstd\`) REFERENCES \`asb_komponen_bangunan_nonstd\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_stds\`
            ADD CONSTRAINT \`FK_85f736b0a2c4b8f5195685b9f05\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_std_reviews\`
            ADD CONSTRAINT \`FK_0fb92878ec6a0d130d631eb540a\` FOREIGN KEY (\`id_asb_bipek_non_std\`) REFERENCES \`asb_bipek_non_stds\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_std_reviews\`
            ADD CONSTRAINT \`FK_02bbc12e843fd08e23e05bf7b75\` FOREIGN KEY (\`id_asb_komponen_bangunan_nonstd\`) REFERENCES \`asb_komponen_bangunan_nonstd\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_std_reviews\`
            ADD CONSTRAINT \`FK_3aeefdd89cd2f2bf3608f62a26b\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_14b0e55c9a4c19f27e4b9d59250\` FOREIGN KEY (\`id_asb_jenis\`) REFERENCES \`asb_jenis\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_48ca5403b8acd42da9e158b19f9\` FOREIGN KEY (\`id_asb_status\`) REFERENCES \`asb_status\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_d464a30c2c511b4ad0234d7a3a9\` FOREIGN KEY (\`id_opd\`) REFERENCES \`opds\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_3f0d52300685da6549d284d00ee\` FOREIGN KEY (\`id_asb_tipe_bangunan\`) REFERENCES \`asb_tipe_bangunan\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_0f678236cf07f753bd178165bad\` FOREIGN KEY (\`id_rekening\`) REFERENCES \`rekenings\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_a44e678cda4efeaefddc43d3748\` FOREIGN KEY (\`id_rekening_review\`) REFERENCES \`rekenings\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_45911761237e83fcca097ebc941\` FOREIGN KEY (\`id_kabkota\`) REFERENCES \`kabkotas\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_659168c29822dee0031c1bb34eb\` FOREIGN KEY (\`id_kecamatan\`) REFERENCES \`kecamatans\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_7bc45e47390d6eb370d3649db2d\` FOREIGN KEY (\`id_kelurahan\`) REFERENCES \`kelurahans\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_c6bf52e3e3d9d64b59b3a5ebc6e\` FOREIGN KEY (\`id_asb_klasifikasi\`) REFERENCES \`asb_klasifikasi\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_49f5ae25ea604be78cbf001f572\` FOREIGN KEY (\`id_verifikator_adpem\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_9d88e7cf2fbf34e9ae97792703a\` FOREIGN KEY (\`id_verifikator_bpkad\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_7faa78d0d9c4f0643127e942f99\` FOREIGN KEY (\`id_verifikator_bappeda\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\`
            ADD CONSTRAINT \`FK_24257349b4762bbcde5d3f6a495\` FOREIGN KEY (\`reject_verif_id\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_log\`
            ADD CONSTRAINT \`FK_03d39131d3ead3359fd863d0240\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_log\`
            ADD CONSTRAINT \`FK_4f2578551cf3d2842c2c5854508\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_pros_std\`
            ADD CONSTRAINT \`FK_4ef9008aebfaffc27c22e8707dd\` FOREIGN KEY (\`id_asb_komponen_bangunan_std\`) REFERENCES \`asb_komponen_bangunan_stds\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_pros_nonstd\`
            ADD CONSTRAINT \`FK_b6873e83a284e924e91fb0c58ce\` FOREIGN KEY (\`id_asb_komponen_bangunan_nonstd\`) REFERENCES \`asb_komponen_bangunan_nonstd\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_jakon\`
            ADD CONSTRAINT \`FK_fc5b50b3a7ab997faddb2fb042c\` FOREIGN KEY (\`id_asb_tipe_bangunan\`) REFERENCES \`asb_tipe_bangunan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_jakon\`
            ADD CONSTRAINT \`FK_66bb3e8e173a3c7eb0d85600f03\` FOREIGN KEY (\`id_asb_jenis\`) REFERENCES \`asb_jenis\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_jakon\`
            ADD CONSTRAINT \`FK_4879be6c1fdd2d84c22b06daef2\` FOREIGN KEY (\`id_asb_klasifikasi\`) REFERENCES \`asb_klasifikasi\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_document\`
            ADD CONSTRAINT \`FK_e331f967cee8e9ce0005f737d2b\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_std\`
            ADD CONSTRAINT \`FK_7075833db0b268c9bb0a85d34be\` FOREIGN KEY (\`id_asb_komponen_bangunan_std\`) REFERENCES \`asb_komponen_bangunan_stds\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_std\`
            ADD CONSTRAINT \`FK_ca3edb8a6b27763d310b29be2ac\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_nonstd\`
            ADD CONSTRAINT \`FK_00df515ae7e455d21841c965884\` FOREIGN KEY (\`id_asb_komponen_bangunan_nonstd\`) REFERENCES \`asb_komponen_bangunan_nonstd\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_nonstd\`
            ADD CONSTRAINT \`FK_edaab0efb2829d68d2c4e439c5c\` FOREIGN KEY (\`id_asb\`) REFERENCES \`asb\`(\`id\`) ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_nonstd\` DROP FOREIGN KEY \`FK_edaab0efb2829d68d2c4e439c5c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_nonstd\` DROP FOREIGN KEY \`FK_00df515ae7e455d21841c965884\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_std\` DROP FOREIGN KEY \`FK_ca3edb8a6b27763d310b29be2ac\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bps_gallery_std\` DROP FOREIGN KEY \`FK_7075833db0b268c9bb0a85d34be\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_document\` DROP FOREIGN KEY \`FK_e331f967cee8e9ce0005f737d2b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_jakon\` DROP FOREIGN KEY \`FK_4879be6c1fdd2d84c22b06daef2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_jakon\` DROP FOREIGN KEY \`FK_66bb3e8e173a3c7eb0d85600f03\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_jakon\` DROP FOREIGN KEY \`FK_fc5b50b3a7ab997faddb2fb042c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_pros_nonstd\` DROP FOREIGN KEY \`FK_b6873e83a284e924e91fb0c58ce\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_pros_std\` DROP FOREIGN KEY \`FK_4ef9008aebfaffc27c22e8707dd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_log\` DROP FOREIGN KEY \`FK_4f2578551cf3d2842c2c5854508\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_log\` DROP FOREIGN KEY \`FK_03d39131d3ead3359fd863d0240\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_24257349b4762bbcde5d3f6a495\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_7faa78d0d9c4f0643127e942f99\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_9d88e7cf2fbf34e9ae97792703a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_49f5ae25ea604be78cbf001f572\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_c6bf52e3e3d9d64b59b3a5ebc6e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_7bc45e47390d6eb370d3649db2d\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_659168c29822dee0031c1bb34eb\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_45911761237e83fcca097ebc941\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_a44e678cda4efeaefddc43d3748\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_0f678236cf07f753bd178165bad\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_3f0d52300685da6549d284d00ee\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_d464a30c2c511b4ad0234d7a3a9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_48ca5403b8acd42da9e158b19f9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb\` DROP FOREIGN KEY \`FK_14b0e55c9a4c19f27e4b9d59250\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_std_reviews\` DROP FOREIGN KEY \`FK_3aeefdd89cd2f2bf3608f62a26b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_std_reviews\` DROP FOREIGN KEY \`FK_02bbc12e843fd08e23e05bf7b75\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_std_reviews\` DROP FOREIGN KEY \`FK_0fb92878ec6a0d130d631eb540a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_stds\` DROP FOREIGN KEY \`FK_85f736b0a2c4b8f5195685b9f05\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_non_stds\` DROP FOREIGN KEY \`FK_e4529c7100c9ecb89f9c81a3a6f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_nonstd\` DROP FOREIGN KEY \`FK_dec23c02c95b6a4d9d4919bc02a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_nonstd\` DROP FOREIGN KEY \`FK_a2a3960e776e41bb788bd705313\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standard_reviews\` DROP FOREIGN KEY \`FK_c42046c1d6b77bb7d596f351db9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standard_reviews\` DROP FOREIGN KEY \`FK_a46217dbdbe1f92cb593ac5fefd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standard_reviews\` DROP FOREIGN KEY \`FK_e3bc581ebd9e308b8e508a0b1ac\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standards\` DROP FOREIGN KEY \`FK_98bbdbd986cb1c6fdcca7d03ef6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_bipek_standards\` DROP FOREIGN KEY \`FK_c3fd5fe4608ab6163a0f80f5c60\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_stds\` DROP FOREIGN KEY \`FK_f2d04eceecae2bb2a2fd0436fca\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_komponen_bangunan_stds\` DROP FOREIGN KEY \`FK_df5553a1d3260025409477bd1f1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\` DROP FOREIGN KEY \`FK_7908ab266758b86d41d15046b5f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\` DROP FOREIGN KEY \`FK_8717ea3cfe968e4fdbe0992dccf\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\` DROP FOREIGN KEY \`FK_da842fc5f94459aa447c5be6620\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_detail_reviews\` DROP FOREIGN KEY \`FK_5ca1559cdfd77a692fafdd72795\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_details\` DROP FOREIGN KEY \`FK_3be1bf68cd7a0b23640c8131a45\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_details\` DROP FOREIGN KEY \`FK_cc0efee4255e836b06f99af796b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_details\` DROP FOREIGN KEY \`FK_8525a4cffa0281d9e1182422d67\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_lantais\` DROP FOREIGN KEY \`FK_4f2efeb130bc1d706927874a5d8\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_kebijakan\` DROP FOREIGN KEY \`FK_4d89787e756cfb20953ad7770f0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`shst\` DROP FOREIGN KEY \`FK_0d4c38b73f435a6f59a3a8ad6da\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`shst\` DROP FOREIGN KEY \`FK_fc2a40b20b85c4d95625b2f3899\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`shst\` DROP FOREIGN KEY \`FK_f583b442b37534b3c7e4fe6f936\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`standard_klasifikasi\` DROP FOREIGN KEY \`FK_d8101610e01be47577e41765a29\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`standard_klasifikasi\` DROP FOREIGN KEY \`FK_35d97c71b7afe4cb05c7dad9e32\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`asb_klasifikasi\` DROP FOREIGN KEY \`FK_c1f42a50df3b890b2a96aaf01f9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_2597a4a0de6e15c8f8e82be3f14\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_36a09fdd6803adc04254fc72ae5\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_a7782cd06d2f74a5c087e3af5be\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_25ce0a2f7d298ce3ef6c0dffcfe\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_d1b93bc91d808d223a90828aa01\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_52e399863b7613e8168feb0c5a8\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_467478ce68fe99ab325541d45c1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_b32a4b18983a6b85b6bbaccabce\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_34b5fe64dc5ecd81790661dedf4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_2d7c9eee793cc0cc3340ccf47ae\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_c5bef564d312a17190dba712d01\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_1887b28a5b9981434965780e2f3\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_e649e54ab8edd15005b279e823e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`usulan_jalan\` DROP FOREIGN KEY \`FK_704636eb025731d884761d625f0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\` DROP FOREIGN KEY \`FK_c19bcdbe90ead10c0b7c868d705\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\` DROP FOREIGN KEY \`FK_1804c16bd433eab0bc0d7ffabd2\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk_review\` DROP FOREIGN KEY \`FK_65a37a54917ac0bf544289bdda0\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\` DROP FOREIGN KEY \`FK_f5f7494335313534cdf13efb422\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\` DROP FOREIGN KEY \`FK_ea557ee30d2826ea0a1d73daf6a\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_spesifikasi_smkk\` DROP FOREIGN KEY \`FK_715b0a34ec2bdeb2ca63bd81997\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_smkk\` DROP FOREIGN KEY \`FK_121517b19216391174838a43934\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_review\` DROP FOREIGN KEY \`FK_a036f618e48b6a0e8a84f4506fd\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_review\` DROP FOREIGN KEY \`FK_1df7d87fc688b6e75c47c34c51f\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain_review\` DROP FOREIGN KEY \`FK_85d6fdc61810cc6d3b93a9fbaa8\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain\` DROP FOREIGN KEY \`FK_e602db60e850213d67e66e5404e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain\` DROP FOREIGN KEY \`FK_4f9d4f6d5fd8460be7e4f72dbaa\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_spesifikasi_desain\` DROP FOREIGN KEY \`FK_9da1b0fb04da6b8c8a28dfea553\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`hspk\` DROP FOREIGN KEY \`FK_9f01b5470b06ce46984eab5bd24\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`jalan_saluran_ruang_lingkup\` DROP FOREIGN KEY \`FK_388db3949c508c7def5c80e4b68\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`kelurahans\` DROP FOREIGN KEY \`FK_8e785df05285af2fc358422a928\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`kecamatans\` DROP FOREIGN KEY \`FK_c8cff392e917f19b68d91bf7757\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`verifikators\` DROP FOREIGN KEY \`FK_09a4de12289248217f6da8fba20\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_bps_gallery_nonstd\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_bps_gallery_std\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_document\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_jakon\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_komponen_bangunan_pros_nonstd\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_komponen_bangunan_pros_std\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_log\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_bipek_non_std_reviews\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_bipek_non_stds\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_komponen_bangunan_nonstd\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_bipek_standard_reviews\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_bipek_standards\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_komponen_bangunan_stds\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_detail_reviews\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_details\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_fungsi_ruangs\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_lantais\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_status\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_kebijakan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jenis_standars\`
        `);
        await queryRunner.query(`
            DROP TABLE \`ppn_global\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_53474af19e0ff0a6994cfb2afc\` ON \`provinces\`
        `);
        await queryRunner.query(`
            DROP TABLE \`provinces\`
        `);
        await queryRunner.query(`
            DROP TABLE \`satuans\`
        `);
        await queryRunner.query(`
            DROP TABLE \`shst\`
        `);
        await queryRunner.query(`
            DROP TABLE \`standard_klasifikasi\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_klasifikasi\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_tipe_bangunan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`smkk_global\`
        `);
        await queryRunner.query(`
            DROP TABLE \`usulan_jalan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_saluran_spesifikasi_smkk_review\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_saluran_spesifikasi_smkk\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_saluran_smkk\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_spesifikasi_desain_review\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_spesifikasi_desain\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_1b9bf3851a35fda749b1f347f3\` ON \`hspk\`
        `);
        await queryRunner.query(`
            DROP TABLE \`hspk\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_saluran_ruang_lingkup\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jenis_usulan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`kelurahans\`
        `);
        await queryRunner.query(`
            DROP TABLE \`kecamatans\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_040cfc60179579a88fa449a377\` ON \`kabkotas\`
        `);
        await queryRunner.query(`
            DROP TABLE \`kabkotas\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_0ab9f15c0815e19b2733432741\` ON \`rekenings\`
        `);
        await queryRunner.query(`
            DROP TABLE \`rekenings\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_jenis_perkerasan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`jalan_jenis_pemeliharaan\`
        `);
        await queryRunner.query(`
            DROP TABLE \`asb_jenis\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_9acec64565e5b3eca1e9fd0fc2\` ON \`opds\`
        `);
        await queryRunner.query(`
            DROP TABLE \`opds\`
        `);
        await queryRunner.query(`
            DROP TABLE \`usulan_jalan_status\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_09a4de12289248217f6da8fba2\` ON \`verifikators\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_09a4de12289248217f6da8fba2\` ON \`verifikators\`
        `);
        await queryRunner.query(`
            DROP TABLE \`verifikators\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
    }
}
