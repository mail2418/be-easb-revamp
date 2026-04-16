# Jalan module

## Overview

**Jalan** covers **road** proposals (`UsulanJalan`): indexing, information, specifications (including **jalan** design specs), verification stages, and integration with shared **SMKK** / **HSPK** / **PPN** data. It is a separate product module from **Saluran** (drainage), even though both reuse SMKK tables, calculators, and similar Nest wiring.

## Architecture

| Layer | Location |
|-------|----------|
| Presentation | [`usulan_jalan`](../src/presentation/usulan_jalan/), [`jalan_spesifikasi_desain*`](../src/presentation/jalan_spesifikasi_desain/), [`jalan_kebijakan`](../src/presentation/jalan_kebijakan/), [`jalan_jenis_*`](../src/presentation/), [`usulan_jalan_status`](../src/presentation/usulan_jalan_status/) |
| Application | [`src/application/usulan_jalan/`](../src/application/usulan_jalan/), `jalan_spesifikasi_desain*`, etc. |
| Domain | [`src/domain/usulan_jalan/`](../src/domain/usulan_jalan/), `jalan_spesifikasi_desain`, … |
| Infrastructure | Matching `src/infrastructure/` packages |

Nested modules (no direct `AppModule` entry) include `JalanSpesifikasiDesainModule` and `JalanSpesifikasiDesainReviewModule`; see [module-catalog.md](./module-catalog.md).

## Key entities

| Entity | Responsibility |
|--------|----------------|
| `UsulanJalan` | Main road proposal: OPD, location, status, verifikators, totals |
| `JalanSpesifikasiDesain` | Design specification lines (volume, HSPK, etc.) |
| `JalanSaluranSpesifikasiSmkk` | SMKK breakdown rows (entity name is shared with saluran flows) |
| `JalanKebijakan` | Policy master for jalan |
| `JalanJenisPerkerasan`, `JalanJenisPemeliharaan` | Road engineering reference data |

## HTTP surface

- **`/usulan-jalan`** — CRUD, verification, analytics ([`usulan_jalan.controller.ts`](../src/presentation/usulan_jalan/usulan_jalan.controller.ts)); guards: JWT + roles.
- **`/jalan-spesifikasi-desain`**, **`/jalan-spesifikasi-desain-review`**
- **`/jalan-kebijakan`**, **`/jalan-jenis-perkerasan`**, **`/jalan-jenis-pemeliharaan`**, **`/usulan-jalan-status`**
- Shared SMKK HTTP: **`/jalan-saluran-smkk`**, **`/jalan-saluran-ruang-lingkup`**, **`/jalan-saluran-spesifikasi-smkk`**, **`/jalan-saluran-spesifikasi-smkk-review`**, **`/hspks`**, **`/smkk-global`**, **`/ppn-global`** (see catalog; also used by Saluran).

Postman: [`Usulan_Jalan_Module_API.postman_collection.json`](../postman/Usulan_Jalan_Module_API.postman_collection.json), [`Jalan_Spesifikasi_Desain_Module_API.postman_collection.json`](../postman/Jalan_Spesifikasi_Desain_Module_API.postman_collection.json), etc.

## Flows

1. Create/update **usulan** index and information via `/usulan-jalan` routes.
2. Attach **spesifikasi desain** (jalan) and SMKK lines; verifikators progress through dedicated verify endpoints.
3. Shared SMKK calculation paths align totals with drainage where the same infrastructure entities apply.

## Shared logic (with Saluran)

- **Nest composition**: `UsulanJalanModule` imports `JalanSaluranSmkkModule`, `JalanSaluranSpesifikasiSmkkModule`, `JalanSaluranSpesifikasiSmkkReviewModule`, `PpnGlobalModule`, `SmkkGlobalModule`, `HspkModule` (see [`usulan_jalan.module.ts`](../src/presentation/usulan_jalan/usulan_jalan.module.ts)). Design specs reference HSPK by primary key `id`; the HSPK master itself is versioned by **tahun anggaran** so the same payment code can exist for different budget years.
- **Use cases**: e.g. `CalculateBiayaSmkkUseCase` under [`application/usulan_jalan/use_cases/`](../src/application/usulan_jalan/use_cases/) may align with Saluran’s cost pipeline — compare with [`application/usulan_saluran/`](../src/application/usulan_saluran/).
- **Entities**: `JalanSaluranSpesifikasiSmkk*` ORM tables back both workflows; see [modules-saluran.md](./modules-saluran.md) for the drainage-specific side.

## Dependencies

`VerifikatorModule`, `MainDashboardModule`, shared globals (`PpnGlobal`, `SmkkGlobal`, `Hspk`), and cross-cutting geography masters.

## Related code paths

- [`src/presentation/usulan_jalan/`](../src/presentation/usulan_jalan/)
- [`src/application/usulan_jalan/`](../src/application/usulan_jalan/)
- [`src/domain/usulan_jalan/`](../src/domain/usulan_jalan/)
