import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { JalanSaluranRuangLingkupService } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.service';
import { JalanSaluranRuangLingkupRepository } from '../../domain/jalan_saluran_ruang_lingkup/jalan_saluran_ruang_lingkup.repository';
import { CreateJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/create_jalan_saluran_ruang_lingkup.dto';
import { UpdateJalanSaluranRuangLingkupDto } from '../../presentation/jalan_saluran_ruang_lingkup/dto/update_jalan_saluran_ruang_lingkup.dto';

@Injectable()
export class JalanSaluranRuangLingkupServiceImpl implements JalanSaluranRuangLingkupService {
    constructor(private readonly repository: JalanSaluranRuangLingkupRepository) {}
    create(dto: CreateJalanSaluranRuangLingkupDto) { return this.repository.create(dto); }
    async update(dto: UpdateJalanSaluranRuangLingkupDto) { if (!(await this.repository.findById(dto.id))) throw new NotFoundException('Not found'); return this.repository.update(dto); }
    async delete(id: number) { if (!(await this.repository.findById(id))) throw new NotFoundException('Not found'); return this.repository.delete(id); }
    async findAll(dto: PaginationQueryDto) { const r = await this.repository.findAll(dto); return { ...r, page: dto.page, amount: dto.amount, totalPages: Math.ceil(r.total/dto.amount)||1 }; }
    async findById(id: number) { const item = await this.repository.findById(id); if (!item) throw new NotFoundException('Not found'); return item; }
}