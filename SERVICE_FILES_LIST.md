# Daftar Lengkap Service Implementation Files - Fase 2

Total: 50 files

## Status Perbaikan Fase 2 (Hapus try-catch yang hanya re-throw di Service Layer)

### Perlu Diperbaiki:

#### ASB Related Services (22 files):
1. ✅ `src/application/asb/asb.service.impl.ts` (5 try-catch yang hanya re-throw) - SELESAI
2. ✅ `src/application/asb_jenis/asb_jenis.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
3. ✅ `src/application/asb_status/asb_status.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
4. ✅ `src/application/asb_tipe_bangunan/asb_tipe_bangunan.service.impl.ts` (5 try-catch yang hanya re-throw) - SELESAI
5. ✅ `src/application/asb_klasifikasi/asb_klasifikasi.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
6. ✅ `src/application/asb_fungsi_ruang/asb_fungsi_ruang.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
7. ✅ `src/application/asb_lantai/asb_lantai.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
8. ✅ `src/application/asb_detail/asb_detail.service.impl.ts` (10 try-catch yang hanya re-throw) - SELESAI
9. ✅ `src/application/asb_detail_review/asb_detail_review.service.impl.ts` (8 try-catch yang hanya re-throw) - SELESAI
10. ✅ `src/application/asb_jakon/asb_jakon.service.impl.ts` (13 try-catch yang hanya re-throw) - SELESAI
11. ✅ `src/application/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
12. ✅ `src/application/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
13. ✅ `src/application/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
14. ✅ `src/application/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
15. ✅ `src/application/asb_bipek_standard/asb_bipek_standard.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
16. ✅ `src/application/asb_bipek_non_std/asb_bipek_non_std.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
17. ✅ `src/application/asb_bipek_standard_review/asb_bipek_standard_review.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
18. ✅ `src/application/asb_bipek_non_std_review/asb_bipek_non_std_review.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
19. ✅ `src/application/asb_bps_gallery_std/asb_bps_gallery_std.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
20. ✅ `src/application/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
21. ✅ `src/application/asb_document/asb_document.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
22. ✅ `src/application/asb_log/asb_log.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI

#### Jalan Related Services (11 files):
23. ✅ `src/application/usulan_jalan/usulan_jalan.service.impl.ts` (15 try-catch yang hanya re-throw) - SELESAI
24. ✅ `src/application/usulan_jalan_status/usulan_jalan_status.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
25. ✅ `src/application/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
26. ✅ `src/application/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
27. ✅ `src/application/jalan_kebijakan/jalan_kebijakan.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
28. ✅ `src/application/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
29. ✅ `src/application/jalan_saluran_smkk/jalan_saluran_smkk.service.impl.ts` (5 try-catch yang hanya re-throw) - SELESAI
30. ✅ `src/application/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.service.impl.ts` (3 try-catch yang hanya re-throw) - SELESAI
31. ✅ `src/application/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.service.impl.ts` (3 try-catch yang hanya re-throw) - SELESAI
32. ✅ `src/application/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
33. ✅ `src/application/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI

#### Master Data Services (12 files):
34. ✅ `src/application/user/user.service.impl.ts` (11 try-catch dipertahankan - transform error ke InternalServerErrorException) - SELESAI
35. ✅ `src/application/provinces/province.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
36. ✅ `src/application/kabkota/kabkota.service.impl.ts` (9 try-catch yang hanya re-throw + 9 console.error dihapus) - SELESAI
37. ✅ `src/application/kecamatan/kecamatan.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
38. ✅ `src/application/kelurahan/kelurahan.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
39. ✅ `src/application/opd/opd.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
40. ✅ `src/application/verifikator/verifikator.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
41. ✅ `src/application/rekening/rekening.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
42. ✅ `src/application/satuan/satuan.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
43. ✅ `src/application/jenis_standar/jenis_standar.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI
44. ✅ `src/application/standard_klasifikasi/standard_klasifikasi.service.impl.ts` (5 try-catch yang hanya re-throw) - SELESAI
45. ✅ `src/application/jenis_usulan/jenis_usulan.service.impl.ts` (6 try-catch yang hanya re-throw) - SELESAI

