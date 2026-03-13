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
import { AsbBipekNonStdOrmEntity } from '../../asb_bipek_non_std/orm/asb_bipek_non_std.orm_entity';
import { AsbKomponenBangunanNonstdOrmEntity } from '../../asb_komponen_bangunan_nonstd/orm/asb_komponen_bangunan_nonstd.orm_entity';
import { AsbOrmEntity } from 'src/infrastructure/asb/orm/asb.orm_entity';

@Entity('asb_bipek_non_std_reviews')
export class AsbBipekNonStdReviewOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb_bipek_non_std', type: 'int' })
    idAsbBipekNonStd: number;

    @Column({
        name: 'id_asb_komponen_bangunan_nonstd',
        type: 'int',
        nullable: true,
    })
    idAsbKomponenBangunanNonstd: number | null;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'ORIGIN',
    })
    files: Files;

    @Column({ name: 'bobot_input', type: 'float', nullable: true })
    bobotInput: number | null;

    @Column({ name: 'calculation_method', type: 'varchar', length: 20, nullable: true })
    calculationMethod: string | null;

    @Column({ name: 'bobot_input_prosentase', type: 'float', nullable: true })
    bobotInputProsentase: number | null;

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

    @ManyToOne(() => AsbBipekNonStdOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_bipek_non_std' })
    asbBipekNonStd: AsbBipekNonStdOrmEntity;

    @ManyToOne(() => AsbKomponenBangunanNonstdOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_komponen_bangunan_nonstd' })
    asbKomponenBangunanNonstd: AsbKomponenBangunanNonstdOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
