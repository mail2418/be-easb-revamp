import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserOrmEntity } from '../../user/orm/user.orm_entity';

@Entity({ name: 'user_profiles' })
export class UserProfileOrmEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ name: 'id_user', type: 'int', unique: true })
    idUser!: number;

    @Column({ type: 'varchar', length: 255 })
    nama!: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    nip?: string | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

    @ManyToOne(() => UserOrmEntity)
    @JoinColumn({ name: 'id_user' })
    user!: UserOrmEntity;
}
