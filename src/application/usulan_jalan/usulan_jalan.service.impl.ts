import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { Role } from '../../domain/user/user_role.enum';
import { JenisVerifikator } from '../../domain/verifikator/jenis_verifikator.enum';
import { UsulanJalanWithRelationsDto } from './dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from './dto/find_all_usulan_jalan.dto';
import { UsulanJalanListResultDto } from './dto/usulan_jalan_list_result.dto';
import { RejectInfoDto } from './dto/reject_info.dto';
import { StoreInformasiUsulanJalanDto } from '../../presentation/usulan_jalan/dto/store_informasi_usulan_jalan.dto';
import { StoreRuangLingkupUsulanJalanDto } from '../../presentation/usulan_jalan/dto/store_ruang_lingkup_usulan_jalan.dto';
import { UpdateUsulanJalanDto } from '../../presentation/usulan_jalan/dto/update_usulan_jalan.dto';
import { VerifyInformasiUsulanJalanDto } from '../../presentation/usulan_jalan/dto/verify_informasi_usulan_jalan.dto';
import { VerifyRuangLingkupUsulanJalanDto } from '../../presentation/usulan_jalan/dto/verify_ruang_lingkup_usulan_jalan.dto';
import { GetUsulanJalanAnalyticsFilterDto } from './dto/get_usulan_jalan_analytics_filter.dto';
import { UsulanJalanAnalyticsDto } from './dto/usulan_jalan_analytics.dto';

@Injectable()
export class UsulanJalanServiceImpl implements UsulanJalanService {
    constructor(
        private readonly repository: UsulanJalanRepository,
        private readonly verifikatorService: VerifikatorService,
    ) { }

    async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanJalanWithRelationsDto | null> {
        try {
            // OPD users can only see their own data
            const idOpd = userRoles.includes(Role.OPD) && userIdOpd !== null ? userIdOpd : undefined;
            return await this.repository.findById(id, idOpd);
        } catch (error) {
            throw error;
        }
    }

