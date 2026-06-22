import { UserProfile } from './user_profile.entity';

export abstract class UserProfileRepository {
    abstract findByUserId(idUser: number): Promise<UserProfile | null>;
    abstract create(data: { idUser: number; nama: string; nip?: string | null }): Promise<UserProfile>;
    abstract update(idUser: number, data: { nama?: string; nip?: string | null; photoPath?: string | null }): Promise<UserProfile>;
    abstract ensureForUser(idUser: number, defaultNama: string): Promise<UserProfile>;
}
