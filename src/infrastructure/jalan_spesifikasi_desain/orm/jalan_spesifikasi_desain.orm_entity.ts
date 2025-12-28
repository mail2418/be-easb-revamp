import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsulanJalanOrmEntity } from "../../usulan_jalan/orm/usulan_jalan.orm_entity";
import { JalanSaluranRuangLingkupOrmEntity } from "../../jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity";
import { HspkOrmEntity } from "../../hspk/orm/hspk.orm_entity";

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

    @Column({ name: 'harga_spec', type: 'double precision' })
    harga_spec!: number;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => UsulanJalanOrmEntity)
    @JoinColumn({ name: 'id_usulan_jalan' })
    usulanJalan!: UsulanJalanOrmEntity;

    @ManyToOne(() => JalanSaluranRuangLingkupOrmEntity)
    @JoinColumn({ name: 'id_ruang_lingkup' })
    ruangLingkup!: JalanSaluranRuangLingkupOrmEntity;

    @ManyToOne(() => HspkOrmEntity)
    @JoinColumn({ name: 'id_hspk' })
    hspk!: HspkOrmEntity;
}
