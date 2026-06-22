import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('jalan_jenis_perkerasan')
export class JalanJenisPerkerasanOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'jenis_perkerasan', type: 'varchar', length: 255 })
    jenis_perkerasan: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
