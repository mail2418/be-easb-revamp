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
import { KabKotaOrmEntity } from '../../kabkota/orm/kabkota.orm_entity';
import { KecamatanOrmEntity } from '../../kecamatan/orm/kecamatan.orm_entity';
import { KelurahanOrmEntity } from '../../kelurahan/orm/kelurahan.orm_entity';
import { OpdOrmEntity } from '../../opd/orm/opd.orm_entity';
import { RekeningOrmEntity } from '../../rekening/orm/rekening.orm_entity';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';
import { VerifikatorOrmEntity } from '../../verifikator/orm/verifikator.orm_entity';
import { TipeSaluranOrmEntity } from './tipe_saluran.orm_entity';
import { UsulanSaluranStatusOrmEntity } from './usulan_saluran_status.orm_entity';

@Entity('usulan_saluran')
export class UsulanSaluranOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_opd', type: 'int' })
    idOpd!: number;

    @Column({ name: 'id_usulan_saluran_status', type: 'int', default: 1 })
    idUsulanSaluranStatus!: number;

    @Column({ name: 'id_asb_jenis', type: 'int', nullable: true })
    idAsbJenis!: number | null;

    @Column({ name: 'id_tipe_saluran', type: 'int', nullable: true })
    idTipeSaluran!: number | null;

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

    @Column({ name: 'is_include_ppn', type: 'boolean', default: false })
    isIncludePpn!: boolean;

    @Column({ name: 'tahun_anggaran', type: 'int', nullable: true })
    tahunAnggaran!: number | null;

    @Column({ name: 'nama_usulan', type: 'text' })
    namaUsulan!: string;

    @Column({ type: 'text', nullable: true })
    alamat!: string | null;

    @Column({ type: 'float', nullable: true })
    lebar!: number | null;

    @Column({ name: 'keterangan_tambahan', type: 'text', nullable: true })
    keteranganTambahan!: string | null;

    @Column({ name: 'data_ruang_lingkup', type: 'jsonb', nullable: true })
    dataRuangLingkup!: Record<string, unknown>[] | null;

    @Column({ name: 'data_smkk', type: 'jsonb', nullable: true })
    dataSmkk!: Record<string, unknown>[] | null;

    @Column({ name: 'verifikator_adbang_review_at', type: 'timestamptz', nullable: true })
    verifikatorAdbangReviewAt!: Date | null;

    @Column({ name: 'verifikator_bpkad_review_at', type: 'timestamptz', nullable: true })
    verifikatorBpkadReviewAt!: Date | null;

    @Column({ name: 'verifikator_bappeda_review_at', type: 'timestamptz', nullable: true })
    verifikatorBappedaReviewAt!: Date | null;

    @Column({ name: 'rejected_at', type: 'timestamptz', nullable: true })
    rejectedAt!: Date | null;

    @Column({ name: 'reject_reason', type: 'text', nullable: true })
    rejectReason!: string | null;

    @ManyToOne(() => OpdOrmEntity)
    @JoinColumn({ name: 'id_opd' })
    opd?: OpdOrmEntity;

    @ManyToOne(() => UsulanSaluranStatusOrmEntity)
    @JoinColumn({ name: 'id_usulan_saluran_status' })
    usulanSaluranStatus?: UsulanSaluranStatusOrmEntity;

    @ManyToOne(() => AsbJenisOrmEntity)
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis?: AsbJenisOrmEntity;

    @ManyToOne(() => TipeSaluranOrmEntity)
    @JoinColumn({ name: 'id_tipe_saluran' })
    tipeSaluran?: TipeSaluranOrmEntity;

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
