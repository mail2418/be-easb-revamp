import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { UsulanJalanService } from '../../domain/usulan_jalan/usulan_jalan.service';
import { UsulanJalanRepository } from '../../domain/usulan_jalan/usulan_jalan.repository';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { JalanSpesifikasiDesainService } from '../../domain/jalan_spesifikasi_desain/jalan_spesifikasi_desain.service';
import { JalanSpesifikasiDesainReviewService } from '../../domain/jalan_spesifikasi_desain_review/jalan_spesifikasi_desain_review.service';
import { PpnGlobalService } from '../../domain/ppn_global/ppn_global.service';
import { Role } from '../../domain/user/user_role.enum';
import { JenisVerifikator } from '../../domain/verifikator/jenis_verifikator.enum';
import { UsulanJalanWithRelationsDto } from './dto/usulan_jalan_with_relations.dto';
import { FindAllUsulanJalanDto } from './dto/find_all_usulan_jalan.dto';
import { UsulanJalanListResultDto } from './dto/usulan_jalan_list_result.dto';
import { RejectInfoDto } from './dto/reject_info.dto';
import { StoreInformasiUsulanJalanDto } from '../../presentation/usulan_jalan/dto/store_informasi_usulan_jalan.dto';
import { UpdateUsulanJalanDto } from '../../presentation/usulan_jalan/dto/update_usulan_jalan.dto';
import { VerifyInformasiUsulanJalanDto } from '../../presentation/usulan_jalan/dto/verify_informasi_usulan_jalan.dto';
import { GetUsulanJalanAnalyticsFilterDto } from './dto/get_usulan_jalan_analytics_filter.dto';
import { UsulanJalanAnalyticsDto } from './dto/usulan_jalan_analytics.dto';
import { CreateUsulanJalanStoreIndexDto } from './dto/create_usulan_jalan_store_index.dto';
import { UpdateUsulanJalanStoreIndexDto } from './dto/update_usulan_jalan_store_index.dto';
import { CreateJalanSpesifikasiDesainDto } from '../../presentation/jalan_spesifikasi_desain/dto/create_jalan_spesifikasi_desain.dto';
import { CreateJalanSpesifikasiDesainReviewDto } from '../../presentation/jalan_spesifikasi_desain_review/dto/create_jalan_spesifikasi_desain_review.dto';
import { GetJalanSpesifikasiDesainDto } from '../../presentation/jalan_spesifikasi_desain/dto/get_jalan_spesifikasi_desain.dto';
import { GenerateUraianUsulanJalanUseCase } from './use_cases/generate_uraian_usulan_jalan.use_case';
import { GenerateSpesifikasiUsulanJalanUseCase } from './use_cases/generate_spesifikasi_usulan_jalan.use_case';

