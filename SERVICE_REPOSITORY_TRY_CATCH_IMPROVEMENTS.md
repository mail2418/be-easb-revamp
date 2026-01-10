# Analisis dan Perbaikan Try-Catch di Service & Repository Layer

## Overview

Dokumen ini menganalisis penggunaan try-catch di service dan repository layer, mengidentifikasi masalah, dan memberikan rekomendasi perbaikan.

---

## Masalah yang Ditemukan

### 1. Repository Layer: Try-Catch yang Tidak Perlu ❌

**Masalah:**
Banyak repository method yang menggunakan try-catch hanya untuk `throw error` tanpa transform atau logging yang berguna.

**Contoh Masalah:**

```typescript
// ❌ BAD - Try-catch tidak perlu
async findById(id: number): Promise<User | null> { 
    try {
        const u = await this.repo.findOne({ where: { id } });
        if (!u) {
            return null;
        }
        return u;
    } catch (error) {
        throw error;  // ← Hanya re-throw, tidak ada transform
    }
}
```

**Kenapa Tidak Perlu:**
- Error akan bubble up ke service layer secara otomatis
- Tidak ada transform atau logging yang berguna
- Menambah boilerplate code yang tidak perlu
- Tidak ada value added

**Solusi:**

```typescript
// ✅ GOOD - Hapus try-catch yang tidak perlu
async findById(id: number): Promise<User | null> { 
    const u = await this.repo.findOne({ where: { id } });
    if (!u) {
        return null;
    }
    return u;
}
```

---

### 2. Repository Layer: Console.log yang Tidak Perlu ❌

**Masalah:**
Ada console.log di dalam repository yang tidak berguna untuk production dan debugging.

**Contoh Masalah:**

```typescript
// ❌ BAD - Console.log tidak perlu
async getLatest(): Promise<PpnGlobal | null> {
    try {
        const entity = await this.repo
            .createQueryBuilder('ppn')
            .where('ppn.deletedAt IS NULL')
            .orderBy('ppn.tahun', 'DESC')
            .addOrderBy('ppn.bulan', 'DESC')
            .getOne();
        console.log('entity', entity);  // ← Tidak perlu
        return entity || null;
    } catch (error) {
        console.error('Error in getLatest:', error);  // ← Gunakan logger
        throw error;
    }
}
```

**Kenapa Tidak Perlu:**
- Console.log tidak terstruktur dan sulit di-filter
- Tidak ada konteks (timestamp, correlationId, dll)
- Console.error tidak konsisten dengan logging system yang ada (Pino)

**Solusi:**

```typescript
// ✅ GOOD - Hapus console.log, gunakan logger jika perlu
async getLatest(): Promise<PpnGlobal | null> {
    const entity = await this.repo
        .createQueryBuilder('ppn')
        .where('ppn.deletedAt IS NULL')
        .orderBy('ppn.tahun', 'DESC')
        .addOrderBy('ppn.bulan', 'DESC')
        .getOne();
    
    return entity || null;
    // Error akan bubble up ke service layer yang akan handle dengan logger
}
```

---

### 3. Service Layer: Try-Catch yang Hanya Re-throw ❌

**Masalah:**
Banyak service method yang menggunakan try-catch hanya untuk `console.log` dan `throw error` kembali.

**Contoh Masalah:**

```typescript
// ❌ BAD - Try-catch hanya untuk logging
async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null> {
    try {
        // ... business logic ...
        return asb;
    } catch (error) {
        console.log(error);  // ← Tidak terstruktur
        throw error;  // ← Hanya re-throw
    }
}
```

**Kenapa Tidak Perlu:**
- Console.log tidak terstruktur
- Error akan bubble up ke controller/HttpExceptionFilter
- Tidak ada transform atau handling khusus
- Logging seharusnya dilakukan di layer yang lebih tinggi (controller/middleware)

**Solusi:**

