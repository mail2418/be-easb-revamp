import { Role } from '../../domain/user/user_role.enum';

export type UserContext = {
    userId: string;
    username: string;
    roles: Role[];
    idOpd: number | null;
};
