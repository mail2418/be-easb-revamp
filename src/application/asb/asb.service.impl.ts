import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Express } from 'express';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { AsbWithRelationsDto } from '../../application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from '../../application/asb/dto/find_all_asb.dto';
import { AsbListResultDto } from '../../application/asb/dto/asb_list_result.dto';
import { Role } from '../../domain/user/user_role.enum';
import { CreateAsbStoreIndexDto } from './dto/create_asb_store_index.dto';
import { UpdateAsbStoreIndexDto } from './dto/update_asb_store_index.dto';
import { UpdateAsbStoreLantaiDto } from './dto/update_asb_store_lantai.dto';
import { AsbDocumentService } from 'src/domain/asb_document/asb_document.service';
import { AsbDetailService } from 'src/domain/asb_detail/asb_detail.service';
import { CreateAsbDetailDto } from 'src/application/asb_detail/dto/create_asb_detail.dto';
import { StoreBpsDto } from '../../presentation/asb/dto/store_bps.dto';
import { StoreBpnsDto } from '../../presentation/asb/dto/store_bpns.dto';
import { ShstService } from '../../domain/shst/shst.service';
import { AsbBipekStandardService } from '../../domain/asb_bipek_standard/asb_bipek_standard.service';
import { AsbBipekNonStdService } from '../../domain/asb_bipek_non_std/asb_bipek_non_std.service';
import { CalculateBobotBPSUseCase } from '../asb_bipek_standard/use_cases/calculate_bobot_bps.use_case';
import { CalculateBobotBPNSUseCase } from '../asb_bipek_non_std/use_cases/calculate_bobot_bpns.use_case';
import { GetShstNominalDto } from '../shst/dto/get_shst_nominal.dto';
import { StoreVerifDto } from 'src/presentation/asb/dto/store_verif.dto';
import { VerifyLantaiDto } from 'src/presentation/asb/dto/verify_lantai.dto';
import { AsbDetailReviewService } from 'src/domain/asb_detail_review/asb_detail_review.service';
import { CreateAsbDetailReviewDto } from '../asb_detail_review/dto/create_asb_detail_review.dto';
import { Files } from 'src/domain/asb_detail/files.enum';
import { StoreRekeningDto } from 'src/presentation/asb/dto/store_rekening.dto';
import { VerifyBpnsDto } from 'src/presentation/asb/dto/verify_bpns.dto';
import { VerifyRekeningDto } from 'src/presentation/asb/dto/verify_rekening.dto';
import { CalculateBobotBPNSReviewUseCase } from '../asb_bipek_non_std_review/use_cases/calculate_bobot_bpns_review.use_case';
import { VerifyBpsDto } from 'src/presentation/asb/dto/verify_bps.dto';
import { VerifyPekerjaanDto } from 'src/presentation/asb/dto/verify_pekerjaan.dto';
import { GetAsbByMonthYearDto } from './dto/get_asb_by_moth_year.dto';
import { AsbAnalyticsDto } from './dto/asb_analytics.dto';
import { GetAsbAnalyticsFilterDto } from './dto/get_asb_analytics_filter.dto';
import { RejectInfoDto } from './dto/reject_info.dto';
import { AsbBipekStandardReviewService } from 'src/domain/asb_bipek_standard_review/asb_bipek_standard_review.service';
import { AsbBipekNonStdReviewService } from 'src/domain/asb_bipek_non_std_review/asb_bipek_non_std_review.service';
import { CalculateBobotBPSReviewUseCase } from '../asb_bipek_standard_review/use_cases/calculate_bobot_bps_review.use_case';
import { AsbJakonService } from 'src/domain/asb_jakon/asb_jakon.service';
import { AsbJakonType } from 'src/domain/asb_jakon/asb_jakon_type.enum';
import { UserService } from 'src/domain/user/user.service';
import { OpdService } from 'src/domain/opd/opd.service';
import { VerifikatorService } from 'src/domain/verifikator/verifikator.service';
import { JenisVerifikator } from 'src/domain/verifikator/jenis_verifikator.enum';

@Injectable()
export class AsbServiceImpl implements AsbService {
    constructor(
        private readonly repository: AsbRepository,
        private readonly asbDocumentService: AsbDocumentService,
        private readonly asbDetailService: AsbDetailService,
        private readonly shstService: ShstService,
        private readonly asbBipekStandardService: AsbBipekStandardService,
        private readonly asbBipekNonStdService: AsbBipekNonStdService,
        private readonly asbBipekStandardReviewService: AsbBipekStandardReviewService,
        private readonly asbBipekNonStdReviewService: AsbBipekNonStdReviewService,
        private readonly calculateBobotBPSUseCase: CalculateBobotBPSUseCase,
        private readonly calculateBobotBPNSUseCase: CalculateBobotBPNSUseCase,
        private readonly asbDetailReviewService: AsbDetailReviewService,
        private readonly calculateBobotBPSReviewUseCase: CalculateBobotBPSReviewUseCase,
        private readonly calculateBobotBPNSReviewUseCase: CalculateBobotBPNSReviewUseCase,
        private readonly asbJakonService: AsbJakonService,
        private readonly opdService: OpdService,
        private readonly userService: UserService,
        private readonly verifikatorService: VerifikatorService
    ) { }

