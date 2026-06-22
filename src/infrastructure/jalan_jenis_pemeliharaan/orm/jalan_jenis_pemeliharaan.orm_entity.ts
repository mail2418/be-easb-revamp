import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('jalan_jenis_pemeliharaan')
export class JalanJenisPemeliharaanOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'tingkat_pemeliharaan', type: 'varchar', length: 255 })
    tingkat_pemeliharaan: string;

    @Column({ name: 'jenis_pemeliharaan', type: 'varchar', length: 255 })
    jenis_pemeliharaan: string;

    @Column({ name: 'ruang_lingkup', type: 'varchar', length: 255 })
    ruang_lingkup: string;

    @Column({ name: 'deskripsi', type: 'text' })
    deskripsi: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
