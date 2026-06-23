import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('jalan_jenis_pemeliharaan')
export class JalanJenisPemeliharaanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, name: 'tingkat_pemeliharaan' })
    tingkat_pemeliharaan!: string;

    @Column({ type: 'varchar', length: 255, name: 'jenis_pemeliharaan' })
    jenis_pemeliharaan!: string;

    @Column({ type: 'text', name: 'ruang_lingkup' })
    ruang_lingkup!: string;

    @Column({ type: 'text', name: 'deskripsi' })
    deskripsi!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
