# 📋 MySQL Migration Checklist

## Project: EASB Revamp - Dual Database Support (PostgreSQL & MySQL)

**Created:** 2026-02-01  
**Status:** 🔄 In Progress  
**Estimated Duration:** 10-14 hari kerja

---

## 📊 Progress Overview

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Environment & Configuration | ✅ Completed | 100% |
| Phase 2: Data Source Setup | ✅ Completed | 100% |
| Phase 3: Update ORM Entities | ✅ Completed | 100% |
| Phase 4: Create MySQL Migrations | ✅ Completed | 100% |
| Phase 5: Update App Module | ✅ Completed | 100% |
| Phase 6: Seed Data Migrations | ✅ Completed | 100% |
| Phase 7: Testing & Validation | ⏳ Pending | 0% |
| Phase 8: Documentation & Scripts | 🔄 In Progress | 50% |

**Legend:** ✅ Completed | 🔄 In Progress | ⏳ Pending | ❌ Blocked

---

## Phase 1: Environment & Configuration

### 1.1 Environment Variables
- [x] Add `DB_TYPE` to `src/config/validation.ts`
- [x] Add `DB_TYPE` to `src/config/configuration.ts`
- [x] Add `DB_URL_POSTGRES` and `DB_URL_MYSQL` to validation.ts
- [x] Create/update `.env` file with `DB_TYPE=postgres` (default)
- [x] Test with `DB_TYPE=mysql` ✅ Connection successful!

### 1.2 Folder Structure Setup
- [x] Create `src/migrations/postgres/` folder
- [x] Create `src/migrations/mysql/` folder
- [x] Move existing migrations to `src/migrations/postgres/` (122 files)
- [x] Update migration paths in data source files

---

## Phase 2: Data Source Setup

### 2.1 PostgreSQL Data Source
- [x] Create `src/data_source.postgres.ts`
- [x] Update migration path to `src/migrations/postgres/*`
- [ ] Test PostgreSQL connection with new setup

### 2.2 MySQL Data Source
- [x] Create `src/data_source.mysql.ts`
- [x] Configure MySQL-specific settings:
  - [x] `type: 'mysql'`
  - [x] `timezone: '+07:00'` (Asia/Jakarta)
  - [x] `charset: 'utf8mb4'`
- [x] Set migration path to `src/migrations/mysql/*`
- [x] Test MySQL connection ✅

### 2.3 Dynamic Data Source
- [x] Update `src/data_source.ts` to read `DB_TYPE` and use appropriate config
- [x] Support `DB_URL_POSTGRES` and `DB_URL_MYSQL` environment variables

---

## Phase 3: Update ORM Entities ✅ COMPLETED

### 3.1 Type Mappings Updated

| Entity File | Changes Made | Status |
|-------------|--------------|--------|
| `user.orm_entity.ts` | `TEXT[]` → `simple-json` for roles | ✅ |
| `asb.orm_entity.ts` | `timestamptz` → `timestamp` | ✅ |
| `usulan_jalan.orm_entity.ts` | `timestamptz` → `timestamp`, `double precision` → `float` | ✅ |
| All entities with timestamps | `timestamptz` → `timestamp` | ✅ |
| All entities with float/double | `double precision` → `float` (cross-db compatible) | ✅ |

**Note:** Changed `double precision` to `float` instead of `double` because `double` is not supported by PostgreSQL's TypeORM driver while `float` works for both databases.

### 3.2 Entity Updates Checklist (All Completed ✅)

**Core Entities:**
- [x] `src/infrastructure/user/orm/user.orm_entity.ts`
  - [x] Change `roles: TEXT[]` to `type: 'simple-json'`
  - [x] `timestamptz` → `timestamp`
- [x] `src/infrastructure/asb/orm/asb.orm_entity.ts`
- [x] `src/infrastructure/usulan_jalan/orm/usulan_jalan.orm_entity.ts`
- [x] `src/infrastructure/opd/orm/opd.orm_entity.ts`

