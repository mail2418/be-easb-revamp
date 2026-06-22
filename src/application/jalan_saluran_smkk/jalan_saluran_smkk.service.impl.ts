import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { JalanSaluranSmkkService } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.service';
import { JalanSaluranSmkkRepository } from '../../domain/jalan_saluran_smkk/jalan_saluran_smkk.repository';
import { CreateJalanSaluranSmkkDto } from '../../presentation/jalan_saluran_smkk/dto/create_jalan_saluran_smkk.dto';
import { UpdateJalanSaluranSmkkDto } from '../../presentation/jalan_saluran_smkk/dto/update_jalan_saluran_smkk.dto';

@Injectable()
export class JalanSaluranSmkkServiceImpl implements JalanSaluranSmkkService {
    constructor(private readonly repository: JalanSaluranSmkkRepository) {}
    create(dto: CreateJalanSaluranSmkkDto) { return this.repository.create(dto); }
    async update(dto: UpdateJalanSaluranSmkkDto) { if (!(await this.repository.findById(dto.id))) throw new NotFoundException('Not found'); return this.repository.update(dto); }
    async delete(id: number) { if (!(await this.repository.findById(id))) throw new NotFoundException('Not found'); return this.repository.delete(id); }
    async findAll(dto: PaginationQueryDto) { const r = await this.repository.findAll(dto); return { ...r, page: dto.page, amount: dto.amount, totalPages: Math.ceil(r.total/dto.amount)||1 }; }
    async findById(id: number) { const item = await this.repository.findById(id); if (!item) throw new NotFoundException('Not found'); return item; }
    findByJenisUsulan(id: number) { return this.repository.findByJenisUsulan(id); }
}