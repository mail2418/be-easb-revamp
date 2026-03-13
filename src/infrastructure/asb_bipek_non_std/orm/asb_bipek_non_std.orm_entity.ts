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
import { Files } from '../../../domain/asb_detail/files.enum';
import { AsbKomponenBangunanNonstdOrmEntity } from '../../asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';

@Entity('asb_bipek_non_stds')
export class AsbBipekNonStdOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'ORIGIN',
    })
    files: Files;

    @Column({
        name: 'id_asb_komponen_bangunan_nonstd',
        type: 'int',
        nullable: true,
    })
    idAsbKomponenBangunanNonstd: number | null;

    @Column({ name: 'bobot_input', type: 'float', nullable: true })
    bobotInput: number | null;

    @Column({ name: 'bobot_input_prosentase', type: 'float', nullable: true })
    bobotInputProsentase: number | null;

    @Column({ name: 'calculation_method', type: 'varchar', length: 20, nullable: true })
    calculationMethod: string | null;

    @Column({ name: 'jumlah_bobot', type: 'float', nullable: true })
    jumlahBobot: number | null;

    @Column({ name: 'rincian_harga', type: 'float', nullable: true })
    rincianHarga: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
    })
    deletedAt: Date | null;

    @ManyToOne(() => AsbKomponenBangunanNonstdOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_komponen_bangunan_nonstd' })
    asbKomponenBangunanNonstd: AsbKomponenBangunanNonstdOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
