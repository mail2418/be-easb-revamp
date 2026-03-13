import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column("double precision")
  nominal!: number;

  @Column()
  file!: string;
}
