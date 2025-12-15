import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { OpdOrmEntity } from '../../opd/orm/opd.orm_entity';
import { JalanJenisPerkerasanOrmEntity } from '../../jalan_jenis_perkerasan/orm/jalan_jenis_perkerasan.orm_entity';
import { JalanMutuBetonOrmEntity } from '../../jalan_mutu_beton/orm/jalan_mutu_beton.orm_entity';
import { JalanSpesifikasiDesainLenturOrmEntity } from '../../jalan_spesifikasi_desain_lentur/orm/jalan_spesifikasi_desain_lentur.orm_entity';
import { JalanSpesifikasiDesainKakuOrmEntity } from '../../jalan_spesifikasi_desain_kaku/orm/jalan_spesifikasi_desain_kaku.orm_entity';
import { JalanRuangLingkupPerkerasanLenturOrmEntity } from '../../jalan_ruang_lingkup_perkerasan_lentur/orm/jalan_ruang_lingkup_perkerasan_lentur.orm_entity';
import { JalanRuangLingkupPerkerasanKakuOrmEntity } from '../../jalan_ruang_lingkup_perkerasan_kaku/orm/jalan_ruang_lingkup_perkerasan_kaku.orm_entity';
import { UsulanJalanStatusOrmEntity } from '../../usulan_jalan_status/orm/usulan_jalan_status.orm_entity';
import { KabKotaOrmEntity } from '../../kabkota/orm/kabkota.orm_entity';
import { KecamatanOrmEntity } from '../../kecamatan/orm/kecamatan.orm_entity';
import { KelurahanOrmEntity } from '../../kelurahan/orm/kelurahan.orm_entity';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';

