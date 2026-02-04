import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAsbKomponenBangunanProsStd1770088000015 implements MigrationInterface {
    name = 'SeedAsbKomponenBangunanProsStd1770088000015';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const rows: [number, number, number, number, number, number][] = [
            [1, 0.05, 0.1, 0.075, 0.0625, 0.0875],
            [2, 0.25, 0.32, 0.285, 0.2675, 0.3025],
            [3, 0.05, 0.1, 0.075, 0.0625, 0.0875],
            [4, 0.07, 0.1, 0.085, 0.0775, 0.0925],
            [5, 0.06, 0.08, 0.07, 0.065, 0.075],
            [6, 0.08, 0.1, 0.09, 0.085, 0.095],
            [7, 0.05, 0.08, 0.065, 0.0575, 0.0725],
            [8, 0.1, 0.12, 0.11, 0.105, 0.115],
            [9, 0.03, 0.07, 0.05, 0.04, 0.06],
            [10, 0.2, 0.25, 0.225, 0.2125, 0.2375],
            [11, 0.1, 0.15, 0.125, 0.1125, 0.1375],
            [12, 0.1, 0.15, 0.125, 0.1125, 0.1375],
            [13, 0.08, 0.1, 0.09, 0.085, 0.095],
            [14, 0.1, 0.15, 0.125, 0.1125, 0.1375],
            [15, 0.08, 0.1, 0.09, 0.085, 0.095],
            [16, 0.15, 0.2, 0.175, 0.1625, 0.1875],
        ];

        for (const row of rows) {
            const [idAsbKomponenBangunanStd, min, max, avg, avgMin, avgMax] = row;
            await queryRunner.query(
                `INSERT IGNORE INTO \`asb_komponen_bangunan_pros_std\`
                    (\`id_asb_komponen_bangunan_std\`, \`min\`, \`max\`, \`avg\`, \`avg_min\`, \`avg_max\`)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [idAsbKomponenBangunanStd, min, max, avg, avgMin, avgMax],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`asb_komponen_bangunan_pros_std\` WHERE \`id_asb_komponen_bangunan_std\` BETWEEN 1 AND 16`
        );
    }
}
