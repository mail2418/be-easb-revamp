<<<<<<<< HEAD:src/presentation/hspk/dto/get_hspk_detail.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetHspkDetailDto {
========
import { IsNumber, IsNotEmpty } from "class-validator";
import { Transform } from 'class-transformer';

export class GetUsulanJalanStatusDetailDto {
>>>>>>>> cd56ab4ec6f6c9c2c5ee2d49d59b478457a4e573:src/presentation/usulan_jalan_status/dto/get_usulan_jalan_status_detail.dto.ts
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;
}
<<<<<<<< HEAD:src/presentation/hspk/dto/get_hspk_detail.dto.ts
========

>>>>>>>> cd56ab4ec6f6c9c2c5ee2d49d59b478457a4e573:src/presentation/usulan_jalan_status/dto/get_usulan_jalan_status_detail.dto.ts
