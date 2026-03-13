import { AsbJenisOrmEntity } from 'src/infrastructure/asb_jenis/orm/asb_jenis.orm_entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'; import { AsbKomponenBangunanNonStdFiles } from 'src/domain/asb_komponen_bangunan_nonstd/asb_komponen_bangunan_nonstd_files.enum';
import { AsbTipeBangunanOrmEntity } from 'src/infrastructure/asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity';


@Entity('asb_komponen_bangunan_nonstd')
export class AsbKomponenBangunanNonstdOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    komponen!: string;

    @Column({ type: 'enum', enum: AsbKomponenBangunanNonStdFiles })
    files!: AsbKomponenBangunanNonStdFiles;

    @Column({ name: 'id_asb_jenis', type: 'integer' })
    idAsbJenis!: number;

    @Column({ name: 'id_asb_tipe_bangunan', type: 'integer' })
    idAsbTipeBangunan!: number;

    @ManyToOne(() => AsbJenisOrmEntity)
    @JoinColumn({ name: 'id_asb_jenis' })
    asbJenis?: AsbJenisOrmEntity;

    @ManyToOne(() => AsbTipeBangunanOrmEntity)
    @JoinColumn({ name: 'id_asb_tipe_bangunan' })
    asbTipeBangunan?: AsbTipeBangunanOrmEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
