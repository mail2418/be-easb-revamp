import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JalanSaluranRuangLingkupOrmEntity } from '../../jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity';

@Entity('hspks')
export class HspkOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_ruang_lingkup', type: 'int' })
    id_ruang_lingkup: number;

    @Column({ name: 'tahun_anggaran', type: 'int' })
    tahun_anggaran: number;

    @Column({ name: 'no_mata_pembayaran', type: 'varchar', length: 100 })
    no_mata_pembayaran: string;

    @Column({ type: 'varchar', length: 100 })
    satuan: string;

    @Column({ name: 'harga_satuan', type: 'decimal', precision: 15, scale: 2, default: 0 })
    harga_satuan: number;

    @Column({ type: 'text' })
    uraian: string;

    @ManyToOne(() => JalanSaluranRuangLingkupOrmEntity)
    @JoinColumn({ name: 'id_ruang_lingkup' })
    ruangLingkup?: JalanSaluranRuangLingkupOrmEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
