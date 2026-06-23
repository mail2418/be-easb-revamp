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
import { JenisUsulanOrmEntity } from '../../jenis_usulan/orm/jenis_usulan.orm_entity';

@Entity('jalan_saluran_smkk')
export class JalanSaluranSmkkOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    id_jenis_usulan!: number;

    @Column({ name: 'no_mata_pembayaran', type: 'varchar', length: 255 })
    no_mata_pembayaran!: string;

    @Column({ name: 'satuan', type: 'varchar', length: 255 })
    satuan!: string;

    @Column({ name: 'uraian', type: 'text' })
    uraian!: string;

    @Column({ name: 'pengali', type: 'decimal', precision: 10, scale: 2 })
    pengali!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => JenisUsulanOrmEntity)
    @JoinColumn({ name: 'id_jenis_usulan' })
    jenisUsulan!: JenisUsulanOrmEntity;
}
