import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JenisVerifikator } from '../../domain/verifikator/jenis_verifikator.enum';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { Role } from '../../domain/user/user_role.enum';
import { UsulanSaluranRepository, UsulanSaluranListQuery } from '../../domain/usulan_saluran/usulan_saluran.repository';
import { UsulanSaluranService } from '../../domain/usulan_saluran/usulan_saluran.service';
import { USULAN_SALURAN_STATUS } from '../../domain/usulan_saluran/usulan_saluran_status.constants';

@Injectable()
export class UsulanSaluranServiceImpl implements UsulanSaluranService {
    constructor(
        private readonly repository: UsulanSaluranRepository,
        private readonly verifikatorService: VerifikatorService,
    ) {}

    private async getUsulanOrThrow(id: number, userIdOpd: number | null, userRoles: Role[]) {
        const isOpdOnly = userRoles.includes(Role.OPD) && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN) && !userRoles.includes(Role.VERIFIKATOR);
        const usulan = await this.repository.findById(id, isOpdOnly ? userIdOpd : null);
        if (!usulan) {
            throw new NotFoundException(`Usulan saluran with id ${id} not found`);
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
        if (!userIdOpd && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN)) {
            throw new ForbiddenException('User is not synced to an OPD');
        }

        const payload = {
            idAsbJenis: dto.idAsbJenis as number,
            idTipeSaluran: dto.idTipeSaluran as number,
            idKabkota: dto.idKabkota as number,
            idKecamatan: dto.idKecamatan as number,
            idKelurahan: dto.idKelurahan as number,
            tahunAnggaran: dto.tahunAnggaran as number,
            namaUsulan: dto.namaUsulan as string,
            alamat: (dto.alamat as string) ?? null,
            idUsulanSaluranStatus: USULAN_SALURAN_STATUS.DRAFT,
            idOpd: userIdOpd!,
        };

