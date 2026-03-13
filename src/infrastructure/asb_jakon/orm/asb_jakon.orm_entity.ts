import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AsbTipeBangunanOrmEntity } from '../../asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';
import { AsbKlasifikasiOrmEntity } from '../../asb_klasifikasi/orm/asb_klasifikasi.orm_entity';

export enum AsbJakonType {
    PERENCANAAN = 'perencanaan',
    PENGAWASAN = 'pengawasan',
    MANAGEMENT = 'management',
    PENGELOLAAN = 'pengelolaan',
}

@Entity('asb_jakon')
export class AsbJakonOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_asb_tipe_bangunan', type: 'integer' })
    idAsbTipeBangunan!: number;

    @Column({ name: 'id_asb_jenis', type: 'integer' })
    idAsbJenis!: number;

    @Column({ name: 'id_asb_klasifikasi', type: 'integer' })
    idAsbKlasifikasi!: number;

    @Column({ type: 'integer' })
    tahun!: number;

    @Column({ type: 'enum', enum: AsbJakonType })
    type!: AsbJakonType;

    @Column({ type: 'text' })
    nama!: string;

    @Column({ type: 'varchar', length: 255 })
    spec!: string;

    @Column({ name: 'price_from', type: 'double precision' })
    priceFrom!: number;

    @Column({ name: 'price_to', type: 'double precision' })
    priceTo!: number;

    @Column({ type: 'varchar', length: 50 })
    satuan!: string;

    @Column({ type: 'double precision' })
    standard!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => AsbTipeBangunanOrmEntity)
    @JoinColumn({ name: 'id_asb_tipe_bangunan' })
    asbTipeBangunan!: AsbTipeBangunanOrmEntity;

    @ManyToOne(() => AsbJenisOrmEntity)
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis!: AsbJenisOrmEntity;

    @ManyToOne(() => AsbKlasifikasiOrmEntity)
    @JoinColumn({ name: 'id_asb_klasifikasi' })
    asbKlasifikasi!: AsbKlasifikasiOrmEntity;
}
