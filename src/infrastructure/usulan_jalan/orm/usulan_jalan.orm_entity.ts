import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';
import { JalanJenisPemeliharaanOrmEntity } from '../../jalan_jenis_pemeliharaan/orm/jalan_jenis_pemeliharaan.orm_entity';
import { JalanJenisPerkerasanOrmEntity } from '../../jalan_jenis_perkerasan/orm/jalan_jenis_perkerasan.orm_entity';
import { KabKotaOrmEntity } from '../../kabkota/orm/kabkota.orm_entity';
import { KecamatanOrmEntity } from '../../kecamatan/orm/kecamatan.orm_entity';
import { KelurahanOrmEntity } from '../../kelurahan/orm/kelurahan.orm_entity';
import { OpdOrmEntity } from '../../opd/orm/opd.orm_entity';
import { RekeningOrmEntity } from '../../rekening/orm/rekening.orm_entity';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';
import { VerifikatorOrmEntity } from '../../verifikator/orm/verifikator.orm_entity';
import { UsulanJalanStatusOrmEntity } from './usulan_jalan_status.orm_entity';

@Entity('usulan_jalan')
export class UsulanJalanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_opd', type: 'int' })
    idOpd!: number;

    @Column({ name: 'id_usulan_jalan_status', type: 'int', default: 1 })
    idUsulanJalanStatus!: number;

    @Column({ name: 'id_asb_jenis', type: 'int', nullable: true })
    idAsbJenis!: number | null;

    @Column({ name: 'id_jalan_jenis_pemeliharaan', type: 'int', nullable: true })
    idJalanJenisPemeliharaan!: number | null;

    @Column({ name: 'id_jalan_jenis_perkerasan', type: 'int', nullable: true })
    idJalanJenisPerkerasan!: number | null;

    @Column({ name: 'id_jalan_jenis_perkerasan_review', type: 'int', nullable: true })
    idJalanJenisPerkerasanReview!: number | null;

    @Column({ name: 'id_rekening', type: 'int', nullable: true })
    idRekening!: number | null;

    @Column({ name: 'id_rekening_review', type: 'int', nullable: true })
    idRekeningReview!: number | null;

    @Column({ name: 'id_kabkota', type: 'int', nullable: true })
    idKabkota!: number | null;

    @Column({ name: 'id_kecamatan', type: 'int', nullable: true })
    idKecamatan!: number | null;

    @Column({ name: 'id_kelurahan', type: 'int', nullable: true })
    idKelurahan!: number | null;

    @Column({ name: 'id_verifikator_adbang', type: 'int', nullable: true })
    idVerifikatorAdbang!: number | null;

    @Column({ name: 'id_verifikator_bpkad', type: 'int', nullable: true })
    idVerifikatorBpkad!: number | null;

    @Column({ name: 'id_verifikator_bappeda', type: 'int', nullable: true })
    idVerifikatorBappeda!: number | null;

    @Column({ name: 'id_reject_verif', type: 'int', nullable: true })
    idRejectVerif!: number | null;

    @Column({ name: 'tahun_anggaran', type: 'int', nullable: true })
    tahunAnggaran!: number | null;

    @Column({ name: 'nama_usulan', type: 'text' })
    namaUsulan!: string;

    @Column({ type: 'text', nullable: true })
    alamat!: string | null;

    @Column({ type: 'float', nullable: true })
    lebar!: number | null;

    @Column({ name: 'lebar_jalan_review', type: 'float', nullable: true })
    lebarJalanReview!: number | null;

    @Column({ name: 'keterangan_tambahan', type: 'text', nullable: true })
    keteranganTambahan!: string | null;

    @Column({ name: 'keterangan_tambahan_review', type: 'text', nullable: true })
    keteranganTambahanReview!: string | null;

    @Column({ name: 'data_ruang_lingkup', type: 'jsonb', nullable: true })
    dataRuangLingkup!: Record<string, unknown>[] | null;

    @Column({ name: 'data_smkk', type: 'jsonb', nullable: true })
    dataSmkk!: Record<string, unknown>[] | null;

    @Column({ name: 'verified_adbang_at', type: 'timestamptz', nullable: true })
    verifiedAdbangAt!: Date | null;

    @Column({ name: 'verified_bpkad_at', type: 'timestamptz', nullable: true })
    verifiedBpkadAt!: Date | null;

    @Column({ name: 'verified_bappeda_at', type: 'timestamptz', nullable: true })
    verifiedBappedaAt!: Date | null;

    @Column({ name: 'rejected_at', type: 'timestamptz', nullable: true })
    rejectedAt!: Date | null;

    @Column({ name: 'reject_reason', type: 'text', nullable: true })
    rejectReason!: string | null;

    @ManyToOne(() => OpdOrmEntity)
    @JoinColumn({ name: 'id_opd' })
    opd?: OpdOrmEntity;

    @ManyToOne(() => UsulanJalanStatusOrmEntity)
    @JoinColumn({ name: 'id_usulan_jalan_status' })
    usulanJalanStatus?: UsulanJalanStatusOrmEntity;

    @ManyToOne(() => AsbJenisOrmEntity)
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis?: AsbJenisOrmEntity;

    @ManyToOne(() => JalanJenisPemeliharaanOrmEntity)
    @JoinColumn({ name: 'id_jalan_jenis_pemeliharaan' })
    jalanJenisPemeliharaan?: JalanJenisPemeliharaanOrmEntity;

    @ManyToOne(() => JalanJenisPerkerasanOrmEntity)
    @JoinColumn({ name: 'id_jalan_jenis_perkerasan' })
    jalanJenisPerkerasan?: JalanJenisPerkerasanOrmEntity;

    @ManyToOne(() => JalanJenisPerkerasanOrmEntity)
    @JoinColumn({ name: 'id_jalan_jenis_perkerasan_review' })
    jalanJenisPerkerasanReview?: JalanJenisPerkerasanOrmEntity;

    @ManyToOne(() => RekeningOrmEntity)
    @JoinColumn({ name: 'id_rekening' })
    rekening?: RekeningOrmEntity;

    @ManyToOne(() => RekeningOrmEntity)
    @JoinColumn({ name: 'id_rekening_review' })
    rekeningReview?: RekeningOrmEntity;

    @ManyToOne(() => KabKotaOrmEntity)
    @JoinColumn({ name: 'id_kabkota' })
    kabkota?: KabKotaOrmEntity;

    @ManyToOne(() => KecamatanOrmEntity)
    @JoinColumn({ name: 'id_kecamatan' })
    kecamatan?: KecamatanOrmEntity;

    @ManyToOne(() => KelurahanOrmEntity)
    @JoinColumn({ name: 'id_kelurahan' })
    kelurahan?: KelurahanOrmEntity;

    @ManyToOne(() => VerifikatorOrmEntity)
    @JoinColumn({ name: 'id_verifikator_adbang' })
    verifikatorAdbang?: VerifikatorOrmEntity;

    @ManyToOne(() => VerifikatorOrmEntity)
    @JoinColumn({ name: 'id_verifikator_bpkad' })
    verifikatorBpkad?: VerifikatorOrmEntity;

    @ManyToOne(() => VerifikatorOrmEntity)
    @JoinColumn({ name: 'id_verifikator_bappeda' })
    verifikatorBappeda?: VerifikatorOrmEntity;

    @ManyToOne(() => UserOrmEntity)
    @JoinColumn({ name: 'id_reject_verif' })
    rejectVerifikator?: UserOrmEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
