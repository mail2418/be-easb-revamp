import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('jalan_spesifikasi_desain')
export class JalanSpesifikasiDesainOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 50 })
    kode!: string;

    @Column({ type: "varchar", length: 255 })
    uraian!: string;

    @Column({ type: "varchar", length: 50 })
    satuan!: string;

    @Column({ type: "numeric" })
    harga_satuan!: number;

    @Column({ type: "numeric" })
    tinggi!: number;

    @Column({ type: "numeric", nullable: true })
    spasi?: number;

    @Column({ type: "numeric" })
    harga_total!: number;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
    deletedAt?: Date;
}
