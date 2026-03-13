import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedKelurahansTulungagung1764852278616 implements MigrationInterface {
    name = 'SeedKelurahansTulungagung1764852278616';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, we need to get kecamatan IDs based on kode_kecamatan
        // Then insert kelurahans with the correct id_kecamatan

        await queryRunner.query(`
            INSERT INTO "kelurahans" ("id_kecamatan", "nama_kelurahan")
            SELECT k.id, v.nama_kelurahan
            FROM (VALUES
                ('01', 'Bago'), ('01', 'Botoran'), ('01', 'Jepun'), ('01', 'Kampungdalem'), ('01', 'Karangwaru'),
                ('01', 'Kauman'), ('01', 'Kedungsoko'), ('01', 'Kenayan'), ('01', 'Kepatihan'), ('01', 'Kutoanyar'),
                ('01', 'Panggungrejo'), ('01', 'Sembung'), ('01', 'Tamanan'), ('01', 'Tertek'),
                
                ('02', 'Beji'), ('02', 'Bono'), ('02', 'Boyolangu'), ('02', 'Gedangsewu'), ('02', 'Karangrejo'),
                ('02', 'Kendalbulur'), ('02', 'Kepuh'), ('02', 'Moyoketen'), ('02', 'Ngranti'), ('02', 'Pucungkidul'),
                ('02', 'Sanggrahan'), ('02', 'Serut'), ('02', 'Sobontoro'), ('02', 'Tanjungsari'), ('02', 'Wajak Kidul'),
                ('02', 'Wajak Lor'), ('02', 'Waung'),
                
                ('03', 'Bangoan'), ('03', 'Boro'), ('03', 'Bulusari'), ('03', 'Gendingan'), ('03', 'Kedungwaru'),
                ('03', 'Ketanon'), ('03', 'Loderesan'), ('03', 'Majan'), ('03', 'Mangunsari'), ('03', 'Ngujang'),
                ('03', 'Plandaan'), ('03', 'Plosokandang'), ('03', 'Rejoagung'), ('03', 'Ringinpitu'), ('03', 'Simo'),
                ('03', 'Tapan'), ('03', 'Tawangsari'), ('03', 'Tunggulsari'), ('03', 'Winong'),
                
                ('04', 'Banjarsari'), ('04', 'Batokan'), ('04', 'Bendosari'), ('04', 'Kepuhrejo'), ('04', 'Mojoagung'),
                ('04', 'Ngantru'), ('04', 'Padangan'), ('04', 'Pakel'), ('04', 'Pinggirsari'), ('04', 'Pojok'),
                ('04', 'Pucunglor'), ('04', 'Pulerejo'), ('04', 'Srikaton'),
                
                ('05', 'Balerejo'), ('05', 'Banaran'), ('05', 'Batangsaren'), ('05', 'Bolorejo'), ('05', 'Jatimulyo'),
                ('05', 'Kalangbret'), ('05', 'Karanganom'), ('05', 'Kates'), ('05', 'Kauman'), ('05', 'Mojosari'),
                ('05', 'Panggungrejo'), ('05', 'Pucangan'), ('05', 'Sidorejo'),
                
                ('06', 'Gambiran'), ('06', 'Gondanggunung'), ('06', 'Kedungcangkring'), ('06', 'Kradinan'), ('06', 'Mulyosari'),
                ('06', 'Pagerwojo'), ('06', 'Penjore'), ('06', 'Samar'), ('06', 'Segawe'), ('06', 'Sidomulyo'),
                ('06', 'Wonorejo'),
                
                ('07', 'Dono'), ('07', 'Geger'), ('07', 'Kedoyo'), ('07', 'Krosok'), ('07', 'Nglurup'),
                ('07', 'Nglutung'), ('07', 'Nyawangan'), ('07', 'Picisan'), ('07', 'Sendang'), ('07', 'Talang'),
                ('07', 'Tugu'),
                
                ('08', 'Babadan'), ('08', 'Bungur'), ('08', 'Gedangan'), ('08', 'Jeli'), ('08', 'Karangrejo'),
                ('08', 'Punjul'), ('08', 'Sembon'), ('08', 'Sukodono'), ('08', 'Sukorejo'), ('08', 'Sukowidodo'),
                ('08', 'Sukowiyono'), ('08', 'Tanjungsari'), ('08', 'Tulungrejo'),
                
                ('09', 'Bendo'), ('09', 'Bendungan'), ('09', 'Blendis'), ('09', 'Dukuh'), ('09', 'Gondang'),
                ('09', 'Gondosuli'), ('09', 'Jarakan'), ('09', 'Kendal'), ('09', 'Kiping'), ('09', 'Macanbang'),
                ('09', 'Mojoarum'), ('09', 'Ngrendeng'), ('09', 'Notorejo'), ('09', 'Rejosari'), ('09', 'Sepatan'),
                ('09', 'Sidem'), ('09', 'Sidomulyo'), ('09', 'Tawing'), ('09', 'Tiudan'), ('09', 'Wonokromo'),
                
                ('10', 'Bendiljati Kulon'), ('10', 'Bendiljati Wetan'), ('10', 'Bendilwungu'), ('10', 'Bukur'), ('10', 'Doroampel'),
                ('10', 'Jabalsari'), ('10', 'Junjung'), ('10', 'Mirigambar'), ('10', 'Podorejo'), ('10', 'Sambidoplang'),
                ('10', 'Sambijajar'), ('10', 'Sambirobyong'), ('10', 'Sumberdadi'), ('10', 'Tambakrejo'), ('10', 'Trenceng'),
                ('10', 'Wates'), ('10', 'Wonorejo'),
                
                ('11', 'Balesono'), ('11', 'Gilang'), ('11', 'Kacangan'), ('11', 'Kalangan'), ('11', 'Kaliwungu'),
                ('11', 'Karangsono'), ('11', 'Kromasan'), ('11', 'Ngunut'), ('11', 'Pandansari'), ('11', 'Pulosari'),
                ('11', 'Pulotondo'), ('11', 'Purworejo'), ('11', 'Samir'), ('11', 'Selorejo'), ('11', 'Sumberejo Kulon'),
                ('11', 'Sumberejo Wetan'), ('11', 'Sumberingin Kidul'), ('11', 'Sumberingin Kulon'),
                
                ('12', 'Demuk'), ('12', 'Kalidawe'), ('12', 'Kaligentong'), ('12', 'Manding'), ('12', 'Panggungkalak'),
                ('12', 'Panggunguni'), ('12', 'Pucanglaban'), ('12', 'Sumberbendo'), ('12', 'Sumberdadap'),
                
                ('13', 'Ariyojeding'), ('13', 'Banjarejo'), ('13', 'Blimbing'), ('13', 'Buntaran'), ('13', 'Jatidowo'),
                ('13', 'Karangsari'), ('13', 'Pakisrejo'), ('13', 'Panjerejo'), ('13', 'Rejotangan'), ('13', 'Sukorejo Wetan'),
                ('13', 'Sumberagung'), ('13', 'Tanen'), ('13', 'Tegalrejo'), ('13', 'Tenggong'), ('13', 'Tenggur'),
                ('13', 'Tugu'),
                
                ('14', 'Banyu Urip'), ('14', 'Betak'), ('14', 'Domasan'), ('14', 'Jabon'), ('14', 'Joho'),
                ('14', 'Kalibatur'), ('14', 'Kalidawir'), ('14', 'Karangtalun'), ('14', 'Ngubalan'), ('14', 'Pagersari'),
                ('14', 'Pakisaji'), ('14', 'Rejosari'), ('14', 'Salakkembang'), ('14', 'Sukorejo Kulon'), ('14', 'Tanjung'),
                ('14', 'Tunggangri'), ('14', 'Winong'),
                
                ('15', 'Besole'), ('15', 'Besuki'), ('15', 'Keboireng'), ('15', 'Sedayugunung'), ('15', 'Siyotobagus'),
                ('15', 'Tanggulkundung'), ('15', 'Tanggulturus'), ('15', 'Tanggulwelahan'), ('15', 'Tulungrejo'), ('15', 'Wates Kroyo'),
                
                ('16', 'Campurdarat'), ('16', 'Gamping'), ('16', 'Gedangan'), ('16', 'Ngentrong'), ('16', 'Pelem'),
                ('16', 'Pojok'), ('16', 'Sawo'), ('16', 'Tanggung'), ('16', 'Wates'),
                
                ('17', 'Bandung'), ('17', 'Bantengan'), ('17', 'Bulus'), ('17', 'Gandong'), ('17', 'Kedungwilut'),
                ('17', 'Kesambi'), ('17', 'Mergayu'), ('17', 'Ngepeh'), ('17', 'Nglampir'), ('17', 'Ngunggahan'),
                ('17', 'Sebalor'), ('17', 'Singgit'), ('17', 'Soko'), ('17', 'Sukoharjo'), ('17', 'Suruhan Kidul'),
                ('17', 'Suruhan Lor'), ('17', 'Suwaru'), ('17', 'Talun Kulon'),
                
                ('18', 'Bangunjaya'), ('18', 'Bangunmulyo'), ('18', 'Bono'), ('18', 'Duwet'), ('18', 'Gebang'),
                ('18', 'Gempolan'), ('18', 'Gesikan'), ('18', 'Gombang'), ('18', 'Kesreman'), ('18', 'Ngebong'),
                ('18', 'Ngrance'), ('18', 'Pakel'), ('18', 'Pecuk'), ('18', 'Sambitan'), ('18', 'Sanan'),
                ('18', 'Sodo'), ('18', 'Sukoanyar'), ('18', 'Suwaluh'), ('18', 'Tamban'),
                
                ('19', 'Jenglungharjo'), ('19', 'Kresikan'), ('19', 'Ngepoh'), ('19', 'Ngrejo'), ('19', 'Pakisrejo'),
                ('19', 'Tanggung Gunung'), ('19', 'Tenggarejo')
            ) AS v(kode_kecamatan, nama_kelurahan)
            JOIN "kecamatans" k ON k.kode_kecamatan = v.kode_kecamatan AND k.id_kabkota = 62
            ON CONFLICT DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete kelurahans for kecamatans in Tulungagung (id_kabkota = 62)
        await queryRunner.query(`
            DELETE FROM "kelurahans" 
            WHERE "id_kecamatan" IN (
                SELECT id FROM "kecamatans" WHERE "id_kabkota" = 62
            );
        `);
    }
}
