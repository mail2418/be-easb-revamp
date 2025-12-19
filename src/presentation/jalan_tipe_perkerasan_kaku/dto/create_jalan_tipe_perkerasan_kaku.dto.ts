import { IsNotEmpty, IsString } from "class-validator";

export class CreateJalanTipePerkerasanKakuDto {
    @IsNotEmpty()
    @IsString()
    tipe!: string;
}
