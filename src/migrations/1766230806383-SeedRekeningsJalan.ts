import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRekeningsJalan1766230806383 implements MigrationInterface {
  name = 'SeedRekeningsJalan1766230806383';

  private readonly rekenings = [
    {
      rekening_kode: '5.1.02.03.004.00002',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Provinsi',
    },
    {
      rekening_kode: '5.1.02.03.004.00003',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Kabupaten',
    },
    {
      rekening_kode: '5.1.02.03.004.00004',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Kota',
    },
    {
      rekening_kode: '5.1.02.03.004.00005',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Desa',
    },
    {
      rekening_kode: '5.1.02.03.004.00009',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Khusus',
    },
    {
      rekening_kode: '5.1.02.03.004.00010',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Lainnya',
    },
    {
      rekening_kode: '5.1.02.03.004.00012',
      rekening_uraian:
        'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Provinsi',
    },
    {
      rekening_kode: '5.1.02.03.004.00013',
      rekening_uraian:
        'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Kabupaten',
    },
    {
      rekening_kode: '5.1.02.03.004.00014',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Kota',
    },
    {
      rekening_kode: '5.1.02.03.004.00015',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Desa',
    },
    {
      rekening_kode: '5.1.02.03.004.00023',
      rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan Lainnya',
    },
    { rekening_kode: '5.2.04.01.001.00002', rekening_uraian: 'Belanja Modal Jalan Provinsi' },
    { rekening_kode: '5.2.04.01.001.00003', rekening_uraian: 'Belanja Modal Jalan Kabupaten' },
    { rekening_kode: '5.2.04.01.001.00004', rekening_uraian: 'Belanja Modal Jalan Kota' },
    { rekening_kode: '5.2.04.01.001.00005', rekening_uraian: 'Belanja Modal Jalan Desa' },
    { rekening_kode: '5.2.04.01.001.00009', rekening_uraian: 'Belanja Modal Jalan Khusus' },
    { rekening_kode: '5.2.04.01.001.00010', rekening_uraian: 'Belanja Modal Jalan Lainnya' },
    {
      rekening_kode: '5.2.04.01.002.00002',
      rekening_uraian: 'Belanja Modal Jembatan pada Jalan Provinsi',
    },
    {
      rekening_kode: '5.2.04.01.002.00003',
      rekening_uraian: 'Belanja Modal Jembatan pada Jalan Kabupaten',
    },
    {
      rekening_kode: '5.2.04.01.002.00004',
      rekening_uraian: 'Belanja Modal Jembatan pada Jalan Kota',
    },
    {
      rekening_kode: '5.2.04.01.002.00005',
      rekening_uraian: 'Belanja Modal Jembatan pada Jalan Desa',
    },
    {
      rekening_kode: '5.2.04.01.002.00013',
      rekening_uraian: 'Belanja Modal Jembatan Lainnya',
    },

    {
      rekening_kode: '5.1.02.03.004.00024',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Waduk Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00025',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pengambilan Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00026',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pembawa Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00027',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pembuang Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00028',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pengaman Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00029',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pelengkap Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00030',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Sawah Irigasi',
    },
    {
      rekening_kode: '5.1.02.03.004.00031',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Air Irigasi Lainnya',
    },

    {
      rekening_kode: '5.1.02.03.004.00063',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Waduk Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.1.02.03.004.00064',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Pengambilan Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.1.02.03.004.00065',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Pembawa Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.1.02.03.004.00066',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Pembuang Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.1.02.03.004.00067',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Pelengkap Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.1.02.03.004.00068',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Air Bersih/Air Baku Lainnya',
    },

    {
      rekening_kode: '5.1.02.03.004.00069',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Pembawa Air Kotor',
    },
    {
      rekening_kode: '5.1.02.03.004.00070',
      rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Waduk Air Kotor',
    },
    {
      rekening_kode: '5.1.02.03.004.00071',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Pembuang Air Kotor',
    },
    {
      rekening_kode: '5.1.02.03.004.00072',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Pengaman Air Kotor',
    },
    {
      rekening_kode: '5.1.02.03.004.00073',
      rekening_uraian:
        'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Pelengkap Air Kotor',
    },
    {
      rekening_kode: '5.1.02.03.004.00074',
      rekening_uraian: 'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Air Kotor Lainnya',
    },

    { rekening_kode: '5.2.04.02.001.00001', rekening_uraian: 'Belanja Modal Bangunan Waduk Irigasi' },
    {
      rekening_kode: '5.2.04.02.001.00002',
      rekening_uraian: 'Belanja Modal Bangunan Pengambilan Irigasi',
    },
    { rekening_kode: '5.2.04.02.001.00003', rekening_uraian: 'Belanja Modal Bangunan Pembawa Irigasi' },
    { rekening_kode: '5.2.04.02.001.00004', rekening_uraian: 'Belanja Modal Bangunan Pembuang Irigasi' },
    { rekening_kode: '5.2.04.02.001.00005', rekening_uraian: 'Belanja Modal Bangunan Pengaman Irigasi' },
    { rekening_kode: '5.2.04.02.001.00006', rekening_uraian: 'Belanja Modal Bangunan Pelengkap Irigasi' },
    { rekening_kode: '5.2.04.02.001.00007', rekening_uraian: 'Belanja Modal Bangunan Sawah Irigasi' },
    { rekening_kode: '5.2.04.02.001.00008', rekening_uraian: 'Belanja Modal Bangunan Air Irigasi Lainnya' },

    {
      rekening_kode: '5.2.04.02.006.00001',
      rekening_uraian: 'Belanja Modal Bangunan Waduk Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.2.04.02.006.00002',
      rekening_uraian: 'Belanja Modal Bangunan Pengambilan Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.2.04.02.006.00003',
      rekening_uraian: 'Belanja Modal Bangunan Pembawa Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.2.04.02.006.00004',
      rekening_uraian: 'Belanja Modal Bangunan Pembuang Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.2.04.02.006.00005',
      rekening_uraian: 'Belanja Modal Bangunan Pelengkap Air Bersih/Air Baku',
    },
    {
      rekening_kode: '5.2.04.02.006.00006',
      rekening_uraian: 'Belanja Modal Bangunan Air Bersih/Air Baku Lainnya',
    },

    { rekening_kode: '5.2.04.02.007.00001', rekening_uraian: 'Belanja Modal Bangunan Pembawa Air Kotor' },
    { rekening_kode: '5.2.04.02.007.00002', rekening_uraian: 'Belanja Modal Bangunan Waduk Air Kotor' },
    { rekening_kode: '5.2.04.02.007.00003', rekening_uraian: 'Belanja Modal Bangunan Pembuang Air Kotor' },
    { rekening_kode: '5.2.04.02.007.00004', rekening_uraian: 'Belanja Modal Bangunan Pengaman Air Kotor' },
    { rekening_kode: '5.2.04.02.007.00005', rekening_uraian: 'Belanja Modal Bangunan Pelengkap Air Kotor' },
    { rekening_kode: '5.2.04.02.007.00006', rekening_uraian: 'Belanja Modal Bangunan Air Kotor Lainnya' },

    {
      rekening_kode: '5.1.02.03.004.00075',
      rekening_uraian:
        'Belanja Pemeliharaan Instalasi-Instalasi Air Bersih/Air Baku-Instalasi Air Permukaan',
    },
    {
      rekening_kode: '5.1.02.03.004.00076',
      rekening_uraian:
        'Belanja Pemeliharaan Instalasi-Instalasi Air Bersih/Air Baku-Instalasi Air Sumber/Mata Air',
    },
    {
      rekening_kode: '5.1.02.03.004.00077',
      rekening_uraian:
        'Belanja Pemeliharaan Instalasi-Instalasi Air Bersih/Air Baku-Instalasi Air Tanah Dalam',
    },
    {
      rekening_kode: '5.1.02.03.004.00078',
      rekening_uraian:
        'Belanja Pemeliharaan Instalasi-Instalasi Air Bersih/Air Baku-Instalasi Air Tanah Dangkal',
    },
    {
      rekening_kode: '5.1.02.03.004.00079',
      rekening_uraian:
        'Belanja Pemeliharaan Instalasi-Instalasi Air Bersih/Air Baku-Instalasi Air Bersih/Air Baku Lainnya',
    },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const rekening of this.rekenings) {
      await queryRunner.query(
        `INSERT INTO "rekenings" ("rekening_kode", "rekening_uraian")
                 VALUES ($1, $2)
                 ON CONFLICT ("rekening_kode") DO NOTHING`,
        [rekening.rekening_kode, rekening.rekening_uraian],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const kodeList = this.rekenings.map((r) => r.rekening_kode);
    if (!kodeList.length) return;

    const placeholders = kodeList.map((_, index) => `$${index + 1}`).join(', ');
    await queryRunner.query(
      `DELETE FROM "rekenings" WHERE "rekening_kode" IN (${placeholders})`,
      kodeList,
    );
  }
}
