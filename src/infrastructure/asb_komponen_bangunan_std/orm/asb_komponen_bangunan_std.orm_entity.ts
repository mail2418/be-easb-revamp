import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AsbKomponenBangunanStdFiles } from '../../../domain/asb_komponen_bangunan_std/asb_komponen_bangunan_std_files.enum';
import { AsbJenisOrmEntity } from '../../asb_jenis/orm/asb_jenis.orm_entity';
import { AsbTipeBangunanOrmEntity } from '../../asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity';

@Entity('asb_komponen_bangunan_stds')
export class AsbKomponenBangunanStdOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    komponen!: string;

    @Column({ type: 'enum', enum: AsbKomponenBangunanStdFiles })
    files!: AsbKomponenBangunanStdFiles;

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
