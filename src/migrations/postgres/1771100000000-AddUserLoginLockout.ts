import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserLoginLockout1771100000000 implements MigrationInterface {
    name = 'AddUserLoginLockout1771100000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "failed_login_attempts" integer NOT NULL DEFAULT 0
    `);
        await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "locked_until" TIMESTAMP NULL
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "locked_until"`);
        await queryRunner.query(
            `ALTER TABLE "users" DROP COLUMN IF EXISTS "failed_login_attempts"`,
        );
    }
}
