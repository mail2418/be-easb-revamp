import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { UsulanSaluranService } from '../../domain/usulan_saluran/usulan_saluran.service';
import { UsulanSaluranRepository } from '../../domain/usulan_saluran/usulan_saluran.repository';
import { VerifikatorService } from '../../domain/verifikator/verifikator.service';
import { SaluranSpesifikasiDesainService } from '../../domain/saluran_spesifikasi_desain/saluran_spesifikasi_desain.service';
import { SaluranSpesifikasiDesainReviewService } from '../../domain/saluran_spesifikasi_desain_review/saluran_spesifikasi_desain_review.service';
import { PpnGlobalService } from '../../domain/ppn_global/ppn_global.service';
import { Role } from '../../domain/user/user_role.enum';
import { JenisVerifikator } from '../../domain/verifikator/jenis_verifikator.enum';
import { UsulanSaluranWithRelationsDto } from './dto/usulan_saluran_with_relations.dto';
import { FindAllUsulanSaluranDto } from './dto/find_all_usulan_saluran.dto';
import { UsulanSaluranListResultDto } from './dto/usulan_saluran_list_result.dto';
import { RejectInfoSaluranDto } from './dto/reject_info.dto';
import { StoreInformasiUsulanSaluranDto } from '../../presentation/usulan_saluran/dto/store_informasi_usulan_saluran.dto';
import { UpdateUsulanSaluranDto } from '../../presentation/usulan_saluran/dto/update_usulan_saluran.dto';
import { VerifyInformasiUsulanSaluranDto } from '../../presentation/usulan_saluran/dto/verify_informasi_usulan_saluran.dto';
import { GetUsulanSaluranAnalyticsFilterDto } from './dto/get_usulan_saluran_analytics_filter.dto';
import { UsulanSaluranAnalyticsDto } from './dto/usulan_saluran_analytics.dto';
import { CreateUsulanSaluranStoreIndexDto } from './dto/create_usulan_saluran_store_index.dto';
import { UpdateUsulanSaluranStoreIndexDto } from './dto/update_usulan_saluran_store_index.dto';
import { VerifyIndexUsulanSaluranDto } from '../../presentation/usulan_saluran/dto/verify_index_usulan_saluran.dto';
import { VerifyBpkadUsulanSaluranDto } from '../../presentation/usulan_saluran/dto/verify_bpkad_usulan_saluran.dto';
import { CreateSaluranSpesifikasiDesainDto } from '../../presentation/saluran_spesifikasi_desain/dto/create_saluran_spesifikasi_desain.dto';
import { CreateSaluranSpesifikasiDesainReviewDto } from '../../presentation/saluran_spesifikasi_desain_review/dto/create_saluran_spesifikasi_desain_review.dto';
import { GenerateUraianUsulanSaluranUseCase } from './use_cases/generate_uraian_usulan_saluran.use_case';
import { GenerateSpesifikasiUsulanSaluranUseCase } from './use_cases/generate_spesifikasi_usulan_saluran.use_case';
import { CalculateBiayaSmkkUseCase } from '../usulan_jalan/use_cases/calculate_biaya_smkk.use_case';
import { JalanSaluranSmkkService } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service';
import { SaluranSpesifikasiSmkkService } from '../../domain/saluran_spesifikasi_smkk/saluran_spesifikasi_smkk.service';
import { SaluranSpesifikasiSmkkReviewService } from '../../domain/saluran_spesifikasi_smkk_review/saluran_spesifikasi_smkk_review.service';
import { CreateSaluranSpesifikasiSmkkDto } from '../../presentation/saluran_spesifikasi_smkk/dto/create_saluran_spesifikasi_smkk.dto';
import { CreateSaluranSpesifikasiSmkkReviewDto } from '../../presentation/saluran_spesifikasi_smkk_review/dto/create_saluran_spesifikasi_smkk_review.dto';
import { MainDashboardRepository } from '../../domain/main_dashboard/main_dashboard.repository';
import { ID_JENIS_USULAN_SALURAN } from '../../domain/jenis_usulan/jenis_usulan.constants';

