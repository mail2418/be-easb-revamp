---
description: End-to-end guide for adding a new service and endpoints
---

# Adding a New Service and Endpoints - Complete Guide

This guide walks you through the complete process of adding a new service/module to the BE-EASB-REVAMP project, which follows **Clean Architecture** principles.

## 📋 Overview

The project uses a 4-layer architecture:
1. **Domain Layer** (`src/domain`) - Business entities and interfaces
2. **Application Layer** (`src/application`) - Business logic implementation
3. **Infrastructure Layer** (`src/infrastructure`) - Database and external services
4. **Presentation Layer** (`src/presentation`) - HTTP controllers and DTOs

## 🚀 Step-by-Step Process

### Step 1: Define the Domain Entity

**Location:** `src/domain/{module_name}/{module_name}.entity.ts`

Create the core business entity (plain TypeScript class, no decorators):

```typescript
// Example: src/domain/example/example.entity.ts
export class Example {
    id!: number;
    name!: string;
    description!: string;
    isActive!: boolean;
}
```

**Key Points:**
- Use plain TypeScript classes
- No framework dependencies
- Define only business properties
- Use `!` for required fields

---

### Step 2: Define the Repository Interface

**Location:** `src/domain/{module_name}/{module_name}.repository.ts`

Define the abstract repository interface:

```typescript
// Example: src/domain/example/example.repository.ts
import { CreateExampleDto } from '../../presentation/example/dto/create_example.dto';
import { GetExamplesDto } from '../../presentation/example/dto/get_examples.dto';
import { Example } from './example.entity';

export abstract class ExampleRepository {
    abstract create(example: CreateExampleDto): Promise<Example>;
    abstract update(id: number, data: Partial<Example>): Promise<Example>;
    abstract delete(id: number): Promise<boolean>;
    abstract findById(id: number): Promise<Example | null>;
    abstract findByName(name: string): Promise<Example | null>;
    abstract findAll(pagination: GetExamplesDto): Promise<{ data: Example[], total: number }>;
}
```

**Key Points:**
- Use `abstract class` (not interface) for dependency injection
- Define all data access methods
- Return domain entities, not ORM entities
- Use DTOs from presentation layer for input

---

### Step 3: Define the Service Interface

**Location:** `src/domain/{module_name}/{module_name}.service.ts`

Define the abstract service interface:

```typescript
// Example: src/domain/example/example.service.ts
import { CreateExampleDto } from '../../presentation/example/dto/create_example.dto';
import { UpdateExampleDto } from '../../presentation/example/dto/update_example.dto';
import { DeleteExampleDto } from '../../presentation/example/dto/delete_example.dto';
import { GetExamplesDto } from '../../presentation/example/dto/get_examples.dto';
import { GetExampleDetailDto } from '../../presentation/example/dto/get_example_detail.dto';
import { ExamplesPaginationResult } from '../../presentation/example/dto/examples_pagination_result.dto';
import { Example } from './example.entity';

export abstract class ExampleService {
    abstract create(example: CreateExampleDto): Promise<Example>;
    abstract updateExample(example: UpdateExampleDto): Promise<Example>;
    abstract deleteExample(example: DeleteExampleDto): Promise<boolean>;
    abstract getExamples(pagination: GetExamplesDto): Promise<ExamplesPaginationResult>;
    abstract getExampleDetail(example: GetExampleDetailDto): Promise<Example>;
    abstract findByName(name: string): Promise<Example | null>;
    abstract findById(id: number): Promise<Example | null>;
}
```

**Key Points:**
- Define all business operations
- Use DTOs for input validation
- Return domain entities or custom result types

---

### Step 4: Create DTOs (Data Transfer Objects)

**Location:** `src/presentation/{module_name}/dto/`

Create all necessary DTOs:

#### 4.1 Create DTO
```typescript
// src/presentation/example/dto/create_example.dto.ts
import { IsString, IsNotEmpty, Length, IsOptional, IsBoolean } from 'class-validator';

export class CreateExampleDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsString()
    @IsOptional()
    @Length(0, 500)
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
```

