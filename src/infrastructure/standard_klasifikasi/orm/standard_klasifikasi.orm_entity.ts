import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { AsbKlasifikasiOrmEntity } from "../../asb_klasifikasi/orm/asb_klasifikasi.orm_entity";
import { KabKotaOrmEntity } from "../../kabkota/orm/kabkota.orm_entity";

@Entity("standard_klasifikasi")
export class StandardKlasifikasiOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 500 })
    uraian_standard!: string;

    @Column({ type: "varchar", length: 500 })
    uraian_spek!: string;

    @Column({ type: "decimal", precision: 15, scale: 2 })
    inflasi!: number;

    @Column()
    id_asb_klasifikasi!: number;

    @Column()
    id_kabkota!: number;

    @ManyToOne(() => AsbKlasifikasiOrmEntity)
    @JoinColumn({ name: "id_asb_klasifikasi" })
    asbKlasifikasi?: AsbKlasifikasiOrmEntity;

    @ManyToOne(() => KabKotaOrmEntity)
    @JoinColumn({ name: "id_kabkota" })
    kabkota?: KabKotaOrmEntity;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at!: Date;

    @DeleteDateColumn({ type: "timestamptz", nullable: true })
    deleted_at?: Date;
}
