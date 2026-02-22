import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { SatuanOrmEntity } from "../../satuan/orm/satuan.orm_entity";

@Entity("asb_lantais")
export class AsbLantaiOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    lantai!: string;

    @Column({ type: "varchar", length: 255 })
    type!: string;

    @Column({ type: "decimal", precision: 10, scale: 4 })
    koef!: number;

    @Column({ name: "id_satuan", type: "integer" })
    idSatuan!: number;

    @ManyToOne(() => SatuanOrmEntity)
    @JoinColumn({ name: "id_satuan", referencedColumnName: "id" })
    satuan!: SatuanOrmEntity;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;
}
