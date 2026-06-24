/**
 * Insert dedicated E2E OPD users without re-running all migrations.
 * Usage: node scripts/seed-e2e-users.mjs
 *
 * Requires SEED_DEFAULT_PASSWORD (same as seed migrations) and DB_URL in .env.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import pg from 'pg';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(path.join(rootDir, '.env'));

const E2E_OPD_USERS = [
  { username: 'E2E_UserBPD', opd: 'Badan Pendapatan Daerah (E2E Test)', alias: 'BPD' },
  {
    username: 'E2E_UserDPUDPR',
    opd: 'Dinas Pekerjaan Umum Dan Penataan Ruang (E2E Test)',
    alias: 'DPUDPR',
  },
];

async function seedPostgres(dbUrl, password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  const client = new pg.Client({ connectionString: dbUrl });
  await client.connect();

  try {
    for (const data of E2E_OPD_USERS) {
      await client.query(
        `INSERT INTO "users" ("username", "password_hash", "roles")
         VALUES ($1, $2, ARRAY['opd'])
         ON CONFLICT ("username") DO NOTHING`,
        [data.username, hashedPassword],
      );

      const userResult = await client.query(`SELECT id FROM "users" WHERE "username" = $1`, [
        data.username,
      ]);

      if (userResult.rows.length > 0) {
        const userId = userResult.rows[0].id;
        await client.query(
          `INSERT INTO "opds" ("opd", "alias", "id_user")
           VALUES ($1, $2, $3)
           ON CONFLICT ("opd") DO NOTHING`,
          [data.opd, data.alias, userId],
        );
        console.log(`OK ${data.username} -> ${data.opd} (${data.alias})`);
      }
    }
  } finally {
    await client.end();
  }
}

async function seedMysql(dbUrl, password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  const connection = await mysql.createConnection(dbUrl);

  try {
    for (const data of E2E_OPD_USERS) {
      await connection.execute(
        `INSERT IGNORE INTO \`users\` (\`username\`, \`password_hash\`, \`roles\`)
         VALUES (?, ?, ?)`,
        [data.username, hashedPassword, JSON.stringify(['opd'])],
      );

      const [userRows] = await connection.execute(
        `SELECT id FROM \`users\` WHERE \`username\` = ?`,
        [data.username],
      );

      if (userRows.length > 0) {
        const userId = userRows[0].id;
        await connection.execute(
          `INSERT IGNORE INTO \`opds\` (\`opd\`, \`alias\`, \`id_user\`)
           VALUES (?, ?, ?)`,
          [data.opd, data.alias, userId],
        );
        console.log(`OK ${data.username} -> ${data.opd} (${data.alias})`);
      }
    }
  } finally {
    await connection.end();
  }
}

async function main() {
  const password = process.env.SEED_DEFAULT_PASSWORD;
  if (!password) {
    throw new Error('SEED_DEFAULT_PASSWORD is required');
  }

  const dbType = process.env.DB_TYPE ?? 'postgres';
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error('DB_URL is required');
  }

  if (dbType === 'mysql') {
    await seedMysql(dbUrl, password);
  } else {
    await seedPostgres(dbUrl, password);
  }

  console.log('E2E users seeded. Use E2E_UserBPD / E2E_UserDPUDPR with SEED_DEFAULT_PASSWORD.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