**Reference/Master Entities:**
- [x] `src/infrastructure/provinces/orm/province.orm_entity.ts`
- [x] `src/infrastructure/kabkota/orm/kabkota.orm_entity.ts`
- [x] `src/infrastructure/kecamatan/orm/kecamatan.orm_entity.ts`
- [x] `src/infrastructure/kelurahan/orm/kelurahan.orm_entity.ts`
- [x] `src/infrastructure/satuan/orm/satuan.orm_entity.ts`
- [x] `src/infrastructure/rekening/orm/rekening.orm_entity.ts`

**ASB Related Entities:**
- [x] `src/infrastructure/asb_jenis/orm/asb_jenis.orm_entity.ts`
- [x] `src/infrastructure/asb_status/orm/asb_status.orm_entity.ts`
- [x] `src/infrastructure/asb_klasifikasi/orm/asb_klasifikasi.orm_entity.ts` (no changes needed)
- [x] `src/infrastructure/asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity.ts`
- [x] `src/infrastructure/asb_lantai/orm/asb_lantai.orm_entity.ts`
- [x] `src/infrastructure/asb_fungsi_ruang/orm/asb_fungsi_ruang.orm_entity.ts`
- [x] `src/infrastructure/asb_detail/orm/asb_detail.orm_entity.ts`
- [x] `src/infrastructure/asb_detail_review/orm/asb_detail_review.orm_entity.ts`
- [x] `src/infrastructure/asb_bipek_standard/orm/asb_bipek_standard.orm_entity.ts`
- [x] `src/infrastructure/asb_bipek_standard_review/orm/asb_bipek_standard_review.orm_entity.ts`
- [x] `src/infrastructure/asb_bipek_non_std/orm/asb_bipek_non_std.orm_entity.ts`
- [x] `src/infrastructure/asb_bipek_non_std_review/orm/asb_bipek_non_std_review.orm_entity.ts`
- [x] `src/infrastructure/asb_bps_gallery_std/orm/asb_bps_gallery_std.orm_entity.ts`
- [x] `src/infrastructure/asb_bps_gallery_nonstd/orm/asb_bps_gallery_nonstd.orm_entity.ts`
- [x] `src/infrastructure/asb_jakon/orm/asb_jakon.orm_entity.ts`
- [x] `src/infrastructure/asb_komponen_bangunan_std/orm/asb_komponen_bangunan_std.orm_entity.ts`
- [x] `src/infrastructure/asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity.ts`
- [x] `src/infrastructure/asb_komponen_bangunan_pros_std/orm/asb_komponen_bangunan_pros_std.orm_entity.ts`
- [x] `src/infrastructure/asb_komponen_bangunan_pros_nonstd/orm/asb_komponen_bangunan_pros_nonstd.orm_entity.ts`
- [x] `src/infrastructure/asb_document/orm/asb_document.orm_entity.ts`
- [x] `src/infrastructure/asb_log/orm/asb_log.orm_entity.ts`

**Jalan/Saluran Related Entities:**
- [x] `src/infrastructure/usulan_jalan_status/orm/usulan_jalan_status.orm_entity.ts`
- [x] `src/infrastructure/jalan_jenis_perkerasan/orm/jalan_jenis_perkerasan.orm_entity.ts`
- [x] `src/infrastructure/jalan_jenis_pemeliharaan/orm/jalan_jenis_pemeliharaan.orm_entity.ts`
- [x] `src/infrastructure/jalan_kebijakan/orm/jalan_kebijakan.orm_entity.ts`
- [x] `src/infrastructure/jalan_spesifikasi_desain/orm/jalan_spesifikasi_desain.orm_entity.ts`
- [x] `src/infrastructure/jalan_spesifikasi_desain_review/orm/jalan_spesifikasi_desain_review.orm_entity.ts`
- [x] `src/infrastructure/jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity.ts`
- [x] `src/infrastructure/jalan_saluran_smkk/orm/jalan_saluran_smkk.orm_entity.ts`
- [x] `src/infrastructure/jalan_saluran_spesifikasi_smkk/orm/jalan_saluran_spesifikasi_smkk.orm_entity.ts`
- [x] `src/infrastructure/jalan_saluran_spesifikasi_smkk_review/orm/jalan_saluran_spesifikasi_smkk_review.orm_entity.ts`

