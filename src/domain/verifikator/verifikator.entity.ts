import { JenisVerifikator } from './jenis_verifikator.enum';
import { User } from '../user/user.entity';

export class Verifikator {
    id!: number;
    idUser!: number;
    jenisVerifikator!: JenisVerifikator;
    verifikator!: string;
    user?: User;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
