import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLuasTanahToAsb1764918811922 implements MigrationInterface {
    name = 'AddLuasTanahToAsb1764918811922';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add luas_tanah column to asb table
        await queryRunner.query(`
            ALTER TABLE "asb"
            ADD COLUMN IF NOT EXISTS "luas_tanah" INTEGER NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop luas_tanah column
        await queryRunner.query(`
            ALTER TABLE "asb"
            DROP COLUMN IF EXISTS "luas_tanah"
        `);
    }
}