**Other Entities:**
- [x] `src/infrastructure/verifikator/orm/verifikator.orm_entity.ts`
- [x] `src/infrastructure/shst/orm/shst.orm_entity.ts`
- [x] `src/infrastructure/standard_klasifikasi/orm/standard_klasifikasi.orm_entity.ts`
- [x] `src/infrastructure/jenis_standar/orm/jenis_standar.orm_entity.ts`
- [x] `src/infrastructure/jenis_usulan/orm/jenis_usulan.orm_entity.ts`
- [x] `src/infrastructure/hspk/orm/hspk.orm_entity.ts`
- [x] `src/infrastructure/ppn_global/orm/ppn_global.orm_entity.ts`
- [x] `src/infrastructure/smkk_global/orm/smkk_global.orm_entity.ts`

---

## Phase 4: Create MySQL Migrations ✅ COMPLETED

### 4.1 Schema Migrations (Table Creation)

**Migration File:** `src/migrations/mysql/1770030855631-InitialSchema.ts`

TypeORM auto-generated a single migration that creates all 49 tables with proper MySQL syntax:
- ✅ `INT AUTO_INCREMENT` for primary keys
- ✅ `timestamp(6)` with `ON UPDATE CURRENT_TIMESTAMP(6)`
- ✅ Backticks for identifiers
- ✅ `ENGINE = InnoDB`
- ✅ Foreign key constraints
- ✅ 50 tables total (49 app tables + 1 typeorm_migrations)

**All Tables Created in Single Migration:** ✅

| Category | Tables | Status |
|----------|--------|--------|
| Core | users, opds, asb, usulan_jalan | ✅ |
| Master/Reference | provinces, kabkotas, kecamatans, kelurahans, satuans, rekenings, jenis_standars | ✅ |
| ASB Related | asb_jenis, asb_status, asb_klasifikasi, asb_tipe_bangunan, asb_lantais, asb_fungsi_ruangs, asb_details, asb_detail_reviews, asb_bipek_standards, asb_bipek_standard_reviews, asb_bipek_non_stds, asb_bipek_non_std_reviews, asb_bps_gallery_std, asb_bps_gallery_nonstd, asb_jakon, asb_komponen_bangunan_stds, asb_komponen_bangunan_nonstd, asb_komponen_bangunan_pros_std, asb_komponen_bangunan_pros_nonstd, asb_document, asb_log | ✅ |
| Jalan/Saluran | usulan_jalan_status, jalan_jenis_perkerasan, jalan_jenis_pemeliharaan, jalan_kebijakan, jalan_spesifikasi_desain, jalan_spesifikasi_desain_review, jalan_saluran_ruang_lingkup, jalan_saluran_smkk, jalan_saluran_spesifikasi_smkk, jalan_saluran_spesifikasi_smkk_review | ✅ |
| Other | verifikators, shst, standard_klasifikasi, jenis_usulan, hspk, ppn_global, smkk_global | ✅ |

