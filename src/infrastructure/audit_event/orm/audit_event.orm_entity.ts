import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
} from 'typeorm';

@Entity({ name: 'audit_events' })
export class AuditEventOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index('idx_audit_events_id_user')
    @Column({ name: 'id_user', type: 'int', nullable: true })
    idUser: number | null;

    @Column({ type: 'varchar', length: 100, nullable: true })
    username: string | null;

    @Index('idx_audit_events_action')
    @Column({ type: 'varchar', length: 100 })
    action: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    resource: string | null;

    @Column({ name: 'resource_id', type: 'varchar', length: 100, nullable: true })
    resourceId: string | null;

    @Column({ type: 'varchar', length: 10, nullable: true })
    method: string | null;

    @Column({ type: 'varchar', length: 512, nullable: true })
    path: string | null;

    @Column({ name: 'status_code', type: 'int', nullable: true })
    statusCode: number | null;

    @Column({ name: 'ip_address', type: 'varchar', length: 64, nullable: true })
    ipAddress: string | null;

    @Column({ name: 'user_agent', type: 'varchar', length: 512, nullable: true })
    userAgent: string | null;

    @Index('idx_audit_events_created_at')
    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}
