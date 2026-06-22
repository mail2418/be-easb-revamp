import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropRoomIdFromAsbFungsiRuang1765000000008 implements MigrationInterface {
    name = 'DropRoomIdFromAsbFungsiRuang1765000000008';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "asb_fungsi_ruangs"
            DROP COLUMN IF EXISTS "room_id";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "asb_fungsi_ruangs"
            ADD COLUMN IF NOT EXISTS "room_id" INTEGER NOT NULL DEFAULT 0;
        `);
    }
}
