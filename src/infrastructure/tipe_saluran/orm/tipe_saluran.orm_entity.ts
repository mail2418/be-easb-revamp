import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tipe_saluran')
export class TipeSaluranOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, name: "tipe_saluran" })
    tipe_saluran!: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;
}
