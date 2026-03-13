import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedKabKotas1763627131253 implements MigrationInterface {
    name = 'SeedKabKotas1763627131253';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const kabkotas = [
            // DKI Jakarta
            { kode: '3101', nama: 'Kepulauan Seribu', provinceKode: '31' },
            { kode: '3171', nama: 'Jakarta Selatan', provinceKode: '31' },
            { kode: '3172', nama: 'Jakarta Timur', provinceKode: '31' },
            { kode: '3173', nama: 'Jakarta Pusat', provinceKode: '31' },
            { kode: '3174', nama: 'Jakarta Barat', provinceKode: '31' },
            { kode: '3175', nama: 'Jakarta Utara', provinceKode: '31' },
            
            // Jawa Barat (kabupaten)
            { kode: '3201', nama: 'Bogor', provinceKode: '32' },
            { kode: '3202', nama: 'Sukabumi', provinceKode: '32' },
            { kode: '3203', nama: 'Cianjur', provinceKode: '32' },
            { kode: '3204', nama: 'Bandung', provinceKode: '32' },
            { kode: '3205', nama: 'Garut', provinceKode: '32' },
            { kode: '3206', nama: 'Tasikmalaya', provinceKode: '32' },
            { kode: '3207', nama: 'Ciamis', provinceKode: '32' },
            { kode: '3208', nama: 'Kuningan', provinceKode: '32' },
            { kode: '3209', nama: 'Cirebon', provinceKode: '32' },
            { kode: '3210', nama: 'Majalengka', provinceKode: '32' },
            { kode: '3211', nama: 'Sumedang', provinceKode: '32' },
            { kode: '3212', nama: 'Indramayu', provinceKode: '32' },
            { kode: '3213', nama: 'Subang', provinceKode: '32' },
            { kode: '3214', nama: 'Purwakarta', provinceKode: '32' },
            { kode: '3215', nama: 'Karawang', provinceKode: '32' },
            { kode: '3216', nama: 'Bekasi', provinceKode: '32' },
            { kode: '3217', nama: 'Bandung Barat', provinceKode: '32' },
            { kode: '3218', nama: 'Pangandaran', provinceKode: '32' },
            
            // Jawa Tengah (kabupaten)
            { kode: '3301', nama: 'Cilacap', provinceKode: '33' },
            { kode: '3302', nama: 'Banyumas', provinceKode: '33' },
            { kode: '3303', nama: 'Purbalingga', provinceKode: '33' },
            { kode: '3304', nama: 'Banjarnegara', provinceKode: '33' },
            { kode: '3305', nama: 'Kebumen', provinceKode: '33' },
            { kode: '3306', nama: 'Purworejo', provinceKode: '33' },
            { kode: '3307', nama: 'Wonosobo', provinceKode: '33' },
            { kode: '3308', nama: 'Magelang', provinceKode: '33' },
            { kode: '3309', nama: 'Boyolali', provinceKode: '33' },
            { kode: '3310', nama: 'Klaten', provinceKode: '33' },
            { kode: '3311', nama: 'Sukoharjo', provinceKode: '33' },
            { kode: '3312', nama: 'Wonogiri', provinceKode: '33' },
            { kode: '3313', nama: 'Karanganyar', provinceKode: '33' },
            { kode: '3314', nama: 'Sragen', provinceKode: '33' },
            { kode: '3315', nama: 'Grobogan', provinceKode: '33' },
            { kode: '3316', nama: 'Blora', provinceKode: '33' },
            { kode: '3317', nama: 'Rembang', provinceKode: '33' },
            { kode: '3318', nama: 'Pati', provinceKode: '33' },
            { kode: '3319', nama: 'Kudus', provinceKode: '33' },
            { kode: '3320', nama: 'Jepara', provinceKode: '33' },
            { kode: '3321', nama: 'Demak', provinceKode: '33' },
            { kode: '3322', nama: 'Semarang', provinceKode: '33' },
            { kode: '3323', nama: 'Temanggung', provinceKode: '33' },
            { kode: '3324', nama: 'Kendal', provinceKode: '33' },
            { kode: '3325', nama: 'Batang', provinceKode: '33' },
            { kode: '3326', nama: 'Pekalongan', provinceKode: '33' },
            { kode: '3327', nama: 'Pemalang', provinceKode: '33' },
            { kode: '3328', nama: 'Tegal', provinceKode: '33' },
            { kode: '3329', nama: 'Brebes', provinceKode: '33' },
            
            // DI Yogyakarta
            { kode: '3401', nama: 'Kulon Progo', provinceKode: '34' },
            { kode: '3402', nama: 'Bantul', provinceKode: '34' },
            { kode: '3403', nama: 'Gunung Kidul', provinceKode: '34' },
            { kode: '3404', nama: 'Sleman', provinceKode: '34' },
            { kode: '3471', nama: 'Yogyakarta', provinceKode: '34' },
            
            // Jawa Timur
            { kode: '3501', nama: 'Pacitan', provinceKode: '35' },
            { kode: '3502', nama: 'Ponorogo', provinceKode: '35' },
            { kode: '3503', nama: 'Trenggalek', provinceKode: '35' },
            { kode: '3504', nama: 'Tulungagung', provinceKode: '35' },
            { kode: '3505', nama: 'Blitar', provinceKode: '35' },
            { kode: '3506', nama: 'Kediri', provinceKode: '35' },
            { kode: '3507', nama: 'Malang', provinceKode: '35' },
            { kode: '3508', nama: 'Lumajang', provinceKode: '35' },
            { kode: '3509', nama: 'Jember', provinceKode: '35' },
            { kode: '3510', nama: 'Banyuwangi', provinceKode: '35' },
            { kode: '3511', nama: 'Bondowoso', provinceKode: '35' },
            { kode: '3512', nama: 'Situbondo', provinceKode: '35' },
            { kode: '3513', nama: 'Probolinggo', provinceKode: '35' },
            { kode: '3514', nama: 'Pasuruan', provinceKode: '35' },
            { kode: '3515', nama: 'Sidoarjo', provinceKode: '35' },
            { kode: '3516', nama: 'Mojokerto', provinceKode: '35' },
            { kode: '3517', nama: 'Jombang', provinceKode: '35' },
            { kode: '3518', nama: 'Nganjuk', provinceKode: '35' },
            { kode: '3519', nama: 'Madiun', provinceKode: '35' },
            { kode: '3520', nama: 'Magetan', provinceKode: '35' },
            { kode: '3521', nama: 'Ngawi', provinceKode: '35' },
            { kode: '3522', nama: 'Bojonegoro', provinceKode: '35' },
            { kode: '3523', nama: 'Tuban', provinceKode: '35' },
            { kode: '3524', nama: 'Lamongan', provinceKode: '35' },
            { kode: '3525', nama: 'Gresik', provinceKode: '35' },
            { kode: '3526', nama: 'Bangkalan', provinceKode: '35' },
            { kode: '3527', nama: 'Sampang', provinceKode: '35' },
            { kode: '3528', nama: 'Pamekasan', provinceKode: '35' },
            { kode: '3529', nama: 'Sumenep', provinceKode: '35' },
            { kode: '3571', nama: 'Kediri', provinceKode: '35' },
            { kode: '3572', nama: 'Blitar', provinceKode: '35' },
            { kode: '3573', nama: 'Malang', provinceKode: '35' },
            { kode: '3574', nama: 'Probolinggo', provinceKode: '35' },
            { kode: '3575', nama: 'Pasuruan', provinceKode: '35' },
            { kode: '3576', nama: 'Mojokerto', provinceKode: '35' },
            { kode: '3577', nama: 'Madiun', provinceKode: '35' },
            { kode: '3578', nama: 'Surabaya', provinceKode: '35' },
            { kode: '3579', nama: 'Batu', provinceKode: '35' },
        ];

        for (const kabkota of kabkotas) {
            // cari id provinsi berdasarkan kode
            const provinces = await queryRunner.query(
                `SELECT id FROM "provinces" WHERE "kode" = $1`,
                [kabkota.provinceKode],
            );

            if (!provinces.length) {
                throw new Error(`Province with kode ${kabkota.provinceKode} not found`);
            }

            const provinceId = provinces[0].id as number;

            await queryRunner.query(
                `INSERT INTO "kabkotas" ("kode", "nama", "province_id", "is_active")
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT ("kode") DO NOTHING`,
                [kabkota.kode, kabkota.nama, provinceId, true],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const kodeList = [
            // DKI Jakarta
            '3101','3171','3172','3173','3174','3175',
            // Jawa Barat
            '3201','3202','3203','3204','3205','3206','3207','3208','3209','3210',
            '3211','3212','3213','3214','3215','3216','3217','3218',
            // Jawa Tengah
            '3301','3302','3303','3304','3305','3306','3307','3308','3309','3310',
            '3311','3312','3313','3314','3315','3316','3317','3318','3319','3320',
            '3321','3322','3323','3324','3325','3326','3327','3328','3329',
            // DI Yogyakarta
            '3401','3402','3403','3404','3471',
            // Jawa Timur
            '3501','3502','3503','3504','3505','3506','3507','3508','3509','3510',
            '3511','3512','3513','3514','3515','3516','3517','3518','3519','3520',
            '3521','3522','3523','3524','3525','3526','3527','3528','3529',
            '3571','3572','3573','3574','3575','3576','3577','3578','3579',
        ];

        const placeholders = kodeList.map((_, index) => `$${index + 1}`).join(', ');
        await queryRunner.query(
            `DELETE FROM "kabkotas" WHERE "kode" IN (${placeholders})`,
            kodeList,
        );
    }
}
