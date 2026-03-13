import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBobotInputProsentaseFromAsbBipekStandard1764317104369 implements MigrationInterface {
    name = 'RemoveBobotInputProsentaseFromAsbBipekStandard1764317104369'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop column bobot_input_prosentase from asb_bipek_standards
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standards"
            DROP COLUMN IF EXISTS "bobot_input_prosentase"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Restore column bobot_input_prosentase
        await queryRunner.query(`
            ALTER TABLE "asb_bipek_standards"
            ADD COLUMN "bobot_input_prosentase" DOUBLE PRECISION
        `);
    }
}
