import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsulanJalanOrmEntity } from "../../usulan_jalan/orm/usulan_jalan.orm_entity";
import { JalanSaluranRuangLingkupOrmEntity } from "../../jalan_saluran_ruang_lingkup/orm/jalan_saluran_ruang_lingkup.orm_entity";
import { HspkOrmEntity } from "../../hspk/orm/hspk.orm_entity";

@Entity('jalan_spesifikasi_desain_review')
export class JalanSpesifikasiDesainReviewOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'id_usulan_jalan', type: 'int' })
    id_usulan_jalan!: number;

    @Column({ name: 'id_ruang_lingkup', type: 'int' })
    id_ruang_lingkup!: number;

    @Column({ name: 'id_hspk', type: 'int' })
    id_hspk!: number;

    @Column({ name: 'volume_review', type: 'float' })
    volume_review!: number;

    @Column({ name: 'spasi_review', type: 'float' })
    spasi_review!: number;

    @Column({ name: 'tinggi_review', type: 'float' })
    tinggi_review!: number;

    @Column({ name: 'harga_spec_review', type: 'float' })
    harga_spec_review!: number;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
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
