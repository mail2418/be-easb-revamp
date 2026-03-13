import { IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { AsbJakonType } from '../../../domain/asb_jakon/asb_jakon_type.enum';

export class GetJakonByPriceRangeDto {
    @IsNumber()
    @IsNotEmpty()
    id_asb_klasifikasi: number;

    @IsNumber()
    @IsNotEmpty()
    id_asb_tipe_bangunan: number;

    @IsNumber()
    @IsNotEmpty()
    id_asb_jenis: number;

    @IsEnum(AsbJakonType)
    @IsNotEmpty()
    type: AsbJakonType;

    @IsNumber()
    @IsNotEmpty()
    total_biaya_pembangunan: number;
}
