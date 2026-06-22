# Saluran module

## Overview

**Saluran** covers **drainage** proposals (`UsulanSaluran`): indexing, information, **saluran-specific** design and SMKK breakdown, verification, and analytics. It is separate from **Jalan** (road), though both use the same SMKK infrastructure entities (`JalanSaluranSpesifikasiSmkk`, shared SMKK masters) and similar use-case patterns.

## Architecture

| Layer | Location |
|-------|----------|
| Presentation | [`usulan_saluran`](../src/presentation/usulan_saluran/), nested [`saluran_spesifikasi_*`](../src/presentation/saluran_spesifikasi_desain/) modules (no standalone `AppModule` registration) |
| Application | [`src/application/usulan_saluran/`](../src/application/usulan_saluran/), `saluran_spesifikasi_*` |
| Domain | [`src/domain/usulan_saluran/`](../src/domain/usulan_saluran/), `saluran_spesifikasi_desain`, `saluran_spesifikasi_smkk`, … |
| Infrastructure | Matching ORM/repositories under [`src/infrastructure/`](../src/infrastructure/) |

## Key entities

| Entity | Responsibility |
|--------|----------------|
| `UsulanSaluran` | Main drainage proposal |
| `SaluranSpesifikasiDesain` | Drainage design specification rows |
| `SaluranSpesifikasiSmkk` / reviews | SMKK detail for saluran |
| `JalanSaluranSpesifikasiSmkk` | Shared table for SMKK lines (named for jalan + saluran) |

## HTTP surface

- **`/usulan-saluran`** — main CRUD, verification, analytics ([`usulan_saluran.controller.ts`](../src/presentation/usulan_saluran/usulan_saluran.controller.ts)).
- Shared routes registered by parent imports: **`/jalan-saluran-spesifikasi-smkk`**, **`/jalan-saluran-spesifikasi-smkk-review`**, plus **`/jalan-saluran-smkk`**, **`/jalan-saluran-ruang-lingkup`**, **`/hspks`**, **`/smkk-global`**, **`/ppn-global`** (same controllers as Jalan; see [module-catalog.md](./module-catalog.md)).

Postman: [`Usulan_Saluran_Module_API.postman_collection.json`](../postman/Usulan_Saluran_Module_API.postman_collection.json).

## Flows

1. OPD creates **usulan saluran** and stores **informasi**.
2. **Saluran spesifikasi desain** and **SMKK** rows are managed via nested services (no separate top-level module in `AppModule`).
3. Verifikators use verify/reject endpoints mirroring the jalan usulan pattern.

## Shared logic (with Jalan)

- **Modules**: `UsulanSaluranModule` imports `SaluranSpesifikasiDesainModule`, `SaluranSpesifikasiDesainReviewModule`, `SaluranSpesifikasiSmkkModule`, `SaluranSpesifikasiSmkkReviewModule`, plus `JalanSaluranSmkkModule`, `JalanSaluranSpesifikasiSmkkModule`, `JalanSaluranSpesifikasiSmkkReviewModule`, `PpnGlobalModule`, `SmkkGlobalModule` ([`usulan_saluran.module.ts`](../src/presentation/usulan_saluran/usulan_saluran.module.ts)).
- **Use cases**: e.g. `CalculateBiayaSmkkUseCase`, `GenerateUraianUsulanSaluranUseCase`, `GenerateSpesifikasiUsulanSaluranUseCase` in [`application/usulan_saluran/`](../src/application/usulan_saluran/) — compare with Jalan’s [`application/usulan_jalan/`](../src/application/usulan_jalan/).
- Conceptual split: **Jalan** = road `UsulanJalan` + jalan design specs; **Saluran** = `UsulanSaluran` + saluran-specific specs; **Shared** = SMKK/HSPK/PPN globals and `JalanSaluran*` aggregates. HSPK rows include **tahun anggaran**; spesifikasi desain still points to `id_hspk`, while the `/hspks` API filters and uniqueness use `tahun_anggaran` together with `no_mata_pembayaran`.

## Dependencies

Same cross-cutting modules as Jalan (`Verifikator`, `MainDashboard`, globals). `JenisUsulan` and `AsbJenis` tie proposal types to workflows where configured.

## Related code paths

- [`src/presentation/usulan_saluran/`](../src/presentation/usulan_saluran/)
- [`src/application/usulan_saluran/`](../src/application/usulan_saluran/)
- [`src/domain/usulan_saluran/`](../src/domain/usulan_saluran/)
