import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { JenisVerifikator } from '../../../domain/verifikator/jenis_verifikator.enum';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';

@Entity('verifikators')
export class VerifikatorOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_user', type: 'integer', unique: true })
    idUser: number;

    @Column({
        name: 'jenis_verifikator',
        type: 'enum',
        enum: JenisVerifikator
    })
    jenisVerifikator: JenisVerifikator;

    @Column({ type: 'varchar', length: 255 })
    verifikator: string;

    @OneToOne(() => UserOrmEntity)
    @JoinColumn({ name: 'id_user' })
    user: UserOrmEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt?: Date;
}