    async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null> {
        try {
            // Check if user is ADMIN or SUPERADMIN
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

            if (isAdmin || isSuperAdmin || isVerifikator) {
                // ADMIN/SUPERADMIN can access ANY ASB without OPD filter
                const asb = await this.repository.findById(id);

                if (!asb) {
                    throw new NotFoundException(`ASB with id ${id} not found`);
                }

                return asb;
            }

            // For OPD users
            const isOpd = userRoles.includes(Role.OPD);

            if (isOpd) {
                // OPD users must have an idOpd
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }

                // Fetch with OPD filter
                const asb = await this.repository.findById(id, userIdOpd);

                if (!asb) {
                    // Either doesn't exist OR belongs to different OPD (we don't reveal which)
                    throw new NotFoundException(`ASB with id ${id} not found`);
                }

                return asb;
            }

            else throw new ForbiddenException('User is not authorized to access this ASB');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findAll(dto: FindAllAsbDto, userIdOpd: number | null, userRoles: Role[]): Promise<AsbListResultDto> {
        // Check if user is ADMIN or SUPERADMIN
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

        let result: { data: AsbWithRelationsDto[]; total: number };

        if (isAdmin || isSuperAdmin || isVerifikator) {
            // ADMIN/SUPERADMIN can access ALL ASB without OPD filter
            result = await this.repository.findAll(dto);
        } else {
            // For OPD users
            const isOpd = userRoles.includes(Role.OPD);

            if (isOpd) {
                // OPD users must have an idOpd
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }

                // Fetch with OPD filter
                result = await this.repository.findAll(dto, userIdOpd);
            } else {
                throw new ForbiddenException('User is not authorized to access ASB list');
            }
        }

        // Return with pagination metadata
        return {
            data: result.data,
            total: result.total,
            page: dto.page,
            amount: dto.amount,
            totalPages: Math.ceil(result.total / (dto.amount ?? 1)),
        };
    }

    async getAsbByMonthYear(dto: GetAsbByMonthYearDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ date: string; count: number }[]> {
        try {
            // 1. Check permissions
            const isOpd = userRoles.includes(Role.OPD);
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

            if (isAdmin || isSuperAdmin || isVerifikator) {
                return await this.repository.getAllByMonthYear(dto);
            }

            if (isOpd && userIdOpd) {
                // Get only asb with idOpd
                const data = await this.repository.getAllByMonthYear(dto, userIdOpd);

                return data;
            }

            return await this.repository.getAllByMonthYear(dto);

        } catch (error) {
            throw error;
        }
    }

