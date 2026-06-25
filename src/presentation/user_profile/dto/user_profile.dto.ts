import { Role } from '../../../domain/user/user_role.enum';

export class UserProfileOpdDto {
    opd!: string;
    alias!: string;
}

export class UserProfileDto {
    id!: number;
    idUser!: number;
    nama!: string;
    nip?: string | null;
    username!: string;
    roles!: Role[];
    opd?: UserProfileOpdDto | null;
}
