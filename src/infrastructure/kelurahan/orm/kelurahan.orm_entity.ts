import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { KecamatanOrmEntity } from '../../kecamatan/orm/kecamatan.orm_entity';

@Entity('kelurahans')
export class KelurahanOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_kecamatan', type: 'integer' })
    idKecamatan: number;

    @Column({ name: 'nama_kelurahan', type: 'varchar', length: 255 })
    namaKelurahan: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date | null;

    // Relationships
    @ManyToOne(() => KecamatanOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_kecamatan' })
    kecamatan: KecamatanOrmEntity;
}
