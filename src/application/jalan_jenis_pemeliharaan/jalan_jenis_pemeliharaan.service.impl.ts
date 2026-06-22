import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination_query.dto';
import { JalanJenisPemeliharaanService } from '../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.service';
import { JalanJenisPemeliharaanRepository } from '../../domain/jalan_jenis_pemeliharaan/jalan_jenis_pemeliharaan.repository';
import { CreateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/create_jalan_jenis_pemeliharaan.dto';
import { UpdateJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/update_jalan_jenis_pemeliharaan.dto';
import { DeleteJalanJenisPemeliharaanDto } from '../../presentation/jalan_jenis_pemeliharaan/dto/delete_jalan_jenis_pemeliharaan.dto';

@Injectable()
export class JalanJenisPemeliharaanServiceImpl implements JalanJenisPemeliharaanService {
    constructor(private readonly repository: JalanJenisPemeliharaanRepository) {}
    create(dto: CreateJalanJenisPemeliharaanDto) { return this.repository.create(dto); }
    async update(dto: UpdateJalanJenisPemeliharaanDto) {
        if (!(await this.repository.findById(dto.id))) throw new NotFoundException('Not found');
        return this.repository.update(dto);
    }
    async delete(dto: DeleteJalanJenisPemeliharaanDto) {
        if (!(await this.repository.findById(dto.id))) throw new NotFoundException('Not found');
        return this.repository.delete(dto.id);
    }
    async findAll(dto: PaginationQueryDto) {
        const result = await this.repository.findAll(dto);
        return { ...result, page: dto.page, amount: dto.amount, totalPages: Math.ceil(result.total / dto.amount) || 1 };
    }
    async findById(id: number) {
        const item = await this.repository.findById(id);
        if (!item) throw new NotFoundException('Not found');
        return item;
    }
}
