import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JenisUsulanOrmEntity } from "../../jenis_usulan/orm/jenis_usulan.orm_entity";

@Entity('jalan_saluran_ruang_lingkup')
export class JalanSaluranRuangLingkupOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    id_jenis_usulan!: number;

    @Column({ name: 'nomor_divisi', type: 'int' })
    nomor_divisi!: number;

    @Column({ type: 'varchar', length: 255 })
    deskripsi_divisi!: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => JenisUsulanOrmEntity)
    @JoinColumn({ name: 'id_jenis_usulan', referencedColumnName: 'id' })
    jenisUsulan!: JenisUsulanOrmEntity;
}
