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
import { UserOrmEntity } from '../../user/orm/user.orm_entity';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';

@Entity('asb_log')
export class AsbLogOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_user', type: 'int' })
    idUser: number;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({ type: 'text' })
    log: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => UserOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_user' })
    user: UserOrmEntity;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
