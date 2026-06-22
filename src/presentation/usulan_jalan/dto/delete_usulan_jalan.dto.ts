import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

<<<<<<<< HEAD:src/presentation/hspk/dto/delete_hspk.dto.ts
export class DeleteHspkDto {
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    id!: number;
}
========
export class DeleteUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan: number;
}


>>>>>>>> cd56ab4ec6f6c9c2c5ee2d49d59b478457a4e573:src/presentation/usulan_jalan/dto/delete_usulan_jalan.dto.ts
