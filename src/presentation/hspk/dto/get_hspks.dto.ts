import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from '../../../common/dto/pagination_query.dto';

export class GetHspksDto extends PaginationQueryDto {
    @IsOptional()
    @IsNumber()
    @Min(2000)
    @Transform(({ value }) => (value != null && value !== '' ? parseInt(value, 10) : undefined))
    tahun_anggaran?: number;
}
