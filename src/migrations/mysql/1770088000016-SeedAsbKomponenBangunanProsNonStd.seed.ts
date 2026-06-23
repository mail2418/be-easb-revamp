import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKomponenBangunanProsNonStd1770088000016 implements MigrationInterface {
    name = 'SeedAsbKomponenBangunanProsNonStd1770088000016';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const rows = [
            [1, 0.07, 0.15, 0.11, 0.09, 0.13],
            [2, 0.08, 0.14, 0.11, 0.095, 0.125],
            [3, 0.02, 0.04, 0.03, 0.025, 0.035],
            [4, 0.01, 0.03, 0.02, 0.015, 0.025],
            [5, 0.06, 0.11, 0.085, 0.0725, 0.0975],
            [6, 0.07, 0.12, 0.095, 0.0825, 0.1075],
            [7, 0.07, 0.12, 0.095, 0.0825, 0.1075],
            [8, 0.01, 0.02, 0.015, 0.0125, 0.0175],
            [9, 0.01, 0.02, 0.015, 0.0125, 0.0175],
            [10, 0.15, 0.25, 0.2, 0.175, 0.225],
            [11, 0.01, 0.02, 0.015, 0.0125, 0.0175],
            [12, 0.02, 0.04, 0.03, 0.025, 0.035],
            [13, 0.01, 0.03, 0.02, 0.015, 0.025],
            [14, 0.07, 0.12, 0.095, 0.0825, 0.1075],
            [15, 0.03, 0.05, 0.04, 0.035, 0.045],
            [16, 0.03, 0.08, 0.055, 0.0425, 0.0675],
            [17, null, 0.3, 0.3, 0.3, 0.3],
            [18, null, 0.01, 0.01, 0.01, 0.01],
            [19, null, 0.035, 0.035, 0.035, 0.035],
            [20, null, 0.095, 0.095, 0.095, 0.095],
            [21, null, 0.02, 0.02, 0.02, 0.02],
        ];

        for (const row of rows) {
            const [idAsbKomponenBangunanNonstd, min, max, avg, avgMin, avgMax] = row;
            await queryRunner.query(
                `INSERT IGNORE INTO \`asb_komponen_bangunan_pros_nonstd\`
                    (\`id_asb_komponen_bangunan_nonstd\`, \`min\`, \`max\`, \`avg\`, \`avg_min\`, \`avg_max\`)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [idAsbKomponenBangunanNonstd, min, max, avg, avgMin, avgMax],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`asb_komponen_bangunan_pros_nonstd\` WHERE \`id_asb_komponen_bangunan_nonstd\` BETWEEN 1 AND 21`,
        );
    }
}