        if (isUpdate) {
            const id = (dto.id ?? dto.idUsulanSaluran) as number;
            const existing = await this.getUsulanOrThrow(id, userIdOpd, userRoles);
            if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.DRAFT) {
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
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        const id = dto.idUsulanSaluran as number;
        const existing = await this.getUsulanOrThrow(id, userIdOpd, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.DRAFT) {
            throw new BadRequestException('Only draft usulan can submit informasi');
        }

        const result = await this.repository.update(id, {
            lebar: dto.lebar as number,
            idRekening: dto.idRekening as number,
            dataRuangLingkup: dto.data_ruang_lingkup as Record<string, unknown>[],
            dataSmkk: dto.data_smkk as Record<string, unknown>[],
            keteranganTambahan: (dto.keteranganTambahan as string) ?? null,
            idUsulanSaluranStatus: USULAN_SALURAN_STATUS.DIAJUKAN,
        });

        return { id, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async verifyIndex(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        await this.assertVerifikator(userId, JenisVerifikator.ADBANG);
        const id = dto.idUsulanSaluran as number;
        const existing = await this.getUsulanOrThrow(id, null, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.DIAJUKAN) {
            throw new BadRequestException('Usulan is not in ADBANG verification stage');
        }

        const result = await this.repository.update(id, {
            idAsbJenis: dto.idAsbJenis as number,
            idTipeSaluran: dto.idTipeSaluran as number,
            idKabkota: dto.idKabkota as number,
            idKecamatan: dto.idKecamatan as number,
            idKelurahan: dto.idKelurahan as number,
            tahunAnggaran: dto.tahunAnggaran as number,
            namaUsulan: dto.namaUsulan as string,
            alamat: (dto.alamat as string) ?? null,
        });

        return { id, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async verifyInformasi(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        await this.assertVerifikator(userId, JenisVerifikator.ADBANG);
        const id = dto.idUsulanSaluran as number;
        const existing = await this.getUsulanOrThrow(id, null, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.DIAJUKAN) {
            throw new BadRequestException('Usulan is not in ADBANG verification stage');
        }

        const mergedRuangLingkup = this.mergeReviewRuangLingkup(
            (existing.dataRuangLingkup as Record<string, unknown>[]) ?? [],
            (dto.data_ruang_lingkup as Record<string, unknown>[]) ?? [],
        );

        const result = await this.repository.update(id, {
            lebar: (dto.lebar as number) ?? existing.lebar,
            dataRuangLingkup: mergedRuangLingkup,
            dataSmkk: (dto.data_smkk as Record<string, unknown>[]) ?? existing.dataSmkk,
        });

        return { id, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async verifyAdbang(
        idUsulanSaluran: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        const verifikator = await this.assertVerifikator(userId, JenisVerifikator.ADBANG);
        const existing = await this.getUsulanOrThrow(idUsulanSaluran, null, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.DIAJUKAN) {
            throw new BadRequestException('Usulan is not in ADBANG verification stage');
        }

        const result = await this.repository.update(idUsulanSaluran, {
            idVerifikatorAdbang: verifikator.id,
            verifikatorAdbangReviewAt: new Date(),
            idUsulanSaluranStatus: USULAN_SALURAN_STATUS.VERIFIKASI_BPKAD,
        });

        return { id: idUsulanSaluran, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async verifyBpkad(
        dto: Record<string, unknown>,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        const verifikator = await this.assertVerifikator(userId, JenisVerifikator.BPKAD);
        const id = dto.idUsulanSaluran as number;
        const existing = await this.getUsulanOrThrow(id, null, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.VERIFIKASI_BPKAD) {
            throw new BadRequestException('Usulan is not in verifikasi BPKAD stage');
        }

        const updateData: Record<string, unknown> = {
            idVerifikatorBpkad: verifikator.id,
            verifikatorBpkadReviewAt: new Date(),
            idUsulanSaluranStatus: USULAN_SALURAN_STATUS.VERIFIKASI_BAPPEDA,
        };
        if (dto.idRekeningReview !== undefined && dto.idRekeningReview !== null) {
            updateData.idRekeningReview = dto.idRekeningReview;
        }

        const result = await this.repository.update(id, updateData);
        return { id, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async verifyBappeda(
        idUsulanSaluran: number,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        const verifikator = await this.assertVerifikator(userId, JenisVerifikator.BAPPEDA);
        const existing = await this.getUsulanOrThrow(idUsulanSaluran, null, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.VERIFIKASI_BAPPEDA) {
            throw new BadRequestException('Usulan is not in verifikasi BAPPEDA stage');
        }

        const result = await this.repository.update(idUsulanSaluran, {
            idVerifikatorBappeda: verifikator.id,
            verifikatorBappedaReviewAt: new Date(),
            idUsulanSaluranStatus: USULAN_SALURAN_STATUS.DISETUJUI,
        });

        return { id: idUsulanSaluran, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async reject(
        idUsulanSaluran: number,
        rejectReason: string,
        userId: string,
        userRoles: Role[],
    ): Promise<{ id: number; idUsulanSaluranStatus: number }> {
        if (!userRoles.includes(Role.VERIFIKATOR)) {
            throw new ForbiddenException('Only verifikator can reject usulan');
        }
        await this.verifikatorService.checkVerifikatorType(Number(userId));
        await this.getUsulanOrThrow(idUsulanSaluran, null, userRoles);

        const result = await this.repository.update(idUsulanSaluran, {
            idUsulanSaluranStatus: USULAN_SALURAN_STATUS.DITOLAK,
            rejectReason,
            rejectedAt: new Date(),
            idRejectVerif: Number(userId),
        });

        return { id: idUsulanSaluran, idUsulanSaluranStatus: result.idUsulanSaluranStatus };
    }

    async getRejectInfo(idUsulanSaluran: number): Promise<Record<string, unknown> | null> {
        const usulan = await this.repository.findById(idUsulanSaluran);
        if (!usulan) return null;
        return {
            idUsulanSaluran: usulan.id,
            rejectReason: usulan.rejectReason,
            rejectedAt: usulan.rejectedAt,
            rejectVerifikator: usulan.rejectVerifikator,
        };
    }

    async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<Record<string, unknown>> {
        const isOpdOnly = userRoles.includes(Role.OPD) && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN) && !userRoles.includes(Role.VERIFIKATOR);
        const usulan = await this.repository.findById(id, isOpdOnly ? userIdOpd : null);
        if (!usulan) {
            throw new NotFoundException(`Usulan saluran with id ${id} not found`);
        }
        return usulan;
    }

    async findAll(query: UsulanSaluranListQuery, userIdOpd: number | null, userRoles: Role[]) {
        const isOpdOnly = userRoles.includes(Role.OPD) && !userRoles.includes(Role.ADMIN) && !userRoles.includes(Role.SUPERADMIN) && !userRoles.includes(Role.VERIFIKATOR);
        return this.repository.findAll(query, isOpdOnly ? userIdOpd : null);
    }

    async delete(idUsulanSaluran: number, userIdOpd: number | null, userRoles: Role[]): Promise<boolean> {
        const existing = await this.getUsulanOrThrow(idUsulanSaluran, userIdOpd, userRoles);
        if ((existing.idUsulanSaluranStatus as number) !== USULAN_SALURAN_STATUS.DRAFT) {
            throw new BadRequestException('Only draft usulan can be deleted');
        }
        return this.repository.softDelete(idUsulanSaluran);
    }

    private mergeReviewRuangLingkup(
        existing: Record<string, unknown>[],
        review: Record<string, unknown>[],
    ): Record<string, unknown>[] {
        if (!review.length) return existing;

        const reviewMap = new Map<number, Record<string, unknown>>();
        for (const rl of review) {
            reviewMap.set(rl.id as number, rl);
        }

        return existing.map((rl) => {
            const reviewRl = reviewMap.get(rl.id as number);
            if (!reviewRl) return rl;

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
