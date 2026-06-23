import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedKelurahansTulungagung1770088000018 implements MigrationInterface {
    name = 'SeedKelurahansTulungagung1770088000018';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Get id_kabkota for Tulungagung (kode '3504') instead of hardcoding id = 62
        // This ensures compatibility even if auto-increment values differ between PostgreSQL and MySQL
        const kabkotas = await queryRunner.query(
            `SELECT id FROM \`kabkotas\` WHERE \`kode\` = ? LIMIT 1`,
            ['3504'], // Tulungagung
        );

        if (!kabkotas || kabkotas.length === 0) {
            throw new Error(
                'Kabkota with kode 3504 (Tulungagung) not found. Make sure SeedKabKotas has been run.',
            );
        }

        const idKabkota = kabkotas[0].id as number;

        // Get kecamatan IDs for Tulungagung
        const kecamatans = await queryRunner.query(
            `
            SELECT id, kode_kecamatan FROM \`kecamatans\` WHERE \`id_kabkota\` = ?
        `,
            [idKabkota],
        );

        // Create a map of kode_kecamatan to id
        const kecamatanMap: { [key: string]: number } = {};
        for (const kec of kecamatans) {
            kecamatanMap[kec.kode_kecamatan] = kec.id;
        }

        // Define kelurahans data
        const kelurahanData: { kode: string; nama: string }[] = [
            // Kecamatan 01 - Tulungagung
            { kode: '01', nama: 'Bago' },
            { kode: '01', nama: 'Botoran' },
            { kode: '01', nama: 'Jepun' },
            { kode: '01', nama: 'Kampungdalem' },
            { kode: '01', nama: 'Karangwaru' },
            { kode: '01', nama: 'Kauman' },
            { kode: '01', nama: 'Kedungsoko' },
            { kode: '01', nama: 'Kenayan' },
            { kode: '01', nama: 'Kepatihan' },
            { kode: '01', nama: 'Kutoanyar' },
            { kode: '01', nama: 'Panggungrejo' },
            { kode: '01', nama: 'Sembung' },
            { kode: '01', nama: 'Tamanan' },
            { kode: '01', nama: 'Tertek' },

            // Kecamatan 02 - Boyolangu
            { kode: '02', nama: 'Beji' },
            { kode: '02', nama: 'Bono' },
            { kode: '02', nama: 'Boyolangu' },
            { kode: '02', nama: 'Gedangsewu' },
            { kode: '02', nama: 'Karangrejo' },
            { kode: '02', nama: 'Kendalbulur' },
            { kode: '02', nama: 'Kepuh' },
            { kode: '02', nama: 'Moyoketen' },
            { kode: '02', nama: 'Ngranti' },
            { kode: '02', nama: 'Pucungkidul' },
            { kode: '02', nama: 'Sanggrahan' },
            { kode: '02', nama: 'Serut' },
            { kode: '02', nama: 'Sobontoro' },
            { kode: '02', nama: 'Tanjungsari' },
            { kode: '02', nama: 'Wajak Kidul' },
            { kode: '02', nama: 'Wajak Lor' },
            { kode: '02', nama: 'Waung' },

            // Kecamatan 03 - Kedungwaru
            { kode: '03', nama: 'Bangoan' },
            { kode: '03', nama: 'Boro' },
            { kode: '03', nama: 'Bulusari' },
            { kode: '03', nama: 'Gendingan' },
            { kode: '03', nama: 'Kedungwaru' },
            { kode: '03', nama: 'Ketanon' },
            { kode: '03', nama: 'Loderesan' },
            { kode: '03', nama: 'Majan' },
            { kode: '03', nama: 'Mangunsari' },
            { kode: '03', nama: 'Ngujang' },
            { kode: '03', nama: 'Plandaan' },
            { kode: '03', nama: 'Plosokandang' },
            { kode: '03', nama: 'Rejoagung' },
            { kode: '03', nama: 'Ringinpitu' },
            { kode: '03', nama: 'Simo' },
            { kode: '03', nama: 'Tapan' },
            { kode: '03', nama: 'Tawangsari' },
            { kode: '03', nama: 'Tunggulsari' },
            { kode: '03', nama: 'Winong' },

            // Kecamatan 04 - Ngantru
            { kode: '04', nama: 'Banjarsari' },
            { kode: '04', nama: 'Batokan' },
            { kode: '04', nama: 'Bendosari' },
            { kode: '04', nama: 'Kepuhrejo' },
            { kode: '04', nama: 'Mojoagung' },
            { kode: '04', nama: 'Ngantru' },
            { kode: '04', nama: 'Padangan' },
            { kode: '04', nama: 'Pakel' },
            { kode: '04', nama: 'Pinggirsari' },
            { kode: '04', nama: 'Pojok' },
            { kode: '04', nama: 'Pucunglor' },
            { kode: '04', nama: 'Pulerejo' },
            { kode: '04', nama: 'Srikaton' },

            // Kecamatan 05 - Kalangbret
            { kode: '05', nama: 'Balerejo' },
            { kode: '05', nama: 'Banaran' },
            { kode: '05', nama: 'Batangsaren' },
            { kode: '05', nama: 'Bolorejo' },
            { kode: '05', nama: 'Jatimulyo' },
            { kode: '05', nama: 'Kalangbret' },
            { kode: '05', nama: 'Karanganom' },
            { kode: '05', nama: 'Kates' },
            { kode: '05', nama: 'Kauman' },
            { kode: '05', nama: 'Mojosari' },
            { kode: '05', nama: 'Panggungrejo' },
            { kode: '05', nama: 'Pucangan' },
            { kode: '05', nama: 'Sidorejo' },

            // Kecamatan 06 - Pagerwojo
            { kode: '06', nama: 'Gambiran' },
            { kode: '06', nama: 'Gondanggunung' },
            { kode: '06', nama: 'Kedungcangkring' },
            { kode: '06', nama: 'Kradinan' },
            { kode: '06', nama: 'Mulyosari' },
            { kode: '06', nama: 'Pagerwojo' },
            { kode: '06', nama: 'Penjore' },
            { kode: '06', nama: 'Samar' },
            { kode: '06', nama: 'Segawe' },
            { kode: '06', nama: 'Sidomulyo' },
            { kode: '06', nama: 'Wonorejo' },

            // Kecamatan 07 - Sendang
            { kode: '07', nama: 'Dono' },
            { kode: '07', nama: 'Geger' },
            { kode: '07', nama: 'Kedoyo' },
            { kode: '07', nama: 'Krosok' },
            { kode: '07', nama: 'Nglurup' },
            { kode: '07', nama: 'Nglutung' },
            { kode: '07', nama: 'Nyawangan' },
            { kode: '07', nama: 'Picisan' },
            { kode: '07', nama: 'Sendang' },
            { kode: '07', nama: 'Talang' },
            { kode: '07', nama: 'Tugu' },

            // Kecamatan 08 - Karangrejo
            { kode: '08', nama: 'Babadan' },
            { kode: '08', nama: 'Bungur' },
            { kode: '08', nama: 'Gedangan' },
            { kode: '08', nama: 'Jeli' },
            { kode: '08', nama: 'Karangrejo' },
            { kode: '08', nama: 'Punjul' },
            { kode: '08', nama: 'Sembon' },
            { kode: '08', nama: 'Sukodono' },
            { kode: '08', nama: 'Sukorejo' },
            { kode: '08', nama: 'Sukowidodo' },
            { kode: '08', nama: 'Sukowiyono' },
            { kode: '08', nama: 'Tanjungsari' },
            { kode: '08', nama: 'Tulungrejo' },

            // Kecamatan 09 - Gondang
            { kode: '09', nama: 'Bendo' },
            { kode: '09', nama: 'Bendungan' },
            { kode: '09', nama: 'Blendis' },
            { kode: '09', nama: 'Dukuh' },
            { kode: '09', nama: 'Gondang' },
            { kode: '09', nama: 'Gondosuli' },
            { kode: '09', nama: 'Jarakan' },
            { kode: '09', nama: 'Kendal' },
            { kode: '09', nama: 'Kiping' },
            { kode: '09', nama: 'Macanbang' },
            { kode: '09', nama: 'Mojoarum' },
            { kode: '09', nama: 'Ngrendeng' },
            { kode: '09', nama: 'Notorejo' },
            { kode: '09', nama: 'Rejosari' },
            { kode: '09', nama: 'Sepatan' },
            { kode: '09', nama: 'Sidem' },
            { kode: '09', nama: 'Sidomulyo' },
            { kode: '09', nama: 'Tawing' },
            { kode: '09', nama: 'Tiudan' },
            { kode: '09', nama: 'Wonokromo' },

            // Kecamatan 10 - Kauman
            { kode: '10', nama: 'Bendiljati Kulon' },
            { kode: '10', nama: 'Bendiljati Wetan' },
            { kode: '10', nama: 'Bendilwungu' },
            { kode: '10', nama: 'Bukur' },
            { kode: '10', nama: 'Doroampel' },
            { kode: '10', nama: 'Jabalsari' },
            { kode: '10', nama: 'Junjung' },
            { kode: '10', nama: 'Mirigambar' },
            { kode: '10', nama: 'Podorejo' },
            { kode: '10', nama: 'Sambidoplang' },
            { kode: '10', nama: 'Sambijajar' },
            { kode: '10', nama: 'Sambirobyong' },
            { kode: '10', nama: 'Sumberdadi' },
            { kode: '10', nama: 'Tambakrejo' },
            { kode: '10', nama: 'Trenceng' },
            { kode: '10', nama: 'Wates' },
            { kode: '10', nama: 'Wonorejo' },

            // Kecamatan 11 - Ngunut
            { kode: '11', nama: 'Balesono' },
            { kode: '11', nama: 'Gilang' },
            { kode: '11', nama: 'Kacangan' },
            { kode: '11', nama: 'Kalangan' },
            { kode: '11', nama: 'Kaliwungu' },
            { kode: '11', nama: 'Karangsono' },
            { kode: '11', nama: 'Kromasan' },
            { kode: '11', nama: 'Ngunut' },
            { kode: '11', nama: 'Pandansari' },
            { kode: '11', nama: 'Pulosari' },
            { kode: '11', nama: 'Pulotondo' },
            { kode: '11', nama: 'Purworejo' },
            { kode: '11', nama: 'Samir' },
            { kode: '11', nama: 'Selorejo' },
            { kode: '11', nama: 'Sumberejo Kulon' },
            { kode: '11', nama: 'Sumberejo Wetan' },
            { kode: '11', nama: 'Sumberingin Kidul' },
            { kode: '11', nama: 'Sumberingin Kulon' },

            // Kecamatan 12 - Pucanglaban
            { kode: '12', nama: 'Demuk' },
            { kode: '12', nama: 'Kalidawe' },
            { kode: '12', nama: 'Kaligentong' },
            { kode: '12', nama: 'Manding' },
            { kode: '12', nama: 'Panggungkalak' },
            { kode: '12', nama: 'Panggunguni' },
            { kode: '12', nama: 'Pucanglaban' },
            { kode: '12', nama: 'Sumberbendo' },
            { kode: '12', nama: 'Sumberdadap' },

            // Kecamatan 13 - Rejotangan
            { kode: '13', nama: 'Ariyojeding' },
            { kode: '13', nama: 'Banjarejo' },
            { kode: '13', nama: 'Blimbing' },
            { kode: '13', nama: 'Buntaran' },
            { kode: '13', nama: 'Jatidowo' },
            { kode: '13', nama: 'Karangsari' },
            { kode: '13', nama: 'Pakisrejo' },
            { kode: '13', nama: 'Panjerejo' },
            { kode: '13', nama: 'Rejotangan' },
            { kode: '13', nama: 'Sukorejo Wetan' },
            { kode: '13', nama: 'Sumberagung' },
            { kode: '13', nama: 'Tanen' },
            { kode: '13', nama: 'Tegalrejo' },
            { kode: '13', nama: 'Tenggong' },
            { kode: '13', nama: 'Tenggur' },
            { kode: '13', nama: 'Tugu' },

            // Kecamatan 14 - Kalidawir
            { kode: '14', nama: 'Banyu Urip' },
            { kode: '14', nama: 'Betak' },
            { kode: '14', nama: 'Domasan' },
            { kode: '14', nama: 'Jabon' },
            { kode: '14', nama: 'Joho' },
            { kode: '14', nama: 'Kalibatur' },
            { kode: '14', nama: 'Kalidawir' },
            { kode: '14', nama: 'Karangtalun' },
            { kode: '14', nama: 'Ngubalan' },
            { kode: '14', nama: 'Pagersari' },
            { kode: '14', nama: 'Pakisaji' },
            { kode: '14', nama: 'Rejosari' },
            { kode: '14', nama: 'Salakkembang' },
            { kode: '14', nama: 'Sukorejo Kulon' },
            { kode: '14', nama: 'Tanjung' },
            { kode: '14', nama: 'Tunggangri' },
            { kode: '14', nama: 'Winong' },

            // Kecamatan 15 - Besuki
            { kode: '15', nama: 'Besole' },
            { kode: '15', nama: 'Besuki' },
            { kode: '15', nama: 'Keboireng' },
            { kode: '15', nama: 'Sedayugunung' },
            { kode: '15', nama: 'Siyotobagus' },
            { kode: '15', nama: 'Tanggulkundung' },
            { kode: '15', nama: 'Tanggulturus' },
            { kode: '15', nama: 'Tanggulwelahan' },
            { kode: '15', nama: 'Tulungrejo' },
            { kode: '15', nama: 'Wates Kroyo' },

            // Kecamatan 16 - Campurdarat
            { kode: '16', nama: 'Campurdarat' },
            { kode: '16', nama: 'Gamping' },
            { kode: '16', nama: 'Gedangan' },
            { kode: '16', nama: 'Ngentrong' },
            { kode: '16', nama: 'Pelem' },
            { kode: '16', nama: 'Pojok' },
            { kode: '16', nama: 'Sawo' },
            { kode: '16', nama: 'Tanggung' },
            { kode: '16', nama: 'Wates' },

            // Kecamatan 17 - Bandung
            { kode: '17', nama: 'Bandung' },
            { kode: '17', nama: 'Bantengan' },
            { kode: '17', nama: 'Bulus' },
            { kode: '17', nama: 'Gandong' },
            { kode: '17', nama: 'Kedungwilut' },
            { kode: '17', nama: 'Kesambi' },
            { kode: '17', nama: 'Mergayu' },
            { kode: '17', nama: 'Ngepeh' },
            { kode: '17', nama: 'Nglampir' },
            { kode: '17', nama: 'Ngunggahan' },
            { kode: '17', nama: 'Sebalor' },
            { kode: '17', nama: 'Singgit' },
            { kode: '17', nama: 'Soko' },
            { kode: '17', nama: 'Sukoharjo' },
            { kode: '17', nama: 'Suruhan Kidul' },
            { kode: '17', nama: 'Suruhan Lor' },
            { kode: '17', nama: 'Suwaru' },
            { kode: '17', nama: 'Talun Kulon' },

            // Kecamatan 18 - Pakel
            { kode: '18', nama: 'Bangunjaya' },
            { kode: '18', nama: 'Bangunmulyo' },
            { kode: '18', nama: 'Bono' },
            { kode: '18', nama: 'Duwet' },
            { kode: '18', nama: 'Gebang' },
            { kode: '18', nama: 'Gempolan' },
            { kode: '18', nama: 'Gesikan' },
            { kode: '18', nama: 'Gombang' },
            { kode: '18', nama: 'Kesreman' },
            { kode: '18', nama: 'Ngebong' },
            { kode: '18', nama: 'Ngrance' },
            { kode: '18', nama: 'Pakel' },
            { kode: '18', nama: 'Pecuk' },
            { kode: '18', nama: 'Sambitan' },
            { kode: '18', nama: 'Sanan' },
            { kode: '18', nama: 'Sodo' },
            { kode: '18', nama: 'Sukoanyar' },
            { kode: '18', nama: 'Suwaluh' },
            { kode: '18', nama: 'Tamban' },

            // Kecamatan 19 - Tanggung Gunung
            { kode: '19', nama: 'Jenglungharjo' },
            { kode: '19', nama: 'Kresikan' },
            { kode: '19', nama: 'Ngepoh' },
            { kode: '19', nama: 'Ngrejo' },
            { kode: '19', nama: 'Pakisrejo' },
            { kode: '19', nama: 'Tanggung Gunung' },
            { kode: '19', nama: 'Tenggarejo' },
        ];

        // Insert kelurahans
        for (const kelurahan of kelurahanData) {
            const kecamatanId = kecamatanMap[kelurahan.kode];
            if (kecamatanId) {
                await queryRunner.query(
                    `INSERT IGNORE INTO \`kelurahans\` (\`id_kecamatan\`, \`nama_kelurahan\`) VALUES (?, ?)`,
                    [kecamatanId, kelurahan.nama],
                );
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get id_kabkota for Tulungagung (kode '3504')
        const kabkotas = await queryRunner.query(
            `SELECT id FROM \`kabkotas\` WHERE \`kode\` = ? LIMIT 1`,
            ['3504'], // Tulungagung
        );

        if (kabkotas && kabkotas.length > 0) {
            const idKabkota = kabkotas[0].id as number;
            // Delete kelurahans for kecamatans in Tulungagung
            await queryRunner.query(
                `
                DELETE FROM \`kelurahans\` 
                WHERE \`id_kecamatan\` IN (
                    SELECT id FROM \`kecamatans\` WHERE \`id_kabkota\` = ?
                )
            `,
                [idKabkota],
            );
        }
    }
}
