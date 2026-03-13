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
import { AsbDetailOrmEntity } from '../../asb_detail/orm/asb_detail.orm_entity';
import { AsbLantaiOrmEntity } from '../../asb_lantai/orm/asb_lantai.orm_entity';
import { AsbFungsiRuangOrmEntity } from '../../asb_fungsi_ruang/orm/asb_fungsi_ruang.orm_entity';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';

@Entity('asb_detail_reviews')
export class AsbDetailReviewOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb_detail', type: 'int', nullable: true })
    idAsbDetail: number | null;

    @Column({
        type: 'varchar',
        length: 10,
        default: 'ORIGIN',
    })
    files: Files;

    @Column({ name: 'id_asb_lantai', type: 'int', nullable: true })
    idAsbLantai: number | null;

    @Column({ name: 'id_asb_fungsi_ruang', type: 'int', nullable: true })
    idAsbFungsiRuang: number | null;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({
        name: 'asb_fungsi_ruang_koef',
        type: 'float',
        nullable: true,
    })
    asbFungsiRuangKoef: number | null;

    @Column({ name: 'lantai_koef', type: 'float', nullable: true })
    lantaiKoef: number | null;

    @Column({ type: 'float', nullable: true })
    luas: number | null;

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

    @ManyToOne(() => AsbDetailOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_detail' })
    asbDetail: AsbDetailOrmEntity;

    @ManyToOne(() => AsbLantaiOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_lantai' })
    asbLantai: AsbLantaiOrmEntity;

    @ManyToOne(() => AsbFungsiRuangOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb_fungsi_ruang' })
    asbFungsiRuang: AsbFungsiRuangOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
