import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedJalanMutuBeton1770103100001 implements MigrationInterface {
    name = 'SeedJalanMutuBeton1770103100001';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const jalanMutuBetons = [{ jenis: "f'c 20 Mpa" }, { jenis: "f'c 25 Mpa" }];

        for (const item of jalanMutuBetons) {
            await queryRunner.query(
                `INSERT IGNORE INTO \`jalan_mutu_beton\` (\`jenis\`) VALUES (?)`,
                [item.jenis],
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM \`jalan_mutu_beton\` WHERE \`jenis\` IN ("f'c 20 Mpa", "f'c 25 Mpa")`,
        );
    }
}