#### 4.2 Update DTO
```typescript
// src/presentation/example/dto/update_example.dto.ts
import { IsNumber, IsString, IsOptional, Length, IsBoolean } from 'class-validator';

export class UpdateExampleDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    @Length(1, 255)
    name?: string;

    @IsString()
    @IsOptional()
    @Length(0, 500)
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
```

#### 4.3 Delete DTO
```typescript
// src/presentation/example/dto/delete_example.dto.ts
import { IsNumber } from 'class-validator';

export class DeleteExampleDto {
    @IsNumber()
    id: number;
}
```

#### 4.4 Get List DTO (with pagination)
```typescript
// src/presentation/example/dto/get_examples.dto.ts
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetExamplesDto {
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    amount: number = 10;
}
```

#### 4.5 Get Detail DTO
```typescript
// src/presentation/example/dto/get_example_detail.dto.ts
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetExampleDetailDto {
    @IsNumber()
    @Type(() => Number)
    id: number;
}
```

#### 4.6 Pagination Result DTO
```typescript
// src/presentation/example/dto/examples_pagination_result.dto.ts
import { Example } from '../../../domain/example/example.entity';

export class ExamplesPaginationResult {
    examples: Example[];
    total: number;
    page: number;
    amount: number;
    totalPages: number;
}
```

**Key Points:**
- Use `class-validator` decorators for validation
- Use `class-transformer` for type conversion
- Create separate DTOs for each operation
- Include pagination DTOs for list endpoints

---

### Step 5: Create ORM Entity

**Location:** `src/infrastructure/{module_name}/orm/{module_name}.orm_entity.ts`

Create the TypeORM entity:

```typescript
// src/infrastructure/example/orm/example.orm_entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('examples')
export class ExampleOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
```

**Key Points:**
- Use TypeORM decorators
- Map column names with snake_case using `name` property
- Include timestamps (createdAt, updatedAt, deletedAt)
- Use soft delete with `@DeleteDateColumn`

---

### Step 6: Implement Repository

**Location:** `src/infrastructure/{module_name}/repositories/{module_name}.repository.impl.ts`

Implement the repository interface:

```typescript
// src/infrastructure/example/repositories/example.repository.impl.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExampleRepository } from '../../../domain/example/example.repository';
import { Example } from '../../../domain/example/example.entity';
import { ExampleOrmEntity } from '../orm/example.orm_entity';
import { CreateExampleDto } from '../../../presentation/example/dto/create_example.dto';
import { GetExamplesDto } from '../../../presentation/example/dto/get_examples.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ExampleRepositoryImpl implements ExampleRepository {
    constructor(@InjectRepository(ExampleOrmEntity) private readonly repo: Repository<ExampleOrmEntity>) {}

    async create(example: CreateExampleDto): Promise<Example> {
        try {
            const exampleOrm = plainToInstance(ExampleOrmEntity, example);
            const newExample = await this.repo.save(exampleOrm);
            return newExample;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<Example>): Promise<Example> {
        try {
            await this.repo.update(id, data);
            const updatedExample = await this.repo.findOne({ where: { id } });
            if (!updatedExample) {
                throw new NotFoundException(`Example with id ${id} not found`);
            }
            return updatedExample;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await this.repo.softDelete(id);
            return (result.affected ?? 0) > 0;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Example | null> {
        try {
            const example = await this.repo.findOne({ where: { id } });
            return example || null;
        } catch (error) {
            throw error;
        }
    }

    async findByName(name: string): Promise<Example | null> {
        try {
            const example = await this.repo.findOne({ where: { name } });
            return example || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetExamplesDto): Promise<{ data: Example[], total: number }> {
        try {
            const [examples, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            });

            return { data: examples, total };
        } catch (error) {
            throw error;
        }
    }
}
```

