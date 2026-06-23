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
import { AsbKomponenBangunanNonstdOrmEntity } from '../../asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity';

@Entity('asb_komponen_bangunan_pros_nonstd')
export class AsbKomponenBangunanProsNonstdOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_asb_komponen_bangunan_nonstd', type: 'integer' })
    idAsbKomponenBangunanNonstd!: number;

    @Column({ type: 'float' })
    min!: number;

    @Column({ name: 'avg_min', type: 'float', nullable: true })
    avgMin?: number;

    @Column({ type: 'float' })
    avg!: number;

    @Column({ name: 'avg_max', type: 'float', nullable: true })
    avgMax?: number;

    @Column({ type: 'float' })
    max!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => AsbKomponenBangunanNonstdOrmEntity)
    @JoinColumn({ name: 'id_asb_komponen_bangunan_nonstd' })
    asbKomponenBangunanNonstd!: AsbKomponenBangunanNonstdOrmEntity;
}
