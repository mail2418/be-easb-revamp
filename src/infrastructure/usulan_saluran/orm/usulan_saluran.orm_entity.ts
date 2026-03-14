import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { OpdOrmEntity } from '../../opd/orm/opd.orm_entity';
import { UsulanSaluranStatusOrmEntity } from '../../usulan_saluran_status/orm/usulan_saluran_status.orm_entity';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';
import { TipeSaluranOrmEntity } from '../../tipe_saluran/orm/tipe_saluran.orm_entity';
import { RekeningOrmEntity } from '../../rekening/orm/rekening.orm_entity';
import { KabKotaOrmEntity } from '../../kabkota/orm/kabkota.orm_entity';
import { KecamatanOrmEntity } from '../../kecamatan/orm/kecamatan.orm_entity';
import { KelurahanOrmEntity } from '../../kelurahan/orm/kelurahan.orm_entity';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';
import { SaluranSpesifikasiDesainOrmEntity } from '../../saluran_spesifikasi_desain/orm/saluran_spesifikasi_desain.orm_entity';
import { SaluranSpesifikasiDesainReviewOrmEntity } from '../../saluran_spesifikasi_desain_review/orm/saluran_spesifikasi_desain_review.orm_entity';
import { SaluranSpesifikasiSmkkOrmEntity } from '../../saluran_spesifikasi_smkk/orm/saluran_spesifikasi_smkk.orm_entity';
import { SaluranSpesifikasiSmkkReviewOrmEntity } from '../../saluran_spesifikasi_smkk_review/orm/saluran_spesifikasi_smkk_review.orm_entity';

@Entity('usulan_saluran')
export class UsulanSaluranOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_opd', type: 'int' })
    idOpd!: number;

    @Column({ name: 'id_usulan_saluran_status', type: 'int' })
    idUsulanSaluranStatus!: number;

    @Column({ name: 'id_asb_jenis', type: 'int' })
    idAsbJenis!: number;

    @Column({ name: 'id_rekening', type: 'int', nullable: true })
    idRekening!: number | null;

    @Column({ name: 'id_rekening_review', type: 'int', nullable: true })
    idRekeningReview!: number | null;

    @Column({ name: 'id_tipe_saluran', type: 'int', nullable: true })
    idTipeSaluran!: number | null;

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

    @Column({ name: 'reject_reason', type: 'text', nullable: true })
    rejectReason!: string | null;

    @Column({ name: 'verifikator_adbang_review_at', type: 'timestamp', nullable: true })
    verifikatorAdbangReviewAt!: Date | null;

    @Column({ name: 'verifikator_bpkad_review_at', type: 'timestamp', nullable: true })
    verifikatorBpkadReviewAt!: Date | null;

    @Column({ name: 'verifikator_bappeda_review_at', type: 'timestamp', nullable: true })
    verifikatorBappedaReviewAt!: Date | null;

    @Column({ name: 'reject_verifikator_review_at', type: 'timestamp', nullable: true })
    rejectVerifikatorReviewAt!: Date | null;

    @Column({ name: 'is_include_ppn', type: 'boolean', default: false })
    isIncludePpn!: boolean;

    @Column({ name: 'tahun_anggaran', type: 'int' })
    tahunAnggaran!: number;

    @Column({ name: 'nama_usulan', type: 'text' })
    namaUsulan!: string;

    @Column({ name: 'alamat', type: 'text', nullable: true })
    alamat!: string | null;

    @Column({ name: 'uraian', type: 'text', nullable: true })
    uraian!: string | null;

    @Column({ name: 'spesifikasi', type: 'text', nullable: true })
    spesifikasi!: string | null;

    @Column({ name: 'satuan', type: 'varchar', length: 255, nullable: true })
    satuan!: string | null;

    @Column({ name: 'deskripsi_desain', type: 'text', nullable: true })
    deskripsiDesain!: string | null;

    @Column({ name: 'keterangan_tambahan', type: 'text', nullable: true })
    keteranganTambahan!: string | null;

    @Column({ name: 'lebar', type: 'float', nullable: true })
    lebar!: number | null;

    @Column({ name: 'total_harga', type: 'decimal', precision: 15, scale: 2, nullable: true })
    totalHarga!: number | null;

    @Column({ name: 'biaya_smkk', type: 'decimal', precision: 15, scale: 2, nullable: true })
    biayaSmkk!: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt!: Date | null;

    @ManyToOne(() => OpdOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_opd' })
    opd!: OpdOrmEntity;

    @ManyToOne(() => UsulanSaluranStatusOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usulan_saluran_status' })
    usulanSaluranStatus!: UsulanSaluranStatusOrmEntity;

    @ManyToOne(() => AsbJenisOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis!: AsbJenisOrmEntity;

    @ManyToOne(() => RekeningOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_rekening' })
    rekening!: RekeningOrmEntity | null;

    @ManyToOne(() => RekeningOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_rekening_review' })
    rekeningReview!: RekeningOrmEntity | null;

    @ManyToOne(() => TipeSaluranOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_tipe_saluran' })
    tipeSaluran!: TipeSaluranOrmEntity | null;

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

    @OneToMany(() => SaluranSpesifikasiDesainOrmEntity, (entity) => entity.usulanSaluran)
    spesifikasiDesain!: SaluranSpesifikasiDesainOrmEntity[];

    @OneToMany(() => SaluranSpesifikasiDesainReviewOrmEntity, (entity) => entity.usulanSaluran)
    spesifikasiDesainReview!: SaluranSpesifikasiDesainReviewOrmEntity[];

    @OneToMany(() => SaluranSpesifikasiSmkkOrmEntity, (entity) => entity.usulanSaluran)
    spesifikasiSmkk!: SaluranSpesifikasiSmkkOrmEntity[];

    @OneToMany(() => SaluranSpesifikasiSmkkReviewOrmEntity, (entity) => entity.usulanSaluran)
    spesifikasiSmkkReview!: SaluranSpesifikasiSmkkReviewOrmEntity[];
}
