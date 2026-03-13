import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AsbKomponenBangunanNonstdOrmEntity } from '../../asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity';

@Entity('asb_komponen_bangunan_pros_nonstd')
export class AsbKomponenBangunanProsNonstdOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_asb_komponen_bangunan_nonstd', type: 'integer' })
    idAsbKomponenBangunanNonstd!: number;

    @Column({ type: 'double precision' })
    min!: number;

    @Column({ name: 'avg_min', type: 'double precision', nullable: true })
    avgMin?: number;

    @Column({ type: 'double precision' })
    avg!: number;

    @Column({ name: 'avg_max', type: 'double precision', nullable: true })
    avgMax?: number;

    @Column({ type: 'double precision' })
    max!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => AsbKomponenBangunanNonstdOrmEntity)
    @JoinColumn({ name: 'id_asb_komponen_bangunan_nonstd' })
    asbKomponenBangunanNonstd!: AsbKomponenBangunanNonstdOrmEntity;
}
