import { Role } from '../../../domain/user/user_role.enum';

export class UserProfileDto {
    id!: number;
    idUser!: number;
    nama!: string;
    nip?: string | null;
    username!: string;
    roles!: Role[];
    photoUrl?: string | null;
}