**Key Points:**
- Inject TypeORM repository using `@InjectRepository`
- Use `plainToInstance` for DTO to entity conversion
- Use soft delete (`softDelete`) instead of hard delete
- Handle pagination with `skip` and `take`
- Always wrap in try-catch blocks

---

### Step 7: Implement Service

**Location:** `src/application/{module_name}/{module_name}.service.impl.ts`

Implement the service interface:

```typescript
// src/application/example/example.service.impl.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ExampleService } from '../../domain/example/example.service';
import { ExampleRepository } from '../../domain/example/example.repository';
import { Example } from '../../domain/example/example.entity';
import { CreateExampleDto } from '../../presentation/example/dto/create_example.dto';
import { UpdateExampleDto } from '../../presentation/example/dto/update_example.dto';
import { DeleteExampleDto } from '../../presentation/example/dto/delete_example.dto';
import { GetExamplesDto } from '../../presentation/example/dto/get_examples.dto';
import { GetExampleDetailDto } from '../../presentation/example/dto/get_example_detail.dto';
import { ExamplesPaginationResult } from '../../presentation/example/dto/examples_pagination_result.dto';

@Injectable()
export class ExampleServiceImpl implements ExampleService {
    constructor(private readonly exampleRepository: ExampleRepository) {}

    async create(example: CreateExampleDto): Promise<Example> {
        try {
            // Check if example already exists
            const existingExample = await this.exampleRepository.findByName(example.name);
            if (existingExample) {
                throw new ConflictException(`Example with name ${example.name} already exists`);
            }

            const newExample = await this.exampleRepository.create(example);
            return newExample;
        } catch (error) {
            throw error;
        }
    }

    async updateExample(example: UpdateExampleDto): Promise<Example> {
        try {
            // Check if example exists
            const existingExample = await this.exampleRepository.findById(example.id);
            if (!existingExample) {
                throw new NotFoundException(`Example with id ${example.id} not found`);
            }

            // Check if name is being changed and already exists
            if (example.name && example.name !== existingExample.name) {
                const nameExists = await this.exampleRepository.findByName(example.name);
                if (nameExists) {
                    throw new ConflictException(`Example with name ${example.name} already exists`);
                }
            }

            const updateData: Partial<Example> = {
                name: example.name,
                description: example.description,
                isActive: example.isActive,
            };

            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key as keyof typeof updateData] === undefined) {
                    delete updateData[key as keyof typeof updateData];
                }
            });

            const updatedExample = await this.exampleRepository.update(example.id, updateData);
            return updatedExample;
        } catch (error) {
            throw error;
        }
    }

    async deleteExample(example: DeleteExampleDto): Promise<boolean> {
        try {
            // Check if example exists
            const existingExample = await this.exampleRepository.findById(example.id);
            if (!existingExample) {
                throw new NotFoundException(`Example with id ${example.id} not found`);
            }

            const deleted = await this.exampleRepository.delete(example.id);
            return deleted;
        } catch (error) {
            throw error;
        }
    }

    async getExamples(pagination: GetExamplesDto): Promise<ExamplesPaginationResult> {
        try {
            const result = await this.exampleRepository.findAll(pagination);
            return {
                examples: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getExampleDetail(example: GetExampleDetailDto): Promise<Example> {
        try {
            const existingExample = await this.exampleRepository.findById(example.id);
            if (!existingExample) {
                throw new NotFoundException(`Example with id ${example.id} not found`);
            }
            return existingExample;
        } catch (error) {
            throw error;
        }
    }

    async findByName(name: string): Promise<Example | null> {
        try {
            return await this.exampleRepository.findByName(name);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Example | null> {
        try {
            return await this.exampleRepository.findById(id);
        } catch (error) {
            throw error;
        }
    }
}
```

**Key Points:**
- Inject repository through constructor
- Implement business validation logic
- Throw appropriate exceptions (NotFoundException, ConflictException)
- Calculate pagination metadata (totalPages)
- Remove undefined values before update

---

