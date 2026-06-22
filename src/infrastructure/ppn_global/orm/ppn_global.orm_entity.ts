import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ppn_global')
export class PpnGlobalOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'bulan', type: 'int' })
    bulan!: number;

    @Column({ name: 'tahun', type: 'int' })
    tahun!: number;

    @Column({ name: 'persentase_ppn', type: 'float' })
    persentase_ppn!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date | null;
}
