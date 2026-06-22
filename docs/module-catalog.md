# Module catalog

All Nest **presentation** modules: HTTP prefix (from `@Controller`), domain folder, registration in [`AppModule`](../src/app.module.ts), composition parent if nested, and **business module** tag.

**Tags:** `ASB` (building / gedung), `Jalan`, `Saluran`, `Shared` (used across road + drainage or cross-domain), `Platform` (auth, geo, dashboard).

## Registered in `AppModule`

| Presentation module | HTTP prefix | Domain folder | In AppModule | Business module | Notes |
|---------------------|------------|---------------|--------------|-----------------|-------|
| `AuthModule` | `auth` | `user` (auth services) | Yes | Platform | JWT + refresh cookie; global guards |
| `UserModule` | `users` | `user` | Yes | Platform | |
| `ProvinceModule` | `provinces` | `provinces` | Yes | Platform | |
| `KabKotaModule` | `kabkotas` | `kabkota` | Yes | Platform | |
| `SatuanModule` | `satuans` | `satuan` | Yes | Shared | Units |
| `AsbFungsiRuangModule` | `asb-fungsi-ruangs` | `asb_fungsi_ruang` | Yes | ASB | |
| `AsbJenisModule` | `asb-jenis` | `asb_jenis` | Yes | Shared | ASB type; also referenced by road proposals |
| `AsbLantaiModule` | `asb-lantai` | `asb_lantai` | Yes | ASB | |
| `AsbStatusModule` | `asb-status` | `asb_status` | Yes | ASB | |
| `RekeningModule` | `rekenings` | `rekening` | Yes | Shared | Budget accounts |
| `JenisStandarModule` | `jenis-standar` | `jenis_standar` | Yes | ASB | |
| `AsbTipeBangunanModule` | `asb-tipe-bangunan` | `asb_tipe_bangunan` | Yes | ASB | |
| `AsbKlasifikasiModule` | `asb-klasifikasis` | `asb_klasifikasi` | Yes | ASB | |
| `ShstModule` | `shst` | `shst` | Yes | ASB | SHST pricing |
| `AsbKomponenBangunanStdModule` | `asb-komponen-bangunans` | `asb_komponen_bangunan_std` | Yes | ASB | |
| `AsbKomponenBangunanNonstdModule` | `asb-komponen-bangunan-nonstds` | `asb_komponen_bangunan_nonstd` | Yes | ASB | |
| `AsbKomponenBangunanProsStdModule` | `asb-komponen-bangunan-pros-std` | `asb_komponen_bangunan_pros_std` | Yes | ASB | |
| `AsbKomponenBangunanProsNonstdModule` | `asb-komponen-bangunan-pros-nonstd` | `asb_komponen_bangunan_pros_nonstd` | Yes | ASB | |
| `AsbJakonModule` | `asb-jakon` | `asb_jakon` | Yes | ASB | Registered twice in `AppModule` (harmless duplicate import) |
| `AsbBpsGalleryStdModule` | `asb-bps-gallery-std` | `asb_bps_gallery_std` | Yes | ASB | |
| `AsbBpsGalleryNonstdModule` | `asb-bps-gallery-nonstd` | `asb_bps_gallery_nonstd` | Yes | ASB | |
| `AsbDocumentModule` | `asb-document` | `asb_document` | Yes | ASB | Uploads / PDFs |
| `AsbLogModule` | — | `asb_log` | Yes | ASB | No controller; service exported for other modules |
| `AsbDetailModule` | `asb-detail` | `asb_detail` | Yes | ASB | |
| `AsbBipekStandardModule` | `asb-bipek-standard` | `asb_bipek_standard` | Yes | ASB | BPS |
| `AsbBipekNonStdModule` | `asb-bipek-non-std` | `asb_bipek_non_std` | Yes | ASB | BPNS |
| `AsbDetailReviewModule` | `asb-detail-review` | `asb_detail_review` | Yes | ASB | |
| `AsbBipekStandardReviewModule` | `asb-bipek-standard-review` | `asb_bipek_standard_review` | Yes | ASB | |
| `AsbBipekNonStdReviewModule` | `asb-bipek-non-std-review` | `asb_bipek_non_std_review` | Yes | ASB | |
| `AsbModule` | `asb` | `asb` | Yes | ASB | Core ASB workflow |
| `OpdModule` | `opds` | `opd` | Yes | Platform | |
| `VerifikatorModule` | `verifikators` | `verifikator` | Yes | Platform | |
| `StandardKlasifikasiModule` | `standard-klasifikasis` | `standard_klasifikasi` | Yes | ASB | |
| `KecamatanModule` | `kecamatans` | `kecamatan` | Yes | Platform | |
| `KelurahanModule` | `kelurahans` | `kelurahan` | Yes | Platform | |
| `JalanJenisPerkerasanModule` | `jalan-jenis-perkerasan` | `jalan_jenis_perkerasan` | Yes | Jalan | |
| `UsulanJalanStatusModule` | `usulan-jalan-status` | `usulan_jalan_status` | Yes | Jalan | |
| `UsulanJalanModule` | `usulan-jalan` | `usulan_jalan` | Yes | Jalan | Composes nested Jalan + shared SMKK modules |
| `UsulanSaluranModule` | `usulan-saluran` | `usulan_saluran` | Yes | Saluran | Composes nested Saluran + shared SMKK modules |
| `JalanJenisPemeliharaanModule` | `jalan-jenis-pemeliharaan` | `jalan_jenis_pemeliharaan` | Yes | Jalan | |
| `PpnGlobalModule` | `ppn-global` | `ppn_global` | Yes | Shared | VAT |
| `SmkkGlobalModule` | `smkk-global` | `smkk_global` | Yes | Shared | SMKK reference |
| `JalanKebijakanModule` | `jalan-kebijakan` | `jalan_kebijakan` | Yes | Jalan | |
| `JenisUsulanModule` | `jenis-usulan` | `jenis_usulan` | Yes | Shared | Proposal types |
| `JalanSaluranRuangLingkupModule` | `jalan-saluran-ruang-lingkup` | `jalan_saluran_ruang_lingkup` | Yes | Shared | Scope master for jalan + saluran |
| `JalanSaluranSmkkModule` | `jalan-saluran-smkk` | `jalan_saluran_smkk` | Yes | Shared | SMKK tree shared by workflows |
| `HspkModule` | `hspks` | `hspk` | Yes | Shared | HSPK catalog (rows keyed by `tahun_anggaran` + `no_mata_pembayaran`; list/filter by tahun anggaran) |
| `MainDashboardModule` | `main-dashboard` | `main_dashboard` | Yes | Platform | Metrics |

