import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTahunAnggaranToHspk1770500000000 implements MigrationInterface {
    name = 'AddTahunAnggaranToHspk1770500000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "hspk"
            ADD COLUMN IF NOT EXISTS "tahun_anggaran" INTEGER NULL;
        `);

        await queryRunner.query(`
            UPDATE "hspk" SET "tahun_anggaran" = 2026 WHERE "tahun_anggaran" IS NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE "hspk" ALTER COLUMN "tahun_anggaran" SET NOT NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE "hspk" DROP CONSTRAINT IF EXISTS "hspk_no_mata_pembayaran_key";
        `);

        await queryRunner.query(`
            ALTER TABLE "hspk"
            ADD CONSTRAINT "UQ_hspk_tahun_no_mata_pembayaran" UNIQUE ("tahun_anggaran", "no_mata_pembayaran");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "idx_hspk_tahun_anggaran"
            ON "hspk" ("tahun_anggaran");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_hspk_tahun_anggaran";`);

        await queryRunner.query(`
            ALTER TABLE "hspk" DROP CONSTRAINT IF EXISTS "UQ_hspk_tahun_no_mata_pembayaran";
        `);

        await queryRunner.query(`
            ALTER TABLE "hspk" ADD CONSTRAINT "hspk_no_mata_pembayaran_key" UNIQUE ("no_mata_pembayaran");
        `);

        await queryRunner.query(`
            ALTER TABLE "hspk" DROP COLUMN IF EXISTS "tahun_anggaran";
        `);
    }
}