#### Global/Config Services (4 files):
46. ✅ `src/application/ppn_global/ppn_global.service.impl.ts` (7 try-catch yang hanya re-throw + 2 console.log dihapus) - SELESAI
47. ✅ `src/application/smkk_global/smkk_global.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI
48. ✅ `src/application/shst/shst.service.impl.ts` (9 try-catch yang hanya re-throw) - SELESAI
49. ✅ `src/application/hspk/hspk.service.impl.ts` (7 try-catch yang hanya re-throw) - SELESAI

#### Use Cases (1 file):
50. ✅ `src/application/usulan_jalan/use_cases/calculate_biaya_smkk.use_case.ts` (1 try-catch yang hanya re-throw) - SELESAI

---

## Catatan Penting:

### ✅ PERTAHANKAN Try-Catch yang:
1. **Transform Error** - Mengubah error dari repository ke HttpException
   ```typescript
   catch (error) {
       if (error instanceof HttpException) {
           throw error;
       }
       throw new InternalServerErrorException('Failed to...');
   }
   ```

2. **Handle Error Khusus** - Menangani error dengan logic khusus
   ```typescript
   catch (error) {
       if (error.code === '23505') {  // Unique constraint
           throw new ConflictException('Already exists');
       }
       throw error;
   }
   ```

### ❌ HAPUS Try-Catch yang:
1. **Hanya Re-throw** - Tidak ada transform atau handling
   ```typescript
   catch (error) {
       throw error;  // ← HAPUS
   }
   ```

2. **Hanya Console.log + Re-throw** - Tidak terstruktur
   ```typescript
   catch (error) {
       console.log(error);  // ← HAPUS
       throw error;  // ← HAPUS
   }
   ```

---

## Progress Tracking:

### Sudah Diperbaiki: 50/50 files ✅
### Belum Diperbaiki: 0/50 files

---

## Task Board

### DOING
- (None - All files completed!)

### TODO
- (None - All files completed!)

### DONE
- `src/application/asb/asb.service.impl.ts` (File #1)
- `src/application/asb_jenis/asb_jenis.service.impl.ts` (File #2)
- `src/application/asb_status/asb_status.service.impl.ts` (File #3)
- `src/application/asb_tipe_bangunan/asb_tipe_bangunan.service.impl.ts` (File #4)
- `src/application/asb_klasifikasi/asb_klasifikasi.service.impl.ts` (File #5)
- `src/application/asb_fungsi_ruang/asb_fungsi_ruang.service.impl.ts` (File #6)
- `src/application/asb_lantai/asb_lantai.service.impl.ts` (File #7)
- `src/application/asb_detail/asb_detail.service.impl.ts` (File #8)
- `src/application/asb_detail_review/asb_detail_review.service.impl.ts` (File #9)
- `src/application/asb_jakon/asb_jakon.service.impl.ts` (File #10)
- `src/application/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service.impl.ts` (File #11)
- `src/application/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service.impl.ts` (File #12)
- `src/application/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service.impl.ts` (File #13)
- `src/application/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service.impl.ts` (File #14)
- `src/application/asb_bipek_standard/asb_bipek_standard.service.impl.ts` (File #15)
- `src/application/usulan_jalan/usulan_jalan.service.impl.ts` (File #23)

### BLOCKED
- (None)

---

## Context Memory

### Last Completed File
- `src/application/usulan_jalan/use_cases/calculate_biaya_smkk.use_case.ts` (File #50)

### What Changed
- Removed 1 try-catch block from File #50 (use case)
- All try-catch blocks were simple re-throws, removed from all methods

### Removed try-catch count
- File #50: 1 block (Total: 1 block)

### Kept try-catch count + alasan umum
- 0 (all were simple re-throws)

### Notable edge cases found
- None

### Next File
- **ALL FILES COMPLETED! ✅**

---

## Change Log

### File #1: `src/application/asb/asb.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 5 try-catch blocks that only re-throw errors from methods: `getAsbByMonthYear`, `getAsbByMonthYearStatus`, `getAsbAnalytics`, `reject`, `getRejectInfo`
- **Try-catch removed**: 5
- **Try-catch kept**: 0

### File #8: `src/application/asb_detail/asb_detail.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 10 try-catch blocks that only re-throw errors
- **Try-catch removed**: 10
- **Try-catch kept**: 0

### File #9: `src/application/asb_detail_review/asb_detail_review.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 8 try-catch blocks that only re-throw errors
- **Try-catch removed**: 8
- **Try-catch kept**: 0

### File #10: `src/application/asb_jakon/asb_jakon.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 13 try-catch blocks that only re-throw errors, fixed unclosed `try {` in `createBulk` method
- **Try-catch removed**: 13
- **Try-catch kept**: 0

