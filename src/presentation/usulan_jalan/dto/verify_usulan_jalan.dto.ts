import { IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

/**
 * DTO for verifying usulan jalan by ADBANG or BAPPEDA verifikator.
 * These verifikators only need the idUsulanJalan to approve.
 */
export class VerifyUsulanJalanDto {
    @IsInt()
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value, 10))
    idUsulanJalan!: number;
}