    async getAsbByMonthYearStatus(dto: GetAsbByMonthYearDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ asbStatus: string; amount: number }[]> {
        try {
            // 1. Check permissions
            const isOpd = userRoles.includes(Role.OPD);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);
            let data: { idAsbStatus: number; count: number }[];

            if (isVerifikator) {
                data = await this.repository.getAsbStatusCountsByMonthYear(dto);
            }
            else if (isOpd && userIdOpd) {
                // Get only asb with idOpd
                data = await this.repository.getAsbStatusCountsByMonthYear(dto, userIdOpd);
            } else {
                data = await this.repository.getAsbStatusCountsByMonthYear(dto);
            }

            // 2. Map status to labels
            const result = [
                { asbStatus: 'Sukses', amount: 0 },
                { asbStatus: 'Gagal', amount: 0 },
                { asbStatus: 'Menunggu Verifikasi', amount: 0 },
                { asbStatus: 'Sedang dalam Pengisian', amount: 0 },
            ];

            data.forEach(item => {
                if (item.idAsbStatus === 8) {
                    result[0].amount += item.count; // Sukses
                } else if (item.idAsbStatus === 7) {
                    result[1].amount += item.count; // Gagal
                } else if (item.idAsbStatus === 6 || (item.idAsbStatus >= 9 && item.idAsbStatus <= 13)) {
                    // Status 6: Submitted for verification
                    // Status 9-13: In verification process (Verify Lantai -> Verify Pekerjaan)
                    result[2].amount += item.count; // Menunggu Verifikasi
                } else {
                    // Status 1-5: OPD filling process
                    result[3].amount += item.count; // Sedang dalam Pengisian
                }
            });

            return result;

        } catch (error) {
            throw error;
        }
    }

    async getAsbAnalytics(userIdOpd: number | null, userRoles: Role[], filter?: GetAsbAnalyticsFilterDto): Promise<AsbAnalyticsDto> {
        try {
            // Check if user is ADMIN, SUPERADMIN, or VERIFIKATOR
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);

            if (isAdmin || isSuperAdmin || isVerifikator) {
                // ADMIN/SUPERADMIN/VERIFIKATOR can access ALL ASB without OPD filter
                return await this.repository.getAsbAnalytics(undefined, filter);
            } else {
                // For OPD users
                const isOpd = userRoles.includes(Role.OPD);

                if (isOpd) {
                    // OPD users must have an idOpd
                    if (!userIdOpd) {
                        throw new ForbiddenException('OPD user has no associated OPD');
                    }

                    // Fetch with OPD filter
                    return await this.repository.getAsbAnalytics(userIdOpd, filter);
                } else {
                    throw new ForbiddenException('User is not authorized to access ASB analytics');
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async createIndex(dto: CreateAsbStoreIndexDto, userIdOpd: number | null, userRoles: Role[], username: string): Promise<{ id: number; status: any }> {
        try {
            // Set status to 1
            dto.idAsbStatus = 1;
            if (userIdOpd) {
                dto.idOpd = userIdOpd;
            } else {
                throw new ForbiddenException('User is not sync to an opd');
            }
            console.log("dto", dto);

            // Validate luasTanah based on building type
            if (dto.idAsbTipeBangunan === 2) {
                // Type 2 (Non-Gedung) requires luas_tanah
                if (!dto.luasTanah) {
                    throw new BadRequestException('luas_tanah is required for Non-Gedung buildings (type 2)');
                }
            } else if (dto.idAsbTipeBangunan === 1 && dto.luasTanah !== undefined) {
                // Type 1 (Gedung) should not have luas_tanah
                throw new BadRequestException('luas_tanah cannot be set for Gedung buildings (type 1)');
            }

            // Create ASB
            const asb = await this.repository.create(dto);

            // Get ASB
            const asbData = await this.repository.findById(asb.id);

            if (!asbData) {
                throw new NotFoundException(`ASB with id ${asb.id} not found`);
            }

            // Save documents
            const suratPermohonanDto = {
                idAsb: asbData.id,
                opd: asbData.opd?.opd || "",
                nama_asb: asbData.namaAsb || "",
                asb_jenis: asbData.asbJenis?.jenis || "",
                alamat: asbData.alamat || "",
                username: username
            }

            const asbDocs = await this.asbDocumentService.generateSuratPermohonan(suratPermohonanDto);

            return { id: asb.id, status: asb.idAsbStatus };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateIndex(dto: UpdateAsbStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check permissions
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isVerifikator = userRoles.includes(Role.VERIFIKATOR);
            const isOpd = userRoles.includes(Role.OPD);

            // Verify existence and ownership
            let existingAsb: AsbWithRelationsDto | null = null;

            if (isAdmin || isSuperAdmin || isVerifikator) {
                existingAsb = await this.repository.findById(dto.id);
            } else if (isOpd) {
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }
                existingAsb = await this.repository.findById(dto.id, userIdOpd);
            } else {
                throw new ForbiddenException('User is not authorized to update this ASB');
            }

            if (!existingAsb) {
                throw new NotFoundException(`ASB with id ${dto.id} not found or access denied`);
            }

            // Validate luasTanah based on building type
            if (dto.idAsbTipeBangunan === 2) {
                // Type 2 (Non-Gedung) requires luas_tanah
                if (!dto.luasTanah) {
                    throw new BadRequestException('luas_tanah is required for Non-Gedung buildings (type 2)');
                }
            } else if (dto.idAsbTipeBangunan === 1 && dto.luasTanah !== undefined) {
                // Type 1 (Gedung) should not have luas_tanah
                throw new BadRequestException('luas_tanah cannot be set for Gedung buildings (type 1)');
            }

            // Prepare update data
            const updateData: any = {
                tahunAnggaran: dto.tahunAnggaran,
                namaAsb: dto.namaAsb,
                alamat: dto.alamat,
                totalLantai: dto.totalLantai,
                idAsbTipeBangunan: dto.idAsbTipeBangunan,
                idKabkota: dto.idKabkota,
                idKecamatan: dto.idKecamatan ?? null,
                idKelurahan: dto.idKelurahan ?? null,
                jumlahKontraktor: dto.jumlahKontraktor,
                idAsbJenis: dto.idAsbJenis,
            };

            // Handle luasTanah based on building type
            if (dto.idAsbTipeBangunan === 2) {
                updateData.luasTanah = dto.luasTanah;
            } else if (dto.idAsbTipeBangunan === 1) {
                updateData.luasTanah = null;
            }

            // Handle idOpd if provided (only for admin/superadmin/verifikator)
            if (dto.idOpd !== undefined && (isAdmin || isSuperAdmin || isVerifikator)) {
                updateData.idOpd = dto.idOpd;
            }

            // Handle idAsbStatus if provided (only for admin/superadmin/verifikator)
            if (dto.idAsbStatus !== undefined && (isAdmin || isSuperAdmin || isVerifikator)) {
                updateData.idAsbStatus = dto.idAsbStatus;
            }

            // Update ASB
            const updatedAsb = await this.repository.update(dto.id, updateData);

            return { id: updatedAsb.id, status: updatedAsb.idAsbStatus };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteAsb(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }> {
        // Check permissions
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);

        // Verify existence and ownership
        let existingAsb: AsbWithRelationsDto | null = null;

        if (isAdmin || isSuperAdmin) {
            existingAsb = await this.repository.findById(id);
        } else if (isOpd) {
            if (!userIdOpd) {
                throw new ForbiddenException('OPD user has no associated OPD');
            }
            existingAsb = await this.repository.findById(id, userIdOpd);
        } else {
            throw new ForbiddenException('User is not authorized to delete this ASB');
        }

        if (!existingAsb) {
            throw new NotFoundException(`ASB with id ${id} not found or access denied`);
        }

        // Delete all related documents (files and DB records)
        await this.asbDocumentService.deleteByAsbId(id);

        // Delete the ASB record
        await this.repository.delete(id);


        return { id };
    }

    async storeLantai(dto: UpdateAsbStoreLantaiDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check permissions
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isOpd = userRoles.includes(Role.OPD);

            // Verify existence and ownership
            let existingAsb: AsbWithRelationsDto | null = null;

            if (isAdmin || isSuperAdmin) {
                existingAsb = await this.repository.findById(dto.id_asb);
            } else if (isOpd) {
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }
                existingAsb = await this.repository.findById(dto.id_asb, userIdOpd);
            } else {
                throw new ForbiddenException('User is not authorized to update this ASB');
            }

            if (!existingAsb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found or access denied`);
            }

            // Step 1: Always delete all AsbDetail records for this ASB (by id_asb) to ensure clean state
            await this.asbDetailService.deleteByAsbId(dto.id_asb);

            // Step 2: Validate arrays length
            const totalLantai = existingAsb.totalLantai || 0;
            if (dto.luas_lantai.length !== totalLantai ||
                dto.id_asb_lantai.length !== totalLantai ||
                dto.id_asb_fungsi_ruang.length !== totalLantai) {
                throw new ForbiddenException(
                    `Array lengths must match total_lantai (${totalLantai})`
                );
            }

            // Step 3: Create AsbDetail records for each floor
            for (let i = 0; i < totalLantai; i++) {
                const createDetailDto = new CreateAsbDetailDto();
                createDetailDto.idAsb = dto.id_asb;
                createDetailDto.idAsbLantai = dto.id_asb_lantai[i];
                createDetailDto.idAsbFungsiRuang = dto.id_asb_fungsi_ruang[i];
                createDetailDto.idAsbTipeBangunan = existingAsb.idAsbTipeBangunan;
                createDetailDto.luas = dto.luas_lantai[i];

                // The service will calculate koef values automatically
                await this.asbDetailService.create(createDetailDto);
            }

            // Step 4: Set ASB Klasifikasi
            // REQUEST_TULUNGAGUNG //
            const totalLantaiExistingAsb = existingAsb.totalLantai || 0;
            const totalLuasLantai = dto.luas_lantai.reduce((total, luas) => total + luas, 0);
            if (existingAsb.idAsbTipeBangunan === 1) {
                existingAsb.idAsbKlasifikasi = totalLantaiExistingAsb > 2 ? 2 : 1;
            } else {
                existingAsb.idAsbKlasifikasi = totalLuasLantai < 120 ? 3 : totalLuasLantai > 250 ? 5 : 4;
            }

            // REQUEST_TULUNGAGUNG //

            // Step 6: Calculate Luas Total Bangunan
            existingAsb.luasTotalBangunan = totalLuasLantai;

            // Step 7: Calculate Koefisien Lantai Total
            existingAsb.koefisienLantaiTotal = await this.asbDetailService.calculateKoefLantaiTotal(dto.id_asb, totalLuasLantai);

            // Step 8: Calculate Koefisien Fungsi RuangTotal
            existingAsb.koefisienFungsiRuangTotal = await this.asbDetailService.calculateKoefFungsiRuangTotal(dto.id_asb, totalLuasLantai);

            // Step 9: Get Nominal shst
            const shstDto = new GetShstNominalDto();
            shstDto.id_asb_tipe_bangunan = existingAsb.idAsbTipeBangunan;
            shstDto.id_asb_klasifikasi = existingAsb.idAsbKlasifikasi;
            shstDto.id_kabkota = existingAsb.idKabkota ?? 0;
            shstDto.tahun = existingAsb.tahunAnggaran ?? 0;

            const shstNominal = await this.shstService.getNominal(shstDto);
            console.log("Shst nominal:", shstNominal);

            // Step 10: Update ASB
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 2,
                shst: shstNominal,
                idAsbKlasifikasi: existingAsb.idAsbKlasifikasi,
                luasTotalBangunan: existingAsb.luasTotalBangunan,
                koefisienLantaiTotal: existingAsb.koefisienLantaiTotal,
                koefisienFungsiRuangTotal: existingAsb.koefisienFungsiRuangTotal
            });

            return { id: updatedAsb.id, status: updatedAsb.idAsbStatus };
        } catch (error) {
            console.error("Error updating ASB:", error);
            throw error;
        }
    }


    async storeBps(dto: StoreBpsDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Always delete all AsbBipekStandard records for this ASB (by id_asb) to ensure clean state
            await this.asbBipekStandardService.deleteByAsbId(dto.id_asb);

            // 3. Calculate BPS
            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            const [BPS, jumlahBobot] = await this.calculateBobotBPSUseCase.execute(
                dto.id_asb,
                dto.komponen_std,
                dto.bobot_std,
                asb.shst || 0,
                asb.totalLantai,
                asb.koefisienLantaiTotal || 0,
                asb.koefisienFungsiRuangTotal || 0,
                asb.luasTotalBangunan || 0
            );

            // 4. Calculate Total Biaya Pembangunan
            const totalBiayaPembangunan = Number(BPS)

            // 5. Update ASB status
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 3,
                nominalBps: BPS,
                bobotTotalBps: jumlahBobot,
                totalBiayaPembangunan: totalBiayaPembangunan
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }

    async storeBpns(dto: StoreBpnsDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Always delete all AsbBipekNonStd records for this ASB (by id_asb) to ensure clean state
            await this.asbBipekNonStdService.deleteByAsbId(dto.id_asb);

            // Ensure optional fields are present or handle error
            if (!asb.idAsbKlasifikasi || !asb.idKabkota) {
                throw new Error("ASB is missing required classification or location data for SHST lookup");
            }

            // 4. Calculate BPNS
            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            const [BPNS, jumlahBobot] = await this.calculateBobotBPNSUseCase.execute(
                dto.id_asb,
                dto.komponen_nonstd,
                dto.bobot_nonstd,
                asb.totalLantai,
                asb.shst || 0,
                asb.koefisienLantaiTotal || 0,
                asb.koefisienFungsiRuangTotal || 0,
                asb.luasTotalBangunan || 0,
                asb.bobotTotalBps || 0
            );

            // Update total biaya pembangunan
            const totalBiayaPembangunan = Number(BPNS) + Number(asb.nominalBps || 0);

            // Save jakon price variables
            if (!asb.idAsbKlasifikasi || !asb.idAsbTipeBangunan || !asb.idAsbJenis || !totalBiayaPembangunan) {
                throw new NotFoundException("ASB is missing required classification or location data for Jakon lookup");
            }

            const perencanaanKonstruksi = await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PERENCANAAN,
                total_biaya_pembangunan: totalBiayaPembangunan
            });

            if (!perencanaanKonstruksi) {
                throw new NotFoundException("ASB is missing required perencanaanKonstruksi data for Jakon lookup");
            }

            const nominalPerencanaanKonstruksi = perencanaanKonstruksi.standard;

            const pengawasanKonstruksi = await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PENGAWASAN,
                total_biaya_pembangunan: totalBiayaPembangunan
            });

            if (!pengawasanKonstruksi) {
                throw new NotFoundException("ASB is missing required pengawasanKonstruksi data for Jakon lookup");
            }

            const nominalPengawasanKonstruksi = pengawasanKonstruksi.standard;

            if (!asb.totalLantai || !asb.jumlahKontraktor) {
                throw new NotFoundException("ASB is missing required totalLantai or jumlahKontraktor data for Jakon lookup");
            }

            const managementKonstruksi = (asb.totalLantai <= 4 && asb.jumlahKontraktor <= 2) ? 0 : await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.MANAGEMENT,
                total_biaya_pembangunan: totalBiayaPembangunan
            });

            let nominalManagementKonstruksi = 0;
            if (managementKonstruksi === null || managementKonstruksi === 0) {
                nominalManagementKonstruksi = 0;
            } else {
                nominalManagementKonstruksi = managementKonstruksi.standard;
            }

            const rekapitulasiBiayaKonstruksi = Number(totalBiayaPembangunan ?? 0) + Number(nominalPerencanaanKonstruksi) + Number(nominalPengawasanKonstruksi) + Number(nominalManagementKonstruksi);

            const rekapitulasiBiayaKonstruksiRounded = Math.round(rekapitulasiBiayaKonstruksi / 100) * 100;

            // 5. Update ASB status to 4
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 4,
                nominalBpns: BPNS,
                bobotTotalBpns: jumlahBobot,
                totalBiayaPembangunan: totalBiayaPembangunan,
                perencanaanKonstruksi: nominalPerencanaanKonstruksi,
                pengawasanKonstruksi: nominalPengawasanKonstruksi,
                managementKonstruksi: nominalManagementKonstruksi,
                pengelolaanKegiatan: 0,
                rekapitulasiBiayaKonstruksi: rekapitulasiBiayaKonstruksi,
                rekapitulasiBiayaKonstruksiRounded: rekapitulasiBiayaKonstruksiRounded,
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }

    async storeRekening(dto: StoreRekeningDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any; }> {
        try {
            // 1. Check permissions and existence
            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Update Rekening &  ASB status to 5
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 5,
                idRekening: dto.id_rekening
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }

    async storeVerif(dto: StoreVerifDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any; }> {
        try {
            // 1. Check permissions and existence
            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Update ASB status to 5
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 6
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyLantai(dto: VerifyLantaiDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            console.log("dto verify lantai", dto);
            // 1. Check permissions and existence
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.findByUserId(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType.jenisVerifikator === JenisVerifikator.BAPPEDA || verificatorType.jenisVerifikator === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify Lantai ASB`);
                }
            }


            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            // 2. Validate input arrays length matches totalLantai
            if (dto.verif_luas_lantai.length !== asb.totalLantai ||
                dto.verif_id_asb_lantai.length !== asb.totalLantai ||
                dto.verif_id_asb_fungsi_ruang.length !== asb.totalLantai) {
                throw new BadRequestException(
                    `Array lengths must match total_lantai (${asb.totalLantai}). ` +
                    `Received: verif_luas_lantai=${dto.verif_luas_lantai.length}, ` +
                    `verif_id_asb_lantai=${dto.verif_id_asb_lantai.length}, ` +
                    `verif_id_asb_fungsi_ruang=${dto.verif_id_asb_fungsi_ruang.length}`
                );
            }

            // 3. Always delete all AsbDetailReview records for this ASB (by id_asb) to ensure clean state
            await this.asbDetailReviewService.deleteByAsbId(dto.id_asb);

            // 4. Get all AsbDetail records (without pagination)
            const asbDetails = await this.asbDetailService.getByAsb({
                idAsb: dto.id_asb
            });

            // 5. Create AsbDetailReview records for each lantai
            for (let i = 0; i < asb.totalLantai; i++) {
                const createDetailReviewDto = new CreateAsbDetailReviewDto();
                createDetailReviewDto.idAsb = dto.id_asb;
                // Use optional chaining to safely access asbDetails.data[i] - it may not exist if store-lantai wasn't called yet
                createDetailReviewDto.idAsbDetail = asbDetails.data[i]?.id ?? null; // Will be set by the service if needed
                createDetailReviewDto.files = Files.REVIEW;
                createDetailReviewDto.idAsbLantai = dto.verif_id_asb_lantai[i];
                createDetailReviewDto.idAsbFungsiRuang = dto.verif_id_asb_fungsi_ruang[i];
                createDetailReviewDto.idAsbTipeBangunan = asb.idAsbTipeBangunan;
                createDetailReviewDto.luas = dto.verif_luas_lantai[i];

                await this.asbDetailReviewService.create(createDetailReviewDto);
            }

            // Set ASB Klasifikasi
            const totalLantaiReview = asb.totalLantai || 0;
            const totalLuasLantaiReview = dto.verif_luas_lantai.reduce((total, luas) => total + luas, 0);
            let idAsbKlasifikasiReview = 0;
            
            if (asb.idAsbTipeBangunan === 1) {
                idAsbKlasifikasiReview = totalLantaiReview > 2 ? 2 : 1;
            } else {
                idAsbKlasifikasiReview = totalLuasLantaiReview < 120 ? 3 : totalLuasLantaiReview > 250 ? 5 : 4;
            }

            // Calculate Koef Lantai Total
            const koefLantaiTotalReview = await this.asbDetailReviewService.calculateKoefLantaiTotal(dto.id_asb, totalLuasLantaiReview);

            // Calculate Koef Fungsi Ruang Total
            const koefFungsiRuangTotalReview = await this.asbDetailReviewService.calculateKoefFungsiRuangTotal(dto.id_asb, totalLuasLantaiReview);

            // Calculate Nominal Shst
            const shstDto = new GetShstNominalDto();
            shstDto.id_asb_tipe_bangunan = asb.idAsbTipeBangunan;
            shstDto.id_asb_klasifikasi = idAsbKlasifikasiReview;
            shstDto.id_kabkota = asb.idKabkota ?? 0;
            shstDto.tahun = asb.tahunAnggaran ?? 0;
            const nominalShstReview = await this.shstService.getNominal(shstDto);

            // 5. Update ASB status to 9
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 9,
                luasTotalBangunan: totalLuasLantaiReview,
                idAsbKlasifikasi: idAsbKlasifikasiReview,
                shst: nominalShstReview,
                koefisienLantaiTotal: koefLantaiTotalReview,
                koefisienFungsiRuangTotal: koefFungsiRuangTotalReview
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }

    async verifyBps(dto: VerifyBpsDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType === JenisVerifikator.BAPPEDA || verificatorType === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify BPS ASB`);
                }
            }
            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 3. Always delete all AsbBipekStandardReview records for this ASB (by id_asb) to ensure clean state
            await this.asbBipekStandardReviewService.deleteByAsbId(dto.id_asb);

            // 4. Calculate AsbBipekStandard (get all without pagination)
            const getAsbBipekStandardByAsbDto = {
                idAsb: dto.id_asb
            };
            const asbBipekStandard = await this.asbBipekStandardService.getByAsb(getAsbBipekStandardByAsbDto);
            if (!asbBipekStandard) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }
            const asbBipekStandardIds = asbBipekStandard.data.map((asbBipekStandard) => asbBipekStandard.id);

            // 4.1. Validate input arrays length matches AsbBipekStandard count
            const expectedCount = asbBipekStandardIds.length;
            if (dto.verif_komponen_std.length !== expectedCount ||
                dto.verif_bobot_acuan_std.length !== expectedCount) {
                throw new BadRequestException(
                    `Array lengths must match AsbBipekStandard count (${expectedCount}). ` +
                    `Received: verif_komponen_std=${dto.verif_komponen_std.length}, ` +
                    `verif_bobot_acuan_std=${dto.verif_bobot_acuan_std.length}`
                );
            }

            // 5. Calculate BPS Review
            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            const [BPSReview, jumlahBobot] = await this.calculateBobotBPSReviewUseCase.execute(
                dto.id_asb,
                asbBipekStandardIds,
                dto.verif_komponen_std,
                dto.verif_bobot_acuan_std,
                asb.shst || 0,
                asb.totalLantai,
                asb.koefisienLantaiTotal || 0,
                asb.koefisienFungsiRuangTotal || 0,
                asb.luasTotalBangunan || 0,
            );

            // 5. Calculate Total Biaya Pembangunan
            const totalBiayaPembangunan = Number(BPSReview) + Number(asb.nominalBpns ?? 0);

            // 6. Update ASB status to 10
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 10,
                nominalBps: BPSReview,
                bobotTotalBps: jumlahBobot,
                totalBiayaPembangunan: totalBiayaPembangunan
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }


    async verifyBpns(dto: VerifyBpnsDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType === JenisVerifikator.BAPPEDA || verificatorType === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify BPNS ASB`);
                }
            }

            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 3. Always delete all AsbBipekNonStdReview records for this ASB (by id_asb) to ensure clean state
            await this.asbBipekNonStdReviewService.deleteByAsbId(dto.id_asb);

            // 4. Get AsbBipekNonstd (get all without pagination)
            const getAsbBipekNonstdByAsbDto = {
                idAsb: dto.id_asb
            };

            const asbBipekNonstd = await this.asbBipekNonStdService.getByAsb(getAsbBipekNonstdByAsbDto)
            if (!asbBipekNonstd) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }
            const asbBipekNonstdIds = asbBipekNonstd.data.map((asbBipekNonstd) => asbBipekNonstd.id);

            // 4.1. Validate input arrays length matches AsbBipekNonStd count
            const expectedCount = asbBipekNonstdIds.length;
            if (dto.verif_komponen_nonstd.length !== expectedCount ||
                dto.verif_bobot_acuan_nonstd.length !== expectedCount) {
                throw new BadRequestException(
                    `Array lengths must match AsbBipekNonStd count (${expectedCount}). ` +
                    `Received: verif_komponen_nonstd=${dto.verif_komponen_nonstd.length}, ` +
                    `verif_bobot_acuan_nonstd=${dto.verif_bobot_acuan_nonstd.length}`
                );
            }

            // 5. Calculate BPNS Review
            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            const [BPNSReview, jumlahBobot] = await this.calculateBobotBPNSReviewUseCase.execute(
                dto.id_asb,
                asbBipekNonstdIds,
                dto.verif_komponen_nonstd,
                dto.verif_bobot_acuan_nonstd,
                asb.shst || 0,
                asb.totalLantai,
                asb.koefisienLantaiTotal || 0,
                asb.koefisienFungsiRuangTotal || 0,
                asb.luasTotalBangunan || 0,
                asb.bobotTotalBpns || 0
            );

            const totalBiayaPembangunan = Number(BPNSReview) + Number(asb.nominalBps || 0);

            // Set Jakon prices
            if (!asb.idAsbKlasifikasi || !asb.idAsbTipeBangunan || !asb.idAsbJenis || !totalBiayaPembangunan) {
                throw new Error("ASB is missing required classification or location data for Jakon lookup");
            }

            const perencanaanKonstruksi = await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PERENCANAAN,
                total_biaya_pembangunan: totalBiayaPembangunan
            });

            if (!perencanaanKonstruksi) {
                throw new Error("ASB is missing required perencanaanKonstruksi data for Jakon lookup");
            }

            const nominalPerencanaanKonstruksi = perencanaanKonstruksi.standard;

            const pengawasanKonstruksi = await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PENGAWASAN,
                total_biaya_pembangunan: totalBiayaPembangunan
            });

            if (!pengawasanKonstruksi) {
                throw new Error("ASB is missing required pengawasanKonstruksi data for Jakon lookup");
            }

            const nominalPengawasanKonstruksi = pengawasanKonstruksi.standard;

            if (!asb.totalLantai || !asb.jumlahKontraktor) {
                throw new Error("ASB is missing required totalLantai or jumlahKontraktor data for Jakon lookup");
            }

            const managementKonstruksi = (asb.totalLantai <= 4 && asb.jumlahKontraktor <= 2) ? 0 : await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.MANAGEMENT,
                total_biaya_pembangunan: totalBiayaPembangunan
            });

            let nominalManagementKonstruksi = 0;
            if (managementKonstruksi === null || managementKonstruksi === 0) {
                nominalManagementKonstruksi = 0;
            } else {
                nominalManagementKonstruksi = managementKonstruksi.standard;
            }

            const rekapitulasiBiayaKonstruksi = Number(totalBiayaPembangunan ?? 0) + Number(nominalPerencanaanKonstruksi) + Number(nominalPengawasanKonstruksi) + Number(nominalManagementKonstruksi);

            const rekapitulasiBiayaKonstruksiRounded = Math.round(rekapitulasiBiayaKonstruksi / 100) * 100;

            // 6. Update ASB status to 11
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 11,
                nominalBpns: BPNSReview,
                bobotTotalBpns: jumlahBobot,
                rekapitulasiBiayaKonstruksi: rekapitulasiBiayaKonstruksi,
                rekapitulasiBiayaKonstruksiRounded: rekapitulasiBiayaKonstruksiRounded,
                totalBiayaPembangunan: totalBiayaPembangunan,
                perencanaanKonstruksi: nominalPerencanaanKonstruksi,
                pengawasanKonstruksi: nominalPengawasanKonstruksi,
                managementKonstruksi: nominalManagementKonstruksi,
                pengelolaanKegiatan: 0,
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyRekening(dto: VerifyRekeningDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType === JenisVerifikator.BAPPEDA || verificatorType === JenisVerifikator.ADBANG) {
                    throw new ForbiddenException(`User not allowed to verify Rekening ASB`);
                }
            }

            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Update ASB idRekeningReview and status to 12
            console.log(dto.id_rekening_review);
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idRekeningReview: dto.id_rekening_review,
                idVerifikatorBPKAD: Number(userId),
                verifiedBpkadAt: new Date(),
                idAsbStatus: 12
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }

    async verifyPekerjaan(dto: VerifyPekerjaanDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                console.log(verificatorType, userId);

                if (verificatorType === JenisVerifikator.BAPPEDA || verificatorType === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify Pekerjaan ASB`);
                }
            }

            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Update ASB data pekerjaan and status to 13
            const updatedAsb = await this.repository.update(dto.id_asb, {
                perencanaanKonstruksi: dto.perencanaan_konstruksi,
                pengawasanKonstruksi: dto.pengawasan_konstruksi,
                managementKonstruksi: dto.management_konstruksi,
                idVerifikatorAdpem: Number(userId),
                verifiedAdpemAt: new Date(),
                idAsbStatus: 13
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }

    async verify(id_asb: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Update Asb Verification
            const asbBeforeVerify = await this.findById(id_asb, userIdOpd, userRoles);
            if (!asbBeforeVerify) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }

             // 1. Check permissions and existence
             if (userRoles.includes(Role.VERIFIKATOR)) {
                const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType === JenisVerifikator.ADBANG || verificatorType === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify Pekerjaan ASB`);
                }
            }

            const asb = await this.findById(id_asb, userIdOpd, userRoles)

            if (!asb) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }


            // if not all verifikator verified
            if (!asb?.idVerifikatorAdpem || !asb?.idVerifikatorBPKAD) {
                throw new ForbiddenException(`All verificators must verify ASB first`);
            }

            await this.repository.update(id_asb, {
                idAsbStatus: 8,
                idVerifikatorBappeda: Number(userId),
                verifiedBappedaAt: new Date(),
            });

            const opdAsb = await this.opdService.getOpdById({ id: asb.idOpd })
            const userOpdAsb = await this.userService.findById(opdAsb?.id_user || 0)
            const usernameOpd = userOpdAsb?.username;

            // 4. Update ASB - track which verifikator approved this
            const updatedAsb = await this.repository.update(id_asb, {
                idAsbStatus: 8,
                idVerifikatorBappeda: Number(userId),
                verifiedBappedaAt: new Date()
            });

            // 3. Get data for kertas kerja
            const asbData = await this.repository.findById(id_asb);
            if (!asbData) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }

            const dataBpsReview = await this.asbBipekStandardReviewService.getBpsWithRelationByAsb({
                idAsb: id_asb
            })

            const dataBpnsReview = await this.asbBipekNonStdReviewService.getBpnsWithRelationByAsb({
                idAsb: id_asb
            })

            console.log("databpsreview: ", dataBpsReview);
            const dataBpsKomponen = dataBpsReview.data.map((data) => {
                return {
                    komponen: data.asbKomponenBangunanStd?.komponen,
                    asb: {
                        bobot_input: data.bobotInput,
                        jumlah_bobot: data.jumlahBobot,
                        rincian_harga: data.rincianHarga
                    }
                }
            });
            const dataBpnsKomponen = dataBpnsReview.data.map((data) => {
                return {
                    komponen: data.asbKomponenBangunanNonstd?.komponen,
                    asb: {
                        bobot_input: data.bobotInput,
                        jumlah_bobot: data.jumlahBobot,
                        rincian_harga: data.rincianHarga
                    }
                }
            });

            // Ambil data asb detail
            const dataAsbDetailReview = await this.asbDetailReviewService.getAsbDetailReviewWithRelation(id_asb);

            const now = new Date();
            const date = new Intl.DateTimeFormat('en-GB').format(now); // DD/MM/YYYY
            const time = now.toTimeString().split(' ')[0].replace(/:/g, ':'); // HH:mm:ss
            const dateFormatted = `${date.replace(/\//g, '-')} ${time}`;

            console.log("dataAsb: ", asbData);
            
            const kertasKerjaDto = {
                title: `Kertas Kerja - Analisis Kebutuhan Biaya ${asbData.asbJenis?.jenis}.`,
                usernameOpd,
                tipe_bangunan: asbData.asbTipeBangunan?.tipe_bangunan,
                tanggal_cetak: dateFormatted,
                dataAsb: asbData,
                dataAsbDetailReview: dataAsbDetailReview,
                shst: asbData.shst,
                dataBps: dataBpsKomponen,
                dataBpns: dataBpnsKomponen,
            }

            // 4. Generate kertas kerja
            await this.asbDocumentService.generateAsbKertasKerja(kertasKerjaDto);

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus,
            };
        } catch (error) {
            console.log("Erorr: ", error);
            throw error;
        }
    }

    async reject(id_asb: number, rejectReason: string, userId: string, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            const asb = await this.findById(id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }

            // 2. Update ASB idAsbStatus to 7
            const updatedAsb = await this.repository.update(id_asb, {
                idAsbStatus: 7,
                rejectReason: rejectReason,
                rejectVerifId: Number(userId),
                rejectedAt: new Date()
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
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
                // ADMIN/SUPERADMIN can access ALL ASB without OPD filter
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
                throw new NotFoundException(`ASB with id ${id} not found`);
            }

            // Check if ASB has been rejected
            if (!rejectInfo.rejectVerifId || !rejectInfo.rejectedAt) {
                throw new BadRequestException('ASB is not in rejected status');
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
}