## Nested presentation modules (not in `AppModule` imports)

Imported by feature modules for composition. Most rows have **no** controller (logic used from `UsulanJalan` / `UsulanSaluran` services). The **Jalan Saluran Spesifikasi SMKK** pair registers HTTP controllers when the parent usulan modules import them.

| Presentation module | HTTP prefix | Domain folder | Parent / composed by | Business module | Notes |
|---------------------|------------|---------------|------------------------|-----------------|-------|
| `JalanSpesifikasiDesainModule` | — | `jalan_spesifikasi_desain` | `UsulanJalanModule` | Jalan | Design specs for road proposal |
| `JalanSpesifikasiDesainReviewModule` | — | `jalan_spesifikasi_desain_review` | `UsulanJalanModule` | Jalan | Verification of design specs |
| `SaluranSpesifikasiDesainModule` | — | `saluran_spesifikasi_desain` | `UsulanSaluranModule` | Saluran | Design specs for drainage proposal |
| `SaluranSpesifikasiDesainReviewModule` | — | `saluran_spesifikasi_desain_review` | `UsulanSaluranModule` | Saluran | Verification |
| `SaluranSpesifikasiSmkkModule` | — | `saluran_spesifikasi_smkk` | `UsulanSaluranModule` | Saluran | SMKK detail rows for saluran |
| `SaluranSpesifikasiSmkkReviewModule` | — | `saluran_spesifikasi_smkk_review` | `UsulanSaluranModule` | Saluran | Reviews |
| `JalanSaluranSpesifikasiSmkkModule` | `jalan-saluran-spesifikasi-smkk` | `jalan_saluran_spesifikasi_smkk` | `UsulanJalanModule`, `UsulanSaluranModule` | Shared | HTTP controllers registered via parent imports |
| `JalanSaluranSpesifikasiSmkkReviewModule` | `jalan-saluran-spesifikasi-smkk-review` | `jalan_saluran_spesifikasi_smkk_review` | `UsulanJalanModule`, `UsulanSaluranModule` | Shared | Same |

`JalanSaluranSpesifikasiSmkkModule` and `JalanSaluranSpesifikasiSmkkReviewModule` are **not** listed in [`AppModule`](../src/app.module.ts); they are pulled in by both usulan modules and expose REST routes.

## Postman

Collections under [`postman/`](../postman/) align with many modules (e.g. `Usulan_Jalan_Module_API`, `Usulan_Saluran_Module_API`, `ASB_Module_Postman_Collection`). Use file names as a guide when testing routes.