### 4.2 MySQL-Specific Considerations ✅ All Handled by TypeORM
- [x] Replace `SERIAL` with `INT AUTO_INCREMENT`
- [x] Replace `TIMESTAMPTZ` with `TIMESTAMP`
- [x] Replace `DOUBLE PRECISION` with `FLOAT`
- [x] Replace `now()` with `CURRENT_TIMESTAMP`
- [x] Replace PostgreSQL triggers with MySQL `ON UPDATE CURRENT_TIMESTAMP`
- [x] Use backticks (`) instead of double quotes (") for identifiers
- [x] Add `ENGINE=InnoDB`

### 4.3 Entity Fix Applied
- [x] `asb_log.id_user` changed to `nullable: true` for `onDelete: SET NULL` compatibility

---

## Phase 5: Update App Module ✅ COMPLETED

### 5.1 TypeORM Configuration
- [x] Update `src/app.module.ts` to use dynamic database type
- [x] Handle PostgreSQL-specific config (timezone options, SSL)
- [x] Handle MySQL-specific config (charset: utf8mb4, timezone: +07:00)
- [x] Update migration paths based on DB_TYPE

### 5.2 Implementation Summary

```typescript
// app.module.ts - Dynamic DB selection based on DB_TYPE
TypeOrmModule.forRootAsync({
    useFactory: (config: ConfigService): DataSourceOptions => {
        const dbType = config.get<'postgres' | 'mysql'>('db.type') || 'postgres';
        
        if (dbType === 'mysql') {
            // MySQL config with timezone, charset
        } else {
            // PostgreSQL config with SSL, timezone
        }
    }
})
```

- [x] Implemented dynamic TypeORM configuration
- [x] Build passes (`npm run build`)
- [x] Test with MySQL ✅ App started successfully

---

## Phase 6: Seed Data Migrations ✅ COMPLETED

### 6.1 MySQL Seed Migrations (39 seeds total)

All seed migrations are stored in `src/migrations/mysql/` with `.seed.ts` extension.

**User & Auth Seeds:**
- [x] `SeedUsers` - Updated for JSON roles
- [x] `SeedOpdUsersAndOpds`
- [x] `SeedVerifikators`

**Master Data Seeds:**
- [x] `SeedProvinces`
- [x] `SeedKabKotas`
- [x] `SeedKecamatansTulungagung`
- [x] `SeedKelurahansTulungagung`
- [x] `SeedSatuans`
- [x] `SeedRekenings`
- [x] `SeedRekeningsJalan`
- [x] `SeedJenisStandars`

**ASB Seeds:**
- [x] `SeedAsbJenis`
- [x] `SeedAsbStatus`
- [x] `SeedAsbTipeBangunan`
- [x] `SeedAsbLantai`
- [x] `SeedAsbFungsiRuang`
- [x] `SeedAsbKlasifikasis`
- [x] `SeedAsbKomponenBangunanStd`
- [x] `SeedAsbKomponenBangunanNonstd`
- [x] `SeedAsbKomponenBangunanProsStd`
- [x] `SeedAsbKomponenBangunanProsNonstd`
- [x] `SeedAsbJakon`
- [x] `SeedShst`

**Jalan/Saluran Seeds:**
- [x] `SeedUsulanJalanStatus`
- [x] `SeedJalanJenisPerkerasan`
- [x] `SeedJalanJenisPemeliharaan`
- [x] `SeedJenisUsulan`
- [x] `SeedPpnGlobal`
- [x] `SeedJalanSmkk`
- [x] `SeedJalanKebijakan`
- [x] `SeedJalanSaluranRuangLingkup`
- [x] `SeedJalanSaluranSmkk`
- [x] `SeedJalanMutuBeton`
- [x] `SeedJalanRuangLingkupPerkerasanKaku`
- [x] `SeedJalanRuangLingkupPerkerasanLentur`
- [x] `SeedJalanSpesifikasiDesainKaku`
- [x] `SeedJalanSpesifikasiDesainLentur`
- [x] `SeedHspk`
- [x] `UpdateHspkHargaSatuanNullToZero`

**Not Needed in MySQL:**
- ~~`UpdateSeedJalanSmkkToSmkkGlobal`~~ - Table already named `smkk_global` directly

### 6.2 MySQL Seed Syntax Changes
- [x] Replace `ON CONFLICT DO NOTHING` with `INSERT IGNORE`
- [x] Replace `ON CONFLICT DO UPDATE` with `ON DUPLICATE KEY UPDATE`
- [x] Convert `$1, $2` placeholders to `?`
- [x] Convert `ARRAY['role']` to JSON string `'["role"]'`
- [x] Convert double quotes to backticks for identifiers

### 6.3 Seed File Summary
- **PostgreSQL seeds:** 40 files
- **MySQL seeds:** 39 files (1 not needed: UpdateSeedJalanSmkkToSmkkGlobal)
- **Location:** All seeds in `src/migrations/mysql/` (not in separate folder)

---

## Phase 7: Testing & Validation

### 7.1 PostgreSQL Testing (Regression)
- [ ] Run all existing migrations
- [ ] Verify all tables created correctly
- [ ] Test CRUD operations
- [ ] Test API endpoints
- [ ] Verify seed data

### 7.2 MySQL Testing
- [ ] Install MySQL driver (`mysql2`)
- [ ] Create test MySQL database
- [ ] Run MySQL migrations
- [ ] Verify all tables created correctly
- [ ] Test CRUD operations
- [ ] Test API endpoints
- [ ] Verify seed data

### 7.3 Cross-Database Testing
- [ ] Compare schema between PostgreSQL and MySQL
- [ ] Verify data types are equivalent
- [ ] Test application with both databases
- [ ] Performance comparison (optional)

---

## Phase 8: Documentation & Scripts

### 8.1 Package.json Scripts
- [ ] Add `typeorm:postgres` script
- [ ] Add `typeorm:mysql` script
- [ ] Add `migration:run:postgres` script
- [ ] Add `migration:run:mysql` script
- [ ] Add `migration:revert:postgres` script
- [ ] Add `migration:revert:mysql` script
- [ ] Add `migration:generate:postgres` script
- [ ] Add `migration:generate:mysql` script

### 8.2 Documentation
- [ ] Update README.md with dual database setup instructions
- [ ] Document environment variables
- [ ] Document migration commands
- [ ] Create troubleshooting guide

---

## 📝 Notes & Issues Log

### Known Issues
| Issue | Status | Resolution |
|-------|--------|------------|
| PostgreSQL analytics indexes not in MySQL | Optional | Can add via separate migration if needed |

### Missing MySQL Indexes (Optional for Performance)
The following indexes exist in PostgreSQL but not in MySQL InitialSchema (because they were added manually, not via TypeORM entities):
- `idx_asb_created_at` - Index for analytics on asb.created_at
- `idx_asb_tahun_anggaran` - Index for analytics on asb.tahun_anggaran
- `idx_asb_opd_created_at` - Composite index on asb (id_opd, created_at)
- `idx_asb_status_tahun` - Composite index on asb (id_asb_status, tahun_anggaran)
- `idx_asb_opd_tahun` - Composite index on asb (id_opd, tahun_anggaran)
- `idx_usulan_jalan_*` - Various indexes for usulan_jalan analytics

These can be added via a separate MySQL migration if needed for performance optimization.

### Decisions Made
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-01 | Use separate migration folders | PostgreSQL and MySQL syntax too different to maintain in single file |
| 2026-02-01 | Default to PostgreSQL | Backward compatibility with existing deployments |

### Dependencies to Install
```bash
# For MySQL support
npm install mysql2
```

---

## 📅 Timeline Estimate

| Phase | Estimated Duration | Actual Duration | Notes |
|-------|-------------------|-----------------|-------|
| Phase 1 | 1-2 days | - | Config setup |
| Phase 2 | 1 day | - | Data sources |
| Phase 3 | 2-3 days | - | Entity updates |
| Phase 4 | 3-5 days | - | MySQL migrations |
| Phase 5 | 1 day | - | App module |
| Phase 6 | 2-3 days | - | Seed migrations |
| Phase 7 | 2 days | - | Testing |
| Phase 8 | 1 day | - | Documentation |
| **Total** | **13-18 days** | - | - |

---

## 🔗 Quick Reference

### Type Conversion Table
| PostgreSQL | MySQL | TypeORM (Cross-DB) |
|------------|-------|-------------------|
| `SERIAL` | `INT AUTO_INCREMENT` | `@PrimaryGeneratedColumn()` |
| `TIMESTAMPTZ` | `TIMESTAMP` | `type: 'timestamp'` |
| `DOUBLE PRECISION` | `FLOAT/DOUBLE` | `type: 'float'` ⚠️ |
| `TEXT[]` | `JSON` | `type: 'simple-json'` |
| `TEXT` | `TEXT` / `LONGTEXT` | `type: 'text'` |
| `BOOLEAN` | `TINYINT(1)` | `type: 'boolean'` |

⚠️ **Note:** `type: 'double'` is not supported by PostgreSQL in TypeORM. Use `type: 'float'` for cross-database compatibility (maps to `real` in PostgreSQL and `float` in MySQL).

### Connection URL Formats
```
PostgreSQL: postgresql://user:password@host:port/database
MySQL:      mysql://user:password@host:port/database
```

---

**Last Updated:** 2026-02-02
