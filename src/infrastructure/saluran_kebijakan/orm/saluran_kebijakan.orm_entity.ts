import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { KabKotaOrmEntity } from "../../kabkota/orm/kabkota.orm_entity";

@Entity('saluran_kebijakan')
export class SaluranKebijakanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_kabkota', type: 'int' })
    idKabkota!: number;

    @Column({ name: 'bulan', type: 'int' })
    bulan!: number;

    @Column({ name: 'tahun', type: 'int' })
    tahun!: number;

    @Column({ name: 'nilai_ppn', type: 'float' })
    nilai_ppn!: number;

    @Column({ name: 'nilai_smkk', type: 'float' })
    nilai_smkk!: number;

    @Column({ name: 'suku_bunga', type: 'float' })
    suku_bunga!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => KabKotaOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_kabkota' })
    kabkota!: KabKotaOrmEntity;
}