```typescript
// ✅ GOOD - Hapus try-catch yang tidak perlu
async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null> {
    // Check if user is ADMIN or SUPERADMIN
    const isAdmin = userRoles.includes(Role.ADMIN);
    const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
    const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

    if (isAdmin || isSuperAdmin || isVerifikator) {
        const asb = await this.repository.findById(id);
        if (!asb) {
            throw new NotFoundException(`ASB with id ${id} not found`);
        }
        return asb;
    }

    // For OPD users
    const isOpd = userRoles.includes(Role.OPD);
    if (isOpd) {
        if (!userIdOpd) {
            throw new ForbiddenException('OPD user has no associated OPD');
        }
        const asb = await this.repository.findById(id, userIdOpd);
        if (!asb) {
            throw new NotFoundException(`ASB with id ${id} not found`);
        }
        return asb;
    }

    throw new ForbiddenException('User is not authorized to access this ASB');
    // Error akan bubble up ke controller/HttpExceptionFilter
}
```

---

### 4. Service Layer: Try-Catch yang Berguna ✅

**Contoh yang Benar:**

```typescript
// ✅ GOOD - Transform error dengan benar
async getUserDetail(userDto: GetUserDetailDto): Promise<User> {
    try {
        const user = await this.userRepo.getUserDetail(userDto);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.roles.includes(Role.SUPERADMIN)) {
            throw new ForbiddenException('Access to superadmin user detail is forbidden');
        }

        const { passwordHash: _, ...safe } = user as any;
        return safe as User;
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;  // ← Re-throw HttpException
        }
        // Transform non-HttpException ke HttpException
        throw new InternalServerErrorException('Failed to get user detail');
    }
}
```

**Kenapa Berguna:**
- Transform error dari repository layer ke HttpException
- Memastikan semua error adalah HttpException
- Memberikan error message yang lebih meaningful

---

## Best Practices

### ✅ DO: Repository Layer

**1. Hapus Try-Catch yang Tidak Perlu**

```typescript
// ✅ GOOD
async findById(id: number): Promise<Entity | null> {
    return await this.repo.findOne({ where: { id } });
}
```

**2. Biarkan Error Bubble Up**

```typescript
// ✅ GOOD - Error akan bubble up ke service layer
async create(data: CreateEntityDto): Promise<Entity> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
}
```

**3. Hanya Gunakan Try-Catch untuk Transform Error Khusus**

```typescript
// ✅ GOOD - Transform database error ke domain error
async create(data: CreateEntityDto): Promise<Entity> {
    try {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    } catch (error) {
        // Transform database constraint violation ke domain error
        if (error.code === '23505') {  // Unique constraint violation
            throw new DomainError('Entity already exists');
        }
        throw error;
    }
}
```

### ✅ DO: Service Layer

**1. Throw HttpException untuk Business Logic Errors**

```typescript
// ✅ GOOD
async getById(id: number): Promise<Entity> {
    const entity = await this.repository.findById(id);
    if (!entity) {
        throw new NotFoundException('Entity not found');
    }
    return entity;
}
```

**2. Transform Error dari Repository ke HttpException**

```typescript
// ✅ GOOD
async create(data: CreateEntityDto): Promise<Entity> {
    try {
        return await this.repository.create(data);
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
        }
        // Transform database error ke HttpException
        if (error.code === '23503') {
            throw new BadRequestException('Foreign key constraint violation');
        }
        throw new InternalServerErrorException('Failed to create entity');
    }
}
```

**3. Hapus Try-Catch yang Hanya Re-throw**

```typescript
// ❌ BAD
try {
    // ... logic ...
} catch (error) {
    console.log(error);
    throw error;
}

// ✅ GOOD
// ... logic ...
// Error akan bubble up secara otomatis
```

### ❌ DON'T: Repository Layer

**1. Don't Use Try-Catch untuk Re-throw**

```typescript
// ❌ BAD
try {
    return await this.repo.findOne({ where: { id } });
} catch (error) {
    throw error;  // ← Tidak perlu
}
```

**2. Don't Use Console.log**

```typescript
// ❌ BAD
console.log('entity', entity);
console.error('Error:', error);

// ✅ GOOD - Gunakan logger di service layer atau biarkan error bubble up
```

**3. Don't Handle Business Logic Errors**

```typescript
// ❌ BAD - Business logic di repository
try {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) {
        throw new NotFoundException('Not found');  // ← Seharusnya di service layer
    }
} catch (error) {
    throw error;
}
```

### ❌ DON'T: Service Layer

**1. Don't Use Console.log**

```typescript
// ❌ BAD
catch (error) {
    console.log(error);
    throw error;
}

// ✅ GOOD - Error akan di-log oleh middleware/logger
```

**2. Don't Swallow Errors**

