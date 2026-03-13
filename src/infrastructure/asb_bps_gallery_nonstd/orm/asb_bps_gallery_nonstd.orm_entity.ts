import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { AsbKomponenBangunanNonstdOrmEntity } from '../../asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';

@Entity('asb_bps_gallery_nonstd')
export class AsbBpsGalleryNonstdOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb_komponen_bangunan_nonstd', type: 'int', nullable: true })
    idAsbKomponenBangunanNonstd: number | null;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({ type: 'text' })
    filename: string;

    @Column({ name: 'jumlah_bobot', type: 'double precision', nullable: true })
    jumlahBobot: number | null;

    @Column({ name: 'rincian_harga', type: 'double precision', nullable: true })
    rincianHarga: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(
        () => AsbKomponenBangunanNonstdOrmEntity,
        { onDelete: 'SET NULL', nullable: true },
    )
    @JoinColumn({ name: 'id_asb_komponen_bangunan_nonstd' })
    komponenBangunan: AsbKomponenBangunanNonstdOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
