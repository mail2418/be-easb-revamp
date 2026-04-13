# ASB module (building / gedung)

## Overview

**ASB (Analisis Standar Biaya)** for **building construction** covers creating and verifying cost analyses: floors, standard and non-standard components (BPS / BPNS), budget accounts, documents, and verifikator review. This is distinct from **Jalan** and **Saluran** proposals (road and drainage), which live under separate usulan flows.

## Architecture

| Layer | Location |
|-------|----------|
| Presentation | `src/presentation/asb/`, `asb_*` feature folders (e.g. `asb_document`, `asb_detail`, `asb_bipek_*`, reviews) |
| Application | [`src/application/asb*`](../src/application/), `asb_detail`, `asb_bipek_*`, `asb_document`, etc. |
| Domain | [`src/domain/asb`](../src/domain/asb/), `asb_detail`, `asb_bipek_*`, `shst`, `asb_komponen_*`, … |
| Infrastructure | [`src/infrastructure/`](../src/infrastructure/) matching domain names |

## Key entities

| Entity / aggregate | Responsibility |
|--------------------|----------------|
| `Asb` | Header: year, name, location, type, status workflow |
| `AsbDetail` | Per-floor detail |
| `AsbBipekStandard` / `AsbBipekNonStd` | BPS / BPNS cost lines tied to SHST |
| `AsbDocument` | Uploaded/generated files |
| Master data (`AsbLantai`, `AsbTipeBangunan`, `Shst`, …) | Reference data for forms and calculations |

## HTTP surface

Primary aggregate controller: **`/asb`** ([`asb.controller.ts`](../src/presentation/asb/asb.controller.ts)). Supporting resources use path prefixes such as `asb-lantai`, `asb-bipek-standard`, `shst`, `asb-document`, etc. See [module-catalog.md](./module-catalog.md) for the full list.

Postman: [`postman/ASB_Module_Postman_Collection.json`](../postman/ASB_Module_Postman_Collection.json), plus feature-specific collections (SHST, documents, reviews).

## Flows

End-to-end status progression and endpoints are documented in the root [README.md](../README.md) section **ASB Workflow** (create index → floors → BPS → BPNS → rekening → submit → verify → approve/reject). Prefer linking to that section for step-by-step API narration to avoid duplication.

## Dependencies

- **Platform**: `Auth`, `User`, `Opd`, `Verifikator`, geography (`Province`, `KabKota`, …)
- **Shared master**: `Rekening`, `JenisStandar`, `StandardKlasifikasi` where applicable

## Related code paths

- [`src/presentation/asb/`](../src/presentation/asb/)
- [`src/application/asb/`](../src/application/asb/)
- [`src/domain/asb/`](../src/domain/asb/)