    async findAll(dto: FindAllUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanJalanListResultDto> {
        try {
            // OPD users can only see their own data
            const idOpd = userRoles.includes(Role.OPD) && userIdOpd !== null ? userIdOpd : undefined;

            const { data, total } = await this.repository.findAll(dto, idOpd);

            const page = dto.page ?? 1;
            const amount = dto.amount ?? total;
            const totalPages = amount > 0 ? Math.ceil(total / amount) : 0;

            return {
                data,
                page,
                amount,
                total,
                totalPages,
            };
        } catch (error) {
            throw error;
        }
    }

    async storeInformasi(dto: StoreInformasiUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Validate that user has idOpd (must be OPD user)
            if (!userIdOpd) {
                throw new ForbiddenException('User is not sync to an opd');
            }

            const idOpd = userIdOpd;

            // Create with status 1 (Input Informasi Usulan Jalan)
            const usulanJalan = await this.repository.create({
                idOpd,
                idUsulanJalanStatus: 1,
                idKabkota: dto.idKabkota,
                idKecamatan: dto.idKecamatan ?? null,
                idKelurahan: dto.idKelurahan ?? null,
                tahunAnggaran: dto.tahunAnggaran,
                namaUsulanJalan: dto.namaUsulanJalan,
                alamat: dto.alamat,
                lebarJalan: dto.lebarJalan,
                lebarJalanReview: dto.lebarJalanReview ?? null,
                idJalanJenisPerkerasan: dto.idJalanJenisPerkerasan,
                idJalanJenisPerkerasanReview: dto.idJalanJenisPerkerasanReview ?? null,
            });

            return {
                id: usulanJalan.id,
                status: usulanJalan.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async storeRuangLingkup(dto: StoreRuangLingkupUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check existence and permission
            const usulanJalan = await this.findById(dto.idUsulanJalan, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.idUsulanJalan} not found`);
            }

            // Validate conditional fields based on jenis perkerasan
            // if (usulanJalan.idJalanJenisPerkerasan === 1) {
            //     // Lentur - require lentur fields
            //     if (!dto.idSpesifikasiDesainLentur || !dto.idRuangLingkupPerkerasanLentur) {
            //         throw new ForbiddenException('Spesifikasi Desain Lentur and Ruang Lingkup Perkerasan Lentur are required for Lentur type');
            //     }
            // } else if (usulanJalan.idJalanJenisPerkerasan === 2) {
            //     // Kaku - require kaku fields
            //     if (!dto.idSpesifikasiDesainKaku || !dto.idRuangLingkupPerkerasanKaku) {
            //         throw new ForbiddenException('Spesifikasi Desain Kaku and Ruang Lingkup Perkerasan Kaku are required for Kaku type');
            //     }
            // }

            // Update with status 2 (Input Ruang Lingkup dan Spesifikasi Jalan)
            const updated = await this.repository.update(dto.idUsulanJalan, {
                idUsulanJalanStatus: 2,
                idSpesifikasiDesain: dto.idSpesifikasiDesain ?? null,
                idSpesifikasiDesainReview: dto.idSpesifikasiDesainReview ?? null,
                idRuangLingkup: dto.idRuangLingkup ?? null,
                idRuangLingkupReview: dto.idRuangLingkupReview ?? null,
                keteranganTambahan: dto.keteranganTambahan ?? null,
                keteranganTambahanReview: dto.keteranganTambahanReview ?? null,
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateUsulanJalan(dto: UpdateUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check existence and permission
            const usulanJalan = await this.findById(dto.idUsulanJalan, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.idUsulanJalan} not found`);
            }

            // Update all fields
            const updated = await this.repository.update(dto.idUsulanJalan, {
                idKabkota: dto.idKabkota,
                idKecamatan: dto.idKecamatan ?? null,
                idKelurahan: dto.idKelurahan ?? null,
                tahunAnggaran: dto.tahunAnggaran,
                namaUsulanJalan: dto.namaUsulanJalan,
                alamat: dto.alamat,
                lebarJalan: dto.lebarJalan,
                lebarJalanReview: dto.lebarJalanReview ?? null,
                idJalanJenisPerkerasan: dto.idJalanJenisPerkerasan,
                idJalanJenisPerkerasanReview: dto.idJalanJenisPerkerasanReview ?? null,
                idSpesifikasiDesain: dto.idSpesifikasiDesain ?? null,
                idSpesifikasiDesainReview: dto.idSpesifikasiDesainReview ?? null,
                idRuangLingkup: dto.idRuangLingkup ?? null,
                idRuangLingkupReview: dto.idRuangLingkupReview ?? null,
                keteranganTambahan: dto.keteranganTambahan ?? null,
                keteranganTambahanReview: dto.keteranganTambahanReview ?? null,
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async deleteUsulanJalan(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }> {
        try {
            // Check existence and permission
            const usulanJalan = await this.findById(id, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${id} not found`);
            }

            await this.repository.delete(id);

            return { id };
        } catch (error) {
            throw error;
        }
    }

    async verifyInformasi(dto: VerifyInformasiUsulanJalanDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check verificator type - only ADBANG
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType !== JenisVerifikator.ADBANG) {
                    throw new ForbiddenException(`Only ADBANG can verify informasi usulan jalan`);
                }
            }

            // Check existence
            const usulanJalan = await this.findById(dto.idUsulanJalan, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.idUsulanJalan} not found`);
            }

            // Update review fields and status to 5 (Verifikasi Informasi Usulan Jalan)
            const updated = await this.repository.update(dto.idUsulanJalan, {
                idUsulanJalanStatus: 5,
                lebarJalanReview: dto.verifLebarJalan ?? usulanJalan.lebarJalan,
                idJalanJenisPerkerasanReview: dto.verifIdJalanJenisPerkerasan ?? usulanJalan.idJalanJenisPerkerasan,
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyRuangLingkup(dto: VerifyRuangLingkupUsulanJalanDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check verificator type - only ADBANG
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType !== JenisVerifikator.ADBANG) {
                    throw new ForbiddenException(`Only ADBANG can verify ruang lingkup usulan jalan`);
                }
            }

            // Check existence
            const usulanJalan = await this.findById(dto.idUsulanJalan, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.idUsulanJalan} not found`);
            }

            // Update review fields and status to 6 (Verifikasi Ruang Lingkup dan Spesifikasi Jalan)
            const updated = await this.repository.update(dto.idUsulanJalan, {
                idUsulanJalanStatus: 6,
                idSpesifikasiDesainReview: dto.verifIdSpesifikasiDesain ?? usulanJalan.idSpesifikasiDesain,
                idRuangLingkupReview: dto.verifIdRuangLingkup ?? usulanJalan.idRuangLingkup,
                keteranganTambahanReview: dto.verifKeteranganTambahan ?? usulanJalan.keteranganTambahan,
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyAdbang(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check verificator type - only ADBANG
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType !== JenisVerifikator.ADBANG) {
                    throw new ForbiddenException(`Only ADBANG can approve at this stage`);
                }
            }

            // Check existence
            const usulanJalan = await this.findById(id, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${id} not found`);
            }

            // Update status to 7 (Verifikasi Adbang) and set verificator
            const updated = await this.repository.update(id, {
                idUsulanJalanStatus: 7,
                idVerifikatorAdbang: Number(userId),
                verifiedAdbangAt: new Date(),
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyBpkad(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check verificator type - only BPKAD
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType !== JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`Only BPKAD can approve at this stage`);
                }
            }

            // Check existence
            const usulanJalan = await this.findById(id, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${id} not found`);
            }

            // Check that ADBANG verified first
            if (!usulanJalan.idVerifikatorAdbang) {
                throw new ForbiddenException(`ADBANG must verify first`);
            }

            // Update status to 8 (Verifikasi Bpkad) and set verificator
            const updated = await this.repository.update(id, {
                idUsulanJalanStatus: 8,
                idVerifikatorBpkad: Number(userId),
                verifiedBpkadAt: new Date(),
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyBappeda(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check verificator type - only BAPPEDA
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType !== JenisVerifikator.BAPPEDA) {
                    throw new ForbiddenException(`Only BAPPEDA can approve at this stage`);
                }
            }

            // Check existence
            const usulanJalan = await this.findById(id, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${id} not found`);
            }

            // Check that ADBANG and BPKAD verified first
            if (!usulanJalan.idVerifikatorAdbang || !usulanJalan.idVerifikatorBpkad) {
                throw new ForbiddenException(`ADBANG and BPKAD must verify first`);
            }

            // Update status to 3 (Memenuhi Syarat - Final approved) and set verificator
            const updated = await this.repository.update(id, {
                idUsulanJalanStatus: 3,
                idVerifikatorBappeda: Number(userId),
                verifiedBappedaAt: new Date(),
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async reject(id: number, rejectReason: string, userId: string, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check existence
            const usulanJalan = await this.findById(id, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${id} not found`);
            }

            // Update status to 4 (Tidak Memenuhi Syarat - Rejected)
            const updated = await this.repository.update(id, {
                idUsulanJalanStatus: 4,
                rejectReason: rejectReason,
                rejectVerifId: Number(userId),
                rejectedAt: new Date(),
            });

            return {
                id: updated.id,
                status: updated.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async getRejectInfo(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<RejectInfoDto | null> {
        try {
            // Check if user is ADMIN or SUPERADMIN
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

            let rejectInfo: RejectInfoDto | null;

            if (isAdmin || isSuperAdmin || isVerifikator) {
                // ADMIN/SUPERADMIN/VERIFIKATOR can access ALL Usulan Jalan without OPD filter
                rejectInfo = await this.repository.getRejectInfo(id);
            } else {
                // For OPD users
                const isOpd = userRoles.includes(Role.OPD);

                if (isOpd) {
                    // OPD users must have an idOpd
                    if (!userIdOpd) {
                        throw new ForbiddenException('OPD user has no associated OPD');
                    }

                    // Fetch with OPD filter
                    rejectInfo = await this.repository.getRejectInfo(id, userIdOpd);
                } else {
                    throw new ForbiddenException('User is not authorized to access reject info');
                }
            }

            if (!rejectInfo) {
                throw new NotFoundException(`Usulan Jalan with id ${id} not found`);
            }

            // Check if Usulan Jalan has been rejected
            if (!rejectInfo.rejectVerifId || !rejectInfo.rejectedAt) {
                throw new BadRequestException('Usulan Jalan is not in rejected status');
            }

            // Get verifikator info if rejectVerifikator exists
            if (rejectInfo.rejectVerifikator) {
                const verifikator = await this.verifikatorService.findByUserId(rejectInfo.rejectVerifikator.id);
                if (verifikator && verifikator.user) {
                    rejectInfo.verifikator = {
                        id: verifikator.id,
                        idUser: verifikator.idUser,
                        jenisVerifikator: verifikator.jenisVerifikator,
                        verifikator: verifikator.verifikator,
                        user: {
                            id: verifikator.user.id,
                            username: verifikator.user.username,
                        },
                    };
                }
            }

            return rejectInfo;
        } catch (error) {
            throw error;
        }
    }

    async getAnalytics(userIdOpd: number | null, userRoles: Role[], filter?: GetUsulanJalanAnalyticsFilterDto): Promise<UsulanJalanAnalyticsDto> {
        try {
            // Check permissions
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

            if (isAdmin || isSuperAdmin || isVerifikator) {
                // ADMIN/SUPERADMIN/VERIFIKATOR can access ALL without OPD filter
                return await this.repository.getAnalytics(undefined, filter);
            } else {
                // For OPD users
                const isOpd = userRoles.includes(Role.OPD);

                if (isOpd) {
                    // OPD users must have an idOpd
                    if (!userIdOpd) {
                        throw new ForbiddenException('OPD user has no associated OPD');
                    }

                    // Fetch with OPD filter
                    return await this.repository.getAnalytics(userIdOpd, filter);
                } else {
                    throw new ForbiddenException('User is not authorized to access Usulan Jalan analytics');
                }
            }
        } catch (error) {
            throw error;
        }
    }
}


