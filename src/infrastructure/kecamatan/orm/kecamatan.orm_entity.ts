import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { KabKotaOrmEntity } from '../../kabkota/orm/kabkota.orm_entity';

@Entity('kecamatans')
export class KecamatanOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_kabkota', type: 'integer' })
    idKabkota: number;

    @Column({ name: 'kode_kecamatan', type: 'varchar', length: 50 })
    kodeKecamatan: string;

    @Column({ name: 'nama_kecamatan', type: 'varchar', length: 255 })
    namaKecamatan: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    // Relationships
    @ManyToOne(() => KabKotaOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_kabkota' })
    kabkota: KabKotaOrmEntity;
}