```typescript
// ❌ BAD
catch (error) {
    console.log(error);
    return null;  // ← Error di-swallow
}

// ✅ GOOD
catch (error) {
    if (error instanceof HttpException) {
        throw error;
    }
    throw new InternalServerErrorException('Unexpected error');
}
```

---

## Rekomendasi Refactoring

### 1. Repository Layer: Hapus Try-Catch yang Tidak Perlu

**File yang Perlu Diperbaiki:**
- `src/infrastructure/user/repositories/user.repository.impl.ts`
- `src/infrastructure/provinces/repositories/province.repository.impl.ts`
- `src/infrastructure/asb/repositories/asb.repository.impl.ts`
- Dan repository lainnya yang memiliki pattern serupa

**Contoh Refactoring:**

```typescript
// Before
async findById(id: number): Promise<User | null> { 
    try {
        const u = await this.repo.findOne({ where: { id } });
        if (!u) {
            return null;
        }
        return u;
    } catch (error) {
        throw error;
    }
}

// After
async findById(id: number): Promise<User | null> { 
    return await this.repo.findOne({ where: { id } });
}
```

### 2. Repository Layer: Hapus Console.log

**File yang Perlu Diperbaiki:**
- `src/infrastructure/ppn_global/repositories/ppn_global.repository.impl.ts`
- `src/infrastructure/usulan_jalan/repositories/usulan_jalan.repository.impl.ts`
- `src/infrastructure/asb/repositories/asb.repository.impl.ts`
- Dan repository lainnya yang menggunakan console.log

**Contoh Refactoring:**

```typescript
// Before
async getLatest(): Promise<PpnGlobal | null> {
    try {
        const entity = await this.repo
            .createQueryBuilder('ppn')
            .where('ppn.deletedAt IS NULL')
            .orderBy('ppn.tahun', 'DESC')
            .addOrderBy('ppn.bulan', 'DESC')
            .getOne();
        console.log('entity', entity);
        return entity || null;
    } catch (error) {
        console.error('Error in getLatest:', error);
        throw error;
    }
}

// After
async getLatest(): Promise<PpnGlobal | null> {
    const entity = await this.repo
        .createQueryBuilder('ppn')
        .where('ppn.deletedAt IS NULL')
        .orderBy('ppn.tahun', 'DESC')
        .addOrderBy('ppn.bulan', 'DESC')
        .getOne();
    
    return entity || null;
}
```

### 3. Service Layer: Hapus Try-Catch yang Hanya Re-throw

**File yang Perlu Diperbaiki:**
- `src/application/asb/asb.service.impl.ts` (banyak method)
- Service lainnya yang memiliki pattern serupa

**Contoh Refactoring:**

```typescript
// Before
async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null> {
    try {
        // ... business logic ...
        return asb;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// After
async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null> {
    // ... business logic ...
    return asb;
    // Error akan bubble up ke controller/HttpExceptionFilter
}
```

### 4. Service Layer: Pertahankan Try-Catch yang Transform Error

**File yang Sudah Benar:**
- `src/application/user/user.service.impl.ts` - getUserDetail method

**Pattern yang Benar:**

```typescript
async getUserDetail(userDto: GetUserDetailDto): Promise<User> {
    try {
        const user = await this.userRepo.getUserDetail(userDto);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        // ... business logic ...
        return safe as User;
    } catch (error) {
        if (error instanceof HttpException) {
            throw error;
        }
        // Transform non-HttpException ke HttpException
        throw new InternalServerErrorException('Failed to get user detail');
    }
}
```

---

## Summary

| Layer | Masalah | Solusi | Priority |
|-------|---------|--------|----------|
| Repository | Try-catch yang hanya re-throw | Hapus try-catch yang tidak perlu | High |
| Repository | Console.log di production | Hapus console.log | Medium |
| Service | Try-catch yang hanya re-throw | Hapus try-catch yang tidak perlu | High |
| Service | Console.log di production | Hapus console.log | Medium |
| Service | Transform error dengan benar | Pertahankan try-catch yang transform error | Low |

**Kesimpulan:**
- Repository layer seharusnya **minimal** - hanya operasi database, biarkan error bubble up
- Service layer seharusnya **transform error** dari repository ke HttpException
- Hapus semua console.log dan ganti dengan structured logging di middleware/controller
- Hapus try-catch yang hanya re-throw tanpa transform atau logging yang berguna