/**
 * Service implementasi modul Usulan Saluran.
 * Flow status: 1 → 2 → 5 → 6 → 7 → 8 → 3 (approved), atau reject → 4.
 * Status dan main_dashboard selalu diupdate di akhir proses (setelah semua operasi sukses).
 */
@Injectable()
export class UsulanSaluranServiceImpl implements UsulanSaluranService {
    constructor(
        private readonly repository: UsulanSaluranRepository,
        private readonly mainDashboardRepository: MainDashboardRepository,
        private readonly verifikatorService: VerifikatorService,
        private readonly saluranSpesifikasiDesainService: SaluranSpesifikasiDesainService,
        private readonly saluranSpesifikasiDesainReviewService: SaluranSpesifikasiDesainReviewService,
        private readonly ppnGlobalService: PpnGlobalService,
        private readonly generateUraianUsulanSaluranUseCase: GenerateUraianUsulanSaluranUseCase,
        private readonly generateSpesifikasiUsulanSaluranUseCase: GenerateSpesifikasiUsulanSaluranUseCase,
        private readonly calculateBiayaSmkkUseCase: CalculateBiayaSmkkUseCase,
        private readonly jalanSaluranSmkkService: JalanSaluranSmkkService,
        private readonly saluranSpesifikasiSmkkService: SaluranSpesifikasiSmkkService,
        private readonly saluranSpesifikasiSmkkReviewService: SaluranSpesifikasiSmkkReviewService,
    ) {}

    /** Get usulan saluran by ID. OPD hanya lihat data sendiri. */
    async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanSaluranWithRelationsDto | null> {
        const idOpd = userRoles.includes(Role.OPD) && userIdOpd !== null ? userIdOpd : undefined;
        return await this.repository.findById(id, idOpd);
    }

    /** List usulan saluran dengan filter & pagination. */
    async findAll(dto: FindAllUsulanSaluranDto, userIdOpd: number | null, userRoles: Role[]): Promise<UsulanSaluranListResultDto> {
        const idOpd = userRoles.includes(Role.OPD) && userIdOpd !== null ? userIdOpd : undefined;
        const { data, total } = await this.repository.findAll(dto, idOpd);
        const page = dto.page ?? 1;
        const amount = dto.amount ?? total;
        const totalPages = amount > 0 ? Math.ceil(total / amount) : 0;
        return { data, page, amount, total, totalPages };
    }

    /** Create usulan saluran index (status 1). Main dashboard diupdate setelah create sukses. */
    async createIndex(dto: CreateUsulanSaluranStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        if (!userIdOpd) throw new ForbiddenException('User is not sync to an opd');
        const usulanSaluran = await this.repository.create({
            idOpd: userIdOpd,
            idAsbJenis: dto.idAsbJenis,
            idTipeSaluran: dto.idTipeSaluran,
            idKabkota: dto.idKabkota,
            idKecamatan: dto.idKecamatan,
            idKelurahan: dto.idKelurahan,
            isIncludePpn: true,
            tahunAnggaran: dto.tahunAnggaran,
            namaUsulan: dto.namaUsulan,
            alamat: dto.alamat ?? null,
            idUsulanSaluranStatus: 1,
        });
        await this.mainDashboardRepository.create({
            idUsulan: usulanSaluran.id,
            idJenisUsulan: ID_JENIS_USULAN_SALURAN,
            idAsbStatus: 1,
            namaUsulan: usulanSaluran.namaUsulan,
            tahunAnggaran: usulanSaluran.tahunAnggaran ?? null,
        });
        return { id: usulanSaluran.id, status: usulanSaluran.usulanSaluranStatus };
    }

