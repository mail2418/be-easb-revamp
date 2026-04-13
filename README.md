# E-ASB (Electronic - Analisis Standar Biaya) Backend API

> **Sistem Manajemen Analisis Standar Biaya Konstruksi Bangunan**

E-ASB adalah aplikasi backend untuk mengelola dan memverifikasi analisis standar biaya (cost analysis) proyek konstruksi bangunan. Sistem ini memfasilitasi proses pengajuan, perhitungan, verifikasi, dan approval biaya proyek konstruksi dengan workflow yang terstruktur.

---

## 📋 Table of Contents

- [Documentation](#-documentation)
- [Business Overview](#-business-overview)
- [Technical Architecture](#-technical-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Database Setup](#-database-setup)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [ASB Workflow](#-asb-workflow)
- [Development Guidelines](#-development-guidelines)
- [Testing](#-testing)
- [Deployment](#-deployment)

---

## 📖 Documentation

The documentation index lives in **[`docs/README.md`](docs/README.md)**. It links to:

- **Getting started** — [`docs/quick-start.md`](docs/quick-start.md)
- **Cross-cutting** — architecture, authentication, HTTP API, database, contributing
- **Business modules** — ASB (gedung), Jalan, Saluran — [`docs/modules-asb.md`](docs/modules-asb.md), [`docs/modules-jalan.md`](docs/modules-jalan.md), [`docs/modules-saluran.md`](docs/modules-saluran.md)
- **Module catalog** — all Nest presentation modules: [`docs/module-catalog.md`](docs/module-catalog.md)

---

## 🏢 Business Overview

### Purpose
E-ASB (Electronic Analisis Standar Biaya) adalah sistem untuk mengelola analisis biaya standar proyek konstruksi bangunan yang melibatkan:

- **OPD (Organisasi Perangkat Daerah)**: Mengajukan dan mengelola proposal ASB
- **Verifikator**: Memverifikasi dan mereview submission dari OPD
- **Admin/Superadmin**: Mengelola master data dan oversee keseluruhan proses

### Business Domain

**Entitas Utama:**
- **ASB (Analisis Standar Biaya)**: Core entity untuk project cost analysis
- **OPD**: Organization/department yang mengajukan project
- **SHST (Standar Harga Satuan Tertinggi)**: Reference pricing standards
- **BPS (Bangunan Pekerjaan Standar)**: Standard building components
- **BPNS (Bangunan Pekerjaan Non-Standar)**: Non-standard building components
- **Rekening**: Budget accounts
- **Komponen Bangunan**: Building components (standard & non-standard)

### Workflow Overview

ASB mengikuti workflow multi-stage dari pengajuan hingga approval:

1. **Submission**: OPD membuat ASB baru dengan data dasar
2. **Floor Details**: Input detail per lantai bangunan
3. **BPS Entry**: Entry komponen bangunan standar
4. **BPNS Entry**: Entry komponen bangunan non-standar
5. **Account Assignment**: Assignment ke rekening anggaran
6. **Verification Submission**: Submit untuk verifikasi
7. **Verification Process**: Verifikator review dan verify
8. **Final Approval/Rejection**: Final decision
9. **Document Generation**: Generate kertas kerja dan dokumen

---

## 🏗 Technical Architecture

### Architecture Pattern: Clean Architecture

Aplikasi ini menggunakan **Clean Architecture** dengan 4 layer terpisah:

```
┌─────────────────────────────────────────────┐
│        Presentation Layer (Controllers)      │  ← HTTP Endpoints
├─────────────────────────────────────────────┤
│        Application Layer (Use Cases)         │  ← Business Logic
├─────────────────────────────────────────────┤
│          Domain Layer (Entities)             │  ← Core Business
├─────────────────────────────────────────────┤
│    Infrastructure Layer (ORM, Database)      │  ← External Services
└─────────────────────────────────────────────┘
```

**Benefits:**
- ✅ Separation of Concerns
- ✅ Testability
- ✅ Technology Independence
- ✅ Maintainability
- ✅ Business Logic Protection

### Layers Description

#### 1. **Domain Layer** (`src/domain`)
- Pure business entities
- Business interfaces (repositories, services)
- No dependencies on external frameworks
- Core business rules

#### 2. **Application Layer** (`src/application`)
- Use case implementations
- Service implementations
- DTOs (Data Transfer Objects)
- Business orchestration logic

#### 3. **Infrastructure Layer** (`src/infrastructure`)
- TypeORM entities (ORM mappings)
- Repository implementations
- Database migrations
- External service integrations

#### 4. **Presentation Layer** (`src/presentation`)
- REST API controllers
- Request/Response handling
- Validation
- HTTP routing

---

## ✨ Features

### Core Features

#### 1. **ASB Management**
- ✅ Create, Read, Update, Delete ASB entries
- ✅ Multi-step submission workflow (8 distinct statuses)
- ✅ Floor-by-floor detail management
- ✅ Standard & non-standard component management
- ✅ Budget account assignment
- ✅ Document upload & management
- ✅ PDF generation (Surat Permohonan, Kertas Kerja)

#### 2. **Verification System**
- ✅ Multi-stage verification workflow
- ✅ Floor verification
- ✅ BPS (standard component) verification
- ✅ BPNS (non-standard component) verification
- ✅ Budget account verification
- ✅ Work specification verification
- ✅ Approval/rejection with reasons

#### 3. **Master Data Management**
- ✅ Building types (Tipe Bangunan)
- ✅ Building classifications (Klasifikasi)
- ✅ Floor types (Lantai)
- ✅ Room functions (Fungsi Ruang)
- ✅ Standard components (Komponen Standar)
- ✅ Non-standard components (Komponen Non-Standar)
- ✅ SHST reference data
- ✅ Regions (Provinces, Cities/Regencies)
- ✅ Organizations (OPD)
- ✅ Budget accounts (Rekening)

#### 4. **Calculation Engine**
- ✅ Automatic SHST lookup
- ✅ Weight (bobot) calculations for BPS
- ✅ Weight calculations for BPNS
- ✅ Total cost calculations
- ✅ Review calculations

#### 5. **Authentication & Authorization**
- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ 5 user roles: SUPERADMIN, ADMIN, VERIFIKATOR, OPD, GUEST
- ✅ Resource-level permissions
- ✅ OPD-scoped data access

#### 6. **Document Management**
- ✅ File upload (multipart/form-data)
- ✅ Document generation with Puppeteer
- ✅ PDF generation for reports
- ✅ Document versioning
- ✅ Spec-based document filtering

#### 7. **Reporting & Analytics**
- ✅ ASB count by month/year
- ✅ ASB status distribution
- ✅ Dashboard metrics
- ✅ PDF report generation

---

## 🛠 Tech Stack

### Core Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | Latest LTS | JavaScript runtime |
| **Framework** | NestJS | ^11.0.1 | Backend framework |
| **Language** | TypeScript | ^5.7.3 | Type-safe development |
| **Database** | PostgreSQL | 13+ | Relational database |
| **ORM** | TypeORM | ^0.3.27 | Database abstraction |

### Key Libraries

| Library | Purpose |
|---------|---------|
| `@nestjs/passport` | Authentication |
| `@nestjs/jwt` | JWT token management |
| `bcryptjs` | Password hashing |
| `class-validator` | DTO validation |
| `class-transformer` | Object transformation |
| `multer` | File uploads |
| `puppeteer` | PDF generation |
| `helmet` | Security headers |
| `cookie-parser` | Cookie handling |
| `joi` | Environment validation |

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Unit & E2E testing
- **TypeScript** - Static typing
- **ts-node** - TypeScript execution

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v13 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

Optional but recommended:
- **Postman** - For API testing
- **pgAdmin** or **DBeaver** - Database management tool

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd be-easb-revamp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_URL=postgres://postgres:your_password@localhost:5432/easb

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRESIN=3600s

# Logging
LOG_LEVEL=info
```

---

## 💾 Database Setup

### 1. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE easb;

# Exit psql
\q
```

### 2. Run Migrations

```bash
# Run all pending migrations
npm run migration:run

# View migration status
npm run migration:show
```

### 3. Seed Initial Data

Migrations include seed data for:
- Default users (superadmin, admin, verifikator, opd, guest)
- Master data (if applicable)

**Default Users:**

| Username | Password | Roles |
|----------|----------|-------|
| `superadmin` | `SuperAdminPass123!` | All roles |
| `admin` | `AdminPass123!` | ADMIN |
| `verifikator` | `UserPass123!` | VERIFIKATOR |
| `opd` | `AuditorPass123!` | OPD |
| `guest` | `GuestPass123!` | GUEST |

⚠️ **IMPORTANT**: Change these passwords in production!

### Migration Commands

```bash
# Generate new migration
npm run migration:generate -- src/migrations/MigrationName

# Create empty migration
npm run migration:create -- src/migrations/MigrationName

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show all migrations and their status
npm run migration:show
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | Server port | `3000` | No |
| `DB_URL` | PostgreSQL connection URL | - | Yes |
| `JWT_SECRET` | Secret key for JWT | - | Yes |
| `JWT_EXPIRESIN` | JWT token expiration | `3600s` | No |
| `LOG_LEVEL` | Logging level | `info` | No |

### CORS Configuration

Edit `src/main.ts` to configure CORS:

```typescript
app.enableCors({
    origin: [
        'http://localhost:3000',
        'https://your-frontend-domain.com'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
});
```

### API Prefix

API endpoints are prefixed based on environment:

- **Development**: `/api/dev/v1`
- **Production**: `/api/v1`

---

## 🏃 Running the Application

### Development Mode

```bash
npm run start:dev
```

Server runs on `http://localhost:3000`

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

Attach debugger on port `9229`

---

## 📚 API Documentation

### Base URL

- **Development**: `http://localhost:3000/api/dev/v1`
- **Production**: `https://your-domain.com/api/v1`

### Authentication

All endpoints (except auth endpoints) require JWT authentication.

**Login:**

```bash
POST /api/dev/v1/auth/login
Content-Type: application/json

{
  "username": "superadmin",
  "password": "SuperAdminPass123!"
}
```

**Response:**

```json
{
  "status": "success",
  "responseCode": 200,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Using Token:**

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Main API Endpoints

#### ASB Management

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/asb` | Get all ASB with pagination | OPD, ADMIN, SUPERADMIN |
| GET | `/asb/id?id={id}` | Get ASB by ID | OPD, ADMIN, SUPERADMIN |
| GET | `/asb/by-month-year` | Get ASB statistics by month/year | OPD, ADMIN, SUPERADMIN |
| GET | `/asb/by-month-year-status` | Get ASB status distribution | All Roles |
| POST | `/asb/store-index` | Create new ASB | OPD, ADMIN, SUPERADMIN |
| PUT | `/asb/store-index` | Update ASB index | OPD, ADMIN, SUPERADMIN |
| DELETE | `/asb` | Delete ASB | OPD, ADMIN, SUPERADMIN |
| PUT | `/asb/store-lantai` | Store floor details | OPD, ADMIN, SUPERADMIN |
| PUT | `/asb/store-bps` | Store BPS data | OPD, ADMIN, SUPERADMIN |
| PUT | `/asb/store-bpns` | Store BPNS data | OPD, ADMIN, SUPERADMIN |
| PUT | `/asb/store-rekening` | Store budget account | OPD, ADMIN, SUPERADMIN |
| PUT | `/asb/store-verif` | Submit for verification | OPD, ADMIN, SUPERADMIN |

#### Verification Endpoints

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| PUT | `/asb/verify-lantai` | Verify floor details | VERIFIKATOR, ADMIN, SUPERADMIN |
| PUT | `/asb/verify-bps` | Verify BPS data | VERIFIKATOR, ADMIN, SUPERADMIN |
| PUT | `/asb/verify-bpns` | Verify BPNS data | VERIFIKATOR, ADMIN, SUPERADMIN |
| PUT | `/asb/verify-rekening` | Verify budget account | VERIFIKATOR, ADMIN, SUPERADMIN |
| PUT | `/asb/verify` | Final approval | VERIFIKATOR, ADMIN, SUPERADMIN |
| PUT | `/asb/reject` | Reject ASB | VERIFIKATOR, ADMIN, SUPERADMIN |

#### Master Data Endpoints

- `/asb-lantai` - Floor types
- `/asb-fungsi-ruang` - Room functions
- `/asb-jenis` - ASB types
- `/asb-klasifikasi` - Classifications
- `/asb-tipe-bangunan` - Building types
- `/asb-komponen-bangunan-std` - Standard components
- `/asb-komponen-bangunan-nonstd` - Non-standard components
- `/shst` - SHST reference data
- `/rekening` - Budget accounts
- `/opd` - Organizations
- `/provinces` - Provinces
- `/kabkota` - Cities/Regencies

### Request Examples

**Create ASB:**

```bash
POST /api/dev/v1/asb/store-index
Authorization: Bearer {token}
Content-Type: application/json

{
  "tahunAnggaran": 2025,
  "namaAsb": "Gedung Kantor Baru",
  "alamat": "Jl. Contoh No. 123",
  "totalLantai": 3,
  "idAsbTipeBangunan": 1,
  "idAsbKlasifikasi": 1,
  "idKabkota": 1,
  "jumlahKontraktor": 2,
  "idAsbJenis": 1
}
```

**Store Floor Details:**

```bash
PUT /api/dev/v1/asb/store-lantai
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_asb": 1,
  "id_asb_detail": [],
  "luas_lantai": [100.5, 95.3, 90.2],
  "id_asb_lantai": [1, 2, 3],
  "id_asb_fungsi_ruang": [1, 2, 3]
}
```

**Store BPS:**

```bash
PUT /api/dev/v1/asb/store-bps
Authorization: Bearer {token}
Content-Type: application/json

{
  "id_asb": 1,
  "komponen_std": [1, 2, 3],
  "bobot_std": [30, 40, 30]
}
```

### Response Format

All responses follow a consistent format:

```json
{
  "status": "success|error",
  "responseCode": 200,
  "message": "Description of the result",
  "data": {
    // Response data
  }
}
```

---

## 📁 Project Structure

```
be-easb-revamp/
├── src/
│   ├── application/          # Application layer (Use Cases)
│   │   ├── asb/
│   │   ├── asb_detail/
│   │   ├── asb_bipek_standard/
│   │   ├── asb_bipek_non_std/
│   │   ├── asb_document/
│   │   └── ... (30+ modules)
│   │
│   ├── domain/               # Domain layer (Business Logic)
│   │   ├── asb/
│   │   │   ├── asb.entity.ts
│   │   │   ├── asb.service.ts
│   │   │   └── asb.repository.ts
│   │   └── ... (30+ domains)
│   │
│   ├── infrastructure/       # Infrastructure layer (Data Access)
│   │   ├── asb/
│   │   │   ├── orm/
│   │   │   │   └── asb.orm_entity.ts
│   │   │   └── repositories/
│   │   │       └── asb.repository.impl.ts
│   │   └── ... (30+ implementations)
│   │
│   ├── presentation/         # Presentation layer (Controllers)
│   │   ├── asb/
│   │   │   ├── asb.controller.ts
│   │   │   ├── asb.module.ts
│   │   │   └── dto/
│   │   ├── auth/
│   │   └── ... (30+ controllers)
│   │
│   ├── common/               # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── middleware/
│   │
│   ├── config/               # Configuration
│   │   ├── configuration.ts
│   │   └── validation.ts
│   │
│   ├── migrations/           # Database migrations
│   │   └── *.ts
│   │
│   ├── app.module.ts         # Root module
│   ├── data_source.ts        # TypeORM data source
│   └── main.ts               # Application entry point
│
├── test/                     # Test files
├── public/                   # Static files (PDFs, uploads)
├── postman/                  # Postman collections
├── docs/                     # Documentation index (see docs/README.md)
├── .env                      # Environment variables
├── .env.example              # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

### Key Directories

- **`application/`**: Business logic implementation, use cases, DTOs
- **`domain/`**: Pure business entities and interfaces
- **`infrastructure/`**: TypeORM entities, repositories, external services
- **`presentation/`**: HTTP controllers, modules, request/response
- **`common/`**: Shared utilities, guards, interceptors, middleware
- **`migrations/`**: Database schema versioning
- **`docs/`**: Markdown guides and module catalog ([`docs/README.md`](docs/README.md))

---

## 👥 User Roles & Permissions

### Role Hierarchy

```
SUPERADMIN (Full Access)
    ↓
ADMIN (Management Access)
    ↓
VERIFIKATOR (Verification Access)
    ↓
OPD (Submission Access)
    ↓
GUEST (Read-Only Access)
```

### Role Details

#### 1. **SUPERADMIN**
- Full system access
- Can perform all operations
- Can manage all data
- Can access all modules
- Can bypass OPD restrictions

#### 2. **ADMIN**
- Administrative access
- Can manage master data
- Can view all ASB submissions
- Can access most modules
- Can bypass OPD restrictions

#### 3. **VERIFIKATOR**
- Verification-focused access
- Can verify ASB submissions
- Can approve/reject ASB
- Can view all ASB
- Read-only access to master data

#### 4. **OPD**
- Organization-scoped access
- Can create ASB for their OPD
- Can only view their own OPD's ASB
- Can submit for verification
- Limited master data access

#### 5. **GUEST**
- Read-only access
- Can view public data
- Cannot create or modify
- Limited endpoints

### Permission Matrix

| Action | SUPERADMIN | ADMIN | VERIFIKATOR | OPD | GUEST |
|--------|-----------|-------|-------------|-----|-------|
| Create ASB | ✅ All | ✅ All | ❌ | ✅ Own OPD | ❌ |
| View ASB | ✅ All | ✅ All | ✅ All | ✅ Own OPD | ✅ Limited |
| Update ASB | ✅ All | ✅ All | ❌ | ✅ Own OPD | ❌ |
| Delete ASB | ✅ All | ✅ All | ❌ | ✅ Own OPD | ❌ |
| Verify ASB | ✅ | ✅ | ✅ | ❌ | ❌ |
| Approve ASB | ✅ | ✅ | ✅ | ❌ | ❌ |
| Reject ASB | ✅ | ✅ | ✅ | ❌ | ❌ |
| Manage Master Data | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## 🔄 ASB Workflow

### Status Flow Diagram

```
┌─────────────────┐
│  1. CREATED     │  OPD creates ASB
└────────┬────────┘
         ↓
┌─────────────────┐
│  2. LANTAI      │  OPD inputs floor details
└────────┬────────┘
         ↓
┌─────────────────┐
│  3. BPS         │  OPD inputs standard components
└────────┬────────┘
         ↓
┌─────────────────┐
│  4. BPNS        │  OPD inputs non-standard components
└────────┬────────┘
         ↓
┌─────────────────┐
│  5. REKENING    │  OPD assigns budget account
└────────┬────────┘
         ↓
┌─────────────────┐
│  6. SUBMITTED   │  OPD submits for verification
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
┌────────┐  ┌────────┐
│ 7. REJECTED │  │ 8. APPROVED │
└────────┘  └────────┘
```

### Status Codes

| Status ID | Status Name | Description | Who Can Set |
|-----------|-------------|-------------|-------------|
| 1 | Created | ASB index created | System (on creation) |
| 2 | Lantai Stored | Floor details stored | System (on lantai store) |
| 3 | BPS Stored | Standard components stored | System (on BPS store) |
| 4 | BPNS Stored | Non-standard components stored | System (on BPNS store) |
| 5 | Rekening Stored | Budget account assigned | System (on rekening store) |
| 6 | Submitted | Submitted for verification | OPD |
| 7 | Rejected | Rejected by verifikator | VERIFIKATOR |
| 8 | Approved | Approved by verifikator | VERIFIKATOR |

### Workflow Steps in Detail

#### Step 1: Create ASB Index (Status 1)
**Endpoint:** `POST /asb/store-index`

OPD creates a new ASB with basic information:
- Year of budget (tahunAnggaran)
- ASB name (namaAsb)
- Address (alamat)
- Total floors (totalLantai)
- Building type (idAsbTipeBangunan)
- Classification (idAsbKlasifikasi)
- Location (idKabkota)
- Number of contractors (jumlahKontraktor)
- ASB type (idAsbJenis)

#### Step 2: Store Floor Details (Status 2)
**Endpoint:** `PUT /asb/store-lantai`

OPD inputs detailed information for each floor:
- Floor area (luas_lantai) - array for each floor
- Floor type (id_asb_lantai) - array for each floor
- Room function (id_asb_fungsi_ruang) - array for each floor

The system automatically creates AsbDetail records for each floor.

#### Step 3: Store BPS (Status 3)
**Endpoint:** `PUT /asb/store-bps`

OPD selects standard building components and their weights:
- Component IDs (komponen_std)
- Component weights (bobot_std)

The system:
1. Looks up SHST (Standard Highest Unit Price)
2. Calculates weighted costs
3. Creates AsbBipekStandard records

#### Step 4: Store BPNS (Status 4)
**Endpoint:** `PUT /asb/store-bpns`

OPD selects non-standard components:
- Component IDs (komponen_nonstd)
- Component weights (bobot_nonstd)

Similar to BPS but for non-standard components.

#### Step 5: Store Rekening (Status 5)
**Endpoint:** `PUT /asb/store-rekening`

OPD assigns the ASB to a budget account (rekening).

#### Step 6: Submit for Verification (Status 6)
**Endpoint:** `PUT /asb/store-verif`

OPD submits the completed ASB for verification by VERIFIKATOR.

#### Step 7-8: Verification Process (Status 9-12)
VERIFIKATOR performs multiple verification steps:

1. **Verify Lantai** (Status 9): `PUT /asb/verify-lantai`
2. **Verify BPS** (Status 10): `PUT /asb/verify-bps`
3. **Verify BPNS** (Status 11): `PUT /asb/verify-bpns`
4. **Verify Rekening** (Status 12): `PUT /asb/verify-rekening`

#### Step 9: Final Decision
VERIFIKATOR makes final decision:

- **Approve**: `PUT /asb/verify` → Status 8
  - System generates Kertas Kerja (work paper) PDF
  - ASB is finalized

- **Reject**: `PUT /asb/reject` → Status 7
  - Includes rejection reason
  - OPD can revise and resubmit

---

## 👨‍💻 Development Guidelines

### Code Style

This project uses **ESLint** and **Prettier** for code formatting:

```bash
# Format code
npm run format

# Lint code
npm run lint
```

### Naming Conventions

- **Files**: `snake_case.ts` (e.g., `asb.service.impl.ts`)
- **Classes**: `PascalCase` (e.g., `AsbServiceImpl`)
- **Interfaces**: `PascalCase` (e.g., `AsbRepository`)
- **Variables**: `camelCase` (e.g., `asbData`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `JWT_SECRET`)

### Layer Responsibilities

**Domain Layer:**
- Define entities (pure business objects)
- Define repository interfaces
- Define service interfaces
- NO external dependencies

**Application Layer:**
- Implement service interfaces
- Define use cases
- Define DTOs
- Orchestrate business logic

**Infrastructure Layer:**
- Implement repository interfaces
- Define ORM entities
- Database access
- External service integration

**Presentation Layer:**
- Define controllers
- Request/response handling
- Validation
- HTTP routing

### Creating New Module

1. **Create domain entity:**
```typescript
// src/domain/example/example.entity.ts
export class Example {
    id: number;
    name: string;
}
```

2. **Create repository interface:**
```typescript
// src/domain/example/example.repository.ts
export abstract class ExampleRepository {
    abstract findById(id: number): Promise<Example | null>;
    abstract create(data: Example): Promise<Example>;
}
```

3. **Create ORM entity:**
```typescript
// src/infrastructure/example/orm/example.orm_entity.ts
@Entity('examples')
export class ExampleOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
```

4. **Implement repository:**
```typescript
// src/infrastructure/example/repositories/example.repository.impl.ts
@Injectable()
export class ExampleRepositoryImpl implements ExampleRepository {
    // Implementation
}
```

5. **Create service:**
```typescript
// src/application/example/example.service.impl.ts
@Injectable()
export class ExampleServiceImpl {
    // Business logic
}
```

6. **Create controller:**
```typescript
// src/presentation/example/example.controller.ts
@Controller('example')
export class ExampleController {
    // HTTP endpoints
}
```

7. **Create module:**
```typescript
// src/presentation/example/example.module.ts
@Module({
    imports: [TypeOrmModule.forFeature([ExampleOrmEntity])],
    controllers: [ExampleController],
    providers: [
        ExampleServiceImpl,
        ExampleRepositoryImpl,
        // ...
    ],
})
export class ExampleModule {}
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Structure

```
src/
├── domain/
│   └── example/
│       └── example.service.spec.ts
├── infrastructure/
│   └── example/
│       └── example.repository.spec.ts
└── presentation/
    └── example/
        └── example.controller.spec.ts
```

---

## 🚢 Deployment

### Build for Production

```bash
# Build the application
npm run build

# Output will be in dist/
```

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production database connection
3. Use strong `JWT_SECRET`
4. Enable HTTPS
5. Configure proper CORS origins
6. Set up process manager (PM2, Docker, etc.)

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/main.js --name easb-api

# Monitor
pm2 monit

# Stop
pm2 stop easb-api
```

### Using Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

CMD ["node", "dist/main.js"]
```

```bash
# Build Docker image
docker build -t easb-api .

# Run container
docker run -p 3000:3000 --env-file .env easb-api
```

### Database Migrations in Production

```bash
# Run migrations
npm run migration:run

# NEVER use synchronize: true in production!
```

---

## 📝 Additional Resources

### Postman Collection

Import the Postman collection from the `postman/` directory for easy API testing.

### API Versioning

The API uses URL versioning:
- Development: `/api/dev/v1`
- Production: `/api/v1`

### Security Considerations

1. **Always use HTTPS in production**
2. **Change default user passwords immediately**
3. **Use strong JWT_SECRET**
4. **Enable rate limiting** (built-in with @nestjs/throttler)
5. **Validate all inputs** (class-validator)
6. **Sanitize file uploads**
7. **Keep dependencies updated**

### Common Issues

**Database connection error:**
- Check PostgreSQL is running
- Verify DB_URL connection string
- Ensure database exists

**Migration errors:**
- Check migration files syntax
- Verify database state
- Try `migration:revert` and re-run

**JWT authentication errors:**
- Check JWT_SECRET is set
- Verify token hasn't expired
- Ensure Authorization header format: `Bearer {token}`

---

## 📄 License

This project is private and proprietary.

---

## 📧 Contact & Support

For questions or support, please contact the development team.

---

**Built with ❤️ using NestJS and TypeScript**
