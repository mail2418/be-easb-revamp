import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JenisUsulanOrmEntity } from '../../jenis_usulan/orm/jenis_usulan.orm_entity';

@Entity('jalan_saluran_ruang_lingkup')
export class JalanSaluranRuangLingkupOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    id_jenis_usulan: number;

    @Column({ name: 'deskripsi_ruang_lingkup', type: 'varchar', length: 500 })
    deskripsi_ruang_lingkup: string;

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
