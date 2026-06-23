import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRekenings1763805006431 implements MigrationInterface {
    name = 'SeedRekenings1763805006431';

    private readonly rekenings = [
        {
            rekening_kode: '5.2.03.01.001.00001',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Kantor',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00002',
            rekening_uraian: 'Belanja Modal Bangunan Gudang',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00003',
            rekening_uraian: 'Belanja Modal Bangunan Gedung untuk Bengkel/Hanggar',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00004',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Instalasi',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00005',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Laboratorium',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00006',
            rekening_uraian: 'Belanja Modal Bangunan Kesehatan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00007',
            rekening_uraian: 'Belanja Modal Bangunan Oseanarium/Observatorium',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00008',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Tempat Ibadah',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00009',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Tempat Pertemuan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00010',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Tempat Pendidikan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00011',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Tempat Olahraga',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00012',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Pertokoan/Koperasi/Pasar',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00013',
            rekening_uraian: 'Belanja Modal Bangunan Gedung untuk Pos Jaga',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00014',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Garasi/Pool',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00015',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Pemotong Hewan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00016',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Perpustakaan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00017',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Museum',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00018',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Terminal/Pelabuhan/Bandara',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00019',
            rekening_uraian: 'Belanja Modal Bangunan Pengujian Kelaikan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00020',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Lembaga Pemasyarakatan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00021',
            rekening_uraian: 'Belanja Modal Bangunan Rumah Tahanan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00022',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Krematorium',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00023',
            rekening_uraian: 'Belanja Modal Bangunan Pembakaran Bangkai Hewan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00024',
            rekening_uraian: 'Belanja Modal Bangunan Tempat Persidangan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00025',
            rekening_uraian: 'Belanja Modal Bangunan Terbuka',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00026',
            rekening_uraian: 'Belanja Modal Bangunan Penampung Sekam',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00027',
            rekening_uraian: 'Belanja Modal Bangunan Tempat Pelelangan Ikan (TPI)',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00028',
            rekening_uraian: 'Belanja Modal Bangunan Industri',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00029',
            rekening_uraian: 'Belanja Modal Bangunan Peternakan/Perikanan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00030',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Tempat Kerja Lainnya',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00031',
            rekening_uraian: 'Belanja Modal Bangunan Peralatan Geofisika',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00032',
            rekening_uraian: 'Belanja Modal Bangunan Fasilitas Umum',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00033',
            rekening_uraian: 'Belanja Modal Bangunan Parkir',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00034',
            rekening_uraian: 'Belanja Modal Bangunan Gedung Pabrik',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.001.00035',
            rekening_uraian: 'Belanja Modal Bangunan Stasiun Bus',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00005',
            rekening_uraian: 'Belanja Modal Asrama',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00006',
            rekening_uraian: 'Belanja Modal Hotel',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00010',
            rekening_uraian: 'Belanja Modal Panti Asuhan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00001',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Kantor',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00002',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gudang',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00003',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung untuk Bengkel/Hanggar',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00004',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Instalasi',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00005',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Laboratorium',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00006',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Kesehatan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00007',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Oseanarium/Observatorium',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00008',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Tempat Ibadah',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00009',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Tempat Pertemuan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00010',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Tempat Pendidikan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00011',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Tempat Olahraga',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00012',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Pertokoan/Koperasi/Pasar',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00013',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung untuk Pos Jaga',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00014',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Garasi/Pool',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00015',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Pemotong Hewan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00016',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Perpustakaan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00017',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Museum',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00018',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Terminal/Pelabuhan/Bandara',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00019',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Pengujian Kelaikan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00020',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Lembaga Pemasyarakatan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00021',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Rumah Tahanan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00022',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Krematorium',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00023',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Pembakaran Bangkai Hewan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00024',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Tempat Persidangan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00025',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Terbuka',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00026',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Penampung Sekam',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00027',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Tempat Pelelangan Ikan (TPI)',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00028',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Industri',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00029',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Peternakan/Perikanan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00030',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Tempat Kerja Lainnya',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00031',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Peralatan Geofisika',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00032',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Fasilitas Umum',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00033',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Parkir',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00034',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Gedung Pabrik',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00035',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Kerja-Bangunan Stasiun Bus',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00042',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Asrama',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00043',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Hotel',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00045',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Flat/Rumah Susun',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00001',
            rekening_uraian: 'Belanja Modal Rumah Negara Golongan I',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00002',
            rekening_uraian: 'Belanja Modal Rumah Negara Golongan II',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00003',
            rekening_uraian: 'Belanja Modal Rumah Negara Golongan III',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00008',
            rekening_uraian: 'Belanja Modal Flat/Rumah Susun',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.03.01.002.00009',
            rekening_uraian: 'Belanja Modal Rumah Negara dalam Proses Penggolongan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00038',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Rumah Negara Golongan I',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00039',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Rumah Negara Golongan II',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00040',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Rumah Negara Golongan III',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00045',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Flat/Rumah Susun',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.1.02.03.003.00046',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Gedung-Bangunan Gedung Tempat Tinggal-Rumah Negara dalam Proses Penggolongan',
            id_usulan_jenis: 1,
        },
        {
            rekening_kode: '5.2.04.01.001.00002',
            rekening_uraian: 'Belanja Modal Jalan Provinsi',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.2.04.01.002.00002',
            rekening_uraian: 'Belanja Modal Jembatan pada Jalan Provinsi',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.1.02.03.004.00002',
            rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Provinsi',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.1.02.03.004.00012',
            rekening_uraian:
                'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Provinsi',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.2.04.01.001.00003',
            rekening_uraian: 'Belanja Modal Jalan Kabupaten',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.2.04.01.002.00003',
            rekening_uraian: 'Belanja Modal Jembatan pada Jalan Kabupaten',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.1.02.03.004.00003',
            rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Kabupaten',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.1.02.03.004.00013',
            rekening_uraian:
                'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Kabupaten',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.2.04.01.001.00004',
            rekening_uraian: 'Belanja Modal Jalan Kota',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.2.04.01.002.00004',
            rekening_uraian: 'Belanja Modal Jembatan pada Jalan Kota',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.1.02.03.004.00004',
            rekening_uraian: 'Belanja Pemeliharaan Jalan dan Jembatan-Jalan-Jalan Kota',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.1.02.03.004.00014',
            rekening_uraian:
                'Belanja Pemeliharaan Jalan dan Jembatan-Jembatan-Jembatan pada Jalan Kota',
            id_usulan_jenis: 2,
        },
        {
            rekening_kode: '5.2.04.02.001.00003',
            rekening_uraian: 'Belanja Modal Bangunan Pembawa Irigasi',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.001.00004',
            rekening_uraian: 'Belanja Modal Bangunan Pembuang Irigasi',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.001.00007',
            rekening_uraian: 'Belanja Modal Bangunan Sawah Irigasi',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.001.00008',
            rekening_uraian: 'Belanja Modal Bangunan Air Irigasi Lainnya',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.004.00003',
            rekening_uraian: 'Belanja Modal Bangunan Pembawa Pengaman Sungai/Pantai',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.004.00004',
            rekening_uraian: 'Belanja Modal Bangunan Pembuang Pengaman Sungai',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.005.00003',
            rekening_uraian: 'Belanja Modal Bangunan Pembawa Pengembangan Sumber Air',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.005.00004',
            rekening_uraian: 'Belanja Modal Bangunan Pembuang Pengembangan Sumber Air',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.005.00007',
            rekening_uraian: 'Belanja Modal Bangunan Sawah Irigasi Air Tanah',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.006.00003',
            rekening_uraian: 'Belanja Modal Bangunan Pembawa Air Bersih/Air Baku',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.006.00004',
            rekening_uraian: 'Belanja Modal Bangunan Pembuang Air Bersih/Air Baku',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.007.00003',
            rekening_uraian: 'Belanja Modal Bangunan Pembuang Air Kotor',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.2.04.02.007.00004',
            rekening_uraian: 'Belanja Modal Bangunan Pengaman Air Kotor',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00026',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pembawa Irigasi',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00027',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Pembuang Irigasi',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00030',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Sawah Irigasi',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00031',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Irigasi-Bangunan Air Irigasi Lainnya',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00034',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengairan Pasang Surut-Bangunan Pembawa Pasang Surut',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00035',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengairan Pasang Surut-Saluran Pembuang Pasang Surut',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00042',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengembangan Rawa dan Polder-Bangunan Pembawa Pengembangan Rawa',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00043',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengembangan Rawa dan Polder-Bangunan Pembuang Pengembangan Rawa',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00050',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengaman Sungai/Pantai dan Penanggulangan Bencana Alam-Bangunan Pembawa Pengaman Sungai/Pantai',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00051',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengaman Sungai/Pantai dan Penanggulangan Bencana Alam-Bangunan Pembuang Pengaman Sungai',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00057',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengembangan Sumber Air dan Air Tanah-Bangunan Pembawa Pengembangan Sumber Air',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00058',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Pengembangan Sumber Air dan Air Tanah-Bangunan Pembuang Pengembangan Sumber Air',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00065',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Pembawa Air Bersih/Air Baku',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00066',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Bersih/Air Baku Lainnya-Bangunan Pembuang Air Bersih/Air Baku',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00071',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Pembuang Air Kotor',
            id_usulan_jenis: 3,
        },
        {
            rekening_kode: '5.1.02.03.004.00072',
            rekening_uraian:
                'Belanja Pemeliharaan Bangunan Air-Bangunan Air Kotor-Bangunan Pengaman Air Kotor',
            id_usulan_jenis: 3,
        },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (const rekening of this.rekenings) {
            await queryRunner.query(
                `INSERT INTO "rekenings" ("rekening_kode", "rekening_uraian", "id_jenis_usulan")
                 VALUES ($1, $2, $3)
                 ON CONFLICT ("rekening_kode") DO UPDATE SET "id_jenis_usulan" = EXCLUDED."id_jenis_usulan"`,
                [rekening.rekening_kode, rekening.rekening_uraian, rekening.id_usulan_jenis],
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