### Step 8: Create Controller

**Location:** `src/presentation/{module_name}/{module_name}.controller.ts`

Create the HTTP controller:

```typescript
// src/presentation/example/example.controller.ts
import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    UseGuards,
    HttpStatus,
    HttpException,
    Query,
} from '@nestjs/common';
import { ExampleService } from '../../domain/example/example.service';
import { CreateExampleDto } from './dto/create_example.dto';
import { UpdateExampleDto } from './dto/update_example.dto';
import { DeleteExampleDto } from './dto/delete_example.dto';
import { GetExamplesDto } from './dto/get_examples.dto';
import { GetExampleDetailDto } from './dto/get_example_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('example')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) { }

    @Post()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async create(@Body() dto: CreateExampleDto): Promise<ResponseDto> {
        try {
            const result = await this.exampleService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Example created successfully',
                data: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    status: 'error',
                    responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to create example',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Put()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async updateExample(@Body() dto: UpdateExampleDto): Promise<ResponseDto> {
        try {
            const result = await this.exampleService.updateExample(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Example updated successfully',
                data: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    status: 'error',
                    responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to update example',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Delete()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async deleteExample(@Body() dto: DeleteExampleDto): Promise<ResponseDto> {
        try {
            const result = await this.exampleService.deleteExample(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Example deleted successfully',
                data: { deleted: result },
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    status: 'error',
                    responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to delete example',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getExamples(@Query() dto: GetExamplesDto): Promise<ResponseDto> {
        try {
            const result = await this.exampleService.getExamples(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Examples retrieved successfully',
                data: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    status: 'error',
                    responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to retrieve examples',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('detail')
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getExampleDetail(@Query() dto: GetExampleDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.exampleService.getExampleDetail(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Example detail retrieved successfully',
                data: result,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                {
                    status: 'error',
                    responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to retrieve example detail',
                    error: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
```

**Key Points:**
- Use `@Controller` decorator with route prefix
- Apply `JwtAuthGuard` and `RolesGuard` at class level
- Use `@Roles` decorator for role-based access control
- Return consistent `ResponseDto` format
- Handle errors and re-throw HttpExceptions
- Use `@Query()` for GET parameters, `@Body()` for POST/PUT

---

### Step 9: Create Module

**Location:** `src/presentation/{module_name}/{module_name}.module.ts`

Wire everything together:

```typescript
// src/presentation/example/example.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleController } from './example.controller';
import { ExampleServiceImpl } from '../../application/example/example.service.impl';
import { ExampleRepositoryImpl } from '../../infrastructure/example/repositories/example.repository.impl';
import { ExampleOrmEntity } from '../../infrastructure/example/orm/example.orm_entity';
import { ExampleService } from '../../domain/example/example.service';
import { ExampleRepository } from '../../domain/example/example.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExampleOrmEntity]),
  ],
  controllers: [ExampleController],
  providers: [
    {
      provide: ExampleService,
      useClass: ExampleServiceImpl,
    },
    {
      provide: ExampleRepository,
      useClass: ExampleRepositoryImpl,
    },
  ],
  exports: [
    ExampleService,
    ExampleRepository,
  ],
})
export class ExampleModule {}
```

**Key Points:**
- Import `TypeOrmModule.forFeature` with ORM entity
- Register controller
- Use provider pattern for dependency injection
- Map abstract classes to implementations
- Export service and repository for use in other modules

---

### Step 10: Register Module in App Module

**Location:** `src/app.module.ts`

Add your module to the main application module:

```typescript
// Add import at the top
import { ExampleModule } from './presentation/example/example.module';

@Module({
    imports: [
        // ... existing imports
        ExampleModule,  // Add your module here
    ],
    // ... rest of configuration
})
export class AppModule { }
```

---

### Step 11: Create Database Migration

Generate and run migration:

```bash
# Generate migration based on entity changes
npm run migration:generate -- src/migrations/CreateExampleTable

# Review the generated migration file
# Then run it
npm run migration:run
```

