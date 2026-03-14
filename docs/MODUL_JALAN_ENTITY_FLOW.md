# Flow Keterhubungan dan Step-by-Step Proses Entity Modul Jalan

## 1. Diagram Keterhubungan Entity

```
                                    ┌─────────────────────┐
                                    │      Opd            │
                                    └──────────┬──────────┘
                                              │ 1:N
                                              ▼
┌──────────────────┐    ┌───────────────────────────────────────────────────────────────┐
│ AsbJenis         │    │                     UsulanJalan (ENTITAS UTAMA)                  │
│ (Pembangunan/    │◄───┤  - idOpd, idAsbJenis, idUsulanJalanStatus, idRekening           │
│  Pemeliharaan)   │    │  - idJalanJenisPemeliharaan, idJalanJenisPerkerasan             │
└──────────────────┘    │  - idKabkota, idKecamatan, idKelurahan                          │
         ▲              │  - totalHarga, biayaSmkk, uraian, spesifikasi, lebar             │
         │              │  - Verifikator: idVerifikatorAdbang, idVerifikatorBpkad, dll     │
         │              └───────────────────────────┬─────────────────────────────────────┘
         │ 1:N                                      │
         │                                          │ 1:N
┌──────────────────┐    ┌──────────────────────────┼─────────────────────────────────────┐
│ AsbJenis         │    │                          │                                       │
└──────────────────┘    │  ┌──────────────────────┼──────────────────────────────────┐   │
                        │  │                      │                                    │   │
                        │  └──────────┬───────────┴──────────┬─────────────────────────┘   │
                        │             │                      │                             │
                        │             │ 1:N                  │ 1:N                         │
                        │             ▼                      ▼                             │
┌──────────────────────┐│  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
│ JalanJenisPerkerasan ││  │ JalanSpesifikasiDesain│  │ JalanSaluranSpesifikasiSmkk      │  │
│ (jenis_perkerasan)   ││  │ - id_usulan_jalan     │  │ - id_usulan_jalan                │  │
└──────────────────────┘│  │ - id_ruang_lingkup    │  │ - id_jalan_saluran_smkk         │  │
                        │  │ - id_hspk             │  │ - harga_spec, jumlah_barang     │  │
┌──────────────────────┐│  │ - volume, spasi, tinggi│  │ - harga_satuan                  │  │
│ JalanJenisPemeliharaan││  │ - harga_spec          │  └───────────────────────────────┘  │
└──────────────────────┘│  └──────────┬────────────┘              ▲                        │
                        │             │                           │ N:1                     │
                        │             │ N:1                       │                         │
                        │             ▼                           │                         │
                        │  ┌─────────────────────┐  ┌─────────────────────────────────┐      │
                        │  │ JalanSaluranRuang  │  │ JalanSaluranSmkk (Master)       │      │
                        │  │ Lingkup             │  │ - id_jenis_usulan               │      │
                        │  │ - id_jenis_usulan   │  │ - no_mata_pembayaran, satuan    │      │
                        │  │ - deskripsi_ruang_  │  │ - uraian, pengali               │      │
                        │  │   lingkup           │  └───────────────────────────────┘      │
                        │  └──────────┬──────────┘                 ▲                        │
                        │             │                           │ N:1                     │
                        │             │ 1:N                       │                         │
                        │             ▼                           │                         │
                        │  ┌─────────────────────┐  ┌─────────────────────────────────┐      │
                        │  │ Hspk                │  │  (JALAN REVIEW - Verifikasi)     │      │
                        │  │ - id_ruang_lingkup   │  │  JalanSpesifikasiDesainReview   │      │
                        │  │ - no_mata_pembayaran │  │  JalanSaluranSpesifikasiSmkkReview│     │
                        │  │ - satuan, harga_satuan│  └─────────────────────────────────┘      │
                        │  │ - uraian            │                                            │
                        │  └─────────────────────┘                                            │
                        │                                                                      │
                        │  Referensi: UsulanJalanStatus, Rekening, KabKota, Kecamatan,        │
                        │             Kelurahan, User (verifikator)                           │
                        └──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tabel Entity dan Relasi

| Entity | Tabel | Relasi |
|--------|-------|--------|
| **UsulanJalan** | `usulan_jalan` | Entitas utama: 1 usulan jalan punya banyak spesifikasi desain & SMKK |
| **UsulanJalanStatus** | `usulan_jalan_status` | Status alur (1–9) |
| **JalanSpesifikasiDesain** | `jalan_spesifikasi_desain` | `id_usulan_jalan` → UsulanJalan, `id_ruang_lingkup` → JalanSaluranRuangLingkup, `id_hspk` → Hspk |
| **JalanSpesifikasiDesainReview** | `jalan_spesifikasi_desain_review` | Versi verifikasi dari JalanSpesifikasiDesain |
| **JalanSaluranRuangLingkup** | `jalan_saluran_ruang_lingkup` | `id_jenis_usulan` → JenisUsulan, master ruang lingkup |
| **Hspk** | `hspk` | `id_ruang_lingkup` → JalanSaluranRuangLingkup, Harga Satuan Per Komponen |
| **JalanSaluranSmkk** | `jalan_saluran_smkk` | `id_jenis_usulan` → JenisUsulan, master komponen SMKK (pengali) |
| **JalanSaluranSpesifikasiSmkk** | `jalan_saluran_spesifikasi_smkk` | `id_usulan_jalan` → UsulanJalan, `id_jalan_saluran_smkk` → JalanSaluranSmkk |
| **JalanSaluranSpesifikasiSmkkReview** | `jalan_saluran_spesifikasi_smkk_review` | Versi verifikasi dari JalanSaluranSpesifikasiSmkk |
| **JalanJenisPerkerasan** | `jalan_jenis_perkerasan` | Jenis perkerasan (aspal, beton, dll) |
| **JalanJenisPemeliharaan** | `jalan_jenis_pemeliharaan` | Jenis pemeliharaan (jika AsbJenis = Pemeliharaan) |
| **JalanKebijakan** | `jalan_kebijakan` | Kebijakan SMKK per KabKota (nilai_ppn, nilai_smkk, suku_bunga) |
| **JalanKeteranganTambahan** | `jalan_keterangan_tambahan` | Lookup keterangan tambahan |

---

## 3. Status Usulan Jalan (UsulanJalanStatus)

| ID | Status |
|----|--------|
| 1 | Input Informasi Usulan Jalan |
| 2 | Input Ruang Lingkup dan Spesifikasi Jalan |
| 3 | Memenuhi Syarat (Final Approved) |
| 4 | Tidak Memenuhi Syarat (Rejected) |
| 5 | Verifikasi Informasi Usulan Jalan |
| 6 | Verifikasi Ruang Lingkup dan Spesifikasi Jalan |
| 7 | Verifikasi Adbang |
| 8 | Verifikasi Bpkad |
| 9 | Verifikasi Bappeda |

---

## 4. Step-by-Step Proses (Flow Bisnis)

### 4.1 Input Informasi Usulan Jalan (Status 1)

**Aktor:** OPD

**Langkah:**
1. **createIndex** – OPD membuat usulan baru:
   - Input: `idAsbJenis`, `idJalanJenisPemeliharaan` (jika Pemeliharaan), `idJalanJenisPerkerasan`, `idKabkota`, `idKecamatan`, `idKelurahan`, `tahunAnggaran`, `namaUsulan`, `alamat`
   - Entity: `UsulanJalan` dibuat dengan `idUsulanJalanStatus = 1`
   - Validasi: `idJalanJenisPemeliharaan` wajib jika `idAsbJenis = 2` (Pemeliharaan)

2. **updateIndex** – OPD mengubah data index usulan (jika status masih 1)

---

### 4.2 Input Ruang Lingkup dan Spesifikasi Jalan (Status 2)

**Aktor:** OPD

**Langkah:**
1. **storeInformasi** – OPD menyimpan ruang lingkup dan spesifikasi:
   - **Step 1:** Hapus semua `JalanSpesifikasiDesain` dan `JalanSaluranSpesifikasiSmkk` lama
   - **Step 2:** Untuk setiap `data_ruang_lingkup` → `data_hspk`:
     - Buat `JalanSpesifikasiDesain` (id_usulan_jalan, id_ruang_lingkup, id_hspk, spasi, tinggi)
     - Volume & harga_spec dihitung dari `lebar` × HSPK
   - **Step 3:** Hitung total harga (termasuk PPN jika `isIncludePpn`)
   - **Step 4:** Generate uraian, spesifikasi, satuan, deskripsiDesain
   - **Step 5:** Hitung `biayaSmkk` = totalHarga × persentase SMKK Global
   - **Step 6:** Update `UsulanJalan` (uraian, spesifikasi, totalHarga, biayaSmkk, idRekening) → status 2
   - **Step 7:** Jika ada `data_smkk`:
     - Untuk setiap item: buat `JalanSaluranSpesifikasiSmkk`
     - `harga_spec` = biayaSmkk × pengali (dari `JalanSaluranSmkk`)
     - `harga_satuan` = harga_spec / jumlah_barang (dari DTO)

---

### 4.3 Verifikasi Index (Status 2 → 5)

**Aktor:** Verifikator ADBANG (atau ADMIN/SUPERADMIN)

**Langkah:**
1. **verifyIndex** – Verifikasi index usulan:
   - Validasi: status harus 2
   - Update data index (sama seperti createIndex): idAsbJenis, idJalanJenisPemeliharaan, idJalanJenisPerkerasan, lokasi, dll
   - Update status → status 5 (Verifikasi Informasi Usulan Jalan)

---

### 4.4 Verifikasi Informasi (Status 5 → 6)

**Aktor:** Verifikator ADBANG (atau ADMIN/SUPERADMIN)

**Langkah:**
1. **verifyInformasi** – Verifikasi informasi dengan nilai review:
   - Hapus semua `JalanSpesifikasiDesainReview` lama
   - Untuk setiap `data_ruang_lingkup` → `data_hspk`:
     - Buat `JalanSpesifikasiDesainReview` (spasi_review, tinggi_review, volume_review, harga_spec_review)
   - Hitung totalHargaReview (termasuk PPN)
   - Generate uraian, spesifikasi, satuan, deskripsiDesain
   - Hitung `biayaSmkk` = totalHargaReview × persentase SMKK Global
   - Update `UsulanJalan` (uraian, spesifikasi, totalHarga, biayaSmkk) → status 6
   - Jika ada `data_smkk`: buat `JalanSaluranSpesifikasiSmkkReview` dengan harga_spec, jumlah_barang, harga_satuan

---

### 4.5 Verifikasi Adbang (Status 6 → 7)

**Aktor:** Verifikator ADBANG

**Langkah:**
1. **verifyAdbang** – Verifikasi ADBANG:
   - Validasi: status harus 6
   - Update: `idVerifikatorAdbang`, `verifikatorAdbangReviewAt` → status 7

---

### 4.6 Verifikasi BPKAD (Status 7 → 8)

**Aktor:** Verifikator BPKAD

**Langkah:**
1. **verifyBpkad** – Verifikasi BPKAD:
   - Validasi: status harus 7
   - Update: `idVerifikatorBpkad`, `verifikatorBpkadReviewAt`, `idRekeningReview` → status 8

---

### 4.7 Verifikasi BAPPEDA (Status 8 → 3)

**Aktor:** Verifikator BAPPEDA

**Langkah:**
1. **verifyBappeda** – Verifikasi BAPPEDA (Final Approval):
   - Validasi: status harus 8
   - Update: `idVerifikatorBappeda`, `verifikatorBappedaReviewAt` → status 3 (Memenuhi Syarat)

---

### 4.8 Reject (Status 5–8 → 4)

**Aktor:** Verifikator ADBANG (atau ADMIN/SUPERADMIN)

**Langkah:**
1. **rejectUsulanJalan** – Reject usulan:
   - Validasi: status harus 5, 6, 7, atau 8
   - Update: `idUsulanJalanStatus = 4`, `idRejectVerif`, `rejectVerifikatorReviewAt`, `rejectReason`

---

## 5. Ringkasan Perhitungan

| Perhitungan | Rumus |
|-------------|-------|
| **harga_spec** (Desain) | `volume × HSPK.harga_satuan` (volume = lebar × spasi × tinggi) |
| **totalHarga** | Σ harga_spec per spec + PPN (jika isIncludePpn) |
| **biayaSmkk** | `totalHarga × persentase SMKK Global` |
| **harga_spec** (SMKK) | `biayaSmkk × JalanSaluranSmkk.pengali` |
| **harga_satuan** (SMKK) | `harga_spec / jumlah_barang` |

---

## 6. Entity Master vs Transaksi

| Tipe | Entity |
|------|--------|
| **Master** | JalanSaluranRuangLingkup, Hspk, JalanSaluranSmkk, JenisUsulan, JalanJenisPerkerasan, JalanJenisPemeliharaan, JalanKebijakan, JalanKeteranganTambahan |
| **Transaksi** | UsulanJalan, JalanSpesifikasiDesain, JalanSpesifikasiDesainReview, JalanSaluranSpesifikasiSmkk, JalanSaluranSpesifikasiSmkkReview |

---

## 7. Alur Status (Visual)

```
[1] Input Informasi
    createIndex / updateIndex
         │
         ▼
[2] Input Ruang Lingkup & Spesifikasi
    storeInformasi
         │
         ▼
[5] Verifikasi Informasi
    verifyIndex (ADBANG)
         │
         ▼
[6] Verifikasi Ruang Lingkup & Spesifikasi
    verifyInformasi (ADBANG)
         │
         ▼
[7] Verifikasi Adbang
    verifyAdbang (ADBANG)
         │
         ▼
[8] Verifikasi BPKAD
    verifyBpkad (BPKAD)
         │
         ▼
[3] Memenuhi Syarat
    verifyBappeda (BAPPEDA)

[4] Tidak Memenuhi Syarat (Reject) dari status 5–8
```
