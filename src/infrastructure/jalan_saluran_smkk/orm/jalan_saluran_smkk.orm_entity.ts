import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JenisUsulanOrmEntity } from '../../jenis_usulan/orm/jenis_usulan.orm_entity';

@Entity('jalan_saluran_smkk')
export class JalanSaluranSmkkOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    id_jenis_usulan: number;

    @Column({ name: 'no_mata_pembayaran', type: 'varchar', length: 100 })
    no_mata_pembayaran: string;

    @Column({ type: 'varchar', length: 100 })
    satuan: string;

    @Column({ type: 'text' })
    uraian: string;

    @Column({ type: 'decimal', precision: 15, scale: 4, default: 1 })
    pengali: number;

    @ManyToOne(() => JenisUsulanOrmEntity)
    @JoinColumn({ name: 'id_jenis_usulan' })
    jenisUsulan?: JenisUsulanOrmEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
