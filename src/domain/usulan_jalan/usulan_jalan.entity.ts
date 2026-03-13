import { JenisUsulanJalan } from './jenis_usulan_jalan.enum';
import { StrukturPerkerasan } from './struktur_perkerasan.enum';
import { UsulanJalanStatus } from './usulan_jalan_status.enum';

export class UsulanJalan {
    id!: number;

    jenisUsulan!: JenisUsulanJalan;
    lebarJalan!: number;
    strukturPerkerasan!: StrukturPerkerasan;
    sumbuKumulatif!: number;
    nilaiCbr!: number;

    status!: UsulanJalanStatus;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