@Entity('usulan_jalan')
export class UsulanJalanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // Required Foreign Keys
    @Column({ name: 'id_opd', type: 'int' })
    idOpd!: number;

    @Column({ name: 'id_usulan_jalan_status', type: 'int' })
    idUsulanJalanStatus!: number;

    @Column({ name: 'id_jalan_jenis_perkerasan', type: 'int' })
    idJalanJenisPerkerasan!: number;

    // Optional Foreign Keys - Jenis Perkerasan Review
    @Column({ name: 'id_jalan_jenis_perkerasan_review', type: 'int', nullable: true })
    idJalanJenisPerkerasanReview!: number | null;

    // Optional Foreign Keys - Mutu Beton
    @Column({ name: 'id_mutu_beton', type: 'int', nullable: true })
    idMutuBeton!: number | null;

    @Column({ name: 'id_mutu_beton_review', type: 'int', nullable: true })
    idMutuBetonReview!: number | null;

    // Optional Foreign Keys - Spesifikasi Desain Lentur
    @Column({ name: 'id_spesifikasi_desain_lentur', type: 'int', nullable: true })
    idSpesifikasiDesainLentur!: number | null;

    @Column({ name: 'id_spesifikasi_desain_lentur_review', type: 'int', nullable: true })
    idSpesifikasiDesainLenturReview!: number | null;

    // Optional Foreign Keys - Spesifikasi Desain Kaku
    @Column({ name: 'id_spesifikasi_desain_kaku', type: 'int', nullable: true })
    idSpesifikasiDesainKaku!: number | null;

    @Column({ name: 'id_spesifikasi_desain_kaku_review', type: 'int', nullable: true })
    idSpesifikasiDesainKakuReview!: number | null;

    // Optional Foreign Keys - Ruang Lingkup Lentur
    @Column({ name: 'id_ruang_lingkup_perkerasan_lentur', type: 'int', nullable: true })
    idRuangLingkupPerkerasanLentur!: number | null;

    @Column({ name: 'id_ruang_lingkup_perkerasan_lentur_review', type: 'int', nullable: true })
    idRuangLingkupPerkerasanLenturReview!: number | null;

    // Optional Foreign Keys - Ruang Lingkup Kaku
    @Column({ name: 'id_ruang_lingkup_perkerasan_kaku', type: 'int', nullable: true })
    idRuangLingkupPerkerasanKaku!: number | null;

    @Column({ name: 'id_ruang_lingkup_perkerasan_kaku_review', type: 'int', nullable: true })
    idRuangLingkupPerkerasanKakuReview!: number | null;

    // Optional Foreign Keys - Location
    @Column({ name: 'id_kabkota', type: 'int', nullable: true })
    idKabkota!: number | null;

    @Column({ name: 'id_kecamatan', type: 'int', nullable: true })
    idKecamatan!: number | null;

    @Column({ name: 'id_kelurahan', type: 'int', nullable: true })
    idKelurahan!: number | null;

    // Optional Foreign Keys - Verifikators
    @Column({ name: 'id_verifikator_adbang', type: 'int', nullable: true })
    idVerifikatorAdbang!: number | null;

    @Column({ name: 'id_verifikator_bpkad', type: 'int', nullable: true })
    idVerifikatorBpkad!: number | null;

    @Column({ name: 'id_verifikator_bappeda', type: 'int', nullable: true })
    idVerifikatorBappeda!: number | null;

    @Column({ name: 'reject_verif_id', type: 'int', nullable: true })
    rejectVerifId!: number | null;

    // Core fields
    @Column({ name: 'tahun_anggaran', type: 'int' })
    tahunAnggaran!: number;

    @Column({ name: 'nama_usulan_jalan', type: 'text' })
    namaUsulanJalan!: string;

    @Column({ name: 'alamat', type: 'text' })
    alamat!: string;

    @Column({ name: 'lebar_jalan', type: 'double precision' })
    lebarJalan!: number;

    @Column({ name: 'lebar_jalan_review', type: 'double precision', nullable: true })
    lebarJalanReview!: number | null;

    @Column({ name: 'keterangan_tambahan', type: 'text', nullable: true })
    keteranganTambahan!: string | null;

    @Column({ name: 'keterangan_tambahan_review', type: 'text', nullable: true })
    keteranganTambahanReview!: string | null;

    // Verification timestamps
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

    // Timestamps
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt!: Date | null;

    // Relationships - Required FKs (CASCADE)
    @ManyToOne(() => OpdOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_opd' })
    opd!: OpdOrmEntity;

    @ManyToOne(() => UsulanJalanStatusOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usulan_jalan_status' })
    usulanJalanStatus!: UsulanJalanStatusOrmEntity;

    @ManyToOne(() => JalanJenisPerkerasanOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_jalan_jenis_perkerasan' })
    jalanJenisPerkerasan!: JalanJenisPerkerasanOrmEntity;

    // Relationships - Optional FKs (SET NULL)
    @ManyToOne(() => JalanJenisPerkerasanOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_jalan_jenis_perkerasan_review' })
    jalanJenisPerkerasanReview!: JalanJenisPerkerasanOrmEntity;

    @ManyToOne(() => JalanMutuBetonOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_mutu_beton' })
    mutuBeton!: JalanMutuBetonOrmEntity;

    @ManyToOne(() => JalanMutuBetonOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_mutu_beton_review' })
    mutuBetonReview!: JalanMutuBetonOrmEntity;

    @ManyToOne(() => JalanSpesifikasiDesainLenturOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_spesifikasi_desain_lentur' })
    spesifikasiDesainLentur!: JalanSpesifikasiDesainLenturOrmEntity;

    @ManyToOne(() => JalanSpesifikasiDesainLenturOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_spesifikasi_desain_lentur_review' })
    spesifikasiDesainLenturReview!: JalanSpesifikasiDesainLenturOrmEntity;

    @ManyToOne(() => JalanSpesifikasiDesainKakuOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_spesifikasi_desain_kaku' })
    spesifikasiDesainKaku!: JalanSpesifikasiDesainKakuOrmEntity;

    @ManyToOne(() => JalanSpesifikasiDesainKakuOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_spesifikasi_desain_kaku_review' })
    spesifikasiDesainKakuReview!: JalanSpesifikasiDesainKakuOrmEntity;

    @ManyToOne(() => JalanRuangLingkupPerkerasanLenturOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_ruang_lingkup_perkerasan_lentur' })
    ruangLingkupPerkerasanLentur!: JalanRuangLingkupPerkerasanLenturOrmEntity;

    @ManyToOne(() => JalanRuangLingkupPerkerasanLenturOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_ruang_lingkup_perkerasan_lentur_review' })
    ruangLingkupPerkerasanLenturReview!: JalanRuangLingkupPerkerasanLenturOrmEntity;

    @ManyToOne(() => JalanRuangLingkupPerkerasanKakuOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_ruang_lingkup_perkerasan_kaku' })
    ruangLingkupPerkerasanKaku!: JalanRuangLingkupPerkerasanKakuOrmEntity;

    @ManyToOne(() => JalanRuangLingkupPerkerasanKakuOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_ruang_lingkup_perkerasan_kaku_review' })
    ruangLingkupPerkerasanKakuReview!: JalanRuangLingkupPerkerasanKakuOrmEntity;

    @ManyToOne(() => KabKotaOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_kabkota' })
    kabkota!: KabKotaOrmEntity;

    @ManyToOne(() => KecamatanOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_kecamatan' })
    kecamatan!: KecamatanOrmEntity | null;

    @ManyToOne(() => KelurahanOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_kelurahan' })
    kelurahan!: KelurahanOrmEntity | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_verifikator_adbang' })
    verifikatorAdbang!: UserOrmEntity | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_verifikator_bpkad' })
    verifikatorBpkad!: UserOrmEntity | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_verifikator_bappeda' })
    verifikatorBappeda!: UserOrmEntity | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'reject_verif_id' })
    rejectVerifikator!: UserOrmEntity | null;
}


