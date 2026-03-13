import { IsInt, IsNotEmpty } from 'class-validator';

export class GetShstNominalDto {
    @IsInt()
    @IsNotEmpty()
    id_asb_tipe_bangunan: number;

    @IsInt()
    @IsNotEmpty()
    id_asb_klasifikasi: number;

    @IsInt()
    @IsNotEmpty()
    id_kabkota: number;

    @IsInt()
    @IsNotEmpty()
    tahun: number;
}
