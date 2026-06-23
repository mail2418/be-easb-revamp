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

@Entity('jalan_saluran_ruang_lingkup')
export class JalanSaluranRuangLingkupOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    id_jenis_usulan!: number;

    @Column({ name: 'deskripsi_ruang_lingkup', type: 'varchar', length: 255 })
    deskripsi_ruang_lingkup!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => JenisUsulanOrmEntity)
    @JoinColumn({ name: 'id_jenis_usulan', referencedColumnName: 'id' })
    jenisUsulan!: JenisUsulanOrmEntity;
}
