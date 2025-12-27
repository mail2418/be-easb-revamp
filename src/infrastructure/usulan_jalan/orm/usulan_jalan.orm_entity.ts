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
import { UsulanJalanStatusOrmEntity } from '../../usulan_jalan_status/orm/usulan_jalan_status.orm_entity';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';
import { JalanJenisPemeliharaanOrmEntity } from '../../jalan_jenis_pemeliharaan/orm/jalan_jenis_pemeliharaan.orm_entity';
import { JalanJenisPerkerasanOrmEntity } from '../../jalan_jenis_perkerasan/orm/jalan_jenis_perkerasan.orm_entity';
import { RekeningOrmEntity } from '../../rekening/orm/rekening.orm_entity';
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

    @Column({ name: 'id_asb_jenis', type: 'int' })
    idAsbJenis!: number;

    @Column({ name: 'id_rekening', type: 'int', nullable: true })
    idRekening!: number | null;

    @Column({ name: 'id_rekening_review', type: 'int', nullable: true })
    idRekeningReview!: number | null;

    // Optional Foreign Keys - Jalan
    @Column({ name: 'id_jalan_jenis_pemeliharaan', type: 'int', nullable: true })
    idJalanJenisPemeliharaan!: number | null;

    @Column({ name: 'id_jalan_jenis_perkerasan', type: 'int', nullable: true })
    idJalanJenisPerkerasan!: number | null;

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

    @Column({ name: 'id_reject_verif', type: 'int', nullable: true })
    idRejectVerif!: number | null;

    // Reject reason
    @Column({ name: 'reject_reason', type: 'text', nullable: true })
    rejectReason!: string | null;

    // Verifikator Review At
    @Column({ name: 'verifikator_adbang_review_at', type: 'timestamptz', nullable: true })
    verifikatorAdbangReviewAt!: Date | null;

    @Column({ name: 'verifikator_bpkad_review_at', type: 'timestamptz', nullable: true })
    verifikatorBpkadReviewAt!: Date | null;

    @Column({ name: 'verifikator_bappeda_review_at', type: 'timestamptz', nullable: true })
    verifikatorBappedaReviewAt!: Date | null;

    @Column({ name: 'reject_verifikator_review_at', type: 'timestamptz', nullable: true })
    rejectVerifikatorReviewAt!: Date | null;

    // Core fields
    @Column({ name: 'is_include_ppn', type: 'boolean', default: false })
    isIncludePpn!: boolean;

    @Column({ name: 'tahun_anggaran', type: 'int' })
    tahunAnggaran!: number;

    @Column({ name: 'nama_usulan', type: 'text' })
    namaUsulan!: string;

    @Column({ name: 'uraian', type: 'text', nullable: true })
    uraian!: string | null;

    @Column({ name: 'spesifikasi', type: 'text' })
    spesifikasi!: string;

    @Column({ name: 'satuan', type: 'varchar', length: 255, nullable: true })
    satuan!: string | null;

    @Column({ name: 'deskripsi_desain', type: 'text', nullable: true })
    deskripsiDesain!: string | null;

    @Column({ name: 'lebar', type: 'double precision', nullable: true })
    lebar!: number | null;

    @Column({ name: 'total_harga', type: 'decimal', precision: 15, scale: 2, nullable: true })
    totalHarga!: number | null;

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

    @ManyToOne(() => AsbJenisOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis!: AsbJenisOrmEntity;

    @ManyToOne(() => RekeningOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_rekening' })
    rekening!: RekeningOrmEntity | null;

    @ManyToOne(() => RekeningOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_rekening_review' })
    rekeningReview!: RekeningOrmEntity | null;

    // Relationships - Optional FKs (SET NULL)
    @ManyToOne(() => JalanJenisPemeliharaanOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_jalan_jenis_pemeliharaan' })
    jalanJenisPemeliharaan!: JalanJenisPemeliharaanOrmEntity | null;

    @ManyToOne(() => JalanJenisPerkerasanOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_jalan_jenis_perkerasan' })
    jalanJenisPerkerasan!: JalanJenisPerkerasanOrmEntity | null;

    @ManyToOne(() => KabKotaOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_kabkota' })
    kabkota!: KabKotaOrmEntity | null;

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
    @JoinColumn({ name: 'id_reject_verif' })
    rejectVerifikator!: UserOrmEntity | null;
}
