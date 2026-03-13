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
            totalPages: Math.ceil(result.total / dto.amount),
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
                    result[0].amount += item.count;
                } else if (item.idAsbStatus === 7) {
                    result[1].amount += item.count;
                } else if (item.idAsbStatus === 6) {
                    result[2].amount += item.count;
                } else {
                    result[3].amount += item.count;
                }
            });

            return result;

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
        // Check permissions
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);

        // Verify existence and ownership
        let existingAsb: AsbWithRelationsDto | null = null;

        if (isAdmin || isSuperAdmin) {
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

        // Force status to 1
        dto.idAsbStatus = 1;

        // Update ASB
        const updatedAsb = await this.repository.update(dto.id, dto);

        return { id: updatedAsb.id, status: updatedAsb.idAsbStatus };
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

            // Step 1: Delete existing records if provided
            if (dto.id_asb_detail && dto.id_asb_detail.length > 0) {
                await this.asbDetailService.deleteByIds(dto.id_asb_detail);
            }

            // For bipek_standard and bipek_nonstd, we'd need services injected
            // For now, we'll delete all AsbDetail records for this ASB to ensure clean state
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
                existingAsb.idAsbKlasifikasi = totalLuasLantai < 120 ? 3 : totalLuasLantai < 250 ? 5 : 4;
            }

            await this.repository.update(dto.id_asb, {
                idAsbKlasifikasi: existingAsb.idAsbKlasifikasi
            });

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
            shstDto.id_kabkota = existingAsb.idKabkota || 0;
            shstDto.tahun = existingAsb.tahunAnggaran || 0;

            console.log("shst: ", shstDto);
            const shstNominal = await this.shstService.getNominal(shstDto);
            console.log("Shst nominal:", shstNominal);

            // Step 10: Update ASB
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 2,
                shst: shstNominal,
                luasTotalBangunan: existingAsb.luasTotalBangunan,
                koefisienLantaiTotal: existingAsb.koefisienLantaiTotal,
                koefisienFungsiRuangTotal: existingAsb.koefisienFungsiRuangTotal
            });
            console.log("Updated ASB:", updatedAsb);

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

            // 2. Delete old records if requested
            if (dto.id_asb_bipek_standard) {
                await this.asbBipekStandardService.delete(dto.id_asb_bipek_standard);
            }

            // 4. Calculate BPS
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

            // 5. Update ASB status
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 3,
                shst: asb.shst || 0,
                nominalBps: BPS,
                bobotTotalBps: jumlahBobot
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

            // 2. Delete old records if requested
            if (dto.id_asb_bipek_nonstd) {
                await this.asbBipekNonStdService.delete(dto.id_asb_bipek_nonstd);
            }

            // 3. Get SHST Nominal using asb data
            const shstDto = new GetShstNominalDto();
            shstDto.id_asb_tipe_bangunan = asb.idAsbTipeBangunan;

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
            console.log("bpns", BPNS);

            // Update total biaya pembangunan
            const totalBiayaPembangunan = BPNS + Number(asb.nominalBps || 0);

            // 5. Update ASB status to 4
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 4,
                nominalBpns: BPNS,
                bobotTotalBpns: jumlahBobot,
                totalBiayaPembangunan: totalBiayaPembangunan
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

            // 2. Get all AsbDetail records
            const asbDetails = await this.asbDetailService.getByAsb({
                idAsb: dto.id_asb,
                page: 1,
                amount: 1000
            });

            console.log("Get asb detail", asbDetails);

            // 3. Create AsbDetailReview records for each lantai
            for (let i = 0; i < asb.totalLantai; i++) {
                const createDetailReviewDto = new CreateAsbDetailReviewDto();
                createDetailReviewDto.idAsb = dto.id_asb;
                createDetailReviewDto.idAsbDetail = asbDetails.data[i].id; // Will be set by the service if needed
                createDetailReviewDto.files = Files.ORIGIN;
                createDetailReviewDto.idAsbLantai = dto.verif_id_asb_lantai[i];
                createDetailReviewDto.idAsbFungsiRuang = dto.verif_id_asb_fungsi_ruang[i];
                createDetailReviewDto.idAsbTipeBangunan = asb.idAsbTipeBangunan;
                createDetailReviewDto.luas = dto.verif_luas_lantai[i];

                await this.asbDetailReviewService.create(createDetailReviewDto);
            }

            // 4. Update ASB status to 9
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 9
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
                const verificatorType = await this.verifikatorService.findByUserId(Number(userIdOpd));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType.jenisVerifikator === JenisVerifikator.BAPPEDA || verificatorType.jenisVerifikator === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify BPS ASB`);
                }
            }
            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Get SHST Nominal
            const shstDto = new GetShstNominalDto();
            shstDto.id_asb_tipe_bangunan = asb.idAsbTipeBangunan;
            if (!asb.idAsbKlasifikasi || !asb.idKabkota) {
                throw new Error("ASB is missing required classification or location data for SHST lookup");
            }
            shstDto.id_asb_klasifikasi = asb.idAsbKlasifikasi;
            shstDto.id_kabkota = asb.idKabkota;
            const shstNominal = await this.shstService.getNominal(shstDto);

            // 3. Calculate AsbBipekStandard
            const getAsbBipekStandardByAsbDto = {
                idAsb: dto.id_asb,
                page: 1,
                amount: 10000
            };
            const asbBipekStandard = await this.asbBipekStandardService.getByAsb(getAsbBipekStandardByAsbDto);
            if (!asbBipekStandard) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }
            const asbBipekStandardIds = asbBipekStandard.data.map((asbBipekStandard) => asbBipekStandard.id);

            // 4. Calculate BPS Review
            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            await this.calculateBobotBPSReviewUseCase.execute(
                dto.id_asb,
                asbBipekStandardIds,
                dto.verif_komponen_std,
                dto.verif_bobot_acuan_std,
                shstNominal,
                asb.totalLantai
            );

            // 5. Update ASB status to 10
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 10
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
                const verificatorType = await this.verifikatorService.findByUserId(Number(userIdOpd));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType.jenisVerifikator === JenisVerifikator.BAPPEDA || verificatorType.jenisVerifikator === JenisVerifikator.BPKAD) {
                    throw new ForbiddenException(`User not allowed to verify BPNS ASB`);
                }
            }

            const asb = await this.findById(dto.id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }

            // 2. Get SHST Nominal
            const shstDto = new GetShstNominalDto();
            shstDto.id_asb_tipe_bangunan = asb.idAsbTipeBangunan;
            if (!asb.idAsbKlasifikasi || !asb.idKabkota) {
                throw new Error("ASB is missing required classification or location data for SHST lookup");
            }
            shstDto.id_asb_klasifikasi = asb.idAsbKlasifikasi;
            shstDto.id_kabkota = asb.idKabkota;

            const shstNominal = await this.shstService.getNominal(shstDto);

            // 3. Get AsbBipekNonstd
            const getAsbBipekNonstdByAsbDto = {
                idAsb: dto.id_asb,
                page: 1,
                amount: 10000
            };

            const asbBipekNonstd = await this.asbBipekNonStdService.getByAsb(getAsbBipekNonstdByAsbDto)
            if (!asbBipekNonstd) {
                throw new NotFoundException(`ASB with id ${dto.id_asb} not found`);
            }
            const asbBipekNonstdIds = asbBipekNonstd.data.map((asbBipekNonstd) => asbBipekNonstd.id);

            // 4. Calculate BPNS Review
            if (!asb.totalLantai) {
                throw new Error("ASB is missing totalLantai");
            }

            await this.calculateBobotBPNSReviewUseCase.execute(
                dto.id_asb,
                asbBipekNonstdIds,
                dto.verif_komponen_nonstd,
                dto.verif_bobot_acuan_nonstd,
                shstNominal,
                asb.totalLantai
            );

            // 5. Update ASB status to 11
            const updatedAsb = await this.repository.update(dto.id_asb, {
                idAsbStatus: 11
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
                const verificatorType = await this.verifikatorService.findByUserId(Number(userIdOpd));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType.jenisVerifikator === JenisVerifikator.BAPPEDA || verificatorType.jenisVerifikator === JenisVerifikator.BPKAD) {
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
                const verificatorType = await this.verifikatorService.findByUserId(Number(userIdOpd));
                if (!verificatorType) {
                    throw new NotFoundException(`User not sync with verifikator`);
                }

                if (verificatorType.jenisVerifikator === JenisVerifikator.BAPPEDA || verificatorType.jenisVerifikator === JenisVerifikator.BPKAD) {
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
                pengelolaanKegiatan: dto.pengelolaan_kegiatan,
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

            const verificatorUser = await this.verifikatorService.findByUserId(Number(userIdOpd));
            if (!verificatorUser) {
                throw new NotFoundException(`User not sync with verifikator`);
            }
            const verificatorType = verificatorUser.jenisVerifikator;

            await this.repository.update(id_asb, {
                idVerifikatorAdpem: verificatorType === JenisVerifikator.ADBANG ? verificatorUser.id : null,
                verifiedAdpemAt: verificatorType === JenisVerifikator.ADBANG ? new Date() : null,
                idVerifikatorBPKAD: verificatorType === JenisVerifikator.BPKAD ? verificatorUser.id : null,
                verifiedBpkadAt: verificatorType === JenisVerifikator.BPKAD ? new Date() : null,
                idVerifikatorBappeda: verificatorType === JenisVerifikator.BAPPEDA ? verificatorUser.id : null,
                verifiedBappedaAt: verificatorType === JenisVerifikator.BAPPEDA ? new Date() : null,
            });

            const asb = await this.findById(id_asb, userIdOpd, userRoles)

            if (!asb) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }

            // if not all verifikator verified
            if (!asb?.idVerifikatorAdpem || !asb?.idVerifikatorBPKAD || !asb?.idVerifikatorBappeda) {
                return {
                    id: asb.id,
                    status: asb.asbStatus
                };
            }

            const opdAsb = await this.opdService.getOpdById({ id: asb.idOpd })
            const userOpdAsb = await this.userService.findById(opdAsb?.id_user || 0)
            const usernameOpd = userOpdAsb?.username;

            // 3 Get Jakon data
            if (!asb.idAsbKlasifikasi || !asb.idAsbTipeBangunan || !asb.idAsbJenis || !asb.totalBiayaPembangunan) {
                throw new Error("ASB is missing required classification or location data for Jakon lookup");
            }

            // Simpan field jakon
            console.log("variables: ", {
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PERENCANAAN,
                total_biaya_pembangunan: asb.totalBiayaPembangunan
            })
            const perencanaanKonstruksi = await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PERENCANAAN,
                total_biaya_pembangunan: asb.totalBiayaPembangunan
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
                total_biaya_pembangunan: asb.totalBiayaPembangunan
            });

            if (!pengawasanKonstruksi) {
                throw new Error("ASB is missing required pengawasanKonstruksi data for Jakon lookup");
            }

            const nominalPengawasanKonstruksi = pengawasanKonstruksi.standard;

            if (!asb.totalLantai || !asb.jumlahKontraktor) {
                throw new Error("ASB is missing required totalLantai or jumlahKontraktor data for Jakon lookup");
            }

            const managementKonstruksi = (asb.totalLantai >= 4 && asb.jumlahKontraktor >= 2) ? 0 : await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.MANAGEMENT,
                total_biaya_pembangunan: asb.totalBiayaPembangunan
            });

            if (!managementKonstruksi) {
                throw new Error("ASB is missing required managementKonstruksi data for Jakon lookup");
            }

            const nominalManagementKonstruksi = managementKonstruksi.standard;

            const pengelolaanKegiatan = await this.asbJakonService.getJakonByPriceRange({
                id_asb_klasifikasi: asb.idAsbKlasifikasi,
                id_asb_tipe_bangunan: asb.idAsbTipeBangunan,
                id_asb_jenis: asb.idAsbJenis,
                type: AsbJakonType.PENGELOLAAN,
                total_biaya_pembangunan: asb.totalBiayaPembangunan
            });

            if (!pengelolaanKegiatan) {
                throw new Error("ASB is missing required pengelolaanKegiatan data for Jakon lookup");
            }

            const nominalPengelolaanKegiatan = pengelolaanKegiatan.standard;

            asb.rekapitulasiBiayaKonstruksi = nominalPerencanaanKonstruksi + nominalPengawasanKonstruksi + nominalManagementKonstruksi;

            asb.rekapitulasiBiayaKonstruksiRounded = Math.round(asb.rekapitulasiBiayaKonstruksi / 100) * 100;

            // 4. Update ASB - track which verifikator approved this
            const updatedAsb = await this.repository.update(id_asb, {
                idAsbStatus: 8,
                idVerifikatorAdpem: Number(userId),
                verifiedAdpemAt: new Date(),
                perencanaanKonstruksi: nominalPerencanaanKonstruksi,
                pengawasanKonstruksi: nominalPengawasanKonstruksi,
                managementKonstruksi: nominalManagementKonstruksi,
                pengelolaanKegiatan: nominalPengelolaanKegiatan,
                rekapitulasiBiayaKonstruksi: asb.rekapitulasiBiayaKonstruksi,
                rekapitulasiBiayaKonstruksiRounded: asb.rekapitulasiBiayaKonstruksiRounded
            });

            // 3. Get data for kertas kerja
            const asbData = await this.repository.findById(id_asb);
            if (!asbData) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }

            const dataBpsReview = await this.asbBipekStandardReviewService.getBpsWithRelationByAsb({
                idAsb: id_asb,
                page: 1,
                amount: 10000
            })

            const dataBpnsReview = await this.asbBipekNonStdReviewService.getBpnsWithRelationByAsb({
                idAsb: id_asb,
                page: 1,
                amount: 10000
            })

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
            console.log("dataAsbDetailReview", dataAsbDetailReview);

            const now = new Date();
            const date = new Intl.DateTimeFormat('en-GB').format(now); // DD/MM/YYYY
            const time = now.toTimeString().split(' ')[0].replace(/:/g, ':'); // HH:mm:ss
            const dateFormatted = `${date.replace(/\//g, '-')} ${time}`;

            console.log(asbData);

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

    async reject(id_asb: number, rejectReason: string, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // 1. Check permissions and existence
            const asb = await this.findById(id_asb, userIdOpd, userRoles);
            if (!asb) {
                throw new NotFoundException(`ASB with id ${id_asb} not found`);
            }

            // 2. Update ASB idAsbStatus to 7
            const updatedAsb = await this.repository.update(id_asb, {
                idAsbStatus: 7,
                rejectReason: rejectReason
            });

            return {
                id: updatedAsb.id,
                status: updatedAsb.asbStatus
            };
        } catch (error) {
            throw error;
        }
    }
}
