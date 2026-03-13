import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';
import { AsbStatusOrmEntity } from '../../asb_status/orm/asb_status.orm_entity';
import { OpdOrmEntity } from '../../opd/orm/opd.orm_entity';
import { AsbTipeBangunanOrmEntity } from '../../asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity';
import { RekeningOrmEntity } from '../../rekening/orm/rekening.orm_entity';
import { KabKotaOrmEntity } from '../../kabkota/orm/kabkota.orm_entity';
import { AsbKlasifikasiOrmEntity } from '../../asb_klasifikasi/orm/asb_klasifikasi.orm_entity';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';
import { AsbDetailOrmEntity } from '../../asb_detail/orm/asb_detail.orm_entity';
import { AsbDetailReviewOrmEntity } from '../../asb_detail_review/orm/asb_detail_review.orm_entity';
import { AsbBipekStandardOrmEntity } from '../../asb_bipek_standard/orm/asb_bipek_standard.orm_entity';
import { AsbBipekStandardReviewOrmEntity } from '../../asb_bipek_standard_review/orm/asb_bipek_standard_review.orm_entity';
import { AsbBipekNonStdOrmEntity } from '../../asb_bipek_non_std/orm/asb_bipek_non_std.orm_entity';
import { AsbBipekNonStdReviewOrmEntity } from '../../asb_bipek_non_std_review/orm/asb_bipek_non_std_review.orm_entity';

