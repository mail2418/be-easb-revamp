import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { JenisUsulanJalan } from '../../../domain/usulan_jalan/jenis_usulan_jalan.enum';
import { StrukturPerkerasan } from '../../../domain/usulan_jalan/struktur_perkerasan.enum';
import { UsulanJalanStatus } from '../../../domain/usulan_jalan/usulan_jalan_status.enum';

@Entity('usulan_jalan')
export class UsulanJalanOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'enum', enum: JenisUsulanJalan })
    jenisUsulan!: JenisUsulanJalan;

    @Column({ type: 'float' })
    lebarJalan!: number;

    @Column({ type: 'enum', enum: StrukturPerkerasan })
    strukturPerkerasan!: StrukturPerkerasan;

    @Column({ type: 'float' })
    sumbuKumulatif!: number;

    @Column({ type: 'float' })
    nilaiCbr!: number;

    @Column({ type: 'enum', enum: UsulanJalanStatus, default: UsulanJalanStatus.PENDING })
    status!: UsulanJalanStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt?: Date;
}
