import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('tipe_saluran')
export class TipeSaluranOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'tipe_saluran', type: 'varchar', length: 50, unique: true })
    tipeSaluran!: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    tipe!: string | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
