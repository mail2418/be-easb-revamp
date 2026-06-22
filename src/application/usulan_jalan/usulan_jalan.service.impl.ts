import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JenisVerifikator } from '../../domain/verifikator/jenis_verifikator.enum';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { Role } from '../../domain/user/user_role.enum';
import { UsulanJalanRepository, UsulanJalanListQuery } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { USULAN_JALAN_STATUS } from '../../domain/usulan_jalan/usulan_jalan_status.constants';

@Injectable()
export class UsulanJalanServiceImpl implements UsulanJalanService {
    constructor(
        private readonly repository: UsulanJalanRepository,
        private readonly verifikatorService: VerifikatorService,
    ) {}

    private assertOpdAccess(idOpd: number | null, userIdOpd: number | null, userRoles: Role[]): void {
        const isPrivileged = userRoles.includes(Role.ADMIN) || userRoles.includes(Role.SUPERADMIN) || userRoles.includes(Role.VERIFIKATOR);
        if (!isPrivileged && userIdOpd !== idOpd) {
            throw new ForbiddenException('Access denied for this OPD usulan');
        }
    }

    private async getUsulanOrThrow(id: number, userIdOpd: number | null, userRoles: Role[]) {
        const isOpdOnly = userRoles.includes(Role.OPD) && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN) && !userRoles.includes(Role.VERIFIKATOR);
        const usulan = await this.repository.findById(id, isOpdOnly ? userIdOpd : null);
        if (!usulan) {
            throw new NotFoundException(`Usulan jalan with id ${id} not found`);
        }
        return usulan;
    }

    private async assertVerifikator(userId: string, expected: JenisVerifikator): Promise<{ id: number }> {
        const type = await this.verifikatorService.checkVerifikatorType(Number(userId));
        if (type !== expected) {
            throw new ForbiddenException(`Only ${expected} verifikator can perform this action`);
        }
        const verifikator = await this.verifikatorService.findByUserId(Number(userId));
        if (!verifikator) {
            throw new NotFoundException('Verifikator not found');
        }
        return { id: verifikator.id };
    }

    async storeIndex(
        dto: Record<string, unknown>,
        userIdOpd: number | null,
        userRoles: Role[],
        isUpdate: boolean,
    ): Promise<{ id: number }> {
        const idOpd = userIdOpd;
        if (!idOpd && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN)) {
            throw new ForbiddenException('User is not synced to an OPD');
        }

        const payload = {
            idAsbJenis: dto.idAsbJenis as number,
            idJalanJenisPemeliharaan: (dto.idJalanJenisPemeliharaan as number) ?? null,
            idJalanJenisPerkerasan: dto.idJalanJenisPerkerasan as number,
            idKabkota: dto.idKabkota as number,
            idKecamatan: dto.idKecamatan as number,
            idKelurahan: dto.idKelurahan as number,
            tahunAnggaran: dto.tahunAnggaran as number,
            namaUsulan: dto.namaUsulan as string,
            alamat: (dto.alamat as string) ?? null,
            idUsulanJalanStatus: USULAN_JALAN_STATUS.DRAFT,
            idOpd: idOpd!,
        };

        if (isUpdate) {
            const id = dto.id as number;
            const existing = await this.getUsulanOrThrow(id, userIdOpd, userRoles);
            if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.DRAFT) {
                throw new BadRequestException('Only draft usulan can be updated');
            }
            await this.repository.update(id, payload);
            return { id };
        }

        const created = await this.repository.create(payload);
        return { id: created.id };
    }

    async storeInformasi(
        dto: Record<string, unknown>,
        userIdOpd: number | null,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        const id = dto.idUsulanJalan as number;
        const existing = await this.getUsulanOrThrow(id, userIdOpd, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.DRAFT) {
            throw new BadRequestException('Only draft usulan can submit informasi');
        }

        const result = await this.repository.update(id, {
            lebar: dto.lebar as number,
            idRekening: dto.idRekening as number,
            dataRuangLingkup: dto.data_ruang_lingkup as Record<string, unknown>[],
            dataSmkk: dto.data_smkk as Record<string, unknown>[],
            idUsulanJalanStatus: USULAN_JALAN_STATUS.DIAJUKAN,
        });

        return { id, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async verifyIndex(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        await this.assertVerifikator(userId, JenisVerifikator.ADBANG);
        const id = dto.idUsulanJalan as number;
        const existing = await this.getUsulanOrThrow(id, null, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.DIAJUKAN) {
            throw new BadRequestException('Usulan is not in verifikasi index stage');
        }

        const result = await this.repository.update(id, {
            idAsbJenis: dto.idAsbJenis as number,
            idJalanJenisPemeliharaan: (dto.idJalanJenisPemeliharaan as number) ?? null,
            idJalanJenisPerkerasan: dto.idJalanJenisPerkerasan as number,
            idKabkota: dto.idKabkota as number,
            idKecamatan: dto.idKecamatan as number,
            idKelurahan: dto.idKelurahan as number,
            tahunAnggaran: dto.tahunAnggaran as number,
            namaUsulan: dto.namaUsulan as string,
            alamat: (dto.alamat as string) ?? null,
            idUsulanJalanStatus: USULAN_JALAN_STATUS.VERIFIKASI_INDEX_ADBANG,
        });

        return { id, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async verifyInformasi(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        await this.assertVerifikator(userId, JenisVerifikator.ADBANG);
        const id = dto.idUsulanJalan as number;
        const existing = await this.getUsulanOrThrow(id, null, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.VERIFIKASI_INDEX_ADBANG) {
            throw new BadRequestException('Usulan is not in verifikasi informasi stage');
        }

        const mergedRuangLingkup = this.mergeReviewRuangLingkup(
            (existing.dataRuangLingkup as Record<string, unknown>[]) ?? [],
            (dto.data_ruang_lingkup as Record<string, unknown>[]) ?? [],
        );

        const result = await this.repository.update(id, {
            lebarJalanReview: (dto.lebar as number) ?? null,
            dataRuangLingkup: mergedRuangLingkup,
            dataSmkk: (dto.data_smkk as Record<string, unknown>[]) ?? existing.dataSmkk,
            idUsulanJalanStatus: USULAN_JALAN_STATUS.VERIFIKASI_INFORMASI_ADBANG,
        });

        return { id, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async verifyAdbang(
        idUsulanJalan: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        const verifikator = await this.assertVerifikator(userId, JenisVerifikator.ADBANG);
        const existing = await this.getUsulanOrThrow(idUsulanJalan, null, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.VERIFIKASI_INFORMASI_ADBANG) {
            throw new BadRequestException('Usulan is not in verifikasi adbang stage');
        }

        const result = await this.repository.update(idUsulanJalan, {
            idVerifikatorAdbang: verifikator.id,
            verifiedAdbangAt: new Date(),
            idUsulanJalanStatus: USULAN_JALAN_STATUS.VERIFIKASI_BPKAD,
        });

        return { id: idUsulanJalan, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async verifyBpkad(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        const verifikator = await this.assertVerifikator(userId, JenisVerifikator.BPKAD);
        const id = dto.idUsulanJalan as number;
        const existing = await this.getUsulanOrThrow(id, null, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.VERIFIKASI_BPKAD) {
            throw new BadRequestException('Usulan is not in verifikasi BPKAD stage');
        }

        const updateData: Record<string, unknown> = {
            idVerifikatorBpkad: verifikator.id,
            verifiedBpkadAt: new Date(),
            idUsulanJalanStatus: USULAN_JALAN_STATUS.VERIFIKASI_BAPPEDA,
        };
        if (dto.idRekeningReview !== undefined && dto.idRekeningReview !== null) {
            updateData.idRekeningReview = dto.idRekeningReview;
        }

        const result = await this.repository.update(id, updateData);
        return { id, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async verifyBappeda(
        idUsulanJalan: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        const verifikator = await this.assertVerifikator(userId, JenisVerifikator.BAPPEDA);
        const existing = await this.getUsulanOrThrow(idUsulanJalan, null, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.VERIFIKASI_BAPPEDA) {
            throw new BadRequestException('Usulan is not in verifikasi BAPPEDA stage');
        }

        const result = await this.repository.update(idUsulanJalan, {
            idVerifikatorBappeda: verifikator.id,
            verifiedBappedaAt: new Date(),
            idUsulanJalanStatus: USULAN_JALAN_STATUS.DISETUJUI,
        });

        return { id: idUsulanJalan, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async reject(
        idUsulanJalan: number,
        rejectReason: string,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanJalanStatus: number }> {
        if (!userRoles.includes(Role.VERIFIKATOR)) {
            throw new ForbiddenException('Only verifikator can reject usulan');
        }
        await this.verifikatorService.checkVerifikatorType(Number(userId));
        await this.getUsulanOrThrow(idUsulanJalan, null, userRoles);

        const result = await this.repository.update(idUsulanJalan, {
            idUsulanJalanStatus: USULAN_JALAN_STATUS.DITOLAK,
            rejectReason,
            rejectedAt: new Date(),
            idRejectVerif: Number(userId),
        });

        return { id: idUsulanJalan, idUsulanJalanStatus: result.idUsulanJalanStatus };
    }

    async getRejectInfo(idUsulanJalan: number): Promise<Record<string, unknown> | null> {
        const usulan = await this.repository.findById(idUsulanJalan);
        if (!usulan) {
            return null;
        }
        return {
            idUsulanJalan: usulan.id,
            rejectReason: usulan.rejectReason,
            rejectedAt: usulan.rejectedAt,
            rejectVerifikator: usulan.rejectVerifikator,
        };
    }

    async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<Record<string, unknown>> {
        const isOpdOnly = userRoles.includes(Role.OPD) && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN) && !userRoles.includes(Role.VERIFIKATOR);
        const usulan = await this.repository.findById(id, isOpdOnly ? userIdOpd : null);
        if (!usulan) {
            throw new NotFoundException(`Usulan jalan with id ${id} not found`);
        }
        return usulan;
    }

    async findAll(query: UsulanJalanListQuery, userIdOpd: number | null, userRoles: Role[]) {
        const isOpdOnly = userRoles.includes(Role.OPD) && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN) && !userRoles.includes(Role.VERIFIKATOR);
        return this.repository.findAll(query, isOpdOnly ? userIdOpd : null);
    }

    async delete(idUsulanJalan: number, userIdOpd: number | null, userRoles: Role[]): Promise<boolean> {
        const existing = await this.getUsulanOrThrow(idUsulanJalan, userIdOpd, userRoles);
        if ((existing.idUsulanJalanStatus as number) !== USULAN_JALAN_STATUS.DRAFT) {
            throw new BadRequestException('Only draft usulan can be deleted');
        }
        return this.repository.softDelete(idUsulanJalan);
    }

    private mergeReviewRuangLingkup(
        existing: Record<string, unknown>[],
        review: Record<string, unknown>[],
    ): Record<string, unknown>[] {
        if (!review.length) {
            return existing;
        }

        const reviewMap = new Map<number, Record<string, unknown>>();
        for (const rl of review) {
            reviewMap.set(rl.id as number, rl);
        }

        return existing.map((rl) => {
            const reviewRl = reviewMap.get(rl.id as number);
            if (!reviewRl) {
                return rl;
            }

            const existingHspk = (rl.data_hspk as Record<string, unknown>[]) ?? [];
            const reviewHspk = (reviewRl.data_hspk as Record<string, unknown>[]) ?? [];
            const hspkMap = new Map<number, Record<string, unknown>>();
            for (const h of reviewHspk) {
                hspkMap.set(h.id_hspk as number, h);
            }

            const mergedHspk = existingHspk.map((h) => {
                const rev = hspkMap.get(h.id_hspk as number);
                return rev ? { ...h, ...rev } : h;
            });

            return { ...rl, data_hspk: mergedHspk };
        });
    }
}
