import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProvinces1763626412272 implements MigrationInterface {
    name = 'SeedProvinces1763626412272';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const provinces = [
            { kode: '11', nama: 'Aceh' },
            { kode: '12', nama: 'Sumatera Utara' },
            { kode: '13', nama: 'Sumatera Barat' },
            { kode: '14', nama: 'Riau' },
            { kode: '15', nama: 'Jambi' },
            { kode: '16', nama: 'Sumatera Selatan' },
            { kode: '17', nama: 'Bengkulu' },
            { kode: '18', nama: 'Lampung' },
            { kode: '19', nama: 'Kepulauan Bangka Belitung' },
            { kode: '21', nama: 'Kepulauan Riau' },
            { kode: '31', nama: 'DKI Jakarta' },
            { kode: '32', nama: 'Jawa Barat' },
            { kode: '33', nama: 'Jawa Tengah' },
            { kode: '34', nama: 'DI Yogyakarta' },
            { kode: '35', nama: 'Jawa Timur' },
            { kode: '36', nama: 'Banten' },
            { kode: '51', nama: 'Bali' },
            { kode: '52', nama: 'Nusa Tenggara Barat' },
            { kode: '53', nama: 'Nusa Tenggara Timur' },
            { kode: '61', nama: 'Kalimantan Barat' },
            { kode: '62', nama: 'Kalimantan Tengah' },
            { kode: '63', nama: 'Kalimantan Selatan' },
            { kode: '64', nama: 'Kalimantan Timur' },
            { kode: '65', nama: 'Kalimantan Utara' },
            { kode: '71', nama: 'Sulawesi Utara' },
            { kode: '72', nama: 'Sulawesi Tengah' },
            { kode: '73', nama: 'Sulawesi Selatan' },
            { kode: '74', nama: 'Sulawesi Tenggara' },
            { kode: '75', nama: 'Gorontalo' },
            { kode: '76', nama: 'Sulawesi Barat' },
            { kode: '81', nama: 'Maluku' },
            { kode: '82', nama: 'Maluku Utara' },
            { kode: '91', nama: 'Papua Barat' },
            { kode: '92', nama: 'Papua Selatan' },
            { kode: '93', nama: 'Papua Tengah' },
            { kode: '94', nama: 'Papua Pegunungan' },
            { kode: '95', nama: 'Papua' },
            { kode: '96', nama: 'Papua Barat Daya' }
        ];

        for (const province of provinces) {
            await queryRunner.query(
                `INSERT INTO "provinces" ("kode", "nama", "is_active")
                 VALUES ($1, $2, $3)
                 ON CONFLICT ("kode") DO NOTHING`,
                [province.kode, province.nama, true]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "provinces" WHERE "kode" IN (
                '11','12','13','14','15','16','17','18','19','21',
                '31','32','33','34','35','36',
                '51','52','53',
                '61','62','63','64','65',
                '71','72','73','74','75','76',
                '81','82',
                '91','92','93','94','95','96'
            )
        `);
    }
}
