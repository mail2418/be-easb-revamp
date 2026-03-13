import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('asb_fungsi_ruangs')
export class AsbFungsiRuangOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'nama_fungsi_ruang', type: 'varchar', length: 255 })
    nama_fungsi_ruang: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    koef: number;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
