import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JenisUsulanOrmEntity } from '../../jenis_usulan/orm/jenis_usulan.orm_entity';

@Entity('rekenings')
export class RekeningOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'rekening_kode', type: 'varchar', length: 255, unique: true })
    rekening_kode: string;

    @Column({ name: 'rekening_uraian', type: 'varchar', length: 500 })
    rekening_uraian: string;

    @Column({ name: 'bulan', type: 'int' })
    bulan: number;

    @Column({ name: 'tahun', type: 'int' })
    tahun: number;

    @Column({ name: 'id_jenis_usulan', type: 'int', nullable: true })
    idJenisUsulan: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => JenisUsulanOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_jenis_usulan' })
    jenisUsulan?: JenisUsulanOrmEntity | null;
}