    /** Update index usulan saluran. Status tetap 1. */
    async updateIndex(dto: UpdateUsulanSaluranStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);
        let existing: UsulanSaluranWithRelationsDto | null = null;
        if (isAdmin || isSuperAdmin) existing = await this.repository.findById(dto.id);
        else if (isOpd) {
            if (!userIdOpd) throw new ForbiddenException('OPD user has no associated OPD');
            existing = await this.repository.findById(dto.id, userIdOpd);
        } else throw new ForbiddenException('User is not authorized to update this Usulan Saluran');
        if (!existing) throw new NotFoundException(`Usulan Saluran with id ${dto.id} not found or access denied`);
        const updateData: any = {
            id: dto.id,
            idAsbJenis: dto.idAsbJenis ?? existing.idAsbJenis,
            idTipeSaluran: dto.idTipeSaluran ?? existing.idTipeSaluran,
            idKabkota: dto.idKabkota ?? existing.idKabkota,
            idKecamatan: dto.idKecamatan ?? existing.idKecamatan,
            idKelurahan: dto.idKelurahan ?? existing.idKelurahan,
            isIncludePpn: true,
            tahunAnggaran: dto.tahunAnggaran ?? existing.tahunAnggaran,
            namaUsulan: dto.namaUsulan ?? existing.namaUsulan,
            alamat: dto.alamat !== undefined ? dto.alamat : existing.alamat,
            idUsulanSaluranStatus: 1,
        };
        const updated = await this.repository.update(dto.id, updateData);
        await this.mainDashboardRepository.updateByUsulan(dto.id, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 1,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /**
     * Store informasi usulan saluran (status 1 → 2).
     * Semua operasi data (delete, create spesifikasi, create SMKK) selesai dulu.
     * Status dan main_dashboard diupdate di akhir agar error di tengah tidak mengubah status.
     */
    async storeInformasi(dto: StoreInformasiUsulanSaluranDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);
        if (!userIdOpd && !isAdmin && !isSuperAdmin) throw new ForbiddenException('User is not sync to an opd');
        let existing: UsulanSaluranWithRelationsDto | null = null;
        if (isAdmin || isSuperAdmin) existing = await this.repository.findById(dto.idUsulanSaluran);
        else if (isOpd) {
            if (!userIdOpd) throw new ForbiddenException('OPD user has no associated OPD');
            existing = await this.repository.findById(dto.idUsulanSaluran, userIdOpd);
        } else throw new ForbiddenException('User is not authorized to update this Usulan Saluran');
        if (!existing) throw new NotFoundException(`Usulan Saluran with id ${dto.idUsulanSaluran} not found or access denied`);
        if (!existing.idTipeSaluran || !existing.tipeSaluran) throw new BadRequestException('idTipeSaluran is required and must be set in storeIndex first');

        // 1. Hapus data lama
        await this.saluranSpesifikasiDesainService.deleteByUsulanSaluranId(dto.idUsulanSaluran);
        await this.saluranSpesifikasiSmkkService.deleteByUsulanSaluranId(dto.idUsulanSaluran);

        // 2. Create spesifikasi desain & hitung total harga
        const tipeSaluran = existing.tipeSaluran.tipe_saluran;
        const tinggiValues: number[] = [];
        let totalHarga = 0;
        for (const ruangLingkup of dto.data_ruang_lingkup) {
            for (const hspk of ruangLingkup.data_hspk) {
                const createDto = new CreateSaluranSpesifikasiDesainDto();
                createDto.id_usulan_saluran = dto.idUsulanSaluran;
                createDto.id_ruang_lingkup = ruangLingkup.id;
                createDto.id_hspk = hspk.id_hspk;
                createDto.spasi = hspk.spasi;
                createDto.tinggi = hspk.tinggi;
                const created = await this.saluranSpesifikasiDesainService.create(createDto, dto.lebar);
                tinggiValues.push(hspk.tinggi);
                totalHarga += created.harga_spec;
            }
        }
        if (existing.isIncludePpn) {
            const persentasePpn = await this.ppnGlobalService.getLatestPersentasePPn();
            if (persentasePpn !== null) totalHarga = totalHarga * (100 + persentasePpn) / 100;
        }

        // 3. Create SMKK (sebelum update status)
        const biayaSmkk = await this.calculateBiayaSmkkUseCase.execute(totalHarga);
        if (dto.data_smkk && dto.data_smkk.length > 0) {
            for (const smkk of dto.data_smkk) {
                const komponenSmkk = await this.jalanSaluranSmkkService.findById(smkk.id_smkk);
                if (!komponenSmkk) throw new NotFoundException(`JalanSaluranSmkk with id ${smkk.id_smkk} not found`);
                if (!komponenSmkk.id_jenis_usulan) throw new NotFoundException(`JalanSaluranSmkk with id ${smkk.id_smkk} has no id_jenis_usulan`);
                if (!komponenSmkk.pengali) throw new BadRequestException(`JalanSaluranSmkk with id ${smkk.id_smkk} has no pengali`);
                if (!smkk.jumlah || smkk.jumlah <= 0) throw new BadRequestException(`Jumlah must be provided and greater than 0 for SMKK with id ${smkk.id_smkk}`);
                const hargaSpec = biayaSmkk! * komponenSmkk.pengali;
                const jumlahBarang = smkk.jumlah;
                const hargaSatuan = hargaSpec / jumlahBarang;
                const createSmkkDto: CreateSaluranSpesifikasiSmkkDto = {
                    id_jenis_usulan: komponenSmkk.id_jenis_usulan,
                    id_usulan: dto.idUsulanSaluran,
                    id_jalan_saluran_smkk: smkk.id_smkk,
                    harga_spec: hargaSpec,
                    jumlah_barang: jumlahBarang,
                    harga_satuan: hargaSatuan,
                };
                await this.saluranSpesifikasiSmkkService.create(createSmkkDto);
            }
        }

        // 4. Update usulan + status 2 + main_dashboard (di akhir)
        const uraian = await this.generateUraianUsulanSaluranUseCase.execute(tipeSaluran, dto.lebar);
        const spesifikasi = await this.generateSpesifikasiUsulanSaluranUseCase.execute(tinggiValues, tipeSaluran);
        const updatePayload: any = {
            uraian, spesifikasi, satuan: 'm^1', deskripsiDesain: '', lebar: dto.lebar, totalHarga, biayaSmkk,
            idRekening: dto.idRekening, idUsulanSaluranStatus: 2,
        };
        if (dto.keteranganTambahan !== undefined) updatePayload.keteranganTambahan = dto.keteranganTambahan || null;
        const updated = await this.repository.update(dto.idUsulanSaluran, updatePayload);
        await this.mainDashboardRepository.updateByUsulan(dto.idUsulanSaluran, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 2,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Update usulan saluran (field optional). Status & main_dashboard diupdate di akhir. */
    async updateUsulanSaluran(dto: UpdateUsulanSaluranDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        const usulan = await this.findById(dto.id, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${dto.id} not found`);
        const updateData: any = {};
        if (dto.idUsulanSaluranStatus !== undefined) updateData.idUsulanSaluranStatus = dto.idUsulanSaluranStatus;
        if (dto.idAsbJenis !== undefined) updateData.idAsbJenis = dto.idAsbJenis;
        if (dto.idTipeSaluran !== undefined) updateData.idTipeSaluran = dto.idTipeSaluran ?? null;
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
        if (dto.keteranganTambahan !== undefined) updateData.keteranganTambahan = dto.keteranganTambahan || null;
        const updated = await this.repository.update(dto.id, updateData);
        await this.mainDashboardRepository.updateByUsulan(dto.id, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: updated.idUsulanSaluranStatus,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Delete usulan saluran. */
    async deleteUsulanSaluran(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }> {
        const usulan = await this.findById(id, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${id} not found`);
        await this.repository.delete(id);
        return { id };
    }

    /** Verify index oleh ADBANG (status 2 → 5). Single update, status di-set di akhir. */
    async verifyIndex(dto: VerifyIndexUsulanSaluranDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        if (userRoles.includes(Role.VERIFIKATOR)) {
            const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
            if (!verificatorType) throw new NotFoundException(`User not sync with verifikator`);
            if (verificatorType !== JenisVerifikator.ADBANG) throw new ForbiddenException(`Only ADBANG can verify index usulan saluran`);
        }
        const usulan = await this.findById(dto.idUsulanSaluran, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${dto.idUsulanSaluran} not found`);
        if (usulan.idUsulanSaluranStatus !== 2) throw new BadRequestException(`Usulan Saluran must be in status 2 to verify index`);
        const updated = await this.repository.update(dto.idUsulanSaluran, {
            idAsbJenis: dto.idAsbJenis,
            idTipeSaluran: dto.idTipeSaluran,
            idKabkota: dto.idKabkota,
            idKecamatan: dto.idKecamatan,
            idKelurahan: dto.idKelurahan,
            tahunAnggaran: dto.tahunAnggaran,
            namaUsulan: dto.namaUsulan,
            alamat: dto.alamat ?? null,
            idUsulanSaluranStatus: 5,
        });
        await this.mainDashboardRepository.updateByUsulan(dto.idUsulanSaluran, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 5,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /**
     * Verify informasi oleh ADBANG (status 5 → 6).
     * Semua operasi data selesai dulu, status diupdate di akhir.
     */
    async verifyInformasi(dto: VerifyInformasiUsulanSaluranDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        if (userRoles.includes(Role.VERIFIKATOR)) {
            const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
            if (!verificatorType) throw new NotFoundException(`User not sync with verifikator`);
            if (verificatorType !== JenisVerifikator.ADBANG) throw new ForbiddenException(`Only ADBANG can verify informasi usulan saluran`);
        }
        const usulan = await this.findById(dto.idUsulanSaluran, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${dto.idUsulanSaluran} not found`);
        if (usulan.idUsulanSaluranStatus !== 5) throw new BadRequestException(`Usulan Saluran must be in status 5 to verify informasi`);
        if (!usulan.idTipeSaluran || !usulan.tipeSaluran) throw new BadRequestException('idTipeSaluran is required');

        // 1. Hapus review lama
        await this.saluranSpesifikasiDesainReviewService.deleteByUsulanSaluranId(dto.idUsulanSaluran);

        // 2. Create spesifikasi desain review & hitung total
        const tipeSaluran = usulan.tipeSaluran.tipe_saluran;
        const tinggiReviewValues: number[] = [];
        let totalHargaReview = 0;
        const lebarReview = dto.lebar !== undefined ? dto.lebar : (usulan.lebar ?? 0);
        for (const ruangLingkup of dto.data_ruang_lingkup) {
            for (const hspk of ruangLingkup.data_hspk) {
                const createReviewDto = new CreateSaluranSpesifikasiDesainReviewDto();
                createReviewDto.id_usulan_saluran = dto.idUsulanSaluran;
                createReviewDto.id_ruang_lingkup = ruangLingkup.id;
                createReviewDto.id_hspk = hspk.id_hspk;
                createReviewDto.spasi_review = hspk.spasi_review;
                createReviewDto.tinggi_review = hspk.tinggi_review;
                const created = await this.saluranSpesifikasiDesainReviewService.create(createReviewDto, lebarReview);
                tinggiReviewValues.push(hspk.tinggi_review);
                totalHargaReview += created.harga_spec_review;
            }
        }
        if (usulan.isIncludePpn) {
            const persentasePpn = await this.ppnGlobalService.getLatestPersentasePPn();
            if (persentasePpn !== null) totalHargaReview = totalHargaReview * (100 + persentasePpn) / 100;
        }

        // 3. Create SMKK review (sebelum update status)
        const biayaSmkk = await this.calculateBiayaSmkkUseCase.execute(totalHargaReview);
        if (dto.data_smkk && dto.data_smkk.length > 0) {
            for (const smkk of dto.data_smkk) {
                const komponenSmkk = await this.jalanSaluranSmkkService.findById(smkk.id_smkk);
                if (!komponenSmkk) throw new NotFoundException(`JalanSaluranSmkk with id ${smkk.id_smkk} not found`);
                if (!komponenSmkk.id_jenis_usulan) throw new NotFoundException(`JalanSaluranSmkk with id ${smkk.id_smkk} has no id_jenis_usulan`);
                if (!komponenSmkk.pengali) throw new BadRequestException(`JalanSaluranSmkk with id ${smkk.id_smkk} has no pengali`);
                if (!smkk.jumlah || smkk.jumlah <= 0) throw new BadRequestException(`Jumlah must be provided and greater than 0 for SMKK with id ${smkk.id_smkk}`);
                const hargaSpec = biayaSmkk! * komponenSmkk.pengali;
                const jumlahBarang = smkk.jumlah;
                const hargaSatuan = hargaSpec / jumlahBarang;
                const createSmkkReviewDto: CreateSaluranSpesifikasiSmkkReviewDto = {
                    id_jenis_usulan: komponenSmkk.id_jenis_usulan,
                    id_usulan: dto.idUsulanSaluran,
                    id_jalan_saluran_smkk: smkk.id_smkk,
                    harga_spec: hargaSpec,
                    jumlah_barang: jumlahBarang,
                    harga_satuan: hargaSatuan,
                };
                await this.saluranSpesifikasiSmkkReviewService.create(createSmkkReviewDto);
            }
        }

        // 4. Update usulan + status 6 + main_dashboard (di akhir)
        const uraian = await this.generateUraianUsulanSaluranUseCase.execute(tipeSaluran, lebarReview);
        const spesifikasi = await this.generateSpesifikasiUsulanSaluranUseCase.execute(tinggiReviewValues, tipeSaluran);
        const updateData: any = { idUsulanSaluranStatus: 6, uraian, spesifikasi, satuan: 'm^1', deskripsiDesain: '', totalHarga: totalHargaReview, biayaSmkk };
        if (dto.lebar !== undefined) updateData.lebar = dto.lebar;
        const updated = await this.repository.update(dto.idUsulanSaluran, updateData);
        await this.mainDashboardRepository.updateByUsulan(dto.idUsulanSaluran, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 6,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Verify ADBANG (status 6 → 7). */
    async verifyAdbang(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        if (userRoles.includes(Role.VERIFIKATOR)) {
            const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
            if (!verificatorType) throw new NotFoundException(`User not sync with verifikator`);
            if (verificatorType !== JenisVerifikator.ADBANG) throw new ForbiddenException(`Only ADBANG can approve at this stage`);
        }
        const usulan = await this.findById(id, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${id} not found`);
        if (usulan.idUsulanSaluranStatus !== 6) throw new BadRequestException(`Usulan Saluran must be in status 6 to verify adbang`);
        const updated = await this.repository.update(id, {
            idUsulanSaluranStatus: 7,
            idVerifikatorAdbang: Number(userId),
            verifikatorAdbangReviewAt: new Date(),
        });
        await this.mainDashboardRepository.updateByUsulan(id, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 7,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Verify BPKAD (status 7 → 8). */
    async verifyBpkad(dto: VerifyBpkadUsulanSaluranDto, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        if (userRoles.includes(Role.VERIFIKATOR)) {
            const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
            if (!verificatorType) throw new NotFoundException(`User not sync with verifikator`);
            if (verificatorType !== JenisVerifikator.BPKAD) throw new ForbiddenException(`Only BPKAD can approve at this stage`);
        }
        const usulan = await this.findById(dto.idUsulanSaluran, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${dto.idUsulanSaluran} not found`);
        if (usulan.idUsulanSaluranStatus !== 7) throw new BadRequestException(`Usulan Saluran must be in status 7 before verifying BPKAD`);
        if (!usulan.idVerifikatorAdbang) throw new ForbiddenException(`ADBANG must verify first`);
        const updated = await this.repository.update(dto.idUsulanSaluran, {
            idUsulanSaluranStatus: 8,
            idVerifikatorBpkad: Number(userId),
            verifikatorBpkadReviewAt: new Date(),
            idRekeningReview: dto.idRekeningReview,
        });
        await this.mainDashboardRepository.updateByUsulan(dto.idUsulanSaluran, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 8,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Verify BAPPEDA (status 8 → 3, final approved). */
    async verifyBappeda(id: number, userId: string | null, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        if (userRoles.includes(Role.VERIFIKATOR)) {
            const verificatorType = await this.verifikatorService.checkVerifikatorType(Number(userId));
            if (!verificatorType) throw new NotFoundException(`User not sync with verifikator`);
            if (verificatorType !== JenisVerifikator.BAPPEDA) throw new ForbiddenException(`Only BAPPEDA can approve at this stage`);
        }
        const usulan = await this.findById(id, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${id} not found`);
        if (usulan.idUsulanSaluranStatus !== 8) throw new BadRequestException(`Usulan Saluran must be in status 8 before verifying BAPPEDA`);
        if (!usulan.idVerifikatorAdbang || !usulan.idVerifikatorBpkad) throw new ForbiddenException(`ADBANG and BPKAD must verify first`);
        const updated = await this.repository.update(id, {
            idUsulanSaluranStatus: 3,
            idVerifikatorBappeda: Number(userId),
            verifikatorBappedaReviewAt: new Date(),
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Reject usulan (status 5/6/7/8 → 4). */
    async reject(id: number, rejectReason: string, userId: string, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        const usulan = await this.findById(id, userIdOpd, userRoles);
        if (!usulan) throw new NotFoundException(`Usulan Saluran with id ${id} not found`);
        const allowedStatuses = [5, 6, 7, 8];
        if (!allowedStatuses.includes(usulan.idUsulanSaluranStatus)) throw new BadRequestException(`Usulan Saluran can only be rejected when in status 5-8`);
        const updated = await this.repository.update(id, {
            idUsulanSaluranStatus: 4,
            idRejectVerif: Number(userId),
            rejectReason,
            rejectVerifikatorReviewAt: new Date(),
        });
        await this.mainDashboardRepository.updateByUsulan(id, ID_JENIS_USULAN_SALURAN, {
            idAsbStatus: 4,
            rejectInfo: rejectReason,
            namaUsulan: updated.namaUsulan,
            tahunAnggaran: updated.tahunAnggaran ?? null,
        });
        return { id: updated.id, status: updated.usulanSaluranStatus };
    }

    /** Get info penolakan usulan. */
    async getRejectInfo(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<RejectInfoSaluranDto | null> {
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isVerifikator = userRoles.includes(Role.VERIFIKATOR);
        let rejectInfo: RejectInfoSaluranDto | null;
        if (isAdmin || isSuperAdmin || isVerifikator) rejectInfo = await this.repository.getRejectInfo(id);
        else {
            const isOpd = userRoles.includes(Role.OPD);
            if (isOpd) {
                if (!userIdOpd) throw new ForbiddenException('OPD user has no associated OPD');
                rejectInfo = await this.repository.getRejectInfo(id, userIdOpd);
            } else throw new ForbiddenException('User is not authorized to access reject info');
        }
        if (!rejectInfo) throw new NotFoundException(`Usulan Saluran with id ${id} not found`);
        if (!rejectInfo.rejectVerifId || !rejectInfo.rejectedAt) throw new BadRequestException('Usulan Saluran is not in rejected status');
        if (rejectInfo.rejectVerifikator) {
            const verifikator = await this.verifikatorService.findByUserId(rejectInfo.rejectVerifikator.id);
            if (verifikator && verifikator.user) {
                rejectInfo.verifikator = {
                    id: verifikator.id,
                    idUser: verifikator.idUser,
                    jenisVerifikator: verifikator.jenisVerifikator,
                    verifikator: verifikator.verifikator,
                    user: { id: verifikator.user.id, username: verifikator.user.username },
                };
            }
        }
        return rejectInfo;
    }

    /** Get analytics usulan saluran. */
    async getAnalytics(userIdOpd: number | null, userRoles: Role[], filter?: GetUsulanSaluranAnalyticsFilterDto): Promise<UsulanSaluranAnalyticsDto> {
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isVerifikator = userRoles.includes(Role.VERIFIKATOR);
        if (isAdmin || isSuperAdmin || isVerifikator) return await this.repository.getAnalytics(undefined, filter);
        const isOpd = userRoles.includes(Role.OPD);
        if (isOpd) {
            if (!userIdOpd) throw new ForbiddenException('OPD user has no associated OPD');
            return await this.repository.getAnalytics(userIdOpd, filter);
        }
        throw new ForbiddenException('User is not authorized to access Usulan Saluran analytics');
    }
}
