import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { DocumentSpec } from '../../../domain/asb_document/document_spec.enum';
import { AsbOrmEntity } from '../../asb/orm/asb.orm_entity';

@Entity('asb_document')
export class AsbDocumentOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_asb', type: 'int', nullable: true })
    idAsb: number | null;

    @Column({ type: 'text' })
    filename: string;

    @Column({
        type: 'enum',
        enum: DocumentSpec,
    })
    spec: DocumentSpec;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
    deletedAt: Date | null;

    @ManyToOne(() => AsbOrmEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_asb' })
    asb: AsbOrmEntity;
}
