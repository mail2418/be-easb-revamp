import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ppn_global')
export class PpnGlobalOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'bulan', type: 'int' })
    bulan!: number;

    @Column({ name: 'tahun', type: 'int' })
    tahun!: number;

    @Column({ name: 'persentase_ppn', type: 'double precision' })
    persentase_ppn!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date | null;
}
