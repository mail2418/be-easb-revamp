import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('jalan_spesifikasi_desain')
export class JalanSpesifikasiDesainOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_usulan_jalan', type: 'int' })
    id_usulan_jalan!: number;

    @Column({ name: 'id_ruang_lingkup', type: 'int' })
    id_ruang_lingkup!: number;

    @Column({ name: 'id_hspk', type: 'int' })
    id_hspk!: number;

    @Column({ name: 'volume', type: 'double precision' })
    volume!: number;

    @Column({ name: 'spasi', type: 'double precision' })
    spasi!: number;

    @Column({ name: 'tinggi', type: 'double precision' })
    tinggi!: number;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
    deletedAt?: Date;
}
