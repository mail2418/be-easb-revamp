import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { JalanSaluranRuangLingkupOrmEntity } from '../../jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity';

@Entity('hspk')
@Unique('UQ_hspk_tahun_no_mata_pembayaran', ['tahun_anggaran', 'no_mata_pembayaran'])
export class HspkOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_ruang_lingkup', type: 'int' })
    id_ruang_lingkup!: number;

    @Column({ name: 'tahun_anggaran', type: 'int' })
    tahun_anggaran!: number;

    @Column({ name: 'no_mata_pembayaran', type: 'varchar', length: 255 })
    no_mata_pembayaran!: string;

    @Column({ type: 'varchar', length: 255 })
    satuan!: string;

    @Column({ name: 'harga_satuan', type: 'decimal', precision: 15, scale: 2, nullable: true })
    harga_satuan!: number | null;

    @Column({ type: 'text', nullable: true })
    uraian!: string | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => JalanSaluranRuangLingkupOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_ruang_lingkup' })
    jalanSaluranRuangLingkup!: JalanSaluranRuangLingkupOrmEntity;
}
