import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { JalanSaluranRuangLingkupOrmEntity } from "../../jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity";

@Entity('jalan_saluran_smkk')
export class JalanSaluranSmkkOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_ruang_lingkup', type: 'int' })
    id_ruang_lingkup!: number;

    @Column({ name: 'no_mata_pembayaran', type: 'varchar', length: 255 })
    no_mata_pembayaran!: string;

    @Column({ name: 'satuan', type: 'varchar', length: 255 })
    satuan!: string;

    @Column({ name: 'harga_satuan', type: 'decimal', precision: 15, scale: 2, nullable: true })
    harga_satuan!: number | null;

    @Column({ name: 'uraian', type: 'text' })
    uraian!: string;

    @Column({ name: 'pengali', type: 'decimal', precision: 10, scale: 2 })
    pengali!: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date | null;

    @ManyToOne(() => JalanSaluranRuangLingkupOrmEntity)
    @JoinColumn({ name: 'id_ruang_lingkup', referencedColumnName: 'id' })
    ruangLingkup!: JalanSaluranRuangLingkupOrmEntity;
}