### File #2: `src/application/asb_jenis/asb_jenis.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods, fixed indentation in `findAll` return statement
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #3: `src/application/asb_status/asb_status.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods, fixed indentation in `findAll` return statement
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #4: `src/application/asb_tipe_bangunan/asb_tipe_bangunan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 5 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 5
- **Try-catch kept**: 0

### File #5: `src/application/asb_klasifikasi/asb_klasifikasi.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #6: `src/application/asb_fungsi_ruang/asb_fungsi_ruang.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #7: `src/application/asb_lantai/asb_lantai.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #11: `src/application/asb_komponen_bangunan_std/asb_komponen_bangunan_std.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #12: `src/application/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #13: `src/application/asb_komponen_bangunan_pros_std/asb_komponen_bangunan_pros_std.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #14: `src/application/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #15: `src/application/asb_bipek_standard/asb_bipek_standard.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #16: `src/application/asb_bipek_non_std/asb_bipek_non_std.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #17: `src/application/asb_bipek_standard_review/asb_bipek_standard_review.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #18: `src/application/asb_bipek_non_std_review/asb_bipek_non_std_review.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #19: `src/application/asb_bps_gallery_std/asb_bps_gallery_std.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods (includes file upload operations)
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #20: `src/application/asb_bps_gallery_nonstd/asb_bps_gallery_nonstd.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods (includes file upload operations)
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #21: `src/application/asb_document/asb_document.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods (includes document generation, zip creation, file operations)
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #22: `src/application/asb_log/asb_log.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #24: `src/application/usulan_jalan_status/usulan_jalan_status.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #25: `src/application/jalan_jenis_perkerasan/jalan_jenis_perkerasan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #26: `src/application/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #27: `src/application/jalan_kebijakan/jalan_kebijakan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #28: `src/application/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #29: `src/application/jalan_saluran_smkk/jalan_saluran_smkk.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 5 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 5
- **Try-catch kept**: 0

### File #30: `src/application/jalan_saluran_spesifikasi_smkk/jalan_saluran_spesifikasi_smkk.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 3 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 3
- **Try-catch kept**: 0

### File #31: `src/application/jalan_saluran_spesifikasi_smkk_review/jalan_saluran_spesifikasi_smkk_review.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 3 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 3
- **Try-catch kept**: 0

### File #32: `src/application/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods (includes volume calculation use case)
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #33: `src/application/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods (includes volume calculation use case)
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #34: `src/application/user/user.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: All 11 try-catch blocks KEPT - they transform non-HttpException errors to InternalServerErrorException
- **Try-catch removed**: 0
- **Try-catch kept**: 11 (all perform error transformation: check `instanceof HttpException`, if not, throw `InternalServerErrorException`)

### File #35: `src/application/provinces/province.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #36: `src/application/kabkota/kabkota.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 9 try-catch blocks that only re-throw errors + removed 9 console.error statements
- **Try-catch removed**: 9
- **Try-catch kept**: 0

### File #37: `src/application/kecamatan/kecamatan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #38: `src/application/kelurahan/kelurahan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #39: `src/application/opd/opd.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #40: `src/application/verifikator/verifikator.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #41: `src/application/rekening/rekening.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #42: `src/application/satuan/satuan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #43: `src/application/jenis_standar/jenis_standar.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #44: `src/application/standard_klasifikasi/standard_klasifikasi.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 5 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 5
- **Try-catch kept**: 0

### File #45: `src/application/jenis_usulan/jenis_usulan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 6 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 6
- **Try-catch kept**: 0

### File #46: `src/application/ppn_global/ppn_global.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors + removed 2 console.log statements from `getLatestPersentasePPn` method
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #47: `src/application/smkk_global/smkk_global.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 7 try-catch blocks that only re-throw errors from all methods
- **Try-catch removed**: 7
- **Try-catch kept**: 0

### File #50: `src/application/usulan_jalan/use_cases/calculate_biaya_smkk.use_case.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 1 try-catch block that only re-throw errors from `execute` method
- **Try-catch removed**: 1
- **Try-catch kept**: 0

### File #23: `src/application/usulan_jalan/usulan_jalan.service.impl.ts`
- **Status**: ✅ DONE
- **Changes**: Removed 15 try-catch blocks that only re-throw errors, fixed indentation issues
- **Try-catch removed**: 15
- **Try-catch kept**: 0