@Injectable()
export class UsulanJalanServiceImpl implements UsulanJalanService {
    constructor(
        private readonly repository: UsulanJalanRepository,
        private readonly verifikatorService: VerifikatorService,
        private readonly jalanSpesifikasiDesainService: JalanSpesifikasiDesainService,
        private readonly jalanSpesifikasiDesainReviewService: JalanSpesifikasiDesainReviewService,
        private readonly ppnGlobalService: PpnGlobalService,
        private readonly generateUraianUsulanJalanUseCase: GenerateUraianUsulanJalanUseCase,
        private readonly generateSpesifikasiUsulanJalanUseCase: GenerateSpesifikasiUsulanJalanUseCase,
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

    async createIndex(dto: CreateUsulanJalanStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Validate that user has idOpd (must be OPD user)
            if (!userIdOpd) {
                throw new ForbiddenException('User is not sync to an opd');
            }

            const idOpd = userIdOpd;

            // Validate idJalanJenisPemeliharaan based on idAsbJenis
            let idJalanJenisPemeliharaan: number | null = null;
            if (dto.idAsbJenis === 1) {
                // If idAsbJenis is 1 (Pembangunan), idJalanJenisPemeliharaan must be null
                idJalanJenisPemeliharaan = null;
            } else if (dto.idAsbJenis === 2) {
                // If idAsbJenis is 2 (Pemeliharaan), idJalanJenisPemeliharaan is required
                if (!dto.idJalanJenisPemeliharaan) {
                    throw new BadRequestException('idJalanJenisPemeliharaan is required when idAsbJenis is 2 (Pemeliharaan)');
                }
                idJalanJenisPemeliharaan = dto.idJalanJenisPemeliharaan;
            }

            // Create with status 1 (Input Informasi Usulan Jalan)
            const usulanJalan = await this.repository.create({
                idOpd,
                idAsbJenis: dto.idAsbJenis,
                idJalanJenisPemeliharaan,
                idJalanJenisPerkerasan: dto.idJalanJenisPerkerasan ?? null,
                idKabkota: dto.idKabkota,
                idKecamatan: dto.idKecamatan,
                idKelurahan: dto.idKelurahan,
                isIncludePpn: true,
                tahunAnggaran: dto.tahunAnggaran,
                namaUsulan: dto.namaUsulan,
                alamat: dto.alamat ?? null,
                idUsulanJalanStatus: 1,
            });

            return {
                id: usulanJalan.id,
                status: usulanJalan.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateIndex(dto: UpdateUsulanJalanStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check permissions
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isOpd = userRoles.includes(Role.OPD);

            // Verify existence and ownership
            let existingUsulanJalan: UsulanJalanWithRelationsDto | null = null;

            if (isAdmin || isSuperAdmin) {
                existingUsulanJalan = await this.repository.findById(dto.id);
            } else if (isOpd) {
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }
                existingUsulanJalan = await this.repository.findById(dto.id, userIdOpd);
            } else {
                throw new ForbiddenException('User is not authorized to update this Usulan Jalan');
            }

            if (!existingUsulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.id} not found or access denied`);
            }

            // Validate idJalanJenisPemeliharaan based on idAsbJenis
            let idJalanJenisPemeliharaan: number | null = null;
            if (dto.idAsbJenis === 1) {
                // If idAsbJenis is 1 (Gedung), idJalanJenisPemeliharaan must be null
                idJalanJenisPemeliharaan = null;
            } else if (dto.idAsbJenis === 2) {
                // If idAsbJenis is 2 (Jalan), idJalanJenisPemeliharaan is required
                if (!dto.idJalanJenisPemeliharaan) {
                    throw new BadRequestException('idJalanJenisPemeliharaan is required when idAsbJenis is 2 (Jalan)');
                }
                idJalanJenisPemeliharaan = dto.idJalanJenisPemeliharaan;
            }

            // Prepare update data
            const updateData: any = {
                id: dto.id,
                idAsbJenis: dto.idAsbJenis,
                idJalanJenisPemeliharaan,
                idJalanJenisPerkerasan: dto.idJalanJenisPerkerasan ?? null,
                idKabkota: dto.idKabkota,
                idKecamatan: dto.idKecamatan,
                idKelurahan: dto.idKelurahan,
                isIncludePpn: true,
                tahunAnggaran: dto.tahunAnggaran,
                namaUsulan: dto.namaUsulan,
                alamat: dto.alamat ?? null,
                idUsulanJalanStatus: 1,
            };

            // idOpd is not allowed to be updated from request body, it comes from UserContext

            // Update Usulan Jalan
            const updatedUsulanJalan = await this.repository.update(dto.id, updateData);

            return {
                id: updatedUsulanJalan.id,
                status: updatedUsulanJalan.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }

    async storeInformasi(dto: StoreInformasiUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check permissions
            const isAdmin = userRoles.includes(Role.ADMIN);
            const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
            const isOpd = userRoles.includes(Role.OPD);

            // Validate that user has idOpd (must be OPD user or admin)
            if (!userIdOpd && !isAdmin && !isSuperAdmin) {
                throw new ForbiddenException('User is not sync to an opd');
            }

            // Verify existence and ownership
            let existingUsulanJalan: UsulanJalanWithRelationsDto | null = null;

            if (isAdmin || isSuperAdmin) {
                existingUsulanJalan = await this.repository.findById(dto.idUsulanJalan);
            } else if (isOpd) {
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }
                existingUsulanJalan = await this.repository.findById(dto.idUsulanJalan, userIdOpd);
            } else {
                throw new ForbiddenException('User is not authorized to update this Usulan Jalan');
            }

            if (!existingUsulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.idUsulanJalan} not found or access denied`);
            }

            // Validate that idJalanJenisPerkerasan is set (required for generating uraian)
            if (!existingUsulanJalan.idJalanJenisPerkerasan) {
                throw new BadRequestException('idJalanJenisPerkerasan is required and must be set in storeIndex first');
            }

            if (!existingUsulanJalan.jalanJenisPerkerasan) {
                throw new NotFoundException('JalanJenisPerkerasan relation not found');
            }

            // Step 1: Always delete all JalanSpesifikasiDesain records for this Usulan Jalan to ensure clean state
            await this.jalanSpesifikasiDesainService.deleteByUsulanJalanId(dto.idUsulanJalan);

            // Step 2: Create JalanSpesifikasiDesain records for each ruang lingkup and hspk
            // Collect all tinggi values for MIN/MAX calculation and calculate total harga
            const tinggiValues: number[] = [];
            let totalHarga = 0;
            for (const ruangLingkup of dto.data_ruang_lingkup) {
                for (const hspk of ruangLingkup.data_hspk) {
                    const createSpesifikasiDto = new CreateJalanSpesifikasiDesainDto();
                    createSpesifikasiDto.id_usulan_jalan = dto.idUsulanJalan;
                    createSpesifikasiDto.id_ruang_lingkup = ruangLingkup.id;
                    createSpesifikasiDto.id_hspk = hspk.id_hspk;
                    createSpesifikasiDto.spasi = hspk.spasi;
                    createSpesifikasiDto.tinggi = hspk.tinggi;

                    // volume and harga_spec will be calculated in the service layer
                    const createdSpesifikasi = await this.jalanSpesifikasiDesainService.create(createSpesifikasiDto, dto.lebar);
                    tinggiValues.push(hspk.tinggi);
                    totalHarga += createdSpesifikasi.harga_spec;
                }
            }

            // Apply PPN if is_include_ppn is true
            if (existingUsulanJalan.isIncludePpn) {
                const persentasePpn = await this.ppnGlobalService.getLatestPersentasePPn();
                if (persentasePpn !== null) {
                    totalHarga = totalHarga * (100 + persentasePpn) / 100;
                }
            }

            // Step 3: Generate uraian, spesifikasi, satuan, and deskripsiDesain automatically
            const jenisPerkerasan = existingUsulanJalan.jalanJenisPerkerasan.jenis;
            const uraian = await this.generateUraianUsulanJalanUseCase.execute(jenisPerkerasan, dto.lebar);
            
            const idJenisPerkerasan = existingUsulanJalan.idJalanJenisPerkerasan;
            const spesifikasi = await this.generateSpesifikasiUsulanJalanUseCase.execute(tinggiValues, idJenisPerkerasan);

            // Satuan is always "m^1"
            const satuan = 'm^1';

            // deskripsiDesain is always empty string
            const deskripsiDesain = '';

            // Step 4: Update Usulan Jalan with new information and status 2 (Input Ruang Lingkup dan Spesifikasi Jalan)
            const updatedUsulanJalan = await this.repository.update(dto.idUsulanJalan, {
                uraian,
                spesifikasi,
                satuan,
                deskripsiDesain,
                lebar: dto.lebar,
                totalHarga,
                idRekening: dto.idRekening,
                idUsulanJalanStatus: 2, // Input Ruang Lingkup dan Spesifikasi Jalan
            });

            return {
                id: updatedUsulanJalan.id,
                status: updatedUsulanJalan.usulanJalanStatus,
            };
        } catch (error) {
            throw error;
        }
    }


    async updateUsulanJalan(dto: UpdateUsulanJalanDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Check existence and permission
            const usulanJalan = await this.findById(dto.id, userIdOpd, userRoles);
            if (!usulanJalan) {
                throw new NotFoundException(`Usulan Jalan with id ${dto.id} not found`);
            }

            // Update all fields
            const updateData: any = {};

            // idOpd is not allowed to be updated from request body, it comes from UserContext
            if (dto.idUsulanJalanStatus !== undefined) updateData.idUsulanJalanStatus = dto.idUsulanJalanStatus;
            if (dto.idAsbJenis !== undefined) updateData.idAsbJenis = dto.idAsbJenis;
            if (dto.idJalanJenisPemeliharaan !== undefined) updateData.idJalanJenisPemeliharaan = dto.idJalanJenisPemeliharaan ?? null;
            if (dto.idJalanJenisPerkerasan !== undefined) updateData.idJalanJenisPerkerasan = dto.idJalanJenisPerkerasan ?? null;
            if (dto.idRekening !== undefined) updateData.idRekening = dto.idRekening;
            if (dto.idRekeningReview !== undefined) updateData.idRekeningReview = dto.idRekeningReview;
            if (dto.idKabkota !== undefined) updateData.idKabkota = dto.idKabkota ?? null;
            if (dto.idKecamatan !== undefined) updateData.idKecamatan = dto.idKecamatan ?? null;
            if (dto.idKelurahan !== undefined) updateData.idKelurahan = dto.idKelurahan ?? null;
            if (dto.isIncludePpn !== undefined) updateData.isIncludePpn = dto.isIncludePpn;
            if (dto.tahunAnggaran !== undefined) updateData.tahunAnggaran = dto.tahunAnggaran;
            if (dto.namaUsulan !== undefined) updateData.namaUsulan = dto.namaUsulan;
            if (dto.alamat !== undefined) updateData.alamat = dto.alamat ?? null;
            if (dto.uraian !== undefined) updateData.uraian = dto.uraian;
            if (dto.spesifikasi !== undefined) updateData.spesifikasi = dto.spesifikasi;
            if (dto.satuan !== undefined) updateData.satuan = dto.satuan;
            if (dto.deskripsiDesain !== undefined) updateData.deskripsiDesain = dto.deskripsiDesain;

            const updated = await this.repository.update(dto.id, updateData);

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

            // Step 1: Get all existing JalanSpesifikasiDesain records for this Usulan Jalan
            const getSpesifikasiDto = new GetJalanSpesifikasiDesainDto();
            getSpesifikasiDto.id_usulan_jalan = dto.idUsulanJalan;
            const existingSpesifikasi = await this.jalanSpesifikasiDesainService.findAll(getSpesifikasiDto);

            // Create a map of (id_ruang_lingkup, id_hspk) -> id_spesifikasi_desain
            const spesifikasiMap = new Map<string, number>();
            for (const spec of existingSpesifikasi.data) {
                const key = `${spec.id_ruang_lingkup}_${spec.id_hspk}`;
                spesifikasiMap.set(key, spec.id);
            }

            // Use idJalanJenisPerkerasan from DTO if provided, otherwise use existing one
            const idJalanJenisPerkerasanToUse = dto.idJalanJenisPerkerasan ?? usulanJalan.idJalanJenisPerkerasan;
            
            // Validate that idJalanJenisPerkerasan is set (required for generating uraian)
            if (!idJalanJenisPerkerasanToUse) {
                throw new BadRequestException('idJalanJenisPerkerasan is required and must be set in storeIndex or provided in request');
            }

            // Get jenis perkerasan from existing relation for generating uraian
            // If idJalanJenisPerkerasan is different in DTO, we'll update it but still use existing jenis for generation
            if (!usulanJalan.jalanJenisPerkerasan) {
                throw new NotFoundException('JalanJenisPerkerasan relation not found');
            }
            const jenisPerkerasan = usulanJalan.jalanJenisPerkerasan.jenis;

            // Step 2: Always delete all JalanSpesifikasiDesainReview records for this Usulan Jalan to ensure clean state
            await this.jalanSpesifikasiDesainReviewService.deleteByUsulanJalanId(dto.idUsulanJalan);

            // Step 3: Create JalanSpesifikasiDesainReview records for each ruang lingkup and hspk
            // Collect all tinggi_review values for MIN/MAX calculation and calculate total harga
            const tinggiReviewValues: number[] = [];
            let totalHargaReview = 0;
            // Use lebar from review if provided, otherwise use existing lebar
            const lebarReview = dto.lebar !== undefined ? dto.lebar : (usulanJalan.lebar ?? 0);
            for (const ruangLingkup of dto.data_ruang_lingkup) {
                for (const hspk of ruangLingkup.data_hspk) {
                    const key = `${ruangLingkup.id}_${hspk.id_hspk}`;
                    const idSpesifikasiDesain = spesifikasiMap.get(key);

                    if (!idSpesifikasiDesain) {
                        throw new NotFoundException(
                            `JalanSpesifikasiDesain not found for id_ruang_lingkup=${ruangLingkup.id} and id_hspk=${hspk.id_hspk}`
                        );
                    }

                    const createReviewDto = new CreateJalanSpesifikasiDesainReviewDto();
                    createReviewDto.id_spesifikasi_desain = idSpesifikasiDesain;
                    createReviewDto.id_usulan_jalan = dto.idUsulanJalan;
                    createReviewDto.id_ruang_lingkup = ruangLingkup.id;
                    createReviewDto.id_hspk = hspk.id_hspk;
                    createReviewDto.spasi_review = hspk.spasi_review;
                    createReviewDto.tinggi_review = hspk.tinggi_review;

                    // volume_review and harga_spec_review will be calculated in the service layer
                    const createdReview = await this.jalanSpesifikasiDesainReviewService.create(createReviewDto, lebarReview);
                    tinggiReviewValues.push(hspk.tinggi_review);
                    totalHargaReview += createdReview.harga_spec_review;
                }
            }

            // Apply PPN if is_include_ppn is true
            if (usulanJalan.isIncludePpn) {
                const persentasePpn = await this.ppnGlobalService.getLatestPersentasePPn();
                if (persentasePpn !== null) {
                    totalHargaReview = totalHargaReview * (100 + persentasePpn) / 100;
                }
            }

            // Step 4: Generate uraian, spesifikasi, satuan, and deskripsiDesain automatically based on review data
            const uraian = await this.generateUraianUsulanJalanUseCase.execute(jenisPerkerasan, lebarReview);
            
            const spesifikasi = await this.generateSpesifikasiUsulanJalanUseCase.execute(tinggiReviewValues, idJalanJenisPerkerasanToUse);

            // Satuan is always "m^1"
            const satuan = 'm^1';

            // deskripsiDesain is always empty string
            const deskripsiDesain = '';

            // Step 5: Update Usulan Jalan with review information and status to 5 (Verifikasi Informasi Usulan Jalan)
            const updateData: any = {
                idUsulanJalanStatus: 5,
                uraian,
                spesifikasi,
                satuan,
                deskripsiDesain,
                totalHarga: totalHargaReview,
                idRekeningReview: dto.idRekeningReview,
            };

            if (dto.lebar !== undefined) {
                updateData.lebar = dto.lebar;
            }

            if (dto.idJalanJenisPerkerasan !== undefined) {
                updateData.idJalanJenisPerkerasan = dto.idJalanJenisPerkerasan;
            }

            const updated = await this.repository.update(dto.idUsulanJalan, updateData);

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
                verifikatorAdbangReviewAt: new Date(),
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
                verifikatorBpkadReviewAt: new Date(),
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
                verifikatorBappedaReviewAt: new Date(),
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
                idRejectVerif: Number(userId),
                rejectReason: rejectReason,
                rejectVerifikatorReviewAt: new Date(),
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


