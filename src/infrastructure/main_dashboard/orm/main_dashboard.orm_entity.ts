import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('main_dashboard')
export class MainDashboardOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usulan', type: 'int' })
    idUsulan: number;

    @Column({ name: 'id_jenis_usulan', type: 'int' })
    idJenisUsulan: number;

    @Column({ name: 'id_asb_status', type: 'int' })
    idAsbStatus: number;

    @Column({ name: 'nama_usulan', type: 'text' })
    namaUsulan: string;

    @Column({ name: 'reject_info', type: 'text', nullable: true })
    rejectInfo: string | null;

    @Column({ name: 'tahun_anggaran', type: 'int', nullable: true })
    tahunAnggaran: number | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}
