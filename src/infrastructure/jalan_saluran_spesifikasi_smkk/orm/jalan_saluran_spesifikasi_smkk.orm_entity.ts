import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsulanJalanOrmEntity } from "../../usulan_jalan/orm/usulan_jalan.orm_entity";
import { JenisUsulanOrmEntity } from "../../jenis_usulan/orm/jenis_usulan.orm_entity";
import { JalanSaluranSmkkOrmEntity } from "../../jalan_saluran_smkk/orm/jalan_saluran_smkk.orm_entity";

@Entity('jalan_saluran_spesifikasi_smkk')
export class JalanSaluranSpesifikasiSmkkOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    id_jenis_usulan!: number;

    @Column({ name: 'id_usulan_jalan', type: 'int' })
    id_usulan_jalan!: number;

    @Column({ name: 'id_jalan_saluran_smkk', type: 'int' })
    id_jalan_saluran_smkk!: number;

    @Column({ name: 'harga_spec', type: 'decimal', precision: 15, scale: 2 })
    harga_spec!: number;

    @Column({ name: 'jumlah_barang', type: 'decimal', precision: 15, scale: 2 })
    jumlah_barang!: number;

    @Column({ name: 'harga_satuan', type: 'decimal', precision: 15, scale: 2 })
    harga_satuan!: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => JenisUsulanOrmEntity)
    @JoinColumn({ name: 'id_jenis_usulan' })
    jenisUsulan!: JenisUsulanOrmEntity;

    @ManyToOne(() => UsulanJalanOrmEntity)
    @JoinColumn({ name: 'id_usulan_jalan' })
    usulanJalan!: UsulanJalanOrmEntity;

    @ManyToOne(() => JalanSaluranSmkkOrmEntity)
    @JoinColumn({ name: 'id_jalan_saluran_smkk' })
    jalanSaluranSmkk!: JalanSaluranSmkkOrmEntity;
}

