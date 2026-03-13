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
import { CalculationMethod } from '../../../domain/asb_bipek_standard/calculation_method.enum';
import { AsbBipekStandardOrmEntity } from '../../asb_bipek_standard/orm/asb_bipek_standard.orm_entity';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';
import { AsbKomponenBangunanStdOrmEntity } from '../../asb_komponen_bangunan_std/orm/asb_komponen_bangunan_std.orm_entity';

@Entity('asb_bipek_standard_reviews')
export class AsbBipekStandardReviewOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'id_asb_bipek_standard',
        type: 'int',
        nullable: true,
    })
    idAsbBipekStandard: number | null;

    @Column({
        name: 'id_asb_komponen_bangunan_std',
        type: 'int',
        nullable: true,
    })
    idAsbKomponenBangunanStd: number | null;

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

    @Column({
        name: 'calculation_method',
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    calculationMethod: CalculationMethod | null;

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

    @ManyToOne(() => AsbBipekStandardOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_bipek_standard' })
    asbBipekStandard: AsbBipekStandardOrmEntity;

    @ManyToOne(() => AsbKomponenBangunanStdOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_komponen_bangunan_std' })
    asbKomponenBangunanStd: AsbKomponenBangunanStdOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
