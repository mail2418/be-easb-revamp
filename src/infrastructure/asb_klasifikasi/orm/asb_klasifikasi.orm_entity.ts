import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { AsbTipeBangunanOrmEntity } from '../../asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity';

@Entity('asb_klasifikasi')
export class AsbKlasifikasiOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_asb_tipe_bangunan' })
  id_asb_tipe_bangunan!: number;

  @Column()
  klasifikasi!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => AsbTipeBangunanOrmEntity)
  @JoinColumn({ name: 'id_asb_tipe_bangunan', referencedColumnName: 'id' })
  asbTipeBangunan?: AsbTipeBangunanOrmEntity;
}
