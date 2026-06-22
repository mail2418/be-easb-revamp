import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AsbTipeBangunanOrmEntity } from "../../asb_tipe_bangunan/orm/asb_tipe_bangunan.orm_entity";
import { AsbKlasifikasiOrmEntity } from "../../asb_klasifikasi/orm/asb_klasifikasi.orm_entity";
import { KabKotaOrmEntity } from "../../kabkota/orm/kabkota.orm_entity";

@Entity("shst")
export class ShstOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tahun!: number;

  @Column()
  id_asb_tipe_bangunan!: number;

  @Column()
  id_asb_klasifikasi!: number;

  @Column()
  id_kabkota!: number;

  @Column("float")
  nominal!: number;

  @Column()
  file!: string;

  // Relations
  @ManyToOne(() => AsbTipeBangunanOrmEntity)
  @JoinColumn({ name: 'id_asb_tipe_bangunan', referencedColumnName: 'id' })
  asbTipeBangunan?: AsbTipeBangunanOrmEntity;

  @ManyToOne(() => AsbKlasifikasiOrmEntity)
  @JoinColumn({ name: 'id_asb_klasifikasi', referencedColumnName: 'id' })
  asbKlasifikasi?: AsbKlasifikasiOrmEntity;

  @ManyToOne(() => KabKotaOrmEntity)
  @JoinColumn({ name: 'id_kabkota', referencedColumnName: 'id' })
  kabkota?: KabKotaOrmEntity;
}
