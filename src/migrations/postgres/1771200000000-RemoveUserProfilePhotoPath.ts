import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserProfilePhotoPath1771200000000 implements MigrationInterface {
    name = 'RemoveUserProfilePhotoPath1771200000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN IF EXISTS "photo_path"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_profiles" ADD COLUMN IF NOT EXISTS "photo_path" VARCHAR(500) NULL`,
        );
    }
}
