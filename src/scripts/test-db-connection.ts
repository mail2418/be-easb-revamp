/**
 * Database Connection Test Script
 *
 * Usage:
 *   npx ts-node -r tsconfig-paths/register src/scripts/test-db-connection.ts
 *
 * This script tests the database connection based on DB_TYPE environment variable.
 */

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbType = (process.env.DB_TYPE || 'postgres') as 'postgres' | 'mysql';
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error('❌ Error: DB_URL environment variable is not set');
    process.exit(1);
}

console.log('🔍 Database Connection Test');
console.log('============================');
console.log(`📌 DB_TYPE: ${dbType}`);
console.log(`📌 DB_URL: ${dbUrl.replace(/:[^:@]+@/, ':****@')}`); // Hide password

// Build DataSource options based on DB_TYPE
const getDataSourceOptions = (): DataSourceOptions => {
    if (dbType === 'mysql') {
        return {
            type: 'mysql',
            url: dbUrl,
            synchronize: false,
            logging: ['error', 'warn'] as const,
            timezone: '+07:00', // Asia/Jakarta
            charset: 'utf8mb4',
        };
    }

    // Default: PostgreSQL
    return {
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: ['error', 'warn'] as const,
        extra: {
            options: '-c timezone=Asia/Jakarta',
        },
    };
};

async function testConnection() {
    const options = getDataSourceOptions();
    const dataSource = new DataSource(options);

    try {
        console.log('\n⏳ Connecting to database...');
        await dataSource.initialize();

        console.log('✅ Connection successful!\n');

        // Test a simple query
        console.log('📊 Running test query...');

        if (dbType === 'mysql') {
            const result = await dataSource.query(
                'SELECT VERSION() as version, NOW() as server_time',
            );
            console.log(`   MySQL Version: ${result[0].version}`);
            console.log(`   Server Time: ${result[0].server_time}`);

            // Check character set
            const charsetResult = await dataSource.query(
                "SHOW VARIABLES LIKE 'character_set_database'",
            );
            console.log(`   Database Charset: ${charsetResult[0]?.Value || 'N/A'}`);
        } else {
            const result = await dataSource.query(
                'SELECT version() as version, NOW() as server_time',
            );
            console.log(`   PostgreSQL Version: ${result[0].version}`);
            console.log(`   Server Time: ${result[0].server_time}`);
        }

        // List existing tables (if any)
        console.log('\n📋 Checking existing tables...');
        let tables: any[];

        if (dbType === 'mysql') {
            tables = await dataSource.query('SHOW TABLES');
            const tableCount = tables.length;
            console.log(`   Found ${tableCount} table(s)`);
            if (tableCount > 0 && tableCount <= 10) {
                tables.forEach((t: any) => {
                    const tableName = Object.values(t)[0];
                    console.log(`   - ${tableName}`);
                });
            } else if (tableCount > 10) {
                console.log(`   (showing first 10)`);
                tables.slice(0, 10).forEach((t: any) => {
                    const tableName = Object.values(t)[0];
                    console.log(`   - ${tableName}`);
                });
            }
        } else {
            tables = await dataSource.query(`
                SELECT tablename FROM pg_tables 
                WHERE schemaname = 'public'
                ORDER BY tablename
            `);
            const tableCount = tables.length;
            console.log(`   Found ${tableCount} table(s)`);
            if (tableCount > 0 && tableCount <= 10) {
                tables.forEach((t: any) => console.log(`   - ${t.tablename}`));
            } else if (tableCount > 10) {
                console.log(`   (showing first 10)`);
                tables.slice(0, 10).forEach((t: any) => console.log(`   - ${t.tablename}`));
            }
        }

        console.log('\n✅ All tests passed! Database connection is working correctly.\n');

        await dataSource.destroy();
        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Connection failed!\n');
        console.error('Error details:');
        console.error(`   Code: ${error.code || 'N/A'}`);
        console.error(`   Message: ${error.message}`);

        // Common error hints
        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 Hint: Make sure the database server is running and accessible.');
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === '28P01') {
            console.error('\n💡 Hint: Check your username and password in DB_URL.');
        } else if (error.code === 'ER_BAD_DB_ERROR' || error.code === '3D000') {
            console.error('\n💡 Hint: The database does not exist. Create it first.');
        } else if (error.code === 'ENOTFOUND') {
            console.error(
                '\n💡 Hint: Cannot resolve the database host. Check the hostname in DB_URL.',
            );
        }

        await dataSource.destroy().catch(() => {});
        process.exit(1);
    }
}

testConnection();