@Entity('asb')
export class AsbOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // Required Foreign Keys
    @Column({ name: 'id_asb_jenis', type: 'int' })
    idAsbJenis: number;

    @Column({ name: 'id_asb_status', type: 'int' })
    idAsbStatus: number;

    @Column({ name: 'id_opd', type: 'int' })
    idOpd: number;

    @Column({ name: 'id_asb_tipe_bangunan', type: 'int' })
    idAsbTipeBangunan: number;

    // Optional Foreign Keys
    @Column({ name: 'id_rekening', type: 'int', nullable: true })
    idRekening: number | null;

    @Column({ name: 'id_rekening_review', type: 'int', nullable: true })
    idRekeningReview: number | null;

    @Column({ name: 'id_kabkota', type: 'int', nullable: true })
    idKabkota: number | null;

    @Column({ name: 'id_asb_klasifikasi', type: 'int', nullable: true })
    idAsbKlasifikasi: number | null;

    @Column({ name: 'id_verifikator_adpem', type: 'int', nullable: true })
    idVerifikatorAdpem: number | null;

    @Column({ name: 'id_verifikator_bpkad', type: 'int', nullable: true })
    idVerifikatorBPKAD: number | null;

    @Column({ name: 'id_verifikator_bappeda', type: 'int', nullable: true })
    idVerifikatorBappeda: number | null;

    // Core fields
    @Column({ name: 'tahun_anggaran', type: 'int', nullable: true })
    tahunAnggaran: number | null;

    @Column({ name: 'nama_asb', type: 'text' })
    namaAsb: string;

    @Column({ type: 'text', nullable: true })
    alamat: string | null;

    @Column({ name: 'jumlah_kontraktor', type: 'int', nullable: true })
    jumlahKontraktor: number | null;

    @Column({ name: 'total_lantai', type: 'int', nullable: true })
    totalLantai: number | null;

    @Column({ name: 'luas_tanah', type: 'int', nullable: true })
    luasTanah: number | null;

    @Column({ name: 'verified_adpem_at', type: 'timestamptz', nullable: true })
    verifiedAdpemAt: Date | null;

    @Column({ name: 'verified_bpkad_at', type: 'timestamptz', nullable: true })
    verifiedBpkadAt: Date | null;

    @Column({ name: 'verified_bappeda_at', type: 'timestamptz', nullable: true })
    verifiedBappedaAt: Date | null;

    @Column({ name: 'reject_reason', type: 'text', nullable: true })
    rejectReason: string | null;

    // Double/numeric fields
    @Column({ type: 'float', nullable: true })
    shst: number | null;

    @Column({
        name: 'perencanaan_konstruksi',
        type: 'float',
        nullable: true,
    })
    perencanaanKonstruksi: number | null;

    @Column({
        name: 'pengawasan_konstruksi',
        type: 'float',
        nullable: true,
    })
    pengawasanKonstruksi: number | null;

    @Column({
        name: 'management_konstruksi',
        type: 'float',
        nullable: true,
    })
    managementKonstruksi: number | null;

    @Column({
        name: 'pengelolaan_kegiatan',
        type: 'float',
        nullable: true,
    })
    pengelolaanKegiatan: number | null;

    @Column({
        name: 'luas_total_bangunan',
        type: 'float',
        nullable: true,
    })
    luasTotalBangunan: number | null;

    @Column({
        name: 'koefisien_lantai_total',
        type: 'float',
        nullable: true,
    })
    koefisienLantaiTotal: number | null;

    @Column({
        name: 'koefisien_fungsi_ruang_total',
        type: 'float',
        nullable: true,
    })
    koefisienFungsiRuangTotal: number | null;

    @Column({
        name: 'total_biaya_pembangunan',
        type: 'decimal',
        precision: 20,
        scale: 2,
        nullable: true,
    })
    totalBiayaPembangunan: number | null;

    @Column({
        name: 'nominal_bps',
        type: 'decimal',
        precision: 20,
        scale: 2,
        nullable: true,
    })
    nominalBps: number | null;

    @Column({
        name: 'nominal_bpns',
        type: 'decimal',
        precision: 20,
        scale: 2,
        nullable: true,
    })
    nominalBpns: number | null;

    @Column({
        name: 'bobot_total_bps',
        type: 'float',
        nullable: true,
    })
    bobotTotalBps: number | null;

    @Column({
        name: 'bobot_total_bpns',
        type: 'float',
        nullable: true,
    })
    bobotTotalBpns: number | null;

    @Column({
        name: 'rekapitulasi_biaya_konstruksi',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    })
    rekapitulasiBiayaKonstruksi: number | null;

    @Column({
        name: 'rekapitulasi_biaya_konstruksi_rounded',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    })
    rekapitulasiBiayaKonstruksiRounded: number | null;

    // Timestamps
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
    })
    deletedAt: Date | null;

    // Relationships - Required FKs (CASCADE)
    @ManyToOne(() => AsbJenisOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis: AsbJenisOrmEntity;

    @ManyToOne(() => AsbStatusOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_asb_status' })
    asbStatus: AsbStatusOrmEntity;

    @ManyToOne(() => OpdOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_opd' })
    opd: OpdOrmEntity;

    @ManyToOne(() => AsbTipeBangunanOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_asb_tipe_bangunan' })
    asbTipeBangunan: AsbTipeBangunanOrmEntity;

    // Relationships - Optional FKs (SET NULL)
    @ManyToOne(() => RekeningOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_rekening' })
    rekening: RekeningOrmEntity;

    @ManyToOne(() => RekeningOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_rekening_review' })
    rekeningReview: RekeningOrmEntity;

    @ManyToOne(() => KabKotaOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_kabkota' })
    kabkota: KabKotaOrmEntity;

    @ManyToOne(() => AsbKlasifikasiOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_klasifikasi' })
    asbKlasifikasi: AsbKlasifikasiOrmEntity;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_verifikator_adpem' })
    verifikatorAdpem: UserOrmEntity | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_verifikator_bpkad' })
    verifikatorBPKAD: UserOrmEntity | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_verifikator_bappeda' })
    verifikatorBappeda: UserOrmEntity | null;

    // OneToMany Relations
    @OneToMany(() => AsbDetailOrmEntity, (entity) => entity.asb)
    asbDetails: AsbDetailOrmEntity[];

    @OneToMany(() => AsbDetailReviewOrmEntity, (entity) => entity.asb)
    asbDetailReviews: AsbDetailReviewOrmEntity[];

    @OneToMany(() => AsbBipekStandardOrmEntity, (entity) => entity.asb)
    asbBipekStandards: AsbBipekStandardOrmEntity[];

    @OneToMany(() => AsbBipekStandardReviewOrmEntity, (entity) => entity.asb)
    asbBipekStandardReviews: AsbBipekStandardReviewOrmEntity[];

    @OneToMany(() => AsbBipekNonStdOrmEntity, (entity) => entity.asb)
    asbBipekNonStds: AsbBipekNonStdOrmEntity[];

    @OneToMany(() => AsbBipekNonStdReviewOrmEntity, (entity) => entity.asb)
    asbBipekNonStdReviews: AsbBipekNonStdReviewOrmEntity[];
}
