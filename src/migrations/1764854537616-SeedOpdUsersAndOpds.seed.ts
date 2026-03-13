import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcryptjs';

export class SeedOpdUsersAndOpds1764854537616 implements MigrationInterface {
    name = 'SeedOpdUsersAndOpds1764854537616';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Hash password "12345678"
        const hashedPassword = await bcrypt.hash('12345678', 10);

        // Data OPD dengan username, OPD lengkap, dan alias
        const opdData = [
            { username: 'UserDP', opd: 'Dinas Pendidikan', alias: 'DP' },
            { username: 'UserDK', opd: 'Dinas Kesehatan', alias: 'DK' },
            { username: 'UserDPUDPR', opd: 'Dinas Pekerjaan Umum Dan Penataan Ruang', alias: 'DPUDPR' },
            { username: 'UserDPKP', opd: 'Dinas Perumahan, Kawasan Permukiman', alias: 'DPKP' },
            { username: 'UserDLH', opd: 'Dinas Lingkungan Hidup', alias: 'DLH' },
            { username: 'UserBPBD', opd: 'Badan Penanggulangan Bencana Daerah', alias: 'BPBD' },
            { username: 'UserSPPP', opd: 'Satuan Polisi Pamong Praja', alias: 'SPPP' },
            { username: 'UserDPKDP', opd: 'Dinas Pemadam Kebakaran Dan Penyelamatan', alias: 'DPKDP' },
            { username: 'UserDS', opd: 'Dinas Sosial', alias: 'DS' },
            { username: 'UserDTKDT', opd: 'Dinas Tenaga Kerja Dan Transmigrasi', alias: 'DTKDT' },
            { username: 'UserDKBPPDPA', opd: 'Dinas Keluarga Berencana, Pemberdayaan Perempuan Dan Perlindungan Anak', alias: 'DKBPPDPA' },
            { username: 'UserDKP', opd: 'Dinas Ketahanan Pangan', alias: 'DKP' },
            { username: 'UserDKDPS', opd: 'Dinas Kependudukan Dan Pencatatan Sipil', alias: 'DKDPS' },
            { username: 'UserDPMDD', opd: 'Dinas Pemberdayaan Masyarakat Dan Desa', alias: 'DPMDD' },
            { username: 'UserDPerhubungan', opd: 'Dinas Perhubungan', alias: 'DPerhubungan' },
            { username: 'UserDKDI', opd: 'Dinas Komunikasi Dan Informatika', alias: 'DKDI' },
            { username: 'UserDKDUM', opd: 'Dinas Koperasi Dan Usaha Mikro', alias: 'DKDUM' },
            { username: 'UserDPMDPTSP', opd: 'Dinas Penanaman Modal Dan Pelayanan Terpadu Satu Pintu', alias: 'DPMPTSP' },
            { username: 'UserDPDO', opd: 'Dinas Pemuda Dan Olahraga', alias: 'DPDO' },
            { username: 'UserDKDPariwisata', opd: 'Dinas Kebudayaan Dan Pariwisata', alias: 'DKDP' },
            { username: 'UserDPDK', opd: 'Dinas Perpustakaan Dan Kearsipan', alias: 'DPDK' },
            { username: 'UserDPerikanan', opd: 'Dinas Perikanan', alias: 'DPerikanan' },
            { username: 'UserDPertanian', opd: 'Dinas Pertanian', alias: 'DPertanian' },
            { username: 'UserDPDKH', opd: 'Dinas Peternakan Dan Kesehatan Hewan', alias: 'DPDKH' },
            { username: 'UserDPDP', opd: 'Dinas Perindustrian Dan Perdagangan', alias: 'DPDP' },
            { username: 'UserSD', opd: 'Sekretariat Daerah', alias: 'SD' },
            { username: 'UserBAP', opd: 'Bagian Administrasi Pembangunan', alias: 'BAP' },
            { username: 'UserSDPRD', opd: 'Sekretariat DPRD', alias: 'SDPRD' },
            { username: 'UserBPPD', opd: 'Badan Perencanaan Pembangunan Daerah', alias: 'BPPD' },
            { username: 'UserBPKDAD', opd: 'Badan Pengelolaan Keuangan Dan Aset Daerah', alias: 'BPKDAD' },
            { username: 'UserBPD', opd: 'Badan Pendapatan Daerah', alias: 'BPD' },
            { username: 'UserBKDPSDM', opd: 'Badan Kepegawaian Dan Pengembangan Sumber Daya Manusia', alias: 'BKDPSDM' },
            { username: 'UserBRDID', opd: 'Badan Riset Dan Inovasi Daerah', alias: 'BRDID' },
            { username: 'UserID', opd: 'Inspektorat Daerah', alias: 'ID' }
        ];

        // Insert users and OPDs
        for (const data of opdData) {
            // Insert user
            await queryRunner.query(`
                INSERT INTO "users" ("username", "password_hash", "roles")
                VALUES ($1, $2, ARRAY['opd'])
                ON CONFLICT ("username") DO NOTHING
            `, [data.username, hashedPassword]);

            // Get user ID
            const userResult = await queryRunner.query(`
                SELECT id FROM "users" WHERE "username" = $1
            `, [data.username]);

            if (userResult.length > 0) {
                const userId = userResult[0].id;

                // Insert OPD
                await queryRunner.query(`
                    INSERT INTO "opds" ("opd", "alias", "id_user")
                    VALUES ($1, $2, $3)
                    ON CONFLICT ("opd") DO NOTHING
                `, [data.opd, data.alias, userId]);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Delete OPDs and users created by this seed
        const usernames = [
            'UserDP', 'UserDK', 'UserDPUDPR', 'UserDPKP', 'UserDLH', 'UserBPBD', 'UserSPPP',
            'UserDPKDP', 'UserDS', 'UserDTKDT', 'UserDKBPPDPA', 'UserDKP', 'UserDKDPS',
            'UserDPMDD', 'UserDPerhubungan', 'UserDKDI', 'UserDKDUM', 'UserDPMDPTSP',
            'UserDPDO', 'UserDKDPariwisata', 'UserDPDK', 'UserDPerikanan', 'UserDPertanian',
            'UserDPDKH', 'UserDPDP', 'UserSD', 'UserBAP', 'UserSDPRD', 'UserBPPD',
            'UserBPKDAD', 'UserBPD', 'UserBKDPSDM', 'UserBRDID', 'UserID'
        ];

        // Delete OPDs first (due to foreign key)
        await queryRunner.query(`
            DELETE FROM "opds" 
            WHERE "id_user" IN (
                SELECT id FROM "users" WHERE "username" = ANY($1)
            )
        `, [usernames]);

        // Delete users
        await queryRunner.query(`
            DELETE FROM "users" WHERE "username" = ANY($1)
        `, [usernames]);
    }
}