Example migration file:

```typescript
// src/migrations/1234567890-CreateExampleTable.ts
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExampleTable1234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'examples',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_examples_updated_at') THEN
                    CREATE TRIGGER set_examples_updated_at
                    BEFORE UPDATE ON "examples"
                    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('examples');
    }
}
```

---

## 🧪 Testing Your Endpoints

### Using Postman or cURL

1. **Login to get JWT token:**
```bash
POST http://localhost:3000/api/dev/v1/auth/login
Content-Type: application/json

{
  "username": "superadmin",
  "password": "SuperAdminPass123!"
}
```

2. **Create Example:**
```bash
POST http://localhost:3000/api/dev/v1/example
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "name": "Test Example",
  "description": "This is a test",
  "isActive": true
}
```

3. **Get Examples (with pagination):**
```bash
GET http://localhost:3000/api/dev/v1/example?page=1&amount=10
Authorization: Bearer {your_token}
```

4. **Get Example Detail:**
```bash
GET http://localhost:3000/api/dev/v1/example/detail?id=1
Authorization: Bearer {your_token}
```

5. **Update Example:**
```bash
PUT http://localhost:3000/api/dev/v1/example
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "id": 1,
  "name": "Updated Example",
  "isActive": false
}
```

6. **Delete Example:**
```bash
DELETE http://localhost:3000/api/dev/v1/example
Authorization: Bearer {your_token}
Content-Type: application/json

{
  "id": 1
}
```

---

## 📝 Checklist Summary

- [ ] **Step 1:** Create domain entity (`src/domain/{module}/entity.ts`)
- [ ] **Step 2:** Create repository interface (`src/domain/{module}/repository.ts`)
- [ ] **Step 3:** Create service interface (`src/domain/{module}/service.ts`)
- [ ] **Step 4:** Create all DTOs (`src/presentation/{module}/dto/`)
- [ ] **Step 5:** Create ORM entity (`src/infrastructure/{module}/orm/orm_entity.ts`)
- [ ] **Step 6:** Implement repository (`src/infrastructure/{module}/repositories/repository.impl.ts`)
- [ ] **Step 7:** Implement service (`src/application/{module}/service.impl.ts`)
- [ ] **Step 8:** Create controller (`src/presentation/{module}/controller.ts`)
- [ ] **Step 9:** Create module (`src/presentation/{module}/module.ts`)
- [ ] **Step 10:** Register in app.module.ts
- [ ] **Step 11:** Create and run migration
- [ ] **Step 12:** Test all endpoints

---

## 🎯 Best Practices

1. **Naming Conventions:**
   - Files: `{module_name}.{type}.ts` (e.g., `example.service.ts`)
   - Classes: PascalCase (e.g., `ExampleService`)
   - Folders: snake_case (e.g., `asb_detail`)

2. **Error Handling:**
   - Always use try-catch blocks
   - Throw appropriate HTTP exceptions
   - Provide meaningful error messages

3. **Validation:**
   - Use class-validator decorators in DTOs
   - Validate business rules in service layer
   - Use guards for authentication/authorization

4. **Database:**
   - Always use soft delete
   - Include timestamps (created_at, updated_at, deleted_at)
   - Use snake_case for column names

5. **Security:**
   - Always use JWT authentication
   - Apply role-based access control
   - Validate all inputs

6. **Code Organization:**
   - Keep layers separate
   - Follow dependency rule (outer layers depend on inner)
   - Export services/repositories for reuse

---

## 🔗 Related Files

- Response DTO: `src/common/dto/response.dto.ts`
- Role Enum: `src/domain/user/user_role.enum.ts`
- JWT Guard: `src/common/guards/jwt_auth.guard.ts`
- Roles Guard: `src/common/guards/roles.guard.ts`
- Roles Decorator: `src/common/decorators/roles.decorator.ts`

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- Project README: `/Users/mail/Project/be-easb-revamp/README.md`
