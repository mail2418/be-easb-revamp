import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('jenis_usulan')
export class JenisUsulanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    jenis!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date | null;
}
