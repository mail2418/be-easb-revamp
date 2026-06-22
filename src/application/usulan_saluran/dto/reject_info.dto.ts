export class RejectInfoSaluranDto {
    rejectVerifId: number | null;
    rejectReason: string | null;
    rejectedAt: Date | null;
    rejectVerifikator: {
        id: number;
        username: string;
    } | null;
    verifikator: {
        id: number;
        idUser: number;
        jenisVerifikator: string;
        verifikator: string;
        user: {
            id: number;
            username: string;
        };
    } | null;
}
