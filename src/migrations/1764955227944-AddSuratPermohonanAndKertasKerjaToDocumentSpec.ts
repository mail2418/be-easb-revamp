import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSuratPermohonanAndKertasKerjaToDocumentSpec1764955227944 implements MigrationInterface {
    name = 'AddSuratPermohonanAndKertasKerjaToDocumentSpec1764955227944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new enum values to document_spec_enum
        await queryRunner.query(`
            ALTER TYPE document_spec_enum ADD VALUE 'SURAT_PERMOHONAN'
        `);

        await queryRunner.query(`
            ALTER TYPE document_spec_enum ADD VALUE 'KERTAS_KERJA'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
