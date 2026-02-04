import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { JalanSaluranRuangLingkupOrmEntity } from '../../jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity';

@Entity('hspk')
export class HspkOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_ruang_lingkup', type: 'int' })
    id_ruang_lingkup!: number;

    @Column({ name: 'no_mata_pembayaran', type: 'varchar', length: 255, unique: true })
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

