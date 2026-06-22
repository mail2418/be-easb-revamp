export class UserProfile {
    id!: number;
    idUser!: number;
    nama!: string;
    nip?: string | null;
    photoPath?: string | null;
    createdAt!: Date;
    updatedAt!: Date;
}
